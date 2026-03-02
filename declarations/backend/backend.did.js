export const idlFactory = ({ IDL }) => {
  const FileMetadata = IDL.Record({
    'path' : IDL.Text,
    'size' : IDL.Nat,
    'mimeType' : IDL.Text,
  });
  const MarketingInfo = IDL.Record({
    'name' : IDL.Text,
    'email' : IDL.Text,
    'timestamp' : IDL.Int,
    'phone' : IDL.Text,
  });
  const Child = IDL.Record({
    'name' : IDL.Text,
    'birthday' : IDL.Opt(IDL.Text),
  });
  const WaiverForm = IDL.Record({
    'id' : IDL.Text,
    'parentEmail' : IDL.Text,
    'parentPhone' : IDL.Text,
    'children' : IDL.Vec(Child),
    'termsAndConditions' : IDL.Text,
    'agreeTerms' : IDL.Bool,
    'timestamp' : IDL.Int,
    'parentName' : IDL.Text,
  });
  const CommunityPost = IDL.Record({
    'id' : IDL.Text,
    'title' : IDL.Text,
    'content' : IDL.Text,
    'author' : IDL.Text,
    'timestamp' : IDL.Int,
  });
  const UserProfile = IDL.Record({ 'name' : IDL.Text });
  const Time = IDL.Int;
  const EmailSubscriber = IDL.Record({
    'email' : IDL.Text,
    'timestamp' : Time,
  });
  const GalleryImage = IDL.Record({
    'id' : IDL.Text,
    'url' : IDL.Text,
    'description' : IDL.Text,
    'timestamp' : IDL.Int,
  });
  const Testimonial = IDL.Record({
    'id' : IDL.Text,
    'customerName' : IDL.Text,
    'review' : IDL.Text,
    'timestamp' : IDL.Int,
  });
  const VlogVideo = IDL.Record({
    'id' : IDL.Text,
    'url' : IDL.Text,
    'title' : IDL.Text,
    'description' : IDL.Text,
    'timestamp' : IDL.Int,
  });
  const WebsiteContent = IDL.Record({
    'homepageText' : IDL.Text,
    'contactInfo' : IDL.Text,
    'pricingText' : IDL.Text,
    'packagesText' : IDL.Text,
    'aboutText' : IDL.Text,
  });
  const StreamingToken = IDL.Record({
    'resource' : IDL.Text,
    'index' : IDL.Nat,
  });
  const StreamingCallbackHttpResponse = IDL.Record({
    'token' : IDL.Opt(StreamingToken),
    'body' : IDL.Vec(IDL.Nat8),
  });
  const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
  const HttpRequest = IDL.Record({
    'url' : IDL.Text,
    'method' : IDL.Text,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
  });
  const StreamingCallback = IDL.Func(
      [StreamingToken],
      [StreamingCallbackHttpResponse],
      ['query'],
    );
  const StreamingStrategy = IDL.Variant({
    'Callback' : IDL.Record({
      'token' : StreamingToken,
      'callback' : StreamingCallback,
    }),
  });
  const HttpResponse = IDL.Record({
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
    'streaming_strategy' : IDL.Opt(StreamingStrategy),
    'status_code' : IDL.Nat16,
  });
  const http_header = IDL.Record({ 'value' : IDL.Text, 'name' : IDL.Text });
  const http_request_result = IDL.Record({
    'status' : IDL.Nat,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(http_header),
  });
  const TransformationInput = IDL.Record({
    'context' : IDL.Vec(IDL.Nat8),
    'response' : http_request_result,
  });
  const TransformationOutput = IDL.Record({
    'status' : IDL.Nat,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(http_header),
  });
  return IDL.Service({
    'addCommunityPost' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [], []),
    'addGalleryImage' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'addTestimonial' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'addVlogVideo' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [], []),
    'exportEmailSubscribersCSV' : IDL.Func([], [IDL.Text], []),
    'fileDelete' : IDL.Func([IDL.Text], [], []),
    'fileList' : IDL.Func([], [IDL.Vec(FileMetadata)], ['query']),
    'fileUpload' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Vec(IDL.Nat8), IDL.Bool],
        [],
        [],
      ),
    'getAllMarketingInfo' : IDL.Func([], [IDL.Vec(MarketingInfo)], ['query']),
    'getAllWaivers' : IDL.Func([], [IDL.Vec(WaiverForm)], ['query']),
    'getCommunityPosts' : IDL.Func([], [IDL.Vec(CommunityPost)], ['query']),
    'getCurrentUserProfile' : IDL.Func([], [IDL.Opt(UserProfile)], ['query']),
    'getEmailSubscribers' : IDL.Func([], [IDL.Vec(EmailSubscriber)], []),
    'getGalleryImages' : IDL.Func([], [IDL.Vec(GalleryImage)], ['query']),
    'getNewWaivers' : IDL.Func([IDL.Int], [IDL.Vec(WaiverForm)], ['query']),
    'getSubscriberCount' : IDL.Func([], [IDL.Nat], []),
    'getTestimonials' : IDL.Func([], [IDL.Vec(Testimonial)], ['query']),
    'getVlogVideos' : IDL.Func([], [IDL.Vec(VlogVideo)], ['query']),
    'getWebsiteContent' : IDL.Func([], [IDL.Opt(WebsiteContent)], ['query']),
    'httpStreamingCallback' : IDL.Func(
        [StreamingToken],
        [StreamingCallbackHttpResponse],
        ['query'],
      ),
    'http_request' : IDL.Func([HttpRequest], [HttpResponse], ['query']),
    'importWaiversFromCSV' : IDL.Func([IDL.Text], [IDL.Text], []),
    'initializeAuth' : IDL.Func([], [], []),
    'isCurrentUserAdmin' : IDL.Func([], [IDL.Bool], ['query']),
    'removeCommunityPost' : IDL.Func([IDL.Text], [], []),
    'removeGalleryImage' : IDL.Func([IDL.Text], [], []),
    'removeTestimonial' : IDL.Func([IDL.Text], [], []),
    'removeVlogVideo' : IDL.Func([IDL.Text], [], []),
    'saveCurrentUserProfile' : IDL.Func([UserProfile], [], []),
    'searchWaivers' : IDL.Func([IDL.Text], [IDL.Vec(WaiverForm)], ['query']),
    'submitWaiver' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Vec(Child), IDL.Bool, IDL.Text],
        [IDL.Text],
        [],
      ),
    'subscribeEmail' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'transform' : IDL.Func(
        [TransformationInput],
        [TransformationOutput],
        ['query'],
      ),
    'updateWebsiteContent' : IDL.Func([WebsiteContent], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
