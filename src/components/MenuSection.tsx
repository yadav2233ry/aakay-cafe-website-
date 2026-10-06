import React, { useState, useMemo } from 'react';
import { Search, Plus, Check, Sparkles, Info } from 'lucide-react';
import { MENU_ITEMS, BRAND_ASSETS } from '../data/cafeData';
import { MenuCategory, MenuItem } from '../types/cafe';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
  addedItemIds: Record<string, boolean>;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectItem,
  onAddToCart,
  addedItemIds,
}) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('coffee');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'vegan' | 'special'>('all');

  const categories: { id: MenuCategory; label: string }[] = [
    { id: 'coffee', label: 'Coffee' },
    { id: 'starters', label: 'Starters & Snacks' },
    { id: 'mains', label: 'Main Bites' },
    { id: 'drinks', label: 'Drinks' },
    { id: 'desserts', label: 'Desserts' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchesDiet = true;
      if (dietaryFilter === 'veg') matchesDiet = item.dietary === 'veg';
      if (dietaryFilter === 'vegan') matchesDiet = item.dietary === 'vegan';
      if (dietaryFilter === 'special') matchesDiet = item.isFeatured || item.tags.some((t) => t.includes("Chef's Special") || t.includes("Chef's Pride") || t.includes("Best Seller"));

      return matchesCategory && matchesSearch && matchesDiet;
    });
  }, [activeCategory, searchQuery, dietaryFilter]);

  // Featured main item
  const featuredMain = MENU_ITEMS.find((item) => item.id === 'mains-1');

  return (
    <section id="menu-catalog" className="w-full py-20 md:py-32 bg-[#fdf9f1]">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12 space-y-10">
        {/* Section Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-[12px] md:text-[13px] text-[#775a19] uppercase tracking-[0.25em] font-bold">
              From Our Kitchen & Espresso Bar
            </span>
            <h2 className="font-serif text-[34px] sm:text-[42px] text-[#1c1c17] font-semibold tracking-tight">
              Artisanal Menu
            </h2>
            <p className="text-[15px] md:text-[16px] text-[#4f4542]">
              Prepared fresh daily with single-origin beans and farm-to-table provisions.
            </p>
          </div>

          {/* Interactive Category Switcher Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-full bg-[#f1ede6] w-fit shadow-inner">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  type="button"
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-[12px] sm:text-[13px] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#251915] text-[#fdf9f1] shadow-md scale-102'
                      : 'text-[#4f4542] hover:text-[#1c1c17]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          {/* Search box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#807571] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${categories.find(c => c.id === activeCategory)?.label}...`}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-[#f7f3eb] text-[#1c1c17] placeholder:text-[#807571] text-[13px] border border-[#e6e2da] focus:outline-none focus:ring-2 focus:ring-[#775a19]/40 transition-all"
            />
          </div>

          {/* Dietary toggle chips */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setDietaryFilter('all')}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                dietaryFilter === 'all'
                  ? 'bg-[#775a19] text-white'
                  : 'bg-[#f7f3eb] text-[#4f4542] hover:bg-[#e6e2da]'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setDietaryFilter('veg')}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                dietaryFilter === 'veg'
                  ? 'bg-[#775a19] text-white'
                  : 'bg-[#f7f3eb] text-[#4f4542] hover:bg-[#e6e2da]'
              }`}
            >
              Pure Veg
            </button>
            <button
              onClick={() => setDietaryFilter('vegan')}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                dietaryFilter === 'vegan'
                  ? 'bg-[#775a19] text-white'
                  : 'bg-[#f7f3eb] text-[#4f4542] hover:bg-[#e6e2da]'
              }`}
            >
              Plant Based
            </button>
            <button
              onClick={() => setDietaryFilter('special')}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer shrink-0 flex items-center gap-1 ${
                dietaryFilter === 'special'
                  ? 'bg-[#775a19] text-white'
                  : 'bg-[#f7f3eb] text-[#4f4542] hover:bg-[#e6e2da]'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              Signatures
            </button>
          </div>
        </div>

        {/* SPECIAL FEATURED BURGER CARD FOR MAINS TAB */}
        {activeCategory === 'mains' && !searchQuery && dietaryFilter === 'all' && featuredMain && (
          <div className="p-6 md:p-8 rounded-3xl bg-[#f7f3eb] border border-[#e6e2da] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm">
            <div className="lg:col-span-5 rounded-2xl overflow-hidden h-64 md:h-80 shadow-md group relative">
              <img
                src={BRAND_ASSETS.signatureBurger}
                alt="AAKAY Signature Burger with Hand-Cut Fries"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1 rounded-full bg-[#fed488] text-[#785a1a] text-[11px] uppercase font-bold tracking-wider shadow">
                  Chef's Pride
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div className="flex items-center gap-3">
                  <h3 className="font-serif text-[26px] md:text-[32px] text-[#1c1c17] font-semibold">
                    {featuredMain.name}
                  </h3>
                </div>
                <span className="font-serif text-[28px] md:text-[32px] text-[#775a19] font-bold">
                  ₹{featuredMain.price}
                </span>
              </div>

              <p className="text-[15px] md:text-[16px] text-[#4f4542] leading-relaxed">
                {featuredMain.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {featuredMain.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-[#f1ede6] text-[#4f4542] text-[11px] uppercase tracking-wider font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  onClick={() => onAddToCart(featuredMain)}
                  className="px-6 py-3 rounded-full bg-[#251915] text-[#fdf9f1] hover:bg-[#775a19] text-[12px] uppercase tracking-widest font-semibold flex items-center gap-2 transition-all shadow cursor-pointer"
                >
                  {addedItemIds[featuredMain.id] ? (
                    <>
                      <Check className="w-4 h-4 text-[#ffdea5]" />
                      <span>Added to Tray</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to Tasting Tray</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => onSelectItem(featuredMain)}
                  className="px-5 py-3 rounded-full bg-[#ffffff] hover:bg-[#f1ede6] text-[#1c1c17] text-[12px] uppercase tracking-wider font-semibold border border-[#e6e2da] flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Info className="w-4 h-4 text-[#775a19]" />
                  <span>Item Details</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ITEMS GRID */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#f7f3eb] rounded-3xl border border-[#e6e2da]">
            <p className="font-serif text-[20px] text-[#1c1c17]">No artisanal dishes match your filter.</p>
            <p className="text-[14px] text-[#807571] pt-1">Try resetting search keywords or dietary filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setDietaryFilter('all');
              }}
              className="mt-4 px-5 py-2 rounded-full bg-[#251915] text-white text-[12px] uppercase tracking-wider font-medium cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((item) => {
              const isAdded = !!addedItemIds[item.id];
              return (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl bg-[#f7f3eb] hover:bg-[#f1ede6] transition-all flex flex-col justify-between group border border-[#e6e2da]/60 hover:shadow-md"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-baseline justify-between gap-4">
                      <button
                        onClick={() => onSelectItem(item)}
                        className="font-serif text-[20px] md:text-[22px] text-[#1c1c17] group-hover:text-[#775a19] transition-colors text-left font-medium cursor-pointer"
                      >
                        {item.name}
                      </button>
                      <span className="font-serif text-[20px] md:text-[22px] text-[#1c1c17] font-semibold shrink-0">
                        ₹{item.price}
                      </span>
                    </div>

                    <p className="text-[14px] text-[#4f4542] leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-5 mt-2 border-t border-[#e6e2da]/40">
                    <div className="flex flex-wrap items-center gap-2">
                      {item.tags.map((tag, idx) => {
                        const isHighlight =
                          tag.includes("Special") || tag.includes("Pride") || tag.includes("Best");
                        return (
                          <span
                            key={idx}
                            className={`px-2.5 py-1 rounded-full text-[10px] md:text-[11px] uppercase tracking-wider font-semibold ${
                              isHighlight
                                ? 'bg-[#fed488]/50 text-[#785a1a]'
                                : 'bg-[#e6e2da]/60 text-[#4f4542]'
                            }`}
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectItem(item)}
                        className="p-2 rounded-full hover:bg-white text-[#807571] hover:text-[#1c1c17] transition-colors cursor-pointer"
                        title="View ingredients and notes"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onAddToCart(item)}
                        className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer ${
                          isAdded
                            ? 'bg-[#775a19] text-[#ffffff]'
                            : 'bg-[#251915] text-[#fdf9f1] hover:bg-[#775a19]'
                        }`}
                        title="Add to tasting tray"
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
