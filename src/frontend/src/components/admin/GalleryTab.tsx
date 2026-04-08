import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Image as ImageIcon, Loader2, Trash2, Upload } from "lucide-react";
import { useState } from "react";
import {
  useAddGalleryImage,
  useFileDelete,
  useFileList,
  useFileUpload,
  useGetGalleryImages,
  useRemoveGalleryImage,
} from "../../hooks/useQueries";

export default function GalleryTab() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const { data: galleryImages = [], isLoading: galleryLoading } =
    useGetGalleryImages();
  const { data: fileList = [] } = useFileList();

  const fileUploadMutation = useFileUpload();
  const addGalleryImageMutation = useAddGalleryImage();
  const removeGalleryImageMutation = useRemoveGalleryImage();
  const fileDeleteMutation = useFileDelete();

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (JPG, PNG, GIF, or WEBP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB.");
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const timestamp = Date.now();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const path = `gallery/${timestamp}-${sanitizedName}`;

      // Step 1: Upload file bytes to backend storage (returns the public URL)
      const fileUrl = await fileUploadMutation.mutateAsync({
        path,
        file,
        onProgress: (pct) => setUploadProgress(pct),
      });

      // Step 2: Register the URL in the gallery registry so Gallery.tsx can fetch it
      const description = file.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[_-]/g, " ");

      await addGalleryImageMutation.mutateAsync({ url: fileUrl, description });

      setIsUploading(false);
      setUploadProgress(0);
      alert("Image uploaded successfully! It will now appear in the gallery.");
      event.target.value = "";
    } catch (error) {
      setIsUploading(false);
      setUploadProgress(0);
      const msg = error instanceof Error ? error.message : String(error);
      if (msg.includes("Unauthorized") || msg.toLowerCase().includes("admin")) {
        alert("Admin access required to upload images.");
      } else {
        alert(`Upload failed: ${msg}`);
      }
    }
  };

  const handleDeleteImage = async (imageId: string, imageUrl: string) => {
    if (!confirm("Delete this image from the gallery?")) return;

    try {
      // Step 1: Remove from gallery registry
      await removeGalleryImageMutation.mutateAsync(imageId);

      // Step 2: Remove the actual file from storage if it's a stored file
      if (imageUrl.includes("gallery/")) {
        const urlParts = imageUrl.split("/");
        const galleryIndex = urlParts.findIndex((p) => p === "gallery");
        if (galleryIndex !== -1 && galleryIndex < urlParts.length - 1) {
          const path = `gallery/${urlParts[galleryIndex + 1]}`;
          if (fileList.some((f) => f.path === path)) {
            await fileDeleteMutation.mutateAsync(path);
          }
        }
      }

      alert("Image deleted successfully.");
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      if (msg.includes("Unauthorized") || msg.toLowerCase().includes("admin")) {
        alert("Admin access required to delete images.");
      } else {
        alert(`Delete failed: ${msg}`);
      }
    }
  };

  const isDeletingAny =
    removeGalleryImageMutation.isPending || fileDeleteMutation.isPending;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gallery Management</CardTitle>
        <CardDescription>
          Upload and manage gallery images (JPG · PNG · GIF · WEBP · max 5 MB
          each)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload dropzone */}
        <div
          className="border-2 border-dashed rounded-xl p-8 space-y-4 bg-gray-50 hover:bg-gray-100 transition-colors"
          data-ocid="gallery-upload-zone"
        >
          <div className="text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-1">Upload New Image</h3>
            <p className="text-sm text-gray-500 mb-4">
              Select an image to add to your public gallery
            </p>
          </div>

          <Input
            id="galleryFileInput"
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="cursor-pointer"
            data-ocid="gallery-file-input"
          />

          {isUploading && (
            <div className="space-y-2 pt-1">
              <Progress value={uploadProgress} className="w-full" />
              <p className="text-sm text-center text-blue-600 font-medium">
                Uploading… {uploadProgress}%
              </p>
            </div>
          )}
        </div>

        {/* Gallery image grid */}
        {galleryLoading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-sm text-gray-500">Loading gallery images…</p>
          </div>
        ) : galleryImages.length > 0 ? (
          <>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">
                Gallery Images ({galleryImages.length})
              </h3>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              data-ocid="gallery-images-grid"
            >
              {galleryImages.map((image) => (
                <div
                  key={image.id}
                  className="border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Thumbnail */}
                  <div className="aspect-[4/3] bg-gray-100">
                    <img
                      src={image.url}
                      alt={image.description || "Gallery image"}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const t = e.target as HTMLImageElement;
                        t.src =
                          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Ctext fill="%239ca3af" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="14"%3EImage Not Available%3C/text%3E%3C/svg%3E';
                        t.onerror = null;
                      }}
                    />
                  </div>

                  {/* Caption + actions */}
                  <div className="p-3 space-y-2">
                    <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">
                      {image.description || "Gallery image"}
                    </p>
                    <Button
                      onClick={() => handleDeleteImage(image.id, image.url)}
                      disabled={isDeletingAny}
                      variant="destructive"
                      size="sm"
                      className="w-full"
                      data-ocid={`gallery-delete-${image.id}`}
                    >
                      {isDeletingAny ? (
                        <>
                          <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                          Deleting…
                        </>
                      ) : (
                        <>
                          <Trash2 className="mr-2 h-3 w-3" />
                          Delete
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div
            className="flex flex-col items-center justify-center py-16 text-gray-400"
            data-ocid="gallery-empty-state"
          >
            <ImageIcon className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-lg font-medium text-gray-500">
              No gallery images yet
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Upload your first image using the form above
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
