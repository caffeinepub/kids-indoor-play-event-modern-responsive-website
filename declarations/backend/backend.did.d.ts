import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Child { 'name' : string, 'birthday' : [] | [string] }
export interface CommunityPost {
  'id' : string,
  'title' : string,
  'content' : string,
  'author' : string,
  'timestamp' : bigint,
}
export interface EmailSubscriber { 'email' : string, 'timestamp' : Time }
export interface FileMetadata {
  'path' : string,
  'size' : bigint,
  'mimeType' : string,
}
export interface GalleryImage {
  'id' : string,
  'url' : string,
  'description' : string,
  'timestamp' : bigint,
}
export type HeaderField = [string, string];
export interface HttpRequest {
  'url' : string,
  'method' : string,
  'body' : Uint8Array | number[],
  'headers' : Array<HeaderField>,
}
export interface HttpResponse {
  'body' : Uint8Array | number[],
  'headers' : Array<HeaderField>,
  'streaming_strategy' : [] | [StreamingStrategy],
  'status_code' : number,
}
export interface MarketingInfo {
  'name' : string,
  'email' : string,
  'timestamp' : bigint,
  'phone' : string,
}
export type StreamingCallback = ActorMethod<
  [StreamingToken],
  StreamingCallbackHttpResponse
>;
export interface StreamingCallbackHttpResponse {
  'token' : [] | [StreamingToken],
  'body' : Uint8Array | number[],
}
export type StreamingStrategy = {
    'Callback' : { 'token' : StreamingToken, 'callback' : [Principal, string] }
  };
export interface StreamingToken { 'resource' : string, 'index' : bigint }
export interface Testimonial {
  'id' : string,
  'customerName' : string,
  'review' : string,
  'timestamp' : bigint,
}
export type Time = bigint;
export interface TransformationInput {
  'context' : Uint8Array | number[],
  'response' : http_request_result,
}
export interface TransformationOutput {
  'status' : bigint,
  'body' : Uint8Array | number[],
  'headers' : Array<http_header>,
}
export interface UserProfile { 'name' : string }
export interface VlogVideo {
  'id' : string,
  'url' : string,
  'title' : string,
  'description' : string,
  'timestamp' : bigint,
}
export interface WaiverForm {
  'id' : string,
  'parentEmail' : string,
  'parentPhone' : string,
  'children' : Array<Child>,
  'termsAndConditions' : string,
  'agreeTerms' : boolean,
  'timestamp' : bigint,
  'parentName' : string,
}
export interface WebsiteContent {
  'homepageText' : string,
  'contactInfo' : string,
  'pricingText' : string,
  'packagesText' : string,
  'aboutText' : string,
}
export interface http_header { 'value' : string, 'name' : string }
export interface http_request_result {
  'status' : bigint,
  'body' : Uint8Array | number[],
  'headers' : Array<http_header>,
}
export interface _SERVICE {
  'addCommunityPost' : ActorMethod<[string, string, string], undefined>,
  'addGalleryImage' : ActorMethod<[string, string], undefined>,
  'addTestimonial' : ActorMethod<[string, string], undefined>,
  'addVlogVideo' : ActorMethod<[string, string, string], undefined>,
  'exportEmailSubscribersCSV' : ActorMethod<[], string>,
  'fileDelete' : ActorMethod<[string], undefined>,
  'fileList' : ActorMethod<[], Array<FileMetadata>>,
  'fileUpload' : ActorMethod<
    [string, string, Uint8Array | number[], boolean],
    undefined
  >,
  'getAllMarketingInfo' : ActorMethod<[], Array<MarketingInfo>>,
  'getAllWaivers' : ActorMethod<[], Array<WaiverForm>>,
  'getCommunityPosts' : ActorMethod<[], Array<CommunityPost>>,
  'getCurrentUserProfile' : ActorMethod<[], [] | [UserProfile]>,
  'getEmailSubscribers' : ActorMethod<[], Array<EmailSubscriber>>,
  'getGalleryImages' : ActorMethod<[], Array<GalleryImage>>,
  'getNewWaivers' : ActorMethod<[bigint], Array<WaiverForm>>,
  'getSubscriberCount' : ActorMethod<[], bigint>,
  'getTestimonials' : ActorMethod<[], Array<Testimonial>>,
  'getVlogVideos' : ActorMethod<[], Array<VlogVideo>>,
  'getWebsiteContent' : ActorMethod<[], [] | [WebsiteContent]>,
  'httpStreamingCallback' : ActorMethod<
    [StreamingToken],
    StreamingCallbackHttpResponse
  >,
  'http_request' : ActorMethod<[HttpRequest], HttpResponse>,
  'importWaiversFromCSV' : ActorMethod<[string], string>,
  'initializeAuth' : ActorMethod<[], undefined>,
  'isCurrentUserAdmin' : ActorMethod<[], boolean>,
  'removeCommunityPost' : ActorMethod<[string], undefined>,
  'removeGalleryImage' : ActorMethod<[string], undefined>,
  'removeTestimonial' : ActorMethod<[string], undefined>,
  'removeVlogVideo' : ActorMethod<[string], undefined>,
  'saveCurrentUserProfile' : ActorMethod<[UserProfile], undefined>,
  'searchWaivers' : ActorMethod<[string], Array<WaiverForm>>,
  'submitWaiver' : ActorMethod<
    [string, string, string, Array<Child>, boolean, string],
    string
  >,
  'subscribeEmail' : ActorMethod<[string], boolean>,
  'transform' : ActorMethod<[TransformationInput], TransformationOutput>,
  'updateWebsiteContent' : ActorMethod<[WebsiteContent], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
