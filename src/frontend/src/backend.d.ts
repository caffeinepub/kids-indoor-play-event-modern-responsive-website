import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type HeaderField = [string, string];
export interface EmailSubscriber {
    email: string;
    timestamp: Time;
}
export type Time = bigint;
export interface FileMetadata {
    path: string;
    size: bigint;
    mimeType: string;
}
export interface ContactSubmission {
    id: string;
    name: string;
    numChildren: bigint;
    email: string;
    message: string;
    timestamp: bigint;
    phone: string;
    eventDate: string;
}
export interface StreamingToken {
    resource: string;
    index: bigint;
}
export interface StreamingCallbackHttpResponse {
    token?: StreamingToken;
    body: Uint8Array;
}
export type StreamingCallback = (arg0: StreamingToken) => Promise<StreamingCallbackHttpResponse>;
export interface TranslationEntry {
    originalText: string;
    translatedText: string;
}
export interface CommunityPost {
    id: string;
    title: string;
    content: string;
    author: string;
    timestamp: bigint;
}
export type StreamingStrategy = {
    __kind__: "Callback";
    Callback: {
        token: StreamingToken;
        callback: [Principal, string];
    };
};
export interface Child {
    name: string;
    birthday?: string;
}
export interface GalleryImage {
    id: string;
    url: string;
    description: string;
    timestamp: bigint;
}
export interface HttpResponse {
    body: Uint8Array;
    headers: Array<HeaderField>;
    streaming_strategy?: StreamingStrategy;
    status_code: number;
}
export interface UnifiedWaiverForm {
    id: string;
    parentEmail: string;
    agreeUnifiedTerms: boolean;
    visitCount: bigint;
    parentPhone: string;
    children: Array<Child>;
    termsAndConditions: string;
    timestamp: bigint;
    parentName: string;
}
export interface BirthdayPackage {
    id: string;
    additionalChildPrice: bigint;
    socksIncluded: bigint;
    weekendPrice: bigint;
    weekdayPrice: bigint;
    name: string;
    includedChildren: bigint;
    description: string;
    roomTime: string;
}
export interface LanguagePreference {
    userId: Principal;
    language: string;
}
export interface MarketingInfo {
    name: string;
    email: string;
    timestamp: bigint;
    phone: string;
}
export interface WebsiteContent {
    homepageText: string;
    contactInfo: string;
    aboutText: string;
    operatingHours: string;
}
export interface HttpRequest {
    url: string;
    method: string;
    body: Uint8Array;
    headers: Array<HeaderField>;
}
export interface UserProfile {
    name: string;
}
export interface Testimonial {
    id: string;
    customerName: string;
    review: string;
    timestamp: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addBirthdayPackage(name: string, weekdayPrice: bigint, weekendPrice: bigint, includedChildren: bigint, additionalChildPrice: bigint, socksIncluded: bigint, roomTime: string, description: string): Promise<void>;
    addCommunityPost(title: string, content: string, author: string): Promise<void>;
    addContactSubmission(name: string, email: string, phone: string, eventDate: string, numChildren: bigint, message: string): Promise<void>;
    addGalleryImage(url: string, description: string): Promise<void>;
    addOrUpdateTranslation(originalText: string, translatedText: string): Promise<void>;
    addTestimonial(customerName: string, review: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    checkInWaiver(waiverId: string): Promise<bigint>;
    exportEmailSubscribersCSV(): Promise<string>;
    fileDelete(path: string): Promise<void>;
    fileList(): Promise<Array<FileMetadata>>;
    fileRequest(request: HttpRequest): Promise<HttpResponse>;
    fileUpload(path: string, contentType: string, content: Uint8Array, complete: boolean): Promise<void>;
    getAllMarketingInfo(): Promise<Array<MarketingInfo>>;
    getBirthdayPackages(): Promise<Array<BirthdayPackage>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCheckInStats(): Promise<{
        frequentVisitors: Array<UnifiedWaiverForm>;
        totalCheckIns: bigint;
    }>;
    getCommunityPosts(): Promise<Array<CommunityPost>>;
    getContactSubmissions(): Promise<Array<ContactSubmission>>;
    getEmailSubscribers(): Promise<Array<EmailSubscriber>>;
    getGalleryImages(): Promise<Array<GalleryImage>>;
    getLanguagePreference(): Promise<string | null>;
    getNewWaivers(sinceTimestamp: bigint): Promise<Array<UnifiedWaiverForm>>;
    getPredefinedGalleryImages(): Promise<Array<GalleryImage>>;
    getRecentWaivers(): Promise<Array<UnifiedWaiverForm>>;
    getSubscriberCount(): Promise<bigint>;
    getTestimonials(): Promise<Array<Testimonial>>;
    getTotalCheckIns(waiverId: string): Promise<bigint>;
    getTranslation(originalText: string): Promise<string | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWaiversWithVisitCounts(): Promise<Array<UnifiedWaiverForm>>;
    getWebsiteContent(): Promise<WebsiteContent>;
    httpStreamingCallback(token: StreamingToken): Promise<StreamingCallbackHttpResponse>;
    importTranslations(entries: Array<TranslationEntry>): Promise<void>;
    initializeAccessControl(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    listAllWaivers(): Promise<Array<UnifiedWaiverForm>>;
    listLanguagePreferences(): Promise<Array<LanguagePreference>>;
    listTranslations(): Promise<Array<TranslationEntry>>;
    removeBirthdayPackage(id: string): Promise<void>;
    removeCommunityPost(id: string): Promise<void>;
    removeGalleryImage(id: string): Promise<void>;
    removeLanguagePreference(): Promise<void>;
    removeTestimonial(id: string): Promise<void>;
    resetAdminAccess(): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchWaivers(searchTerm: string): Promise<Array<UnifiedWaiverForm>>;
    setLanguagePreference(language: string): Promise<void>;
    submitUnifiedWaiver(parentName: string, parentEmail: string, parentPhone: string, children: Array<Child>, agreeUnifiedTerms: boolean, termsAndConditions: string): Promise<string>;
    subscribeEmail(email: string): Promise<boolean>;
    unifiedWaiverSearch(searchTerm: string): Promise<Array<UnifiedWaiverForm>>;
    updateWebsiteContent(content: WebsiteContent): Promise<void>;
}
