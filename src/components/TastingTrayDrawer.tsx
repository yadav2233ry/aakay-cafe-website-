import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types/cafe';

interface TastingTrayDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onReserveClick: () => void;
}

export const TastingTrayDrawer: React.FC<TastingTrayDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onReserveClick,
}) => {
  const [tableNumber, setTableNumber] = useState('');
  const [orderSent, setOrderSent] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, ci) => acc + ci.item.price * ci.quantity, 0);
  const tax = Math.round(subtotal * 0.05); // 5% GST on cafe dining
  const total = subtotal + tax;

  const handlePlaceOrder = () => {
    setOrderSent(true);
    setTimeout(() => {
      onClearCart();
      setOrderSent(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="bg-[#fdf9f1] w-full max-w-md h-full flex flex-col shadow-2xl border-l border-[#e6e2da] animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-[#e6e2da] flex items-center justify-between bg-[#f7f3eb]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#fed488]/40 flex items-center justify-center text-[#775a19]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-[20px] font-semibold text-[#1c1c17] leading-tight">
                Tasting Tray
              </h2>
              <p className="text-[11px] text-[#775a19] uppercase tracking-wider font-semibold">
                {cartItems.length} {cartItems.length === 1 ? 'Curated Item' : 'Curated Items'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#e6e2da] text-[#1c1c17] flex items-center justify-center transition-colors cursor-pointer border border-[#e6e2da]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {orderSent ? (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-[#4A6B53]/20 text-[#4A6B53] flex items-center justify-center">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-[24px] font-bold text-[#1c1c17]">
              Tasting Request Sent to Barista & Chef!
            </h3>
            <p className="text-[14px] text-[#4f4542]">
              {tableNumber
                ? `Preparing your artisanal selection for Table #${tableNumber}.`
                : 'Your selection has been logged for your sanctuary experience.'}
            </p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#f1ede6] text-[#807571] flex items-center justify-center">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-[22px] font-medium text-[#1c1c17]">
              Your tasting tray is empty
            </h3>
            <p className="text-[14px] text-[#4f4542] max-w-xs">
              Explore our single-origin coffees, handcrafted mains, and artisan bakery items.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-[#251915] text-[#fdf9f1] text-[12px] uppercase tracking-wider font-semibold hover:bg-[#775a19] transition-colors cursor-pointer"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.map((ci) => (
                <div
                  key={ci.item.id}
                  className="p-4 rounded-2xl bg-[#ffffff] border border-[#e6e2da] shadow-sm flex flex-col gap-2.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-serif text-[17px] font-semibold text-[#1c1c17]">
                        {ci.item.name}
                      </h4>
                      <p className="text-[13px] text-[#775a19] font-semibold">₹{ci.item.price}</p>
                      {ci.notes && (
                        <p className="text-[11px] text-[#807571] italic pt-0.5">Note: {ci.notes}</p>
                      )}
                    </div>
                    <button
                      onClick={() => onRemoveItem(ci.item.id)}
                      className="text-[#807571] hover:text-[#9E3B33] p-1 transition-colors cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#f1ede6]">
                    <div className="flex items-center gap-2 bg-[#f7f3eb] px-2.5 py-1 rounded-full border border-[#e6e2da]">
                      <button
                        onClick={() => onUpdateQuantity(ci.item.id, ci.quantity - 1)}
                        className="w-5 h-5 flex items-center justify-center text-[#1c1c17] hover:bg-white rounded-full transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-[12px] font-semibold w-5 text-center">{ci.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(ci.item.id, ci.quantity + 1)}
                        className="w-5 h-5 flex items-center justify-center text-[#1c1c17] hover:bg-white rounded-full transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-serif text-[15px] font-bold text-[#1c1c17]">
                      ₹{ci.item.price * ci.quantity}
                    </span>
                  </div>
                </div>
              ))}

              {/* Table assignment selector */}
              <div className="p-4 rounded-2xl bg-[#f7f3eb] border border-[#e6e2da] space-y-2">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#4f4542] block">
                  Table Number or Dining Mode
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="e.g. Table 4 or Bar #2"
                    className="flex-1 px-3 py-2 rounded-xl bg-white text-[#1c1c17] text-[13px] border border-[#e6e2da] focus:outline-none focus:ring-2 focus:ring-[#775a19]"
                  />
                  <button
                    onClick={() => {
                      onClose();
                      onReserveClick();
                    }}
                    className="px-3 py-2 rounded-xl bg-[#ffffff] hover:bg-[#e6e2da] text-[#775a19] text-[11px] font-semibold border border-[#e6e2da] uppercase tracking-wide cursor-pointer"
                  >
                    Reserve Table
                  </button>
                </div>
              </div>
            </div>

            {/* Tray Summary & Checkout */}
            <div className="p-6 bg-[#f7f3eb] border-t border-[#e6e2da] space-y-4">
              <div className="space-y-1.5 text-[13px] text-[#4f4542]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1c1c17]">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Taxes (5% GST)</span>
                  <span className="font-semibold text-[#1c1c17]">₹{tax}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#e6e2da] text-[16px] font-bold text-[#1c1c17]">
                  <span>Total Payable</span>
                  <span className="font-serif text-[19px] text-[#775a19]">₹{total}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full py-3.5 rounded-full bg-[#251915] hover:bg-[#775a19] text-[#fdf9f1] text-[12px] uppercase tracking-widest font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirm Order to Table</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
