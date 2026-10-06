import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, Store, Copy, Check, ExternalLink } from 'lucide-react';

export const VisitUsSection: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const fullAddress = 'Plot 42, Heritage Boulevard, City Centre District, India';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  return (
    <section id="contact" className="w-full py-20 md:py-32 bg-[#fdf9f1]">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[12px] md:text-[13px] text-[#775a19] uppercase tracking-[0.25em] font-bold">
              Find Our Sanctuary
            </span>
            <h2 className="font-serif text-[34px] sm:text-[42px] text-[#1c1c17] font-semibold tracking-tight">
              Visit Us
            </h2>
          </div>
          <p className="text-[14px] md:text-[15px] text-[#4f4542] max-w-sm">
            Nestled in the bustling heart of City Centre, welcoming patrons every day from 10:00 AM to 11:00 PM.
          </p>
        </div>

        {/* Map & Detail Cards Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Architectural Map Card */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-lg relative min-h-[420px] bg-[#f1ede6] flex flex-col justify-between p-6 sm:p-8 border border-[#e6e2da]">
            {/* Styled Architectural Map Canvas Background with Streets and Grid */}
            <div
              className="absolute inset-0 bg-[#e8e2d8] opacity-80"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 45% 55%, rgba(119, 90, 25, 0.15) 0%, transparent 60%),
                  linear-gradient(rgba(37, 25, 21, 0.06) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(37, 25, 21, 0.06) 1px, transparent 1px)
                `,
                backgroundSize: '100% 100%, 36px 36px, 36px 36px',
              }}
            />

            {/* Stylized River & Street Graphic Overlays */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-50 120 Q 200 80, 400 240 T 900 180"
                fill="none"
                stroke="#c5b69f"
                strokeWidth="18"
              />
              <path
                d="M 120 -50 L 120 600"
                fill="none"
                stroke="#d6cbbe"
                strokeWidth="10"
              />
              <path
                d="M 280 -50 L 420 600"
                fill="none"
                stroke="#d6cbbe"
                strokeWidth="8"
              />
              <path
                d="M -50 360 L 800 320"
                fill="none"
                stroke="#d6cbbe"
                strokeWidth="12"
              />
              {/* Landmark circles */}
              <circle cx="340" cy="210" r="42" fill="#775a19" fillOpacity="0.08" />
              <circle cx="340" cy="210" r="8" fill="#775a19" />
            </svg>

            <div className="absolute inset-0 bg-gradient-to-t from-[#251915]/30 via-transparent to-transparent pointer-events-none" />

            {/* Top Floating Map Badges & Navigation CTA */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffffff] text-[#1c1c17] text-[11px] font-semibold uppercase tracking-wider shadow-md border border-[#e6e2da]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#775a19] animate-ping" />
                City Centre Quarter
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Plot 42, Heritage Boulevard, City Centre District')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#775a19] text-[#ffffff] hover:bg-[#ffdea5] hover:text-[#251915] transition-all text-[11px] font-semibold uppercase tracking-wider shadow flex items-center gap-1.5 cursor-pointer"
              >
                <span>Get Directions</span>
                <Navigation className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Bottom Location Pin Card */}
            <div className="relative z-10 bg-[#ffffff]/95 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-md border border-[#e6e2da] mt-auto">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#fed488]/30 flex items-center justify-center text-[#775a19] shrink-0">
                  <Store className="w-6 h-6 text-[#775a19]" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-[17px] text-[#1c1c17] font-serif font-bold">
                      AAKAY Café & Kitchen
                    </p>
                    <button
                      onClick={handleCopyAddress}
                      className="text-[#807571] hover:text-[#1c1c17] p-1 rounded transition-colors cursor-pointer"
                      title="Copy Address"
                    >
                      {copiedAddress ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-[13px] text-[#4f4542]">
                    {fullAddress}
                  </p>
                  <p className="text-[11px] text-[#775a19] pt-1 uppercase tracking-wider font-semibold">
                    Valet Parking Available at Entrance
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Detail Cards Column */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {/* Card: Location */}
            <div className="p-6 rounded-2xl bg-[#f7f3eb] flex items-start gap-4 border border-[#e6e2da]/60 hover:border-[#775a19]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#f1ede6] flex items-center justify-center text-[#775a19] shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-[16px] text-[#1c1c17] font-semibold">Location</h3>
                <p className="text-[14px] text-[#4f4542]">AAKAY Café & Kitchen, City Centre</p>
                <p className="text-[12px] text-[#807571]">Central Promenade, Near Grand Plaza</p>
              </div>
            </div>

            {/* Card: Concierge & Phone */}
            <a
              href="tel:+919000000000"
              className="p-6 rounded-2xl bg-[#f7f3eb] flex items-start gap-4 border border-[#e6e2da]/60 hover:border-[#775a19]/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#f1ede6] flex items-center justify-center text-[#775a19] shrink-0 group-hover:bg-[#fed488]/40 transition-colors">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-[16px] text-[#1c1c17] font-semibold">Concierge & Phone</h3>
                <p className="text-[15px] text-[#1c1c17] font-medium group-hover:text-[#775a19] transition-colors">
                  +91 90000 00000
                </p>
                <p className="text-[12px] text-[#807571]">Direct lines open 10:00 AM – 10:30 PM</p>
              </div>
            </a>

            {/* Card: Email */}
            <a
              href="mailto:hello@aakaycafe.example"
              className="p-6 rounded-2xl bg-[#f7f3eb] flex items-start gap-4 border border-[#e6e2da]/60 hover:border-[#775a19]/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#f1ede6] flex items-center justify-center text-[#775a19] shrink-0 group-hover:bg-[#fed488]/40 transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-[16px] text-[#1c1c17] font-semibold">Email & Inquiries</h3>
                <p className="text-[15px] text-[#1c1c17] font-medium group-hover:text-[#775a19] transition-colors">
                  hello@aakaycafe.example
                </p>
                <p className="text-[12px] text-[#807571]">Catering, events, and press enquiries</p>
              </div>
            </a>

            {/* Card: Hours */}
            <div className="p-6 rounded-2xl bg-[#f7f3eb] flex items-start gap-4 border border-[#e6e2da]/60 hover:border-[#775a19]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#f1ede6] flex items-center justify-center text-[#775a19] shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-[16px] text-[#1c1c17] font-semibold">Opening Hours</h3>
                <p className="text-[15px] text-[#1c1c17] font-medium">10:00 AM – 11:00 PM</p>
                <p className="text-[12px] text-[#775a19] font-medium">
                  Monday through Sunday (All Week Long)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
