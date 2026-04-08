import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Char "mo:core/Char";
import Iter "mo:core/Iter";
import FileStorage "file-storage/file-storage";
import Http "file-storage/http";
import Blob "mo:core/Blob";
import AccessControl "authorization/access-control";
import Principal "mo:core/Principal";
import Int "mo:core/Int";



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

    // Storage for contact submissions, waivers, and content
    var contactSubmissions = Map.empty<Text, ContactSubmission>();
    var waivers = Map.empty<Text, UnifiedWaiverForm>();
    var websiteContent = Map.empty<Text, WebsiteContent>();
    var galleryImages = Map.empty<Text, GalleryImage>();
    var marketingInfo = Map.empty<Text, MarketingInfo>();
    var testimonials = Map.empty<Text, Testimonial>();
    var emailSubscribers = Map.empty<Text, EmailSubscriber>();
    var communityPosts = Map.empty<Text, CommunityPost>();
    var userProfiles = Map.empty<Principal, UserProfile>();
    var birthdayPackages = Map.empty<Text, BirthdayPackage>();
    var translations = Map.empty<Text, TranslationEntry>();
    var languagePreferences = Map.empty<Principal, LanguagePreference>();
    var storage = FileStorage.new();

    // Access control state
    let accessControlState = AccessControl.initState();

    // Configure CORS headers
    let corsHeaders = [
        ("Access-Control-Allow-Origin", "*"),
        ("Access-Control-Allow-Methods", "GET, POST, OPTIONS"),
        ("Access-Control-Allow-Headers", "Authorization, Content-Type"),
        ("Access-Control-Max-Age", "86400"),
    ];

    let notFoundResponse = "NOT FOUND".encodeUtf8();

    // Helper function to normalize phone numbers
    func normalizePhoneNumber(phone : Text) : Text {
        var normalized = List.empty<Char>();
        for (c in phone.chars()) {
            if (c.isDigit()) {
                normalized.add(c);
            };
        };
        Text.fromIter(normalized.values());
    };

    // Helper function to normalize names
    func normalizeName(name : Text) : Text {
        let lowercased = name.toLower();
        var normalized = List.empty<Char>();
        var lastCharWasSpace : Bool = true;

        for (c in lowercased.chars()) {
            if (c == ' ') {
                if (not lastCharWasSpace) {
                    normalized.add(c);
                    lastCharWasSpace := true;
                };
            } else if (c.isAlphabetic()) {
                normalized.add(c);
                lastCharWasSpace := false;
            };
        };

        Text.fromIter(normalized.values());
    };

    // Helper function to compare names using normalized search
    func normalizedContains(_fullName : Text, _searchTerm : Text) : Bool {
        let fullName = normalizeName(_fullName);
        let searchTerm = normalizeName(_searchTerm);

        if (fullName.contains(#text searchTerm)) {
            return true;
        };

        let fullNameArray = fullName.split(#char(' ')).toArray();
        let searchTermArray = searchTerm.split(#char(' ')).toArray();

        if (fullNameArray.size() == 2 and searchTermArray.size() == 2) {
            let fullSwapped = fullNameArray[1] # " " # fullNameArray[0];
            let searchSwapped = searchTermArray[1] # " " # searchTermArray[0];
            return fullSwapped.contains(#text searchTerm) or fullName.contains(#text searchSwapped);
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
            Runtime.trap("Cannot submit more than 6 children");
        };

        let id = parentEmail # Time.now().toText();
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
        waivers.add(id, waiver);

        // Save marketing info
        let marketing : MarketingInfo = {
            name = parentName;
            email = parentEmail;
            phone = parentPhone;
            timestamp = Time.now();
        };
        marketingInfo.add(id, marketing);

        id;
    };

    // Query all waivers - PUBLIC (Employee Waiver Check)
    public query func listAllWaivers() : async [UnifiedWaiverForm] {
        waivers.values().toArray();
    };

    // Query new waivers since a given timestamp - PUBLIC (Employee Waiver Check)
    public query func getNewWaivers(sinceTimestamp : Int) : async [UnifiedWaiverForm] {
        waivers.values().filter(func(w) { w.timestamp > sinceTimestamp }).toArray();
    };

    // Search waivers by parent name, phone number, or child name - PUBLIC (Employee Waiver Check)
    public query func searchWaivers(searchTerm : Text) : async [UnifiedWaiverForm] {
        waivers.values().filter(func(waiver) {
            if (normalizedContains(waiver.parentName, searchTerm) or normalizePhoneNumber(waiver.parentPhone).contains(#text searchTerm)) {
                return true;
            };
            for (child in waiver.children.values()) {
                if (normalizedContains(child.name, searchTerm)) {
                    return true;
                };
            };
            false;
        }).toArray();
    };

    // Get the 10 most recent waivers - PUBLIC (Employee Waiver Check)
    public query func getRecentWaivers() : async [UnifiedWaiverForm] {
        let waiversArray = waivers.values().toArray();
        let sortedWaivers = waiversArray.sort(
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

    // Reset admin access — clears all stored roles so the next Internet Identity
    // login via initializeAccessControl() becomes the new admin.
    // Callable by anyone (needed when locked out).
    public shared func resetAdminAccess() : async () {
        AccessControl.resetAccess(accessControlState);
    };

    // Initialize access control (first caller becomes admin)
    public shared ({ caller }) func initializeAccessControl() : async () {
        AccessControl.initialize(accessControlState, caller);
    };

    // Get caller's user role
    public query ({ caller }) func getCallerUserRole() : async AccessControl.UserRole {
        AccessControl.getUserRole(accessControlState, caller);
    };

    // Assign user role to a principal (admin only)
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
            Runtime.trap("Unauthorized: Only users can view profiles");
        };
        userProfiles.get(caller);
    };

    public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
        if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
            Runtime.trap("Unauthorized: Can only view your own profile");
        };
        userProfiles.get(user);
    };

    public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
            Runtime.trap("Unauthorized: Only users can save profiles");
        };
        userProfiles.add(caller, profile);
    };

    // File storage functions - ADMIN ONLY for listing
    public query ({ caller }) func fileList() : async [FileStorage.FileMetadata] {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Runtime.trap("Unauthorized: Only admin can list files");
        };
        FileStorage.list(storage);
    };

    public shared ({ caller }) func fileUpload(path : Text, contentType : Text, content : Blob, complete : Bool) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Runtime.trap("Unauthorized: Only admin can upload files");
        };
        FileStorage.upload(storage, path, contentType, content, complete);
    };

    public shared ({ caller }) func fileDelete(path : Text) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Runtime.trap("Unauthorized: Only admin can delete files");
        };
        FileStorage.delete(storage, path);
    };

    // HTTP request handlers for file serving (public - for gallery access)
    public query func httpStreamingCallback(token : Http.StreamingToken) : async Http.StreamingCallbackHttpResponse {
        FileStorage.httpStreamingCallback(storage, token);
    };

    public func fileRequest(request : Http.HttpRequest) : async Http.HttpResponse {
        let originalResponse : Http.HttpResponse = FileStorage.fileRequest(storage, request, httpStreamingCallback);
        let newHeaders = originalResponse.headers.concat(corsHeaders);
        { originalResponse with headers = newHeaders };
    };

    // Admin functions for managing website content
    public shared ({ caller }) func updateWebsiteContent(content : WebsiteContent) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Runtime.trap("Unauthorized: Only admin can update website content");
        };
        websiteContent.add("main", content);
    };

    func getDefaultWebsiteContentWithHours() : WebsiteContent {
        {
            homepageText = "Welcome to Kids Conservatory!";
            aboutText = "Kids Conservatory is the premier indoor playground for kids and families.";
            contactInfo = "Contact us at info@kidsconservatory.com";
            operatingHours = "9:30 AM - 8:30 PM daily";
        };
    };

    public query func getWebsiteContent() : async WebsiteContent {
        switch (websiteContent.get("main")) {
            case (?content) content;
            case null getDefaultWebsiteContentWithHours();
        };
    };

    // Admin functions for managing gallery images
    public shared ({ caller }) func addGalleryImage(url : Text, description : Text) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Runtime.trap("Unauthorized: Only admin can add gallery images");
        };
        let id = url # Time.now().toText();
        let image : GalleryImage = {
            id;
            url;
            description;
            timestamp = Time.now();
        };
        galleryImages.add(id, image);
    };

    public shared ({ caller }) func removeGalleryImage(id : Text) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Runtime.trap("Unauthorized: Only admin can remove gallery images");
        };
        galleryImages.remove(id);
    };

    // Returns only custom-registered gallery images (no broken placeholder paths)
    public query func getGalleryImages() : async [GalleryImage] {
        let allImages = galleryImages.values().toArray();
        allImages.sort<GalleryImage>(
            func(a, b) {
                if (a.timestamp > b.timestamp) { #less } else if (a.timestamp < b.timestamp) {
                    #greater;
                } else { #equal };
            },
        );
    };

    // getPredefinedGalleryImages kept for API compatibility — returns only registered images
    public query func getPredefinedGalleryImages() : async [GalleryImage] {
        let allImages = galleryImages.values().toArray();
        allImages.sort<GalleryImage>(
            func(a, b) {
                if (a.timestamp > b.timestamp) { #less } else if (a.timestamp < b.timestamp) {
                    #greater;
                } else { #equal };
            },
        );
    };

    // Query all marketing info - ADMIN ONLY
    public shared query ({ caller }) func getAllMarketingInfo() : async [MarketingInfo] {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Runtime.trap("Unauthorized: Only admin can view marketing information");
        };
        marketingInfo.values().toArray();
    };

    // Admin functions for managing testimonials
    public shared ({ caller }) func addTestimonial(customerName : Text, review : Text) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Runtime.trap("Unauthorized: Only admin can add testimonials");
        };
        let id = customerName # Time.now().toText();
        let testimonial : Testimonial = {
            id;
            customerName;
            review;
            timestamp = Time.now();
        };
        testimonials.add(id, testimonial);
    };

    public shared ({ caller }) func removeTestimonial(id : Text) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Runtime.trap("Unauthorized: Only admin can remove testimonials");
        };
        testimonials.remove(id);
    };

    // Query all testimonials (public)
    public query func getTestimonials() : async [Testimonial] {
        testimonials.values().toArray();
    };

    // Admin functions for managing community posts
    public shared ({ caller }) func addCommunityPost(title : Text, content : Text, author : Text) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Runtime.trap("Unauthorized: Only admin can add community posts");
        };
        let id = title # Time.now().toText();
        let post : CommunityPost = {
            id;
            title;
            content;
            author;
            timestamp = Time.now();
        };
        communityPosts.add(id, post);
    };

    public shared ({ caller }) func removeCommunityPost(id : Text) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Runtime.trap("Unauthorized: Only admin can remove community posts");
        };
        communityPosts.remove(id);
    };

    // Query all community posts (public)
    public query func getCommunityPosts() : async [CommunityPost] {
        communityPosts.values().toArray();
    };

    // Email subscription function (public - no auth required)
    public shared func subscribeEmail(email : Text) : async Bool {
        let subscriber : EmailSubscriber = {
            email;
            timestamp = Time.now();
        };
        emailSubscribers.add(email, subscriber);
        true;
    };

    // Admin function to get all email subscribers
    public shared query ({ caller }) func getEmailSubscribers() : async [EmailSubscriber] {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Runtime.trap("Unauthorized: Only admin can view email subscribers");
        };
        emailSubscribers.values().toArray();
    };

    // Admin function to export email subscribers as CSV
    public shared query ({ caller }) func exportEmailSubscribersCSV() : async Text {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Runtime.trap("Unauthorized: Only admin can export email subscribers");
        };
        var csv = "Email,Timestamp\n";
        for ((email, subscriber) in emailSubscribers.entries()) {
            csv := csv # email # "," # subscriber.timestamp.toText() # "\n";
        };
        csv;
    };

    // Admin function to get subscriber count
    public shared query ({ caller }) func getSubscriberCount() : async Nat {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Runtime.trap("Unauthorized: Only admin can view subscriber count");
        };
        emailSubscribers.size();
    };

    // Contact submission function (public - anyone can submit)
    public shared func addContactSubmission(name : Text, email : Text, phone : Text, eventDate : Text, numChildren : Nat, message : Text) : async () {
        let id = email # Time.now().toText();
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
        contactSubmissions.add(id, submission);
    };

    // Get contact submissions - ADMIN ONLY
    public shared query ({ caller }) func getContactSubmissions() : async [ContactSubmission] {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Runtime.trap("Unauthorized: Only admin can view contact submissions");
        };
        contactSubmissions.values().toArray();
    };

    // Admin functions for managing birthday packages
    public shared ({ caller }) func addBirthdayPackage(name : Text, weekdayPrice : Nat, weekendPrice : Nat, includedChildren : Nat, additionalChildPrice : Nat, socksIncluded : Nat, roomTime : Text, description : Text) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Runtime.trap("Unauthorized: Only admin can add birthday packages");
        };
        let id = name # Time.now().toText();
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
        birthdayPackages.add(id, package);
    };

    public shared ({ caller }) func removeBirthdayPackage(id : Text) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Runtime.trap("Unauthorized: Only admin can remove birthday packages");
        };
        birthdayPackages.remove(id);
    };

    public query func getBirthdayPackages() : async [BirthdayPackage] {
        let packages = birthdayPackages.values().toArray();
        packages.sort<BirthdayPackage>(
            func(a, b) { Text.compare(a.name, b.name) },
        );
    };

    // Initialize default birthday packages if not present
    func initializeDefaultBirthdayPackages() {
        if (birthdayPackages.size() == 0) {
            let basicId = "basic_" # Time.now().toText();
            birthdayPackages.add(basicId, {
                id = basicId;
                name = "Basic Birthday Package";
                weekdayPrice = 165;
                weekendPrice = 255;
                includedChildren = 11;
                additionalChildPrice = 11;
                socksIncluded = 12;
                roomTime = "100 min";
                description = "Includes 11 passes + guest of honor, 12 socks, 100 min party room";
            });

            let plusId = "plus_" # Time.now().toText();
            birthdayPackages.add(plusId, {
                id = plusId;
                name = "Plus Birthday Package";
                weekdayPrice = 260;
                weekendPrice = 350;
                includedChildren = 20;
                additionalChildPrice = 11;
                socksIncluded = 21;
                roomTime = "100 min";
                description = "Includes 20 kids + guest of honor, 21 socks, 100 min party room";
            });
        };
    };

    initializeDefaultBirthdayPackages();

    // Translation management functions

    public shared ({ caller }) func addOrUpdateTranslation(originalText : Text, translatedText : Text) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Runtime.trap("Unauthorized: Only admin can manage translations");
        };
        translations.add(originalText, { originalText; translatedText });
    };

    public query func getTranslation(originalText : Text) : async ?Text {
        switch (translations.get(originalText)) {
            case (?entry) ?entry.translatedText;
            case null null;
        };
    };

    public shared ({ caller }) func importTranslations(entries : [TranslationEntry]) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Runtime.trap("Unauthorized: Only admin can import translations");
        };
        for (entry in entries.values()) {
            translations.add(entry.originalText, entry);
        };
    };

    public query ({ caller }) func listTranslations() : async [TranslationEntry] {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Runtime.trap("Unauthorized: Only admin can view translations");
        };
        translations.values().toArray();
    };

    // Language preference management functions

    public shared ({ caller }) func setLanguagePreference(language : Text) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
            Runtime.trap("Unauthorized: Only authenticated users can set language preferences");
        };
        if (language != "en" and language != "es") {
            Runtime.trap("Invalid language: must be 'en' or 'es'");
        };
        languagePreferences.add(caller, { userId = caller; language });
    };

    public query ({ caller }) func getLanguagePreference() : async ?Text {
        if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
            return null;
        };
        switch (languagePreferences.get(caller)) {
            case (?preference) ?preference.language;
            case null null;
        };
    };

    public shared ({ caller }) func removeLanguagePreference() : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
            Runtime.trap("Unauthorized: Only authenticated users can remove language preferences");
        };
        languagePreferences.remove(caller);
    };

    public query ({ caller }) func listLanguagePreferences() : async [LanguagePreference] {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Runtime.trap("Unauthorized: Only admin can view all language preferences");
        };
        languagePreferences.values().toArray();
    };

    // EMPLOYEE CHECK-IN SYSTEM FUNCTIONS

    public shared func checkInWaiver(waiverId : Text) : async Nat {
        switch (waivers.get(waiverId)) {
            case (?waiver) {
                let updatedWaiver = { waiver with visitCount = waiver.visitCount + 1 };
                waivers.add(waiverId, updatedWaiver);
                updatedWaiver.visitCount;
            };
            case null {
                Runtime.trap("Waiver not found");
            };
        };
    };

    public query ({ caller }) func getWaiversWithVisitCounts() : async [UnifiedWaiverForm] {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Runtime.trap("Unauthorized: Only admin can view waivers with visit counts");
        };
        waivers.values().toArray();
    };

    // Unified search function for both waiver check and check-in (public)
    public query func unifiedWaiverSearch(searchTerm : Text) : async [UnifiedWaiverForm] {
        waivers.values().filter(func(waiver) {
            if (normalizedContains(waiver.parentName, searchTerm) or normalizePhoneNumber(waiver.parentPhone).contains(#text searchTerm)) {
                return true;
            };
            for (child in waiver.children.values()) {
                if (normalizedContains(child.name, searchTerm)) {
                    return true;
                };
            };
            false;
        }).toArray();
    };

    public query func getTotalCheckIns(waiverId : Text) : async Nat {
        switch (waivers.get(waiverId)) {
            case (?waiver) waiver.visitCount;
            case null Runtime.trap("Waiver not found");
        };
    };

    public query ({ caller }) func getCheckInStats() : async {
        totalCheckIns : Nat;
        frequentVisitors : [UnifiedWaiverForm];
    } {
        if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
            Runtime.trap("Unauthorized: Only admin can view check-in stats");
        };

        var totalCheckIns = 0;
        let frequentVisitors = List.empty<UnifiedWaiverForm>();

        for ((_, waiver) in waivers.entries()) {
            totalCheckIns += waiver.visitCount;
            if (waiver.visitCount > 5) {
                frequentVisitors.add(waiver);
            };
        };

        let sortedVisitors = frequentVisitors.toArray().sort(
            func(a, b) {
                if (a.visitCount > b.visitCount) { #less } else if (a.visitCount < b.visitCount) {
                    #greater;
                } else { #equal };
            },
        );

        { totalCheckIns; frequentVisitors = sortedVisitors };
    };
};
