import React, { useState } from 'react';
import { Star, MessageSquarePlus, X, CheckCircle2 } from 'lucide-react';
import { Review } from '../types/cafe';

interface ReviewsSectionProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, onAddReview }) => {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [submittedToast, setSubmittedToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !quote.trim()) return;

    const initials = name
      .trim()
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      name: name.trim(),
      role: role.trim() || 'Patron',
      quote: quote.trim(),
      rating,
      avatarText: initials || 'AK',
      date: 'Just now',
    };

    onAddReview(newReview);
    setIsWriteModalOpen(false);
    setName('');
    setRole('');
    setQuote('');
    setRating(5);
    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 4000);
  };

  return (
    <section id="reviews" className="w-full py-20 md:py-32 bg-[#fdf9f1]">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[12px] md:text-[13px] text-[#775a19] uppercase tracking-[0.25em] font-bold">
            Guest Words
          </span>
          <h2 className="font-serif text-[34px] sm:text-[42px] text-[#1c1c17] font-semibold tracking-tight">
            Echoes from the Table
          </h2>
          <p className="text-[11px] md:text-[12px] text-[#807571] uppercase tracking-wider font-semibold">
            (Curated Demo Guest Experiences)
          </p>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-8 rounded-2xl bg-[#f7f3eb] flex flex-col justify-between shadow-sm hover:shadow-lg transition-all border border-[#e6e2da]/50"
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center text-[#775a19] gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating
                          ? 'fill-[#775a19] text-[#775a19]'
                          : 'text-[#d2c3bf]'
                      }`}
                    />
                  ))}
                </div>

                <p className="font-serif text-[18px] md:text-[19px] italic text-[#1c1c17] leading-snug">
                  “{rev.quote}”
                </p>
              </div>

              <div className="pt-6 border-t border-[#e6e2da]/40 mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#fed488] text-[#785a1a] flex items-center justify-center text-[15px] font-bold tracking-wide">
                    {rev.avatarText}
                  </div>
                  <div>
                    <p className="text-[15px] text-[#1c1c17] font-semibold leading-tight">
                      {rev.name}
                    </p>
                    <p className="text-[12px] text-[#4f4542]">{rev.role}</p>
                  </div>
                </div>

                <span className="text-[10px] text-[#807571]">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Write a review button & toast */}
        <div className="flex flex-col items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#f1ede6] hover:bg-[#fed488]/40 text-[#1c1c17] text-[12px] uppercase tracking-wider font-semibold border border-[#e6e2da] transition-all cursor-pointer shadow-sm"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#775a19]" />
            <span>Share Your Dining Experience</span>
          </button>

          {submittedToast && (
            <div className="flex items-center gap-2 text-[13px] text-[#4A6B53] bg-[#4A6B53]/10 px-4 py-2 rounded-full border border-[#4A6B53]/20 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>Thank you! Your guest review has been published to Echoes from the Table.</span>
            </div>
          )}
        </div>
      </div>

      {/* Write Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#fdf9f1] max-w-md w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#e6e2da] relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setIsWriteModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f1ede6] hover:bg-[#fed488] text-[#1c1c17] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[11px] text-[#775a19] uppercase tracking-widest font-bold">
              Guest Feedback
            </span>
            <h3 className="font-serif text-[24px] text-[#1c1c17] font-semibold mt-1 mb-4">
              Share Your Table Moments
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#4f4542] block mb-1">
                  Rating
                </label>
                <div className="flex items-center gap-1.5 text-[#775a19]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating
                            ? 'fill-[#775a19] text-[#775a19]'
                            : 'text-[#d2c3bf]'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-[12px] text-[#4f4542] ml-2 font-medium">
                    {rating} of 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#4f4542] block mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Sen"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f7f3eb] text-[#1c1c17] text-[14px] border border-[#e6e2da] focus:outline-none focus:ring-2 focus:ring-[#775a19]"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#4f4542] block mb-1">
                  Dining Occasion / Title (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sunday Brunch Regular, Coffee Enthusiast"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f7f3eb] text-[#1c1c17] text-[14px] border border-[#e6e2da] focus:outline-none focus:ring-2 focus:ring-[#775a19]"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#4f4542] block mb-1">
                  Your Impressions & Review
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell fellow patrons about your favourite dish, brew, or atmosphere..."
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f7f3eb] text-[#1c1c17] text-[14px] border border-[#e6e2da] focus:outline-none focus:ring-2 focus:ring-[#775a19] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-4 py-2 text-[12px] uppercase tracking-wider text-[#4f4542] hover:text-[#1c1c17] font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#251915] text-[#fdf9f1] text-[12px] uppercase tracking-wider font-semibold hover:bg-[#775a19] transition-colors cursor-pointer shadow"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
