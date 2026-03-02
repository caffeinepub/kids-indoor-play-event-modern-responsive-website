import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useGetGalleryImages } from '../hooks/useQueries';
import { getFileUrlSync } from '../file-storage/FileList';
import GalleryLightbox from './GalleryLightbox';

export default function Gallery() {
  const { data: galleryImages = [], isLoading } = useGetGalleryImages();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Helper to normalize image URLs
  const normalizeImageUrl = (url: string): string => {
    // If it's an absolute URL (http:// or https://), use as-is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    // If it's a static asset path (/images/...), use as-is
    if (url.startsWith('/images/')) {
      return url;
    }
    
    // Otherwise, treat as canister file path and use getFileUrlSync
    return getFileUrlSync(url);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Camera className="w-12 h-12 text-purple-600" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Play Area Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See the fun and excitement at KIDS Indoor Play & Event
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading gallery images...</p>
          </div>
        ) : galleryImages.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative break-inside-avoid rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 bg-white cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={normalizeImageUrl(image.url)}
                  alt={image.description || 'Play area photo'}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Ctext fill="%239ca3af" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="16"%3EImage Not Available%3C/text%3E%3C/svg%3E';
                    target.onerror = null;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm font-medium line-clamp-2">
                      {image.description || 'Play Area Gallery'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="break-inside-avoid aspect-[4/3] bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center hover:shadow-xl transition-shadow border border-gray-200"
              >
                <div className="text-center">
                  <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">Photo {item}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-gray-600 text-lg">
            Visit us to experience the fun in person! Follow us on social media for more photos and updates.
          </p>
        </div>
      </div>

      {/* Lightbox overlay */}
      {lightboxOpen && galleryImages.length > 0 && (
        <GalleryLightbox
          images={galleryImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
          normalizeUrl={normalizeImageUrl}
        />
      )}
    </section>
  );
}
