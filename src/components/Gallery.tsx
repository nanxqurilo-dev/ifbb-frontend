'use client';

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

interface ImageData {
  _id: string;
  imageUrl: string;
  publicId: string;
  createdAt: string;
}

export default function Gallery() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({});

  const API_URL = "https://api.ifbb.qurilo.com/api/gallery";

  // Fetch images from API
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        if (response.data.success && response.data.images) {
          setImages(response.data.images);
        }
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      
      if (e.key === "Escape") {
        setIsModalOpen(false);
      } else if (e.key === "ArrowRight") {
        setActiveIndex((i) => (i + 1) % images.length);
      } else if (e.key === "ArrowLeft") {
        setActiveIndex((i) => (i - 1 + images.length) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isModalOpen, images.length]);

  const goNext = () => setActiveIndex((i) => (i + 1) % images.length);
  const goPrev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);

  const active = images[activeIndex];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading Gallery...</p>
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <p className="text-gray-300 text-lg">No images available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Masonry Grid Gallery */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {images.map((img, idx) => (
            <div
              key={img._id}
              className="group relative overflow-hidden rounded cursor-pointer break-inside-avoid"
              onClick={() => {
                setActiveIndex(idx);
                setIsModalOpen(true);
              }}
            >
              {/* Gradient Border Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10"></div>

              {/* Image Container */}
              <div className="relative bg-slate-900 rounded overflow-hidden  transition-all duration-500">
                {!imageLoaded[img._id] && (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 animate-pulse z-10"></div>
                )}

                <img
                  src={img.imageUrl}
                  alt="Gallery"
                  loading="lazy"
                  onLoad={() => setImageLoaded((prev) => ({ ...prev, [img._id]: true }))}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* View Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="bg-white/20 backdrop-blur-md p-5 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isModalOpen && active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg p-4 animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-6xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-12 right-0 z-20 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full p-3 shadow-xl transition-all duration-300 border border-white/20"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Previous Button */}
            <button
              onClick={goPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full p-4 shadow-xl transition-all duration-300 border border-white/20 -translate-x-16 hover:scale-110"
              aria-label="Previous"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={goNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full p-4 shadow-xl transition-all duration-300 border border-white/20 translate-x-16 hover:scale-110"
              aria-label="Next"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Container */}
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <div className="flex items-center justify-center p-8 max-h-[80vh] overflow-auto">
                <img
                  src={active.imageUrl}
                  alt="Gallery"
                  className="max-h-full max-w-full object-contain rounded-2xl shadow-2xl"
                />
              </div>
            </div>

            {/* Counter */}
            <div className="mt-6 flex justify-center">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2">
                <span className="text-white font-bold text-lg">{activeIndex + 1}</span>
                <span className="text-gray-400">/</span>
                <span className="text-white font-bold text-lg">{images.length}</span>
              </div>
            </div>

            {/* Keyboard Hints */}
            <div className="mt-6 flex justify-center gap-4 text-xs text-gray-400">
              <span className="bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">← → Navigate</span>
              <span className="bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">ESC Close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}