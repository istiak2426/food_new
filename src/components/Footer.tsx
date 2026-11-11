import React from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FooterProps {
  onSelectTab: (tab: 'menu' | 'gallery' | 'booking' | 'sets') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Col 1: Brand & Legacy */}
          <div className="space-y-3">
            <span className="font-serif text-xl font-bold text-amber-400 block tracking-tight">
              {RESTAURANT_INFO.name}
            </span>
            <p className="text-zinc-300 text-xs leading-relaxed">
              Dhaka’s premier Chinese and Pan-Asian culinary landmark since {RESTAURANT_INFO.established}. Famed for fiery wok hei, sharing banquets, and authentic hospitality.
            </p>
            <div className="pt-2">
              <a
                href={RESTAURANT_INFO.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium transition-colors"
              >
                <span>facebook.com/chinagarden.dhaka</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Col 2: Locations & Dining */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Dhanmondi Flagship
            </h4>
            <div className="space-y-1.5 text-zinc-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </p>
              <p className="text-zinc-500 pl-5">
                Valet Parking & Lift Access Available
              </p>
            </div>

            <div className="pt-2">
              <h5 className="font-semibold text-zinc-300 text-[11px]">
                Banani Dining Room:
              </h5>
              <p className="text-zinc-400">
                {RESTAURANT_INFO.secondBranch}
              </p>
            </div>
          </div>

          {/* Col 3: Hours & Contact */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Hours & Reservations
            </h4>
            <div className="space-y-2 text-zinc-300">
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">12:00 PM – 11:00 PM</div>
                  <div className="text-zinc-500">Lunch & Dinner (7 Days a Week)</div>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">{RESTAURANT_INFO.phone}</div>
                  <div className="text-zinc-500">Table Host & Home Delivery</div>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectTab('menu')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  A La Carte Food Ordering
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('sets')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Dhaka Classic Set Menus
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('gallery')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Menu & Atmosphere Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('booking')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Table & VIP Banquet Reservation
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Quiet Bottom Strip */}
        <div className="mt-12 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} {RESTAURANT_INFO.name}. All rights reserved. 100% Halal Food.
          </div>
          <div className="flex items-center gap-4">
            <span>Dhanmondi</span>
            <span>·</span>
            <span>Gulshan</span>
            <span>·</span>
            <span>Banani</span>
            <span>·</span>
            <span>Uttara</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
