import React, { useState } from 'react';
import { Maximize2, X, Sparkles } from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/cafeData';
import { GalleryPhoto } from '../types/cafe';

export const GallerySection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  return (
    <section id="gallery" className="w-full py-20 md:py-28 bg-[#f7f3eb]">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[12px] md:text-[13px] text-[#775a19] uppercase tracking-[0.25em] font-bold">
              Atmospheric Moments
            </span>
            <h2 className="font-serif text-[34px] sm:text-[42px] text-[#1c1c17] font-semibold tracking-tight">
              The AAKAY Journal
            </h2>
          </div>
          <p className="text-[14px] md:text-[15px] text-[#4f4542] max-w-md">
            A glimpse into the aromas, conversations, and culinary craft unfolding every morning and night.
          </p>
        </div>

        {/* Editorial Mosaic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {GALLERY_PHOTOS.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className={`${photo.colSpanDesktop} group relative ${photo.heightClass} rounded-2xl overflow-hidden shadow-sm cursor-pointer bg-[#251915]`}
            >
              <img
                src={photo.imageUrl}
                alt={photo.subtitle}
                className="w-full h-full object-cover transform duration-700 group-hover:scale-105 opacity-95 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#251915]/85 via-[#251915]/25 to-transparent transition-opacity group-hover:from-[#251915]/90" />

              {/* Hover expand hint icon */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-md rounded-full p-2 text-white">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Bottom text overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-[#fdf9f1] space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-widest font-semibold text-[#ffdea5]">
                    {photo.title}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 text-white backdrop-blur-sm">
                    {photo.tag}
                  </span>
                </div>
                <p className="font-serif text-[18px] sm:text-[20px] md:text-[22px] leading-snug">
                  {photo.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-[#1c1c17] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row">
            {/* Image */}
            <div className="md:w-3/5 h-72 sm:h-96 md:h-auto relative bg-black">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.subtitle}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content side */}
            <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between text-[#fdf9f1] bg-[#251915]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#ffdea5] uppercase tracking-widest font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {selectedPhoto.tag}
                  </span>
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    aria-label="Close image"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="font-serif text-[24px] sm:text-[28px] font-medium leading-snug">
                  {selectedPhoto.subtitle}
                </h3>

                <p className="text-[14px] text-[#dddad2] leading-relaxed">
                  {selectedPhoto.story}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between">
                <span className="text-[12px] text-[#ffdea5] tracking-wide font-sans uppercase">
                  AAKAY Visual Collection
                </span>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="px-4 py-2 rounded-full bg-[#775a19] text-white text-[12px] font-semibold uppercase tracking-wider hover:bg-[#ffdea5] hover:text-[#251915] transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
