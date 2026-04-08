import {
  CheckCircle,
  Copy,
  Facebook,
  Linkedin,
  MessageCircle,
  Share2,
  Twitter,
} from "lucide-react";
import React from "react";

interface SocialShareProps {
  url?: string;
  title?: string;
  description?: string;
  hashtags?: string[];
  className?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({
  url = window.location.href,
  title = "KIDS Indoor Play & Event - Oklahoma City's Premier Indoor Playground",
  description = "Oklahoma City's best indoor playground for kids! Birthday parties, group events, and daily play for children 6 months-10 years. Safe, clean, and fun!",
  hashtags = ["IndoorPlayground", "OklahomaCity", "KidsParties", "FamilyFun"],
  className = "",
}) => {
  const [showCopySuccess, setShowCopySuccess] = React.useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const _hashtagString = hashtags.map((tag) => `#${tag}`).join(" ");

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${hashtags.join(",")}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], "_blank", "width=600,height=400");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setShowCopySuccess(true);
      setTimeout(() => setShowCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleNativeShare = async () => {
    if ("share" in navigator && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    }
  };

  // Check if Web Share API is supported
  const isWebShareSupported =
    "share" in navigator && typeof navigator.share === "function";

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <span className="text-sm font-medium text-gray-600 flex items-center">
        <Share2 className="w-4 h-4 mr-2" />
        Share:
      </span>

      <div className="flex space-x-2">
        <button
          type="button"
          onClick={() => handleShare("facebook")}
          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors transform hover:scale-110"
          title="Share on Facebook"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => handleShare("twitter")}
          className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors transform hover:scale-110"
          title="Share on Twitter"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => handleShare("linkedin")}
          className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors transform hover:scale-110"
          title="Share on LinkedIn"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => handleShare("whatsapp")}
          className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors transform hover:scale-110"
          title="Share on WhatsApp"
          aria-label="Share on WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleCopyLink}
          className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors transform hover:scale-110"
          title="Copy link"
          aria-label="Copy link to clipboard"
        >
          {showCopySuccess ? (
            <CheckCircle className="w-4 h-4 text-green-300" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>

        {isWebShareSupported && (
          <button
            type="button"
            onClick={handleNativeShare}
            className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors transform hover:scale-110"
            title="Share via device"
            aria-label="Share via device"
          >
            <Share2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {showCopySuccess && (
        <span className="text-xs text-green-600 font-medium animate-fade-in-up">
          Link copied!
        </span>
      )}
    </div>
  );
};

export default SocialShare;
