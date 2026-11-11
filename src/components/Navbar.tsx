import React from 'react';
import { ShoppingBag, Calendar, UtensilsCrossed, Clock, Phone } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  activeTab: 'menu' | 'gallery' | 'booking' | 'sets';
  onSelectTab: (tab: 'menu' | 'gallery' | 'booking' | 'sets') => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenBookings: () => void;
  activeBookingsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenBookings,
  activeBookingsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-20">
        
        {/* Zone 1: Single text element Brand Wordmark */}
        <button
          onClick={() => onSelectTab('menu')}
          className="text-left group cursor-pointer shrink-0"
        >
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-amber-400 group-hover:text-amber-300 transition-colors whitespace-nowrap">
              {RESTAURANT_INFO.name}
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => onSelectTab('menu')}
            className={`whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'menu'
                ? 'text-amber-400 border-b-2 border-amber-400 pb-0.5'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            A La Carte Menu
          </button>
          
          <button
            onClick={() => onSelectTab('sets')}
            className={`whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'sets'
                ? 'text-amber-400 border-b-2 border-amber-400 pb-0.5'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            Dhaka Set Menus
          </button>

          <button
            onClick={() => onSelectTab('gallery')}
            className={`whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'gallery'
                ? 'text-amber-400 border-b-2 border-amber-400 pb-0.5'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            Visual Gallery
          </button>

          <button
            onClick={() => onSelectTab('booking')}
            className={`whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'booking'
                ? 'text-amber-400 border-b-2 border-amber-400 pb-0.5'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            Table Reservation
          </button>

          {activeBookingsCount > 0 && (
            <button
              onClick={onOpenBookings}
              className="text-zinc-400 hover:text-amber-300 text-xs flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Reservations ({activeBookingsCount})</span>
            </button>
          )}
        </nav>

        {/* Zone 3: 1 primary action (Cart & Checkout Bag Button) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2.5 px-4 py-2 text-sm font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] transition-all rounded-lg shadow-sm whitespace-nowrap cursor-pointer"
            aria-label={`Shopping bag with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4 text-zinc-950" />
            <span>Bag</span>
            {cartCount > 0 && (
              <>
                <span className="text-zinc-900 font-bold">·</span>
                <span className="font-mono tabular-nums text-xs font-bold bg-amber-500/80 px-1.5 py-0.5 rounded">
                  {cartCount}
                </span>
                <span className="hidden sm:inline font-mono tabular-nums text-xs">
                  {RESTAURANT_INFO.currency}{cartTotal}
                </span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Mobile sub-bar for quick section switching */}
      <div className="md:hidden flex items-center justify-around border-t border-zinc-800/80 bg-zinc-900/95 px-3 py-2 text-xs font-medium">
        <button
          onClick={() => onSelectTab('menu')}
          className={`px-2.5 py-1.5 rounded ${
            activeTab === 'menu' ? 'text-amber-400 font-semibold' : 'text-zinc-400'
          }`}
        >
          Menu
        </button>
        <button
          onClick={() => onSelectTab('sets')}
          className={`px-2.5 py-1.5 rounded ${
            activeTab === 'sets' ? 'text-amber-400 font-semibold' : 'text-zinc-400'
          }`}
        >
          Sets
        </button>
        <button
          onClick={() => onSelectTab('gallery')}
          className={`px-2.5 py-1.5 rounded ${
            activeTab === 'gallery' ? 'text-amber-400 font-semibold' : 'text-zinc-400'
          }`}
        >
          Gallery
        </button>
        <button
          onClick={() => onSelectTab('booking')}
          className={`px-2.5 py-1.5 rounded ${
            activeTab === 'booking' ? 'text-amber-400 font-semibold' : 'text-zinc-400'
          }`}
        >
          Book Table
        </button>
        {activeBookingsCount > 0 && (
          <button
            onClick={onOpenBookings}
            className="text-amber-400 px-2 py-1 flex items-center gap-1"
          >
            <Calendar className="w-3 h-3" />
            <span>({activeBookingsCount})</span>
          </button>
        )}
      </div>
    </header>
  );
};
