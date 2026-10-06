import React, { useState } from 'react';
import { X, Clock, Flame, ShieldAlert, Plus, Minus, Check } from 'lucide-react';
import { MenuItem } from '../types/cafe';

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, notes?: string) => void;
  isAlreadyInCart: boolean;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
  isAlreadyInCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [customNotes, setCustomNotes] = useState('');
  const [justAdded, setJustAdded] = useState(false);

  if (!item) return null;

  const handleAdd = () => {
    onAddToCart(item, quantity, customNotes.trim() || undefined);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#fdf9f1] max-w-xl w-full rounded-3xl overflow-hidden shadow-2xl border border-[#e6e2da] relative animate-in fade-in zoom-in-95 max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Optional Header Image if present */}
        {item.image && (
          <div className="h-48 sm:h-56 w-full relative bg-[#251915]">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#fdf9f1] via-transparent to-transparent" />
          </div>
        )}

        <div className="p-6 sm:p-8 overflow-y-auto space-y-5 flex-1">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#775a19] bg-[#fed488]/30 px-3 py-0.5 rounded-full">
                {item.category}
              </span>
              {item.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] uppercase tracking-wider font-semibold bg-[#e6e2da] text-[#4f4542] px-2.5 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-serif text-[26px] sm:text-[30px] text-[#1c1c17] font-semibold">
                {item.name}
              </h3>
              <span className="font-serif text-[24px] sm:text-[28px] text-[#775a19] font-bold">
                ₹{item.price}
              </span>
            </div>
            <p className="text-[15px] text-[#4f4542] leading-relaxed pt-2">
              {item.description}
            </p>
          </div>

          {/* Quick Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-[#f7f3eb] border border-[#e6e2da] text-[12px]">
            {item.prepTime && (
              <div className="flex items-center gap-2 text-[#4f4542]">
                <Clock className="w-4 h-4 text-[#775a19]" />
                <span>Prep: <strong>{item.prepTime}</strong></span>
              </div>
            )}
            {item.calories && (
              <div className="flex items-center gap-2 text-[#4f4542]">
                <Flame className="w-4 h-4 text-[#775a19]" />
                <span>Energy: <strong>{item.calories}</strong></span>
              </div>
            )}
            <div className="flex items-center gap-2 text-[#4f4542]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              <span>Diet: <strong className="capitalize">{item.dietary || 'Vegetarian'}</strong></span>
            </div>
          </div>

          {/* Chef's Notes */}
          {item.chefNotes && (
            <div className="p-4 rounded-xl bg-[#fed488]/20 border border-[#fed488]/40 text-[13px] text-[#785a1a]">
              <p className="font-semibold uppercase tracking-wider text-[11px] mb-1">
                From the Culinary Desk:
              </p>
              <p className="italic font-serif leading-relaxed">“{item.chefNotes}”</p>
            </div>
          )}

          {/* Allergens warning */}
          {item.allergens && item.allergens.length > 0 && (
            <div className="flex items-center gap-2 text-[12px] text-[#807571]">
              <ShieldAlert className="w-4 h-4 text-[#775a19] shrink-0" />
              <span>Contains: {item.allergens.join(', ')}</span>
            </div>
          )}

          {/* Custom Preparation Request */}
          <div className="space-y-1.5 pt-1">
            <label className="text-[11px] uppercase tracking-wider font-semibold text-[#4f4542] block">
              Preparation Preferences (Optional)
            </label>
            <input
              type="text"
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="e.g. Oat milk substitute, less ice, dressing on the side..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#f7f3eb] text-[#1c1c17] text-[13px] border border-[#e6e2da] focus:outline-none focus:ring-2 focus:ring-[#775a19]"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 sm:p-6 bg-[#f7f3eb] border-t border-[#e6e2da] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 bg-[#ffffff] px-3 py-1.5 rounded-full border border-[#e6e2da]">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-7 h-7 rounded-full hover:bg-[#f1ede6] flex items-center justify-center text-[#1c1c17] cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-semibold text-[14px] w-6 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-7 h-7 rounded-full hover:bg-[#f1ede6] flex items-center justify-center text-[#1c1c17] cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="flex-1 py-3 px-6 rounded-full bg-[#251915] hover:bg-[#775a19] text-[#fdf9f1] text-[12px] sm:text-[13px] uppercase tracking-wider font-semibold transition-all shadow flex items-center justify-center gap-2 cursor-pointer"
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4 text-[#ffdea5]" />
                <span>Added to Tray</span>
              </>
            ) : (
              <span>Add to Tasting Tray • ₹{item.price * quantity}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
