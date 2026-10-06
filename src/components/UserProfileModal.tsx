import React from 'react';
import { X, Calendar, Clock, Armchair, Ticket, AlertCircle } from 'lucide-react';
import { Reservation } from '../types/cafe';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservations: Reservation[];
  onCancelReservation: (id: string) => void;
  onReserveNew: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  reservations,
  onCancelReservation,
  onReserveNew,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#fdf9f1] max-w-xl w-full rounded-3xl overflow-hidden shadow-2xl border border-[#e6e2da] relative animate-in fade-in zoom-in-95 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-[#f7f3eb] border-b border-[#e6e2da] flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#775a19] uppercase tracking-widest font-bold">
              Guest Portal
            </span>
            <h2 className="font-serif text-[24px] font-semibold text-[#1c1c17]">
              My Bookings & Profile
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#e6e2da] text-[#1c1c17] flex items-center justify-center transition-colors cursor-pointer border border-[#e6e2da]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {reservations.length === 0 ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#f1ede6] text-[#807571] flex items-center justify-center mx-auto">
                <Calendar className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-[20px] font-medium text-[#1c1c17]">
                No Active Table Bookings
              </h3>
              <p className="text-[14px] text-[#4f4542] max-w-xs mx-auto">
                Your sanctuary table awaits. Book an intimate morning coffee or an evening dinner banquet.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onReserveNew();
                }}
                className="px-6 py-2.5 rounded-full bg-[#251915] text-[#fdf9f1] text-[12px] uppercase tracking-wider font-semibold hover:bg-[#775a19] transition-colors cursor-pointer"
              >
                Reserve a Table Now
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#4f4542]">
                  Upcoming Experiences ({reservations.length})
                </span>
                <button
                  onClick={() => {
                    onClose();
                    onReserveNew();
                  }}
                  className="text-[11px] text-[#775a19] font-semibold uppercase tracking-wider hover:underline cursor-pointer"
                >
                  + Book Another Table
                </button>
              </div>

              {reservations.map((res) => (
                <div
                  key={res.id}
                  className="p-5 rounded-2xl bg-[#ffffff] border border-[#e6e2da] shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[14px] font-bold text-[#775a19] bg-[#fed488]/30 px-2.5 py-0.5 rounded">
                          {res.bookingCode}
                        </span>
                        <span
                          className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                            res.status === 'confirmed'
                              ? 'bg-[#4A6B53]/15 text-[#4A6B53]'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {res.status === 'confirmed' ? 'Confirmed' : 'Cancelled'}
                        </span>
                      </div>
                      <h4 className="font-serif text-[18px] font-semibold text-[#1c1c17] mt-1">
                        Table for {res.guests}
                      </h4>
                    </div>

                    {res.status === 'confirmed' && (
                      <button
                        onClick={() => onCancelReservation(res.id)}
                        className="text-[11px] text-[#9E3B33] hover:underline font-semibold cursor-pointer"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-[12px] text-[#4f4542] pt-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#775a19]" />
                      <span>{res.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#775a19]" />
                      <span>{res.timeSlot}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Armchair className="w-3.5 h-3.5 text-[#775a19]" />
                      <span>{res.seatingPreference}</span>
                    </div>
                  </div>

                  {res.specialNotes && (
                    <p className="text-[12px] text-[#807571] italic pt-1 border-t border-[#f1ede6]">
                      Special Request: “{res.specialNotes}”
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Concierge Help Notice */}
          <div className="p-4 rounded-2xl bg-[#f7f3eb] border border-[#e6e2da] flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#775a19] shrink-0 mt-0.5" />
            <div className="text-[12px] text-[#4f4542] space-y-1">
              <p className="font-semibold text-[#1c1c17]">Concierge Desk Available</p>
              <p>
                Need to amend seating arrangements or dietary requirements? Call direct at{' '}
                <a href="tel:+919000000000" className="text-[#775a19] font-bold underline">
                  +91 90000 00000
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f7f3eb] border-t border-[#e6e2da] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#251915] text-[#fdf9f1] text-[12px] uppercase tracking-wider font-semibold hover:bg-[#775a19] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
