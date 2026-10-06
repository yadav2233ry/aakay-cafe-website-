export type MenuCategory = 'coffee' | 'starters' | 'mains' | 'drinks' | 'desserts';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: MenuCategory;
  tags: string[];
  isFeatured?: boolean;
  image?: string;
  dietary?: 'veg' | 'non-veg' | 'vegan';
  prepTime?: string;
  calories?: string;
  allergens?: string[];
  chefNotes?: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatarText: string;
  date: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  imageUrl: string;
  colSpanDesktop: string;
  heightClass: string;
  story?: string;
}

export interface Reservation {
  id: string;
  bookingCode: string;
  fullName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  guests: string;
  seatingPreference: string;
  specialNotes?: string;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}
