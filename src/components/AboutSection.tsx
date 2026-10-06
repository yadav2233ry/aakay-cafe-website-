import React from 'react';
import { Flame, CheckCircle2 } from 'lucide-react';
import { BRAND_ASSETS } from '../data/cafeData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="w-full py-20 md:py-32 bg-[#fdf9f1]">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Imagery Showcase with Overlapping Detail Cards */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full h-[440px] md:h-[540px] rounded-2xl overflow-hidden shadow-2xl bg-[#f1ede6]">
              <img
                src={BRAND_ASSETS.banquetteInterior}
                alt="Warm evening ambiance inside AAKAY Café & Kitchen"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#251915]/75 via-transparent to-transparent" />

              {/* In-Image Glass Pill */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[#fdf9f1] p-4 rounded-xl bg-[#e6e2da]/20 backdrop-blur-md border border-white/20">
                <div>
                  <p className="font-serif text-[19px] md:text-[21px] italic leading-tight">
                    The Evening Banquette
                  </p>
                  <p className="text-[12px] md:text-[13px] text-[#fdf9f1]/90 pt-0.5">
                    Botanical greens, brass accents, & exposed heritage brick
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#fed488]/20 flex items-center justify-center shrink-0">
                  <Flame className="w-5 h-5 text-[#ffdea5]" />
                </div>
              </div>
            </div>

            {/* Offset Floating Stat Card */}
            <div className="hidden sm:block absolute -bottom-7 -right-5 md:-right-8 bg-[#ffffff] p-6 rounded-2xl shadow-xl max-w-xs border border-[#e6e2da]/60">
              <div className="flex items-center gap-3.5 pb-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#fed488]/30 flex items-center justify-center text-[#775a19]">
                  <CheckCircle2 className="w-6 h-6 text-[#775a19]" />
                </div>
                <div>
                  <p className="font-serif text-[22px] font-bold text-[#1c1c17] leading-none">100%</p>
                  <p className="text-[11px] text-[#4f4542] uppercase tracking-wider font-semibold pt-1">
                    Scratch Prepared
                  </p>
                </div>
              </div>
              <p className="text-[13px] text-[#4f4542] leading-snug">
                Every sauce, brioche bun, and microfoam espresso poured fresh to order.
              </p>
            </div>
          </div>

          {/* Editorial Copy & Brand Pillars */}
          <div className="lg:col-span-6 space-y-6 lg:pl-4">
            <div className="space-y-2">
              <span className="text-[12px] md:text-[13px] text-[#775a19] uppercase tracking-[0.25em] font-bold">
                Our Philosophy
              </span>
              <h2 className="font-serif text-[34px] sm:text-[42px] md:text-[46px] text-[#1c1c17] font-semibold tracking-tight leading-tight">
                Welcome to <span className="italic font-normal">AAKAY</span>
              </h2>
              <p className="font-serif text-[20px] md:text-[22px] text-[#4f4542] italic">
                A Sanctuary for Food Lovers & Quiet Conversations
              </p>
            </div>

            <div className="space-y-4 text-[15px] md:text-[16px] text-[#4f4542] leading-relaxed">
              <p>
                Born from a quiet reverence for morning rituals and lingering evening banquets, AAKAY Café & Kitchen pairs gastronomic precision with the effortless comfort of an urban retreat.
              </p>
              <p>
                We source organic greens from regional homesteads, roast micro-lot beans under artisanal profiles, and shape buttery brioche loaves before the sun warms the city cobbles. Whether escaping for an unhurried pour-over with a journal or celebrating milestones over truffled sliders, your table is prepared with care.
              </p>
            </div>

            {/* Stat Badges Row */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 pt-3 text-left">
              <div className="p-4 md:p-5 rounded-2xl bg-[#f7f3eb] border border-[#e6e2da]/50 hover:border-[#775a19]/30 transition-colors">
                <p className="font-serif text-[24px] md:text-[28px] text-[#1c1c17] font-semibold">Est. ’24</p>
                <p className="text-[11px] text-[#775a19] uppercase tracking-wider font-semibold pt-1">
                  Heritage Roastery
                </p>
              </div>
              <div className="p-4 md:p-5 rounded-2xl bg-[#f7f3eb] border border-[#e6e2da]/50 hover:border-[#775a19]/30 transition-colors">
                <p className="font-serif text-[24px] md:text-[28px] text-[#1c1c17] font-semibold">100%</p>
                <p className="text-[11px] text-[#775a19] uppercase tracking-wider font-semibold pt-1">
                  Single Origin
                </p>
              </div>
              <div className="p-4 md:p-5 rounded-2xl bg-[#f7f3eb] border border-[#e6e2da]/50 hover:border-[#775a19]/30 transition-colors">
                <p className="font-serif text-[24px] md:text-[28px] text-[#1c1c17] font-semibold">14+</p>
                <p className="text-[11px] text-[#775a19] uppercase tracking-wider font-semibold pt-1">
                  Farm Partners
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
