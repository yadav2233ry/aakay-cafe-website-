import React, { useState } from 'react';
import { MapPin, Mail, Phone, Share2, X } from 'lucide-react';
import { BRAND_ASSETS } from '../data/cafeData';

export const Footer: React.FC = () => {
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'AAKAY Café & Kitchen',
        text: 'Sanctuary of taste offering handcrafted coffee, artisanal dining, and warm moments.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#f7f3eb] mt-16 border-t border-[#e6e2da]">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-14">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={BRAND_ASSETS.logo}
                alt="AAKAY Café & Kitchen Brand Logo"
                className="h-7 w-auto object-contain"
              />
              <span className="font-serif text-[22px] font-semibold text-[#1c1c17]">AAKAY</span>
            </div>
            <p className="font-serif text-[20px] italic text-[#775a19] leading-tight">
              Good Food. Great Moments.
            </p>
            <p className="text-[14px] text-[#4f4542] max-w-xs leading-relaxed">
              Elevated artisanal coffee and seasonal dining crafted with unhurried mindfulness, organic warmth, and culinary poise.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-[12px] font-bold uppercase tracking-widest text-[#1c1c17]">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-[14px] text-[#4f4542]">
              <li>
                <button
                  onClick={() => scrollTo('hero')}
                  className="hover:text-[#775a19] transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="hover:text-[#775a19] transition-colors cursor-pointer text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('menu-catalog')}
                  className="hover:text-[#775a19] transition-colors cursor-pointer text-left"
                >
                  Artisanal Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('gallery')}
                  className="hover:text-[#775a19] transition-colors cursor-pointer text-left"
                >
                  Atmosphere Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('reviews')}
                  className="hover:text-[#775a19] transition-colors cursor-pointer text-left"
                >
                  Guest Experiences
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('contact')}
                  className="hover:text-[#775a19] transition-colors cursor-pointer text-left"
                >
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Hours & Dining */}
          <div className="space-y-4">
            <h3 className="text-[12px] font-bold uppercase tracking-widest text-[#1c1c17]">
              Hours & Dining
            </h3>
            <div className="space-y-2 text-[#4f4542]">
              <p className="text-[11px] uppercase tracking-wider text-[#775a19] font-bold">
                All Week Long
              </p>
              <p className="text-[16px] text-[#1c1c17] font-semibold">10:00 AM – 11:00 PM</p>
              <p className="text-[13px] text-[#4f4542] pt-1 leading-relaxed">
                Kitchen last orders strictly at 10:15 PM.
                <br />
                Weekend walk-ins and curated table reservations welcomed.
              </p>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-[12px] font-bold uppercase tracking-widest text-[#1c1c17]">
              Connect
            </h3>
            <p className="text-[14px] text-[#4f4542] leading-relaxed">
              142 Artisans Walk, Heritage Quarter
              <br />
              Reservations: +1 (555) 382-2529
              <br />
              hello@aakaykitchen.com
            </p>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => scrollTo('contact')}
                aria-label="Location"
                className="w-9 h-9 rounded-full bg-[#f1ede6] flex items-center justify-center text-[#4f4542] hover:bg-[#fed488] hover:text-[#785a1a] transition-all cursor-pointer"
                title="View on Map"
              >
                <MapPin className="w-4 h-4" />
              </button>
              <a
                href="mailto:hello@aakaykitchen.com"
                aria-label="Email Contact"
                className="w-9 h-9 rounded-full bg-[#f1ede6] flex items-center justify-center text-[#4f4542] hover:bg-[#fed488] hover:text-[#785a1a] transition-all cursor-pointer"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="tel:+15553822529"
                aria-label="Phone Call"
                className="w-9 h-9 rounded-full bg-[#f1ede6] flex items-center justify-center text-[#4f4542] hover:bg-[#fed488] hover:text-[#785a1a] transition-all cursor-pointer"
                title="Call Concierge"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                onClick={handleShare}
                aria-label="Share Experience"
                className="w-9 h-9 rounded-full bg-[#f1ede6] flex items-center justify-center text-[#4f4542] hover:bg-[#fed488] hover:text-[#785a1a] transition-all cursor-pointer"
                title="Share Website"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
            {copiedLink && (
              <p className="text-[11px] text-[#775a19] font-semibold">Link copied to clipboard!</p>
            )}
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 border-t border-[#e6e2da] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-[#807571]">
            © {new Date().getFullYear()} AAKAY Café & Kitchen. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[13px] text-[#807571]">
            <button
              onClick={() => setActiveLegalModal('privacy')}
              className="hover:text-[#1c1c17] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveLegalModal('terms')}
              className="hover:text-[#1c1c17] transition-colors cursor-pointer"
            >
              Terms of Dining
            </button>
          </div>
        </div>
      </div>

      {/* Legal Policy Modal */}
      {activeLegalModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#fdf9f1] max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#e6e2da] relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setActiveLegalModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f1ede6] hover:bg-[#fed488] text-[#1c1c17] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-serif text-[24px] text-[#1c1c17] font-semibold mb-3">
              {activeLegalModal === 'privacy' ? 'Privacy Policy' : 'Terms of Dining'}
            </h3>

            <div className="text-[14px] text-[#4f4542] space-y-3 max-h-80 overflow-y-auto pr-2">
              {activeLegalModal === 'privacy' ? (
                <>
                  <p>
                    At AAKAY Café & Kitchen, we value your sanctuary and privacy. Contact details provided during table reservations are strictly utilized for dining confirmations, dietary alerts, and concierge coordination.
                  </p>
                  <p>
                    We never share your personal information with third-party advertising brokers. Your phone number is used exclusively for instant SMS table confirmations and reservation modifications.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Table Holding:</strong> Tables are held for 15 minutes past your reserved time slot. If you are experiencing delays, kindly inform our concierge.
                  </p>
                  <p>
                    <strong>Cancellations:</strong> Cancellations up to 1 hour prior carry zero penalty fees.
                  </p>
                  <p>
                    <strong>Dietary Requests:</strong> Our kitchen honors nut-free, vegan, and gluten-sensitive requests; please state severe allergies upon arrival.
                  </p>
                </>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveLegalModal(null)}
                className="px-6 py-2 rounded-full bg-[#251915] text-[#fdf9f1] text-[12px] uppercase tracking-wider font-semibold hover:bg-[#775a19] transition-colors cursor-pointer"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
