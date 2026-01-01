"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Camera, Upload, X, Download, ChevronLeft, ChevronRight, User, Loader2, Trash2, ArrowUpDown } from "lucide-react";
import Image from "next/image";

const PHOTOS_PER_PAGE = 24;

interface Photo {
  id: string;
  created_at: string | null;
  uploaded_by: string;
  caption: string | null;
  storage_path: string;
  width: number | null;
  height: number | null;
  url?: string;
}

type SortOrder = "newest" | "oldest";

export default function LiveMomentsPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [lightboxClosing, setLightboxClosing] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [guestName, setGuestName] = useState("");
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [hasMore, setHasMore] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  // Add URLs to photos
  const addUrlsToPhotos = useCallback((data: Photo[]) => {
    return data.map((photo) => {
      const { data: urlData } = supabase.storage
        .from("photos")
        .getPublicUrl(photo.storage_path);
      return { ...photo, url: urlData.publicUrl };
    });
  }, [supabase]);

  // Load photos (initial load)
  const loadPhotos = useCallback(async (reset = true) => {
    if (reset) {
      setLoading(true);
      setPhotos([]);
    }

    // Get total count first
    const { count } = await supabase
      .from("photos")
      .select("*", { count: "exact", head: true });
    
    setTotalCount(count || 0);

    const { data, error } = await supabase
      .from("photos")
      .select("*")
      .order("created_at", { ascending: sortOrder === "oldest" })
      .range(0, PHOTOS_PER_PAGE - 1);

    if (error) {
      console.log("Photos not available:", error.message);
      setPhotos([]);
      setLoading(false);
      setHasMore(false);
      return;
    }

    const photosWithUrls = addUrlsToPhotos(data || []);
    setPhotos(photosWithUrls);
    setHasMore((data?.length || 0) >= PHOTOS_PER_PAGE);
    setLoading(false);
  }, [supabase, sortOrder, addUrlsToPhotos]);

  // Load more photos (pagination)
  const loadMorePhotos = async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    const startIndex = photos.length;

    const { data, error } = await supabase
      .from("photos")
      .select("*")
      .order("created_at", { ascending: sortOrder === "oldest" })
      .range(startIndex, startIndex + PHOTOS_PER_PAGE - 1);

    if (error) {
      console.error("Error loading more photos:", error);
      setLoadingMore(false);
      return;
    }

    const photosWithUrls = addUrlsToPhotos(data || []);
    setPhotos((prev) => [...prev, ...photosWithUrls]);
    setHasMore((data?.length || 0) >= PHOTOS_PER_PAGE);
    setLoadingMore(false);
  };

  useEffect(() => {
    loadPhotos(true);
  }, [loadPhotos]);

  // Disable body scroll when lightbox or upload modal is open
  useEffect(() => {
    if (selectedPhoto || showUploadModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedPhoto, showUploadModal]);

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"));
  };

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setShowUploadModal(true);
    }
  };

  // Compress and resize image before upload
  const compressImage = (file: File, maxSize = 2048, quality = 0.95): Promise<{ blob: Blob; width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = document.createElement("img");
      img.onload = () => {
        let { width, height } = img;
        
        // Calculate new dimensions while maintaining aspect ratio
        if (width > maxSize || height > maxSize) {
          if (width > height) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          } else {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }

        // Create canvas and draw resized image
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Convert to blob with compression
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve({ blob, width, height });
            } else {
              reject(new Error("Could not compress image"));
            }
          },
          "image/jpeg",
          quality
        );

        URL.revokeObjectURL(img.src);
      };
      img.onerror = () => reject(new Error("Could not load image"));
      img.src = URL.createObjectURL(file);
    });
  };

  // Upload photo
  const handleUpload = async () => {
    if (!selectedFile || !guestName.trim()) return;

    setUploading(true);
    try {
      // Compress image before upload (max 2048px, 95% quality)
      const { blob: compressedBlob, width, height } = await compressImage(selectedFile, 2048, 0.95);
      
      // Create unique filename (always .jpg since we convert to JPEG)
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;

      // Upload compressed image to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("photos")
        .upload(fileName, compressedBlob, {
          contentType: "image/jpeg",
        });

      if (uploadError) throw uploadError;

      // Insert record into photos table
      const { error: dbError } = await supabase.from("photos").insert({
        uploaded_by: guestName.trim(),
        caption: caption.trim() || null,
        storage_path: fileName,
        width,
        height,
      });

      if (dbError) throw dbError;

      // Reset form and reload photos
      setShowUploadModal(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      setGuestName("");
      setCaption("");
      loadPhotos(true);
    } catch (error) {
      console.error("Error uploading photo:", error);
      alert("Failed to upload photo. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Download photo
  const handleDownload = async (photo: Photo) => {
    if (!photo.url || downloading) return;
    
    setDownloading(true);
    try {
      const response = await fetch(photo.url);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `natalie-james-wedding-${photo.id}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading photo:", error);
    } finally {
      setDownloading(false);
    }
  };

  // Delete photo
  const handleDeleteClick = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      // Reset after 3 seconds if not confirmed
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }
    // Actually delete
    performDelete();
  };

  const performDelete = async () => {
    if (!selectedPhoto) return;
    
    setDeleting(true);
    setConfirmDelete(false);
    try {
      // Delete from database first
      const { error: dbError } = await supabase
        .from("photos")
        .delete()
        .eq("id", selectedPhoto.id);

      if (dbError) {
        console.error("Database delete error:", dbError);
        throw new Error(`Database error: ${dbError.message}`);
      }

      // Then delete from storage (non-blocking, log errors but don't fail)
      const { error: storageError } = await supabase.storage
        .from("photos")
        .remove([selectedPhoto.storage_path]);

      if (storageError) {
        console.error("Storage delete error (non-critical):", storageError);
      }

      // Close lightbox and reload photos
      setSelectedPhoto(null);
      loadPhotos(true);
    } catch (error) {
      console.error("Error deleting photo:", error);
      alert(error instanceof Error ? error.message : "Failed to delete photo. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  // Close lightbox with animation
  const closeLightbox = () => {
    setLightboxClosing(true);
    setConfirmDelete(false);
    setTimeout(() => {
      setSelectedPhoto(null);
      setLightboxClosing(false);
    }, 200);
  };

  // Navigate lightbox
  const navigateLightbox = (direction: "prev" | "next") => {
    if (!selectedPhoto) return;
    setConfirmDelete(false); // Reset confirm state when navigating
    const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);
    const newIndex = direction === "prev" 
      ? (currentIndex - 1 + photos.length) % photos.length
      : (currentIndex + 1) % photos.length;
    setSelectedPhoto(photos[newIndex]);
  };

  // Close modal
  const closeUploadModal = () => {
    setShowUploadModal(false);
    setSelectedFile(null);
    setPreviewUrl(null);
    setCaption("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  return (
    <div 
      className="min-h-screen px-6 pt-28 pb-16"
      style={{
        backgroundImage: "url('/Fabric Texture Background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Content card with backdrop */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-5xl text-[var(--color-charcoal)] mb-4">
              Live Moments
            </h1>
            <div className="floral-divider w-24 mx-auto mb-6"></div>
            <p className="text-[var(--color-warm-gray)] leading-relaxed max-w-xl mx-auto">
              Share your favourite moments from the lead up to and during our special day. 
              Snap a photo or upload from your gallery!
            </p>
          </div>

          {/* Upload Buttons - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            {/* Camera Capture */}
            <button
              onClick={() => cameraInputRef.current?.click()}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-[var(--color-dusty-blue)] text-white rounded-xl hover:bg-[var(--color-slate-blue)] transition-colors font-medium"
            >
              <Camera className="w-5 h-5" />
              Take Photo
            </button>
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Gallery Upload */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-[var(--color-dusty-rose)] text-[var(--color-dusty-rose)] rounded-xl hover:bg-[var(--color-dusty-rose)]/10 transition-colors font-medium"
            >
              <Upload className="w-5 h-5" />
              Upload Photo
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
        </div>

          {/* Photo Gallery */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[var(--color-dusty-blue)]" />
            </div>
          ) : photos.length === 0 ? (
            <div className="text-center py-16 bg-[var(--color-cream)]/60 rounded-xl border border-[var(--color-champagne)]">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[var(--color-champagne)] flex items-center justify-center">
                <Camera className="w-10 h-10 text-[var(--color-dusty-blue)]" />
              </div>
              <p className="text-[var(--color-warm-gray)] text-lg mb-2">No photos yet!</p>
              <p className="text-[var(--color-text-light)] text-sm">
                Be the first to share a moment.
              </p>
            </div>
          ) : (
            <div className="bg-[var(--color-cream)]/60 rounded-xl p-4 md:p-6 border border-[var(--color-champagne)]">
              {/* Gallery Header with count and sort */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-[var(--color-warm-gray)] text-sm">
                  {totalCount} {totalCount === 1 ? "photo" : "photos"} shared
                </p>
                <button
                  onClick={toggleSortOrder}
                  className="flex items-center gap-1.5 text-sm text-[var(--color-dusty-blue)] hover:text-[var(--color-slate-blue)] transition-colors"
                >
                  <ArrowUpDown className="w-4 h-4" />
                  {sortOrder === "newest" ? "Newest first" : "Oldest first"}
                </button>
              </div>

              {/* Photo Grid */}
              <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="mb-3 md:mb-4 break-inside-avoid cursor-pointer group"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <div className="relative overflow-hidden rounded-xl bg-[var(--color-light-gray)]">
                      {photo.url && (
                        <Image
                          src={photo.url}
                          alt={photo.caption || "Wedding moment"}
                          width={photo.width || 400}
                          height={photo.height || 400}
                          className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <p className="text-white text-sm font-medium truncate">
                            {photo.uploaded_by}
                          </p>
                          {photo.caption && (
                            <p className="text-white/80 text-xs truncate">{photo.caption}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="mt-6 text-center">
                  <button
                    onClick={loadMorePhotos}
                    disabled={loadingMore}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-dusty-blue)]/10 text-[var(--color-dusty-blue)] rounded-lg hover:bg-[var(--color-dusty-blue)]/20 transition-colors font-medium disabled:opacity-50"
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>Load More Photos</>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl text-[var(--color-charcoal)]">Share Your Moment</h2>
                <button
                  onClick={closeUploadModal}
                  className="p-2 hover:bg-[var(--color-light-gray)] rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-[var(--color-warm-gray)]" />
                </button>
              </div>

              {/* Preview */}
              {previewUrl && (
                <div className="relative mb-4 rounded-xl overflow-hidden bg-[var(--color-light-gray)]">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    width={400}
                    height={400}
                    className="w-full h-auto max-h-64 object-contain"
                  />
                </div>
              )}

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-1">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-warm-gray)]" />
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full pl-10 pr-4 py-3 border border-[var(--color-light-gray)] rounded-lg focus:ring-2 focus:ring-[var(--color-dusty-blue)] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-1">
                    Caption (optional)
                  </label>
                  <input
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Add a caption..."
                    className="w-full px-4 py-3 border border-[var(--color-light-gray)] rounded-lg focus:ring-2 focus:ring-[var(--color-dusty-blue)] focus:border-transparent outline-none transition-all"
                  />
                </div>

                <button
                  onClick={handleUpload}
                  disabled={uploading || !guestName.trim()}
                  className="w-full py-3 bg-[var(--color-dusty-blue)] text-white rounded-lg hover:bg-[var(--color-slate-blue)] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Share Photo
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {selectedPhoto && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-200 ${
            lightboxClosing 
              ? "bg-black/0 backdrop-blur-none" 
              : "bg-black/80 backdrop-blur-md animate-in fade-in"
          }`}
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className={`absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-all z-10 ${
              lightboxClosing ? "opacity-0" : "opacity-100"
            }`}
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation arrows */}
          {photos.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox("prev");
                }}
                className="absolute left-4 p-2 text-white/80 hover:text-white transition-colors z-10"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox("next");
                }}
                className="absolute right-4 p-2 text-white/80 hover:text-white transition-colors z-10"
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            </>
          )}

          {/* Photo */}
          <div 
            className={`max-w-5xl max-h-[85vh] px-4 relative z-20 transition-all duration-200 ${
              lightboxClosing 
                ? "opacity-0 scale-95" 
                : "opacity-100 scale-100"
            }`}
            style={{
              animation: lightboxClosing ? undefined : "lightboxIn 0.2s ease-out"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {selectedPhoto.url && (
              <Image
                src={selectedPhoto.url}
                alt={selectedPhoto.caption || "Wedding moment"}
                width={selectedPhoto.width || 800}
                height={selectedPhoto.height || 800}
                className="max-h-[75vh] w-auto mx-auto object-contain rounded-lg"
              />
            )}
            
            {/* Photo info */}
            <div className="mt-4 flex items-center justify-between text-white">
              <div>
                <p className="font-medium">{selectedPhoto.uploaded_by}</p>
                {selectedPhoto.caption && (
                  <p className="text-white/70 text-sm mt-1">{selectedPhoto.caption}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(selectedPhoto);
                  }}
                  disabled={downloading}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
                >
                  {downloading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Download className="w-5 h-5" />
                  )}
                  {downloading ? "Downloading..." : "Download"}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick();
                  }}
                  disabled={deleting}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 ${
                    confirmDelete 
                      ? "bg-red-600 hover:bg-red-700" 
                      : "bg-white/10 hover:bg-red-500/80"
                  }`}
                >
                  {deleting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Trash2 className="w-5 h-5" />
                  )}
                  {deleting ? "Deleting..." : confirmDelete ? "Confirm?" : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
