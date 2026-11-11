import React from 'react';
import { Flame, Users, Clock, ShieldCheck, ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onBookTable: () => void;
  onViewSets: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMenu,
  onBookTable,
  onViewSets,
}) => {
  return (
    <section className="relative overflow-hidden bg-zinc-950 border-b border-zinc-800">
      {/* Ambient background subtle warmth */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-red-900/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        
        {/* Split Grid Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Narrative & Action */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clean unboxed metadata line (no pill enclosure) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-wide text-amber-400">
              <span>Established 1998</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>Dhanmondi, Dhaka</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>100% Halal Certified</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>Classic Sharing Portions (1:2 & 1:4)</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
              The Timeless Master of Sizzling Woks & Oriental Heritage in Dhaka
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl">
              From our legendary Szechuan Chilli Chicken and smoking Cast-Iron Beef to fragrant Thai broths and hand-pleated dim sum—savor Dhaka’s most cherished Chinese culinary traditions in our warm lantern-lit dining sanctuary or at your home table.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreMenu}
                className="px-6 py-3.5 text-sm font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] transition-all rounded-lg shadow-md cursor-pointer flex items-center gap-2 whitespace-nowrap"
              >
                <span>Order Food Online</span>
                <ArrowRight className="w-4 h-4 text-zinc-950" />
              </button>

              <button
                onClick={onBookTable}
                className="px-6 py-3.5 text-sm font-semibold text-zinc-200 bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 hover:text-white transition-all rounded-lg cursor-pointer flex items-center gap-2 whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Reserve a Table</span>
              </button>

              <button
                onClick={onViewSets}
                className="text-xs text-zinc-400 hover:text-amber-300 underline underline-offset-4 transition-colors cursor-pointer whitespace-nowrap"
              >
                View Dhaka Set Menus (from ৳650)
              </button>
            </div>

            {/* Dhaka delivery notice */}
            <div className="pt-2 text-xs text-zinc-400 flex items-center gap-2">
              <span className="text-amber-400 font-medium">Delivering across Dhaka:</span>
              <span>Dhanmondi · Gulshan · Banani · Lalmatia · Mirpur · Bailey Road · Uttara</span>
            </div>

          </div>

          {/* Right Column: Hero High-Fidelity Image Anchor */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900 group">
              <img
                src="/src/assets/images/hero_china_garden_dining_1794221370792.jpg"
                alt="China Garden Dhaka Warm Amber Dining Room and Woodwork"
                className="w-full h-80 sm:h-96 lg:h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-zinc-950/80 backdrop-blur-md border border-zinc-800">
                <div className="flex items-center justify-between text-xs text-zinc-400 pb-1">
                  <span className="text-amber-400 font-semibold">Jade Pavilion Dining Hall</span>
                  <span className="font-mono tabular-nums">Open 12 PM – 11 PM</span>
                </div>
                <p className="text-xs text-zinc-300">
                  Private carved wood cubicles & family booths. Perfect for birthdays, intimate family dining, and executive luncheons.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column Feature Strip (Full-width row below hero split) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-14 mt-12 border-t border-zinc-800/80">
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-amber-400">
              <Flame className="w-4 h-4 text-amber-400" />
              <span className="font-semibold text-sm text-zinc-100">Live Wok Hei Heat</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every chicken, beef, and seafood dish is prepared fresh on roaring 400°C cast-iron burners.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-amber-400">
              <Users className="w-4 h-4 text-amber-400" />
              <span className="font-semibold text-sm text-zinc-100">Classic Dhaka Portions</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Authentic 1:2 (Serves 2–3) and 1:4 (Serves 4–5) generous sharing platters for group feasts.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-amber-400">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span className="font-semibold text-sm text-zinc-100">Private VIP Banquets</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Air-conditioned VIP salons with rotating lazy Susan tables for 8 to 20 guests.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-amber-400">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span className="font-semibold text-sm text-zinc-100">100% Halal & Fresh</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Hand-selected Bay of Bengal king prawns, fresh chicken, and imported Chinese spices.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
