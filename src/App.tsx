/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { MenuSection } from './components/MenuSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { ReservationSection } from './components/ReservationSection';
import { VisitUsSection } from './components/VisitUsSection';
import { Footer } from './components/Footer';
import { ItemDetailModal } from './components/ItemDetailModal';
import { TastingTrayDrawer } from './components/TastingTrayDrawer';
import { UserProfileModal } from './components/UserProfileModal';
import { INITIAL_REVIEWS } from './data/cafeData';
import { MenuItem, Review, Reservation, CartItem } from './types/cafe';

export default function App() {
  // Reviews state with localStorage persistence
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('aakay_reviews');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_REVIEWS;
  });

  // Reservations state with localStorage persistence
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem('aakay_reservations');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'res-init-1',
        bookingCode: 'AK-4819',
        fullName: 'Aarav Sharma',
        email: 'aarav@example.com',
        phone: '+91 98765 43210',
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        timeSlot: '11:30 AM',
        guests: '2 Guests',
        seatingPreference: 'Indoor Banquette',
        specialNotes: 'Window table preference, hazelnut pour-over tasting',
        status: 'confirmed',
        createdAt: 'Yesterday',
      },
    ];
  });

  // Cart / Tasting Tray state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aakay_cart');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // Modals state
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aakay_reviews', JSON.stringify(reviews));
    } catch {}
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem('aakay_reservations', JSON.stringify(reservations));
    } catch {}
  }, [reservations]);

  useEffect(() => {
    try {
      localStorage.setItem('aakay_cart', JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cart actions
  const handleAddToCart = (item: MenuItem, quantity: number = 1, notes?: string) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id
            ? { ...ci, quantity: ci.quantity + quantity, notes: notes || ci.notes }
            : ci
        );
      }
      return [...prev, { item, quantity, notes }];
    });
    showToast(`Added ${item.name} to Tasting Tray`);
  };

  const handleUpdateCartQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((ci) => (ci.item.id === itemId ? { ...ci, quantity: newQty } : ci))
    );
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Review action
  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
    showToast('Your review has been published');
  };

  // Reservation actions
  const handleReservationCreated = (reservation: Reservation) => {
    setReservations((prev) => [reservation, ...prev]);
    showToast(`Table confirmed! Reference: ${reservation.bookingCode}`);
  };

  const handleCancelReservation = (id: string) => {
    setReservations((prev) =>
      prev.map((res) => (res.id === id ? { ...res, status: 'cancelled' } : res))
    );
    showToast('Reservation has been cancelled');
  };

  const scrollToReservations = () => {
    const el = document.getElementById('reservations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Quick lookup of items added to cart
  const addedItemIds = cartItems.reduce<Record<string, boolean>>((acc, item) => {
    acc[item.item.id] = true;
    return acc;
  }, {});

  return (
    <div className="min-h-screen flex flex-col bg-[#fdf9f1] text-[#1c1c17]">
      {/* Navigation Header */}
      <Header
        onReserveClick={scrollToReservations}
        onProfileClick={() => setIsProfileModalOpen(true)}
        onCartClick={() => setIsCartDrawerOpen(true)}
        cartItems={cartItems}
        reservationCount={reservations.filter((r) => r.status === 'confirmed').length}
      />

      {/* Main Sections */}
      <main className="flex-1 w-full">
        {/* 1. Hero */}
        <Hero
          onExploreMenu={scrollToMenu}
          onReserveTable={scrollToReservations}
        />

        {/* 2. Philosophy & About */}
        <AboutSection />

        {/* 3. Why Choose AAKAY */}
        <WhyChooseUs />

        {/* 4. Artisanal Menu */}
        <MenuSection
          onSelectItem={(item) => setSelectedMenuItem(item)}
          onAddToCart={(item) => handleAddToCart(item, 1)}
          addedItemIds={addedItemIds}
        />

        {/* 5. Visual Gallery / Journal */}
        <GallerySection />

        {/* 6. Guest Words / Reviews */}
        <ReviewsSection
          reviews={reviews}
          onAddReview={handleAddReview}
        />

        {/* 7. Curated Dining Experience / Table Booking */}
        <ReservationSection
          onReservationCreated={handleReservationCreated}
        />

        {/* 8. Visit Us & Contact Info */}
        <VisitUsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Item Detail Modal */}
      {selectedMenuItem && (
        <ItemDetailModal
          item={selectedMenuItem}
          onClose={() => setSelectedMenuItem(null)}
          onAddToCart={handleAddToCart}
          isAlreadyInCart={!!addedItemIds[selectedMenuItem.id]}
        />
      )}

      {/* Tasting Tray Drawer */}
      <TastingTrayDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onReserveClick={scrollToReservations}
      />

      {/* User Profile & Active Reservations Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        reservations={reservations}
        onCancelReservation={handleCancelReservation}
        onReserveNew={scrollToReservations}
      />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#251915] text-[#fdf9f1] px-5 py-3 rounded-2xl shadow-2xl border border-[#fed488]/30 text-[13px] font-medium flex items-center gap-2.5 animate-in slide-in-from-bottom duration-300">
          <span className="w-2 h-2 rounded-full bg-[#fed488] animate-pulse"></span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
