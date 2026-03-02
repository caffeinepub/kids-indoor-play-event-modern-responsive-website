import OrderedMap "mo:base/OrderedMap";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Debug "mo:base/Debug";
import List "mo:base/List";
import Char "mo:base/Char";
import Iter "mo:base/Iter";
import FileStorage "file-storage/file-storage";
import Http "file-storage/http";
import Blob "mo:base/Blob";
import AccessControl "authorization/access-control";
import Principal "mo:base/Principal";
import Int "mo:base/Int";

actor {
    // Contact form submission type
    type ContactSubmission = {
        id : Text;
        name : Text;
        email : Text;
        phone : Text;
        eventDate : Text;
        numChildren : Nat;
        message : Text;
        timestamp : Int;
    };

    // Child type for waivers
    type Child = {
        name : Text;
        birthday : ?Text;
    };

    // Unified agreement waiver form type (liability + photo release)
    type UnifiedWaiverForm = {
        id : Text;
        parentName : Text;
        parentEmail : Text;
        parentPhone : Text;
        children : [Child];
        agreeUnifiedTerms : Bool;
        timestamp : Int;
        termsAndConditions : Text;
        visitCount : Nat;
    };

    // Website content type
    type WebsiteContent = {
        homepageText : Text;
        aboutText : Text;
        contactInfo : Text;
        operatingHours : Text;
    };

    // Gallery image type
    type GalleryImage = {
        id : Text;
        url : Text;
        description : Text;
        timestamp : Int;
    };

    // Marketing info type
    type MarketingInfo = {
        name : Text;
        email : Text;
        phone : Text;
        timestamp : Int;
    };

    // Testimonial type
    type Testimonial = {
        id : Text;
        customerName : Text;
        review : Text;
        timestamp : Int;
    };

    // Community post type
    type CommunityPost = {
        id : Text;
        title : Text;
        content : Text;
        author : Text;
        timestamp : Int;
    };

    // User profile type
    public type UserProfile = {
        name : Text;
    };

    // Email subscriber type
    type EmailSubscriber = {
        email : Text;
        timestamp : Time.Time;
    };

    // Birthday package type
    type BirthdayPackage = {
        id : Text;
        name : Text;
        weekdayPrice : Nat;
        weekendPrice : Nat;
        includedChildren : Nat;
        additionalChildPrice : Nat;
        socksIncluded : Nat;
        roomTime : Text;
        description : Text;
    };

    // Translation entry type
    type TranslationEntry = {
        originalText : Text;
        translatedText : Text;
    };

    // Language preference type
    type LanguagePreference = {
        userId : Principal;
        language : Text; // "en" or "es"
    };

    // Initialize OrderedMap operations
    transient let textMap = OrderedMap.Make<Text>(Text.compare);
    transient let principalMap = OrderedMap.Make<Principal>(Principal.compare);

    // Storage for contact submissions, waivers, and content
    var contactSubmissions : OrderedMap.Map<Text, ContactSubmission> = textMap.empty();
    var waivers : OrderedMap.Map<Text, UnifiedWaiverForm> = textMap.empty();
    var websiteContent : OrderedMap.Map<Text, WebsiteContent> = textMap.empty();
    var galleryImages : OrderedMap.Map<Text, GalleryImage> = textMap.empty();
    var marketingInfo : OrderedMap.Map<Text, MarketingInfo> = textMap.empty();
    var testimonials : OrderedMap.Map<Text, Testimonial> = textMap.empty();
    var emailSubscribers : OrderedMap.Map<Text, EmailSubscriber> = textMap.empty();
    var communityPosts : OrderedMap.Map<Text, CommunityPost> = textMap.empty();
    var userProfiles : OrderedMap.Map<Principal, UserProfile> = principalMap.empty();
    var birthdayPackages : OrderedMap.Map<Text, BirthdayPackage> = textMap.empty();
    var translations : OrderedMap.Map<Text, TranslationEntry> = textMap.empty();
    var languagePreferences : OrderedMap.Map<Principal, LanguagePreference> = principalMap.empty();
    var storage = FileStorage.new();

    // Access control state
    let accessControlState = AccessControl.initState();

    // Configure CORS headers - use wildcard for public gallery access
    let corsHeaders = [
        ("Access-Control-Allow-Origin", "*"),
        ("Access-Control-Allow-Methods", "GET, POST, OPTIONS"),
        ("Access-Control-Allow-Headers", "Authorization, Content-Type"),
        ("Access-Control-Max-Age", "86400"),
    ];

    let errorHeaderNoCert = ("IC-Certificate", "skip");
    let notFoundResponse = Text.encodeUtf8("NOT FOUND");

    // Helper function to normalize phone numbers
    func normalizePhoneNumber(phone : Text) : Text {
        let chars = Text.toIter(phone);
        var normalized = List.nil<Char>();

        for (c in chars) {
            if (Char.isDigit(c)) {
                normalized := List.push(c, normalized);
            };
        };

        Text.fromIter(List.toIter(List.reverse(normalized)));
    };

    // Helper function to normalize names
    func normalizeName(name : Text) : Text {
        let lowercased = Text.toLowercase(name);
        let lowerChars = Text.toIter(lowercased);

        // Remove extra spaces and non-alphabetic characters
        var normalized = List.nil<Char>();
        var lastCharWasSpace : Bool = true;

        for (c in lowerChars) {
            if (c == ' ') {
                if (not lastCharWasSpace) {
                    normalized := List.push(c, normalized);
                    lastCharWasSpace := true;
                };
            } else if (Char.isAlphabetic(c)) {
                normalized := List.push(c, normalized);
                lastCharWasSpace := false;
            };
        };

        Text.fromIter(List.toIter(List.reverse(normalized)));
    };

    // Helper function to compare names using normalized search, handles first/last swapped
    func normalizedContains(_fullName : Text, _searchTerm : Text) : Bool {
        let fullName = normalizeName(_fullName);
        let searchTerm = normalizeName(_searchTerm);

        if (Text.contains(fullName, #text searchTerm)) {
            return true;
        };

        let fullNameParts = Text.split(fullName, #char(' '));
        let searchTermParts = Text.split(searchTerm, #char(' '));

        // Convert Iter to array for easier manipulation
        let fullNameArray = Iter.toArray(fullNameParts);
        let searchTermArray = Iter.toArray(searchTermParts);

        if (fullNameArray.size() == 2 and searchTermArray.size() == 2) {
            let fullSwapped = Text.concat(fullNameArray[1], " " # fullNameArray[0]);
            let searchSwapped = Text.concat(searchTermArray[1], " " # searchTermArray[0]);

            return Text.contains(fullSwapped, #text searchTerm) or Text.contains(fullName, #text searchSwapped);
        };

        false;
    };

    // Unified waiver form submission function (public - no auth required per spec)
    public shared func submitUnifiedWaiver(
        parentName : Text,
        parentEmail : Text,
        parentPhone : Text,
        children : [Child],
        agreeUnifiedTerms : Bool,
        termsAndConditions : Text,
    ) : async Text {
        if (children.size() > 6) {
            Debug.trap("Cannot submit more than 6 children");
        };
        assert(children.size() <= 6);

        let id = Text.concat(parentEmail, Int.toText(Time.now()));
        let waiver : UnifiedWaiverForm = {
            id;
            parentName;
            parentEmail;
            parentPhone;
            children;
            agreeUnifiedTerms;
            timestamp = Time.now();
            termsAndConditions;
            visitCount = 0;
        };
        waivers := textMap.put(waivers, id, waiver);

        // Save marketing info
        let marketing : MarketingInfo = {
            name = parentName;
            email = parentEmail;
            phone = parentPhone;
            timestamp = Time.now();
        };
        marketingInfo := textMap.put(marketingInfo, id, marketing);

        id;
    };

    // Query all waivers - PUBLIC (Employee Waiver Check)
    public query func listAllWaivers() : async [UnifiedWaiverForm] {
        let entries = textMap.entries(waivers);
        Array.map<(Text, UnifiedWaiverForm), UnifiedWaiverForm>(
            Iter.toArray(entries),
            func(entry) { entry.1 },
        );
    };

    // Query new waivers since a given timestamp - PUBLIC (Employee Waiver Check)
    public query func getNewWaivers(sinceTimestamp : Int) : async [UnifiedWaiverForm] {
        let entries = textMap.entries(waivers);
        var newWaivers = List.nil<UnifiedWaiverForm>();

        for ((_, waiver) in entries) {
            if (waiver.timestamp > sinceTimestamp) {
                newWaivers := List.push<UnifiedWaiverForm>(waiver, newWaivers);
            };
        };

        List.toArray(newWaivers);
    };

    // Search waivers by parent name, phone number, or child name - PUBLIC (Employee Waiver Check)
    public query func searchWaivers(searchTerm : Text) : async [UnifiedWaiverForm] {
        let entries = textMap.entries(waivers);
        var results = List.nil<UnifiedWaiverForm>();

        for ((id, waiver) in entries) {
            if (normalizedContains(waiver.parentName, searchTerm) or Text.contains(normalizePhoneNumber(waiver.parentPhone), #text searchTerm)) {
                results := List.push<UnifiedWaiverForm>(waiver, results);
            } else {
                var childMatch = false;
                for (child in waiver.children.vals()) {
                    if (normalizedContains(child.name, searchTerm)) {
                        childMatch := true;
                    };
                };
                if (childMatch) {
                    results := List.push<UnifiedWaiverForm>(waiver, results);
                };
            };
        };

        List.toArray(results);
    };

    // Get the 10 most recent waivers - PUBLIC (Employee Waiver Check)
    public query func getRecentWaivers() : async [UnifiedWaiverForm] {
        let entries = textMap.entries(waivers);
        let waiversArray = Array.map<(Text, UnifiedWaiverForm), UnifiedWaiverForm>(
            Iter.toArray(entries),
            func(entry) { entry.1 },
        );

        let sortedWaivers = Array.sort<UnifiedWaiverForm>(
            waiversArray,
            func(a, b) {
                if (a.timestamp > b.timestamp) { #less } else if (a.timestamp < b.timestamp) {
                    #greater;
                } else { #equal };
            },
        );

        let count = sortedWaivers.size();
        if (count <= 10) {
            sortedWaivers;
        } else {
            Array.tabulate<UnifiedWaiverForm>(10, func(i) { sortedWaivers[i] });
        };
    };

    // Initialize access control (first caller becomes admin)
    public shared ({ caller }) func initializeAccessControl() : async () {
        AccessControl.initialize(accessControlState, caller);
    };

    // Get caller's user role
    public query ({ caller }) func getCallerUserRole() : async AccessControl.UserRole {
        AccessControl.getUserRole(accessControlState, caller);
    };

    // Assign user role to a principal (admin only - enforced in AccessControl.assignRole)
    public shared ({ caller }) func assignCallerUserRole(user : Principal, role : AccessControl.UserRole) : async () {
        AccessControl.assignRole(accessControlState, caller, user, role);
    };

    // Check if caller is admin
    public query ({ caller }) func isCallerAdmin() : async Bool {
        AccessControl.isAdmin(accessControlState, caller);
    };

    // User profile management functions
    public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
        if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
            Debug.trap("Unauthorized: Only users can view profiles");
        };
        principalMap.get(userProfiles, caller);
    };

    public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
        if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
            Debug.trap("Unauthorized: Can only view your own profile");
        };
        principalMap.get(userProfiles, user);
    };

    public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
            Debug.trap("Unauthorized: Only users can save profiles");
        };
        userProfiles := principalMap.put(userProfiles, caller, profile);
    };

    // File storage functions - ADMIN ONLY for listing (file metadata could be sensitive)
    public query ({ caller }) func fileList() : async [FileStorage.FileMetadata] {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Debug.trap("Unauthorized: Only admin can list files");
        };
        FileStorage.list(storage);
    };

    public shared ({ caller }) func fileUpload(path : Text, contentType : Text, content : Blob, complete : Bool) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Debug.trap("Unauthorized: Only admin can upload files");
        };
        FileStorage.upload(storage, path, contentType, content, complete);
    };

    public shared ({ caller }) func fileDelete(path : Text) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Debug.trap("Unauthorized: Only admin can delete files");
        };
        FileStorage.delete(storage, path);
    };

    // HTTP request handlers for file serving (public - for gallery access)
    public query func httpStreamingCallback(token : Http.StreamingToken) : async Http.StreamingCallbackHttpResponse {
        FileStorage.httpStreamingCallback(storage, token);
    };

    public func fileRequest(request : Http.HttpRequest) : async Http.HttpResponse {
        let originalResponse : Http.HttpResponse = FileStorage.fileRequest(storage, request, httpStreamingCallback);
        let newHeaders = Array.append(originalResponse.headers, corsHeaders);
        let fixedResponse : Http.HttpResponse = {
            originalResponse with
            headers = newHeaders;
        };
        fixedResponse;
    };

    // Admin functions for managing website content
    public shared ({ caller }) func updateWebsiteContent(content : WebsiteContent) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Debug.trap("Unauthorized: Only admin can update website content");
        };
        websiteContent := textMap.put(websiteContent, "main", content);
    };

    func getDefaultWebsiteContentWithHours() : WebsiteContent {
        {
            homepageText = "Welcome to Kids Conservatory!";
            aboutText = "Kids Conservatory is the premier indoor playground for kids and families.";
            contactInfo = "Contact us at info@kidsconservatory.com";
            operatingHours = "9:30 AM - 8:00 PM daily";
        };
    };

    public query func getWebsiteContent() : async WebsiteContent {
        let customContent = textMap.get(websiteContent, "main");
        let defaultContent = getDefaultWebsiteContentWithHours();
        let mergedContent = switch (customContent) {
            case (?content) {
                if (content.operatingHours != "9:30 AM - 8:00 PM daily") {
                    defaultContent;
                } else {
                    content;
                };
            };
            case null defaultContent;
        };
        mergedContent;
    };

    // Admin functions for managing gallery images
    public shared ({ caller }) func addGalleryImage(url : Text, description : Text) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Debug.trap("Unauthorized: Only admin can add gallery images");
        };
        let id = Text.concat(url, Int.toText(Time.now()));
        let image : GalleryImage = {
            id;
            url;
            description;
            timestamp = Time.now();
        };
        galleryImages := textMap.put(galleryImages, id, image);
    };

    public shared ({ caller }) func removeGalleryImage(id : Text) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Debug.trap("Unauthorized: Only admin can remove gallery images");
        };
        galleryImages := textMap.delete(galleryImages, id);
    };

    public query func getGalleryImages() : async [GalleryImage] {
        let now = Time.now();

        let predefinedImages : [GalleryImage] = [
            {
                id = "play_area_gallery_foam_block_pit";
                url = "/images/kids.jpg";
                description = "Foam block pit with climbing equipment. Part of Play Area Gallery - Play Area Gallery";
                timestamp = now;
            },
            {
                id = "play_area_gallery_toddler_zone";
                url = "/images/kids1.jpg";
                description = "Toddler zone with colorful play structures. Part of Play Area Gallery - Play Area Gallery";
                timestamp = now;
            },
            {
                id = "play_area_gallery_ride_on_toys";
                url = "/images/kids2.jpg";
                description = "Ride-on toys area with colorful fencing. Part of Play Area Gallery - Play Area Gallery";
                timestamp = now;
            },
            {
                id = "play_area_gallery_multi_level_structure";
                url = "/images/kids3.jpg";
                description = "Multi-level play structure with slides. Part of Play Area Gallery - Play Area Gallery";
                timestamp = now;
            },
        ];

        let entries = textMap.entries(galleryImages);
        let customImages = Array.map<(Text, GalleryImage), GalleryImage>(
            Iter.toArray(entries),
            func(entry) { entry.1 },
        );

        let allImages = Array.append(predefinedImages, customImages);

        let sortedImages = Array.sort<GalleryImage>(
            allImages,
            func(a, b) {
                if (a.timestamp > b.timestamp) { #less } else if (a.timestamp < b.timestamp) {
                    #greater;
                } else { #equal };
            },
        );

        sortedImages;
    };

    // Query all marketing info - ADMIN ONLY (contains sensitive customer data)
    public shared query ({ caller }) func getAllMarketingInfo() : async [MarketingInfo] {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Debug.trap("Unauthorized: Only admin can view marketing information");
        };
        let entries = textMap.entries(marketingInfo);
        Array.map<(Text, MarketingInfo), MarketingInfo>(
            Iter.toArray(entries),
            func(entry) { entry.1 },
        );
    };

    // Admin functions for managing testimonials
    public shared ({ caller }) func addTestimonial(customerName : Text, review : Text) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Debug.trap("Unauthorized: Only admin can add testimonials");
        };
        let id = Text.concat(customerName, Int.toText(Time.now()));
        let testimonial : Testimonial = {
            id;
            customerName;
            review;
            timestamp = Time.now();
        };
        testimonials := textMap.put(testimonials, id, testimonial);
    };

    public shared ({ caller }) func removeTestimonial(id : Text) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Debug.trap("Unauthorized: Only admin can remove testimonials");
        };
        testimonials := textMap.delete(testimonials, id);
    };

    // Query all testimonials (public)
    public query func getTestimonials() : async [Testimonial] {
        let entries = textMap.entries(testimonials);
        Array.map<(Text, Testimonial), Testimonial>(
            Iter.toArray(entries),
            func(entry) { entry.1 },
        );
    };

    // Admin functions for managing community posts
    public shared ({ caller }) func addCommunityPost(title : Text, content : Text, author : Text) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Debug.trap("Unauthorized: Only admin can add community posts");
        };
        let id = Text.concat(title, Int.toText(Time.now()));
        let post : CommunityPost = {
            id;
            title;
            content;
            author;
            timestamp = Time.now();
        };
        communityPosts := textMap.put(communityPosts, id, post);
    };

    public shared ({ caller }) func removeCommunityPost(id : Text) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Debug.trap("Unauthorized: Only admin can remove community posts");
        };
        communityPosts := textMap.delete(communityPosts, id);
    };

    // Query all community posts (public)
    public query func getCommunityPosts() : async [CommunityPost] {
        let entries = textMap.entries(communityPosts);
        Array.map<(Text, CommunityPost), CommunityPost>(
            Iter.toArray(entries),
            func(entry) { entry.1 },
        );
    };

    // Email subscription function (public - no auth required)
    public shared func subscribeEmail(email : Text) : async Bool {
        let subscriber : EmailSubscriber = {
            email;
            timestamp = Time.now();
        };

        emailSubscribers := textMap.put(emailSubscribers, email, subscriber);
        true;
    };

    // Admin function to get all email subscribers
    public shared query ({ caller }) func getEmailSubscribers() : async [EmailSubscriber] {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Debug.trap("Unauthorized: Only admin can view email subscribers");
        };
        let entries = textMap.entries(emailSubscribers);
        Array.map<(Text, EmailSubscriber), EmailSubscriber>(
            Iter.toArray(entries),
            func(entry) { entry.1 },
        );
    };

    // Admin function to export email subscribers as CSV
    public shared query ({ caller }) func exportEmailSubscribersCSV() : async Text {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Debug.trap("Unauthorized: Only admin can export email subscribers");
        };

        let entries = textMap.entries(emailSubscribers);
        var csv = "Email,Timestamp\n";
        for ((email, subscriber) in entries) {
            csv := csv # email # "," # Int.toText(subscriber.timestamp) # "\n";
        };
        csv;
    };

    // Admin function to get subscriber count
    public shared query ({ caller }) func getSubscriberCount() : async Nat {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Debug.trap("Unauthorized: Only admin can view subscriber count");
        };
        textMap.size(emailSubscribers);
    };

    // Contact submission function (public - anyone can submit)
    public shared func addContactSubmission(name : Text, email : Text, phone : Text, eventDate : Text, numChildren : Nat, message : Text) : async () {
        let id = Text.concat(email, Int.toText(Time.now()));
        let submission : ContactSubmission = {
            id;
            name;
            email;
            phone;
            eventDate;
            numChildren;
            message;
            timestamp = Time.now();
        };
        contactSubmissions := textMap.put(contactSubmissions, id, submission);
    };

    // Get contact submissions - ADMIN ONLY (contains sensitive customer data)
    public shared query ({ caller }) func getContactSubmissions() : async [ContactSubmission] {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Debug.trap("Unauthorized: Only admin can view contact submissions");
        };
        let entries = textMap.entries(contactSubmissions);
        Array.map<(Text, ContactSubmission), ContactSubmission>(
            Iter.toArray(entries),
            func(entry) { entry.1 },
        );
    };

    // Admin functions for managing birthday packages
    public shared ({ caller }) func addBirthdayPackage(name : Text, weekdayPrice : Nat, weekendPrice : Nat, includedChildren : Nat, additionalChildPrice : Nat, socksIncluded : Nat, roomTime : Text, description : Text) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Debug.trap("Unauthorized: Only admin can add birthday packages");
        };
        let id = Text.concat(name, Int.toText(Time.now()));
        let package : BirthdayPackage = {
            id;
            name;
            weekdayPrice;
            weekendPrice;
            includedChildren;
            additionalChildPrice;
            socksIncluded;
            roomTime;
            description;
        };
        birthdayPackages := textMap.put(birthdayPackages, id, package);
    };

    public shared ({ caller }) func removeBirthdayPackage(id : Text) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Debug.trap("Unauthorized: Only admin can remove birthday packages");
        };
        birthdayPackages := textMap.delete(birthdayPackages, id);
    };

    public query func getBirthdayPackages() : async [BirthdayPackage] {
        let entries = textMap.entries(birthdayPackages);
        let packages = Array.map<(Text, BirthdayPackage), BirthdayPackage>(
            Iter.toArray(entries),
            func(entry) { entry.1 },
        );

        let sortedPackages = Array.sort<BirthdayPackage>(
            packages,
            func(a, b) {
                Text.compare(a.name, b.name);
            },
        );

        sortedPackages;
    };

    // Get predefined gallery images including Play Area Gallery photos
    public query func getPredefinedGalleryImages() : async [GalleryImage] {
        let now = Time.now();

        let predefinedImages : [GalleryImage] = [
            {
                id = "play_area_gallery_foam_block_pit";
                url = "/images/kids.jpg";
                description = "Foam block pit with climbing equipment. Part of Play Area Gallery - Play Area Gallery";
                timestamp = now;
            },
            {
                id = "play_area_gallery_toddler_zone";
                url = "/images/kids1.jpg";
                description = "Toddler zone with colorful play structures. Part of Play Area Gallery - Play Area Gallery";
                timestamp = now;
            },
            {
                id = "play_area_gallery_ride_on_toys";
                url = "/images/kids2.jpg";
                description = "Ride-on toys area with colorful fencing. Part of Play Area Gallery - Play Area Gallery";
                timestamp = now;
            },
            {
                id = "play_area_gallery_multi_level_structure";
                url = "/images/kids3.jpg";
                description = "Multi-level play structure with slides. Part of Play Area Gallery - Play Area Gallery";
                timestamp = now;
            },
        ];

        let entries = textMap.entries(galleryImages);
        let customImages = Array.map<(Text, GalleryImage), GalleryImage>(
            Iter.toArray(entries),
            func(entry) { entry.1 },
        );

        Array.append(predefinedImages, customImages);
    };

    // Initialize default birthday packages if not present
    func initializeDefaultBirthdayPackages() {
        let existingPackages = textMap.entries(birthdayPackages);
        let count = Iter.size(existingPackages);

        if (count == 0) {
            // Basic Birthday Package
            let basicId = "basic_" # Int.toText(Time.now());
            let basicPackage : BirthdayPackage = {
                id = basicId;
                name = "Basic Birthday Package";
                weekdayPrice = 165;
                weekendPrice = 255;
                includedChildren = 11;
                additionalChildPrice = 11;
                socksIncluded = 12;
                roomTime = "100 min";
                description = "Includes 11 passes + guest of honor, 12 socks, 100 min party room";
            };
            birthdayPackages := textMap.put(birthdayPackages, basicId, basicPackage);

            // Plus Birthday Package
            let plusId = "plus_" # Int.toText(Time.now());
            let plusPackage : BirthdayPackage = {
                id = plusId;
                name = "Plus Birthday Package";
                weekdayPrice = 260;
                weekendPrice = 350;
                includedChildren = 20;
                additionalChildPrice = 11;
                socksIncluded = 21;
                roomTime = "100 min";
                description = "Includes 20 kids + guest of honor, 21 socks, 100 min party room";
            };
            birthdayPackages := textMap.put(birthdayPackages, plusId, plusPackage);
        };
    };

    initializeDefaultBirthdayPackages();

    // Translation management functions

    // Add or update a translation entry (admin only)
    public shared ({ caller }) func addOrUpdateTranslation(originalText : Text, translatedText : Text) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Debug.trap("Unauthorized: Only admin can manage translations");
        };

        let entry : TranslationEntry = {
            originalText;
            translatedText;
        };

        translations := textMap.put(translations, originalText, entry);
    };

    // Get translation for a specific text (public - needed for frontend translation)
    public query func getTranslation(originalText : Text) : async ?Text {
        switch (textMap.get(translations, originalText)) {
            case (?entry) ?entry.translatedText;
            case null null;
        };
    };

    // Bulk import translations (admin only)
    public shared ({ caller }) func importTranslations(entries : [TranslationEntry]) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Debug.trap("Unauthorized: Only admin can import translations");
        };

        for (entry in entries.vals()) {
            translations := textMap.put(translations, entry.originalText, entry);
        };
    };

    // List all translations (admin only)
    public query ({ caller }) func listTranslations() : async [TranslationEntry] {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Debug.trap("Unauthorized: Only admin can view translations");
        };

        let entries = textMap.entries(translations);
        Array.map<(Text, TranslationEntry), TranslationEntry>(
            Iter.toArray(entries),
            func(entry) { entry.1 },
        );
    };

    // Language preference management functions
    // Users can only manage their own preferences

    // Set language preference for caller (authenticated users only)
    public shared ({ caller }) func setLanguagePreference(language : Text) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
            Debug.trap("Unauthorized: Only authenticated users can set language preferences");
        };

        // Validate language parameter
        if (language != "en" and language != "es") {
            Debug.trap("Invalid language: must be 'en' or 'es'");
        };

        let preference : LanguagePreference = {
            userId = caller;
            language;
        };

        languagePreferences := principalMap.put(languagePreferences, caller, preference);
    };

    // Get language preference for caller (authenticated users only)
    public query ({ caller }) func getLanguagePreference() : async ?Text {
        if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
            return null;
        };

        switch (principalMap.get(languagePreferences, caller)) {
            case (?preference) ?preference.language;
            case null null;
        };
    };

    // Remove language preference for caller (authenticated users only)
    public shared ({ caller }) func removeLanguagePreference() : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
            Debug.trap("Unauthorized: Only authenticated users can remove language preferences");
        };

        languagePreferences := principalMap.delete(languagePreferences, caller);
    };

    // Admin function to view all language preferences
    public query ({ caller }) func listLanguagePreferences() : async [LanguagePreference] {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Debug.trap("Unauthorized: Only admin can view all language preferences");
        };

        let entries = principalMap.entries(languagePreferences);
        Array.map<(Principal, LanguagePreference), LanguagePreference>(
            Iter.toArray(entries),
            func(entry) { entry.1 },
        );
    };

    // EMPLOYEE CHECK-IN SYSTEM FUNCTIONS
    // Check-In endpoint - increments visit count (public function,  no auth required)
    public shared func checkInWaiver(waiverId : Text) : async Nat {
        switch (textMap.get(waivers, waiverId)) {
            case (?waiver) {
                let updatedWaiver = { waiver with visitCount = waiver.visitCount + 1 };
                waivers := textMap.put(waivers, waiverId, updatedWaiver);
                updatedWaiver.visitCount;
            };
            case null {
                Debug.trap("Waiver not found");
            };
        };
    };

    // Query waivers with visit counts for admin view
    public query ({ caller }) func getWaiversWithVisitCounts() : async [UnifiedWaiverForm] {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Debug.trap("Unauthorized: Only admin can view waivers with visit counts");
        };

        let entries = textMap.entries(waivers);
        Array.map<(Text, UnifiedWaiverForm), UnifiedWaiverForm>(
            Iter.toArray(entries),
            func(entry) { entry.1 },
        );
    };

    // Unified search function for both waiver check and check-in (public - Employee Check-In)
    public query func unifiedWaiverSearch(searchTerm : Text) : async [UnifiedWaiverForm] {
        let entries = textMap.entries(waivers);
        var results = List.nil<UnifiedWaiverForm>();

        for ((id, waiver) in entries) {
            if (normalizedContains(waiver.parentName, searchTerm) or Text.contains(normalizePhoneNumber(waiver.parentPhone), #text searchTerm)) {
                results := List.push<UnifiedWaiverForm>(waiver, results);
            } else {
                var childMatch = false;
                for (child in waiver.children.vals()) {
                    if (normalizedContains(child.name, searchTerm)) {
                        childMatch := true;
                    };
                };
                if (childMatch) {
                    results := List.push<UnifiedWaiverForm>(waiver, results);
                };
            };
        };

        List.toArray(results);
    };

    // Get total check-ins for a specific waiver (can be used for confirmation messages)
    public query func getTotalCheckIns(waiverId : Text) : async Nat {
        switch (textMap.get(waivers, waiverId)) {
            case (?waiver) {
                waiver.visitCount;
            };
            case null {
                Debug.trap("Waiver not found");
            };
        };
    };

    // Get check-in statistics - ADMIN ONLY
    public query ({ caller }) func getCheckInStats() : async {
        totalCheckIns : Nat;
        frequentVisitors : [UnifiedWaiverForm];
    } {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Debug.trap("Unauthorized: Only admin can view check-in stats");
        };

        let entries = textMap.entries(waivers);
        var totalCheckIns = 0;
        var frequentVisitors = List.nil<UnifiedWaiverForm>();

        for ((id, waiver) in entries) {
            totalCheckIns += waiver.visitCount;
            if (waiver.visitCount > 5) {
                frequentVisitors := List.push<UnifiedWaiverForm>(waiver, frequentVisitors);
            };
        };

        let visitorsArray = List.toArray(frequentVisitors);
        let sortedVisitors = Array.sort<UnifiedWaiverForm>(
            visitorsArray,
            func(a, b) {
                if (a.visitCount > b.visitCount) { #less } else if (a.visitCount < b.visitCount) {
                    #greater;
                } else { #equal };
            },
        );

        {
            totalCheckIns;
            frequentVisitors = sortedVisitors;
        };
    };
};

