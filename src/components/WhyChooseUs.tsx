import React, { useState } from 'react';
import { ArrowRight, Leaf, Coffee, Lightbulb, Star, X } from 'lucide-react';

interface PillarDetail {
  title: string;
  subtitle: string;
  details: string[];
  quote: string;
}

export const WhyChooseUs: React.FC = () => {
  const [activeModalPillar, setActiveModalPillar] = useState<PillarDetail | null>(null);

  const pillars = [
    {
      id: 'fresh-ingredients',
      title: 'Fresh Ingredients',
      desc: 'Daily farm-sourced heirloom produce, vibrant wild botanicals, and stoneground sourdough delivered each dawn.',
      actionText: 'Daily Harvest',
      icon: Leaf,
      detail: {
        title: 'Heirloom & Daily Harvest',
        subtitle: 'From local homesteads directly to your morning table',
        details: [
          'Stoneground sourdough proofed for 36 hours from organic grain mills.',
          'Hydroponic greens and micro-herbs harvested within 4 hours of plating.',
          'Single-estate dairy from certified grass-fed Himalayan foothills pastures.',
          'Zero chemical preservatives, additives, or premixes.',
        ],
        quote: '“We refuse shortcuts. If an ingredient cannot be traced to its grower, it does not enter our pantry.”',
      },
    },
    {
      id: 'crafted-with-care',
      title: 'Crafted with Care',
      desc: 'Chef-curated culinary recipes, nuanced slow-drip extractions, and small-batch bespoke pastries baked with love.',
      actionText: 'Culinary Method',
      icon: Coffee,
      detail: {
        title: 'The Artisanal Kitchen & Brew Bar',
        subtitle: 'Precision extractions and culinary reverence',
        details: [
          'Custom dual-boiler espresso extraction calibrated every morning for humidity and barometric pressure.',
          'French laminated pastry dough folded over 72 layers with AOP Charentes-Poitou butter.',
          'Sous-vide technique for delicate herbs and reduction sauces.',
          'Small-batch roast profiles honoring bean origin nuances.',
        ],
        quote: '“Every extraction is measured in grams and seconds; culinary poise is our daily discipline.”',
      },
    },
    {
      id: 'cozy-ambience',
      title: 'Cozy Ambience',
      desc: 'Warm brass pendant lighting, heritage oak furniture, trailing ivy, and plush banquettes designed for quiet ease.',
      actionText: 'Our Atmosphere',
      icon: Lightbulb,
      detail: {
        title: 'Architectural Sanctuary',
        subtitle: 'An acoustic and tactile haven in the urban heart',
        details: [
          'Acoustic dampening materials tuned to support soft conversation and reading.',
          'Reclaimed teak and heritage oak tables hand-waxed with beeswax.',
          'Ambient lighting calibrated to 2200K warm sunset glow.',
          'Plush velvet banquette booths with hidden power sockets for quiet work sessions.',
        ],
        quote: '“Designed as a sanctuary—where time slows down and your breath deepens upon entering.”',
      },
    },
    {
      id: 'memorable-taste',
      title: 'Memorable Taste',
      desc: 'Uncompromising sensory depth, balanced seasoning, and distinct flavor notes in every single sip and bite.',
      actionText: 'Taste Profile',
      icon: Star,
      detail: {
        title: 'Sensory Depth & Flavor Architecture',
        subtitle: 'Carefully balanced sweetness, acidity, and umami',
        details: [
          'Double-shot espresso notes of roasted hazelnut, toasted cocoa, and dried plum.',
          'House brioche burgers layered with umami caramelized shallot jam.',
          'Decadent desserts with Valrhona 70% cocoa and Himalayan pink salt accents.',
          'Refreshing cold coolers made with freshly cold-pressed juice and botanical sprigs.',
        ],
        quote: '“A memory you carry long after the plate is cleared.”',
      },
    },
  ];

  return (
    <section className="w-full py-20 md:py-28 bg-[#f7f3eb]">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12 space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[12px] md:text-[13px] text-[#775a19] uppercase tracking-[0.25em] font-semibold">
            Uncompromising Quality
          </span>
          <h2 className="font-serif text-[32px] sm:text-[40px] text-[#1c1c17] font-semibold tracking-tight">
            Why Choose AAKAY
          </h2>
          <p className="text-[15px] md:text-[16px] text-[#4f4542]">
            The deliberate craft behind every plate, cup, and conversation.
          </p>
        </div>

        {/* 4 Pillar Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                onClick={() => setActiveModalPillar(pillar.detail)}
                className="bg-[#ffffff] p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between group border border-[#e6e2da]/50 cursor-pointer"
              >
                <div className="space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#f1ede6] flex items-center justify-center text-[#775a19] group-hover:bg-[#fed488] transition-colors">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-serif text-[21px] md:text-[22px] text-[#1c1c17] mb-2 font-medium">
                      {pillar.title}
                    </h3>
                    <p className="text-[14px] text-[#4f4542] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#f1ede6] mt-4 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#775a19] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                    {pillar.actionText}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[10px] text-[#807571] group-hover:text-[#775a19] font-medium">
                    Learn more
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Craft Detail Modal */}
      {activeModalPillar && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#fdf9f1] max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#e6e2da] relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveModalPillar(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f1ede6] hover:bg-[#fed488] text-[#1c1c17] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[11px] text-[#775a19] uppercase tracking-widest font-bold">
              Culinary Philosophy
            </span>
            <h3 className="font-serif text-[26px] text-[#1c1c17] font-semibold mt-1">
              {activeModalPillar.title}
            </h3>
            <p className="text-[13px] text-[#775a19] italic font-serif mb-5">
              {activeModalPillar.subtitle}
            </p>

            <div className="space-y-3 mb-6">
              {activeModalPillar.details.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3 text-[14px] text-[#4f4542]">
                  <span className="w-2 h-2 rounded-full bg-[#775a19] mt-2 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-[#f7f3eb] border border-[#e6e2da] text-[13px] text-[#4f4542] italic">
              {activeModalPillar.quote}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveModalPillar(null)}
                className="px-6 py-2.5 rounded-full bg-[#251915] text-[#fdf9f1] text-[12px] uppercase tracking-wider font-semibold hover:bg-[#2d1604] transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
