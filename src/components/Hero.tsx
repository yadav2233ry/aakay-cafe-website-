import React from 'react';
import { Coffee, Clock, MapPin } from 'lucide-react';
import { BRAND_ASSETS } from '../data/cafeData';

interface HeroProps {
  onExploreMenu: () => void;
  onReserveTable: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onReserveTable }) => {
  return (
    <section id="hero" className="relative w-full overflow-hidden bg-[#251915] text-[#fdf9f1] pt-24 md:pt-28">
      {/* Atmospheric Ambient Visual Background */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity scale-105 transition-transform duration-1000 ease-out hover:scale-100 pointer-events-none">
        <img
          src={BRAND_ASSETS.heroBg}
          alt="AAKAY Artisanal Breakfast Spread and Café Scene"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#251915] via-[#251915]/85 to-[#251915]/60 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-radial from-transparent via-[#251915]/40 to-[#251915] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12 pt-12 pb-20 md:py-28 flex flex-col justify-between min-h-[82vh]">
        {/* Top Micro Callouts / Badges */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fdf9f1]/10 backdrop-blur-md text-[#ffdea5] text-[11px] font-semibold tracking-widest uppercase border border-[#ffdea5]/20">
            <span className="w-2 h-2 rounded-full bg-[#ffdea5] animate-ping" />
            100% Handcrafted
          </span>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fdf9f1]/10 backdrop-blur-md text-[#fdf9f1] text-[11px] font-semibold tracking-widest uppercase border border-[#fdf9f1]/20">
            <Coffee className="w-3.5 h-3.5 text-[#ffdea5]" />
            Artisanal Coffee & Kitchen
          </span>
        </div>

        {/* Center Master Editorial Copy */}
        <div className="max-w-3xl my-auto py-10 space-y-6">
          <p className="text-[#ffdea5] text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.25em]">
            Sanctuary of Taste • Established 2024
          </p>

          <h1 className="text-[#fdf9f1] font-serif text-[42px] sm:text-[56px] md:text-[68px] font-medium tracking-tight leading-[1.08]">
            Good Food.
            <br />
            <span className="italic font-normal text-[#fed488]">Great Moments.</span>
          </h1>

          <p className="text-[#dddad2] text-[15px] sm:text-[17px] md:text-[18px] max-w-xl leading-relaxed font-normal">
            Where handcrafted flavours, fresh ingredients, and warm moments come together. Savor slow-poured micro roasts, crusty sourdough, and culinary poise.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              onClick={onExploreMenu}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#775a19] text-[#ffffff] text-[12px] md:text-[13px] font-semibold uppercase tracking-wider shadow-lg hover:bg-[#ffdea5] hover:text-[#261900] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              Explore Menu
            </button>
            <button
              onClick={onReserveTable}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#fdf9f1]/10 hover:bg-[#fdf9f1]/20 text-[#fdf9f1] border border-[#fdf9f1]/25 backdrop-blur-md text-[12px] md:text-[13px] font-semibold uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              Reserve a Table
            </button>
          </div>
        </div>

        {/* Quick Operational Marquee Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[#e6e2da] text-[13px]">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#ffdea5]" />
              <span className="font-medium">Daily: 10:00 AM – 11:00 PM</span>
            </div>
            <div className="hidden sm:flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#ffdea5]" />
              <span className="font-medium">City Centre Quarter</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-widest text-[#dddad2]">
            <span>Organic Roast</span>
            <span className="text-[#ffdea5]">•</span>
            <span>Bespoke Bakery</span>
            <span className="text-[#ffdea5]">•</span>
            <span>Gourmet Kitchen</span>
          </div>
        </div>
      </div>
    </section>
  );
};
