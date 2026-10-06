import React, { useState, useEffect } from 'react';
import { Menu, X, User, ShoppingBag } from 'lucide-react';
import { BRAND_ASSETS } from '../data/cafeData';
import { CartItem } from '../types/cafe';

interface HeaderProps {
  onReserveClick: () => void;
  onProfileClick: () => void;
  onCartClick: () => void;
  cartItems: CartItem[];
  reservationCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onReserveClick,
  onProfileClick,
  onCartClick,
  cartItems,
  reservationCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'menu', 'gallery', 'reviews', 'reservations', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section === 'home' ? 'hero' : section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', id: 'hero', key: 'home' },
    { name: 'About', id: 'about', key: 'about' },
    { name: 'Menu', id: 'menu-catalog', key: 'menu' },
    { name: 'Gallery', id: 'gallery', key: 'gallery' },
    { name: 'Reviews', id: 'reviews', key: 'reviews' },
    { name: 'Contact', id: 'contact', key: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#fdf9f1]/95 backdrop-blur-md shadow-[0_4px_24px_rgba(35,23,19,0.08)] py-3'
            : 'bg-[#fdf9f1]/90 backdrop-blur-sm shadow-[0_4px_24px_rgba(35,23,19,0.04)] py-4'
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <img
              src={BRAND_ASSETS.logo}
              alt="AAKAY Café & Kitchen Brand Logo"
              className="h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-serif text-[22px] md:text-[24px] text-[#1c1c17] tracking-tight leading-none font-medium">
                AAKAY
              </span>
              <span className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#775a19] font-semibold">
                Café & Kitchen
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.key;
              return (
                <button
                  key={link.key}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-[13px] uppercase tracking-wider transition-all py-1 font-semibold relative cursor-pointer ${
                    isActive
                      ? 'text-[#775a19] after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[#775a19]'
                      : 'text-[#4f4542] hover:text-[#1c1c17]'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Tasting Tray / Cart Button */}
            {totalCartCount > 0 && (
              <button
                onClick={onCartClick}
                className="relative p-2 rounded-full bg-[#f1ede6] hover:bg-[#fed488]/40 text-[#1c1c17] transition-all cursor-pointer"
                title="View Tasting Tray"
              >
                <ShoppingBag className="w-5 h-5 text-[#775a19]" />
                <span className="absolute -top-1 -right-1 bg-[#775a19] text-[#ffffff] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              </button>
            )}

            {/* Reserve Button */}
            <button
              onClick={onReserveClick}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#251915] text-[#fdf9f1] text-[12px] md:text-[13px] uppercase tracking-wider font-semibold shadow-sm hover:bg-[#2d1604] hover:text-[#ffffff] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              Reserve a Table
            </button>

            {/* User Profile / Active Reservations Button */}
            <button
              onClick={onProfileClick}
              className="relative w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#000000] hover:bg-[#251915] flex items-center justify-center text-white transition-transform hover:scale-105 cursor-pointer shadow-sm"
              title="My Bookings & Account"
              aria-label="User account"
            >
              <User className="w-4 h-4 text-[#ffffff]" />
              {reservationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#775a19] rounded-full border-2 border-[#fdf9f1]"></span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1c1c17] hover:text-[#775a19] focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden pt-20">
          <div className="bg-[#fdf9f1] border-b border-[#e6e2da] px-6 py-8 shadow-xl flex flex-col gap-4 animate-in slide-in-from-top duration-300">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => scrollToSection(link.id)}
                className="text-left text-base font-semibold uppercase tracking-wider py-2 text-[#1c1c17] hover:text-[#775a19] border-b border-[#f1ede6]/80 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-xs text-[#775a19]">›</span>
              </button>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onReserveClick();
                }}
                className="w-full py-3.5 rounded-full bg-[#251915] text-[#fdf9f1] text-xs uppercase tracking-widest font-semibold text-center shadow-md"
              >
                Reserve a Table
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onProfileClick();
                }}
                className="w-full py-3 rounded-full bg-[#f1ede6] text-[#1c1c17] text-xs uppercase tracking-widest font-medium text-center"
              >
                View My Reservations ({reservationCount})
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
