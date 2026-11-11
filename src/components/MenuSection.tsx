import React, { useState, useMemo } from 'react';
import { Search, Flame, Star, Plus, Sparkles, Filter, X } from 'lucide-react';
import { MenuItem, Category, PortionOption, SpiceLevel } from '../types/restaurant';
import { MENU_ITEMS, RESTAURANT_INFO } from '../data/restaurantData';

interface MenuSectionProps {
  onSelectDish: (dish: MenuItem) => void;
  onQuickAdd: (dish: MenuItem, portion: PortionOption, spice: SpiceLevel) => void;
  initialCategory?: Category;
}

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'all', label: 'All Delicacies' },
  { id: 'starters', label: 'Starters & Dim Sum' },
  { id: 'soups', label: 'Traditional Soups' },
  { id: 'sizzling', label: 'Sizzling & Wok Hei' },
  { id: 'poultry_beef', label: 'Poultry & Beef' },
  { id: 'seafood', label: 'Bay of Bengal Seafood' },
  { id: 'rice_noodles', label: 'Fried Rice & Chowmein' },
  { id: 'set_menus', label: 'Dhaka Banquet Sets' },
  { id: 'desserts_beverages', label: 'Desserts & Teas' },
];

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectDish,
  onQuickAdd,
  initialCategory = 'all',
}) => {
  const [activeCategory, setActiveCategory] = useState<Category>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<'all' | 'bestsellers' | 'chef' | 'spicy'>('all');

  // Filtered menu items
  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Quick filter
      if (filterType === 'bestsellers' && !item.isBestSeller) return false;
      if (filterType === 'chef' && !item.isChefSpecial) return false;
      if (filterType === 'spicy' && !item.isSpicy) return false;
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesBengali = item.bengaliName?.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesIngredients = item.ingredients.some((ing) =>
          ing.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesBengali && !matchesDesc && !matchesIngredients) {
          return false;
        }
      }
      return true;
    });
  }, [activeCategory, filterType, searchQuery]);

  return (
    <section id="menu-section" className="py-12 lg:py-16 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800/80 pb-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
              Fresh Daily from Master Woks
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              A La Carte & Banquet Menu
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl">
              Authentic flavors crafted with imported Chinese aromatics, fresh ingredients, and signature wok hei. Served in traditional 1:2 and 1:4 sharing portions.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search wontons, beef, soup..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs (Segmented controls with click handlers) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-zinc-950 font-bold shadow-sm'
                    : 'bg-zinc-900 border border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Sub-Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="text-zinc-500">Filter by:</span>
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                filterType === 'all'
                  ? 'bg-zinc-800 text-white font-medium'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              All Items
            </button>
            <span className="text-zinc-700">·</span>
            <button
              onClick={() => setFilterType('bestsellers')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                filterType === 'bestsellers'
                  ? 'bg-zinc-800 text-amber-400 font-medium'
                  : 'text-zinc-400 hover:text-amber-400'
              }`}
            >
              Bestsellers
            </button>
            <span className="text-zinc-700">·</span>
            <button
              onClick={() => setFilterType('chef')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                filterType === 'chef'
                  ? 'bg-zinc-800 text-amber-400 font-medium'
                  : 'text-zinc-400 hover:text-amber-400'
              }`}
            >
              Chef's Specials
            </button>
            <span className="text-zinc-700">·</span>
            <button
              onClick={() => setFilterType('spicy')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                filterType === 'spicy'
                  ? 'bg-zinc-800 text-red-400 font-medium'
                  : 'text-zinc-400 hover:text-red-400'
              }`}
            >
              Szechuan Spicy
            </button>
          </div>

          <div className="font-mono tabular-nums text-zinc-500">
            Showing {filteredDishes.length} dishes
          </div>
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <div className="py-16 text-center bg-zinc-900/40 rounded-xl border border-zinc-800">
            <p className="text-zinc-400 text-base">
              No dishes found matching your search.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setFilterType('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-amber-400 hover:underline cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredDishes.map((dish) => {
              const defaultPortion = dish.portionOptions[0];
              return (
                <div
                  key={dish.id}
                  className="group flex flex-col justify-between bg-zinc-900 border border-zinc-800/90 rounded-xl overflow-hidden hover:border-zinc-700 transition-all duration-200 hover:-translate-y-0.5"
                >
                  {/* Top Image Container */}
                  <div
                    onClick={() => onSelectDish(dish)}
                    className="relative w-full h-52 sm:h-56 bg-zinc-950 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />

                    {/* Subtle single text indicator (no pill badge spam) */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      {dish.isChefSpecial && (
                        <span className="text-[11px] font-semibold tracking-wider text-amber-400 uppercase bg-zinc-950/80 px-2 py-0.5 rounded border border-zinc-800">
                          Chef's Choice
                        </span>
                      )}
                      {dish.isBestSeller && !dish.isChefSpecial && (
                        <span className="text-[11px] font-semibold tracking-wider text-emerald-400 uppercase bg-zinc-950/80 px-2 py-0.5 rounded border border-zinc-800">
                          Bestseller
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-xs text-zinc-400">
                      <span className="font-mono tabular-nums flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span>{dish.rating}</span>
                        <span className="text-zinc-500">({dish.reviewsCount})</span>
                      </span>
                      <span>{defaultPortion.serves}</span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Clean unboxed metadata with separators */}
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-1">
                        <span className="capitalize">{dish.category.replace('_', ' & ')}</span>
                        <span aria-hidden="true">·</span>
                        <span>{defaultPortion.label}</span>
                        {dish.isSpicy && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-red-400 flex items-center gap-0.5">
                              <Flame className="w-3 h-3" />
                              {dish.defaultSpiceLevel}
                            </span>
                          </>
                        )}
                      </div>

                      <h3
                        onClick={() => onSelectDish(dish)}
                        className="font-serif text-lg font-bold text-white group-hover:text-amber-400 transition-colors cursor-pointer"
                      >
                        {dish.name}
                      </h3>
                      {dish.bengaliName && (
                        <p className="text-xs text-zinc-400 mt-0.5 font-normal">
                          {dish.bengaliName}
                        </p>
                      )}

                      <p className="text-xs text-zinc-300 mt-2 line-clamp-2 leading-relaxed">
                        {dish.description}
                      </p>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
                          Starts from
                        </div>
                        <div className="font-mono tabular-nums text-lg font-bold text-white flex items-baseline gap-1.5">
                          <span>{RESTAURANT_INFO.currency}{dish.price}</span>
                          {dish.originalPrice && (
                            <span className="text-xs text-zinc-500 line-through">
                              {RESTAURANT_INFO.currency}{dish.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {dish.portionOptions.length > 1 ? (
                          <button
                            onClick={() => onSelectDish(dish)}
                            className="px-3 py-2 text-xs font-semibold text-zinc-200 bg-zinc-800 hover:bg-zinc-700 hover:text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                          >
                            Customise
                          </button>
                        ) : null}

                        <button
                          onClick={() =>
                            onQuickAdd(dish, defaultPortion, dish.defaultSpiceLevel)
                          }
                          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 active:scale-95 transition-all rounded-lg cursor-pointer whitespace-nowrap shadow-sm"
                          aria-label={`Add ${dish.name} to order`}
                        >
                          <Plus className="w-3.5 h-3.5 text-zinc-950" />
                          <span>Add</span>
                        </button>
                      </div>
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
