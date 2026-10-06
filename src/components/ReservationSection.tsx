import React, { useState } from 'react';
import { Zap, CalendarX, Armchair, Calendar, CheckCircle2, Ticket, Copy, Check, Clock } from 'lucide-react';
import { Reservation } from '../types/cafe';

interface ReservationSectionProps {
  onReservationCreated: (reservation: Reservation) => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  onReservationCreated,
}) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split('T')[0];

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(defaultDate);
  const [guests, setGuests] = useState('2');
  const [timeSlot, setTimeSlot] = useState('11:30 AM');
  const [seatingPreference, setSeatingPreference] = useState('Indoor Banquette');
  const [specialNotes, setSpecialNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const timeSlots = ['11:30 AM', '01:30 PM', '05:00 PM', '08:00 PM'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const code = `AK-${Math.floor(1000 + Math.random() * 9000)}`;
      const newReservation: Reservation = {
        id: `res-${Date.now()}`,
        bookingCode: code,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        date,
        timeSlot,
        guests: guests === '1' ? '1 Guest' : `${guests} Guests`,
        seatingPreference,
        specialNotes: specialNotes.trim() || undefined,
        status: 'confirmed',
        createdAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      };

      setConfirmedReservation(newReservation);
      onReservationCreated(newReservation);
      setIsSubmitting(false);
    }, 700);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleBookAnother = () => {
    setConfirmedReservation(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setSpecialNotes('');
  };

  return (
    <section id="reservations" className="w-full py-20 md:py-28 bg-[#f7f3eb]">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12">
        <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-10 md:p-14 shadow-xl border border-[#e6e2da]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Booking Context Sidebar */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[12px] md:text-[13px] text-[#775a19] uppercase tracking-[0.25em] font-bold">
                  Reserve Your Sanctuary
                </span>
                <h2 className="font-serif text-[32px] sm:text-[40px] text-[#1c1c17] font-semibold tracking-tight leading-tight">
                  Curated Dining Experience
                </h2>
                <p className="text-[15px] md:text-[16px] text-[#4f4542] leading-relaxed">
                  Whether an intimate breakfast tasting, quiet business luncheon, or celebratory dinner, our tables are prepared for unhurried presence.
                </p>
              </div>

              {/* Guarantee Callouts */}
              <div className="space-y-4 py-2">
                <div className="flex items-center gap-3.5 text-[#1c1c17]">
                  <div className="w-8 h-8 rounded-full bg-[#fed488]/30 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4 text-[#775a19]" />
                  </div>
                  <span className="text-[14px] font-medium">Instant table confirmation</span>
                </div>
                <div className="flex items-center gap-3.5 text-[#1c1c17]">
                  <div className="w-8 h-8 rounded-full bg-[#fed488]/30 flex items-center justify-center shrink-0">
                    <CalendarX className="w-4 h-4 text-[#775a19]" />
                  </div>
                  <span className="text-[14px] font-medium">No cancellation fees up to 1 hour prior</span>
                </div>
                <div className="flex items-center gap-3.5 text-[#1c1c17]">
                  <div className="w-8 h-8 rounded-full bg-[#fed488]/30 flex items-center justify-center shrink-0">
                    <Armchair className="w-4 h-4 text-[#775a19]" />
                  </div>
                  <span className="text-[14px] font-medium">
                    Indoor banquette or window seating preference
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#f7f3eb] text-[#4f4542] text-[13px] border border-[#e6e2da]">
                For gatherings exceeding 8 guests or private events, kindly contact our concierge at{' '}
                <a href="tel:+919000000000" className="text-[#775a19] font-semibold underline">
                  +91 90000 00000
                </a>
                .
              </div>
            </div>

            {/* Interactive Booking Form / Confirmation Card */}
            <div className="lg:col-span-7">
              {confirmedReservation ? (
                <div className="bg-[#fdf9f1] p-6 sm:p-8 rounded-2xl border-2 border-[#775a19]/30 space-y-6 animate-in fade-in zoom-in-95 duration-300 shadow-md">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#4A6B53]/15 text-[#4A6B53] flex items-center justify-center">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-[#775a19] font-bold">
                          Table Confirmed
                        </span>
                        <h3 className="font-serif text-[24px] text-[#1c1c17] font-semibold">
                          We look forward to hosting you!
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-[14px] text-[#4f4542]">
                    An instant confirmation ticket has been dispatched to{' '}
                    <span className="font-semibold text-[#1c1c17]">{confirmedReservation.email}</span> and SMS to{' '}
                    <span className="font-semibold text-[#1c1c17]">{confirmedReservation.phone}</span>.
                  </p>

                  {/* Reservation Pass Card */}
                  <div className="bg-[#ffffff] p-5 rounded-2xl border border-[#e6e2da] shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-[#f1ede6] pb-3">
                      <div className="flex items-center gap-2">
                        <Ticket className="w-5 h-5 text-[#775a19]" />
                        <span className="text-[12px] uppercase tracking-wider font-bold text-[#1c1c17]">
                          Booking Reference
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[16px] font-bold text-[#775a19] bg-[#fed488]/30 px-3 py-1 rounded-md">
                          {confirmedReservation.bookingCode}
                        </span>
                        <button
                          onClick={() => handleCopyCode(confirmedReservation.bookingCode)}
                          className="p-1.5 rounded-md hover:bg-[#f1ede6] text-[#807571] hover:text-[#1c1c17] transition-colors cursor-pointer"
                          title="Copy booking code"
                        >
                          {copiedCode ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[13px]">
                      <div>
                        <p className="text-[#807571] text-[11px] uppercase tracking-wider">Guest</p>
                        <p className="font-semibold text-[#1c1c17] truncate">{confirmedReservation.fullName}</p>
                      </div>
                      <div>
                        <p className="text-[#807571] text-[11px] uppercase tracking-wider">Date</p>
                        <p className="font-semibold text-[#1c1c17]">{confirmedReservation.date}</p>
                      </div>
                      <div>
                        <p className="text-[#807571] text-[11px] uppercase tracking-wider">Time Slot</p>
                        <p className="font-semibold text-[#1c1c17] flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#775a19]" />
                          {confirmedReservation.timeSlot}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#807571] text-[11px] uppercase tracking-wider">Party Size</p>
                        <p className="font-semibold text-[#1c1c17]">{confirmedReservation.guests}</p>
                      </div>
                    </div>

                    <div className="pt-2 text-[12px] text-[#4f4542] border-t border-[#f1ede6] flex items-center justify-between">
                      <span>Area: <strong className="text-[#1c1c17]">{confirmedReservation.seatingPreference}</strong></span>
                      <span className="text-[#4A6B53] font-semibold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#4A6B53] animate-pulse"></span>
                        Guaranteed Seating
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      onClick={handleBookAnother}
                      className="px-5 py-2.5 rounded-full bg-[#f1ede6] hover:bg-[#e6e2da] text-[#1c1c17] text-[12px] uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                    >
                      Book Another Table
                    </button>
                    <a
                      href="#menu-catalog"
                      className="px-6 py-2.5 rounded-full bg-[#251915] hover:bg-[#775a19] text-[#fdf9f1] text-[12px] uppercase tracking-wider font-semibold transition-colors shadow cursor-pointer"
                    >
                      Explore Menu for Your Visit
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider font-semibold text-[#4f4542] block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Aarav Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-[#f7f3eb] text-[#1c1c17] text-[14px] placeholder:text-[#807571] focus:outline-none focus:ring-2 focus:ring-[#775a19] border border-[#e6e2da] transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider font-semibold text-[#4f4542] block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="aarav@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#f7f3eb] text-[#1c1c17] text-[14px] placeholder:text-[#807571] focus:outline-none focus:ring-2 focus:ring-[#775a19] border border-[#e6e2da] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Phone */}
                    <div className="space-y-1.5 sm:col-span-1">
                      <label className="text-[11px] uppercase tracking-wider font-semibold text-[#4f4542] block">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-[#f7f3eb] text-[#1c1c17] text-[14px] placeholder:text-[#807571] focus:outline-none focus:ring-2 focus:ring-[#775a19] border border-[#e6e2da] transition-all"
                      />
                    </div>

                    {/* Date Picker */}
                    <div className="space-y-1.5 sm:col-span-1">
                      <label className="text-[11px] uppercase tracking-wider font-semibold text-[#4f4542] block">
                        Date
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#f7f3eb] text-[#1c1c17] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#775a19] border border-[#e6e2da] transition-all"
                      />
                    </div>

                    {/* Guests */}
                    <div className="space-y-1.5 sm:col-span-1">
                      <label className="text-[11px] uppercase tracking-wider font-semibold text-[#4f4542] block">
                        Guests
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#f7f3eb] text-[#1c1c17] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#775a19] border border-[#e6e2da] transition-all cursor-pointer"
                      >
                        <option value="1">1 Guest (Solo)</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="5">5 Guests</option>
                        <option value="6">6 Guests</option>
                        <option value="7">7 Guests</option>
                        <option value="8+">8+ Guests</option>
                      </select>
                    </div>
                  </div>

                  {/* Time Slot Selection */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-[#4f4542] block">
                      Select Seating Time Slot
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {timeSlots.map((slot) => {
                        const isSelected = timeSlot === slot;
                        return (
                          <button
                            type="button"
                            key={slot}
                            onClick={() => setTimeSlot(slot)}
                            className={`p-3 rounded-xl text-center text-[12px] font-semibold uppercase tracking-wider transition-all cursor-pointer border ${
                              isSelected
                                ? 'bg-[#251915] text-[#fdf9f1] border-[#251915] shadow-md scale-102'
                                : 'bg-[#f7f3eb] text-[#1c1c17] border-[#e6e2da] hover:bg-[#fed488]/30'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Seating Preference Selector */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-[#4f4542] block">
                      Atmosphere Preference
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Indoor Banquette', 'Window Alcove', 'Garden Patio'].map((pref) => (
                        <button
                          type="button"
                          key={pref}
                          onClick={() => setSeatingPreference(pref)}
                          className={`p-2 rounded-xl text-center text-[11px] font-medium tracking-wide border transition-all cursor-pointer ${
                            seatingPreference === pref
                              ? 'bg-[#775a19] text-white border-[#775a19]'
                              : 'bg-[#f7f3eb] text-[#4f4542] border-[#e6e2da] hover:bg-[#e6e2da]'
                          }`}
                        >
                          {pref}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Special Request */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-[#4f4542] block">
                      Special Notes or Dietary Preferences (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      placeholder="Anniversary celebration, window table preference, vegan options..."
                      className="w-full px-4 py-3 rounded-xl bg-[#f7f3eb] text-[#1c1c17] text-[14px] placeholder:text-[#807571] focus:outline-none focus:ring-2 focus:ring-[#775a19] border border-[#e6e2da] transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-[#251915] text-[#fdf9f1] hover:bg-[#775a19] text-[12px] md:text-[13px] uppercase tracking-widest font-semibold shadow-md transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Securing Your Table...</span>
                      </>
                    ) : (
                      <>
                        <span>Reserve Your Table</span>
                        <Calendar className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
