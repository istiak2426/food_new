import React from 'react';
import { X, ArrowRight, UtensilsCrossed, Calendar } from 'lucide-react';
import { GalleryItem, MenuItem } from '../types/restaurant';
import { MENU_ITEMS, RESTAURANT_INFO } from '../data/restaurantData';

interface GalleryLightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onOrderDish: (dish: MenuItem) => void;
  onBookTable: () => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  item,
  onClose,
  onOrderDish,
  onBookTable,
}) => {
  if (!item) return null;

  const linkedDish = item.dishId
    ? MENU_ITEMS.find((d) => d.id === item.dishId)
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Frame Left */}
        <div className="md:w-3/5 bg-zinc-900 flex items-center justify-center overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-72 md:h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Content Right */}
        <div className="md:w-2/5 p-6 md:p-8 flex flex-col justify-between space-y-6 overflow-y-auto">
          <div className="space-y-4">
            
            {/* Unboxed metadata */}
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
              <span>{item.categoryLabel}</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>{RESTAURANT_INFO.name}</span>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-white">
                {item.title}
              </h3>
              {item.bengaliTitle && (
                <p className="text-sm text-zinc-400 mt-0.5">
                  {item.bengaliTitle}
                </p>
              )}
            </div>

            <div className="text-xs text-amber-300 font-medium">
              "{item.tagline}"
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed">
              {item.description}
            </p>

            {linkedDish && (
              <div className="pt-4 border-t border-zinc-800/80">
                <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                  On the Daily Menu
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-semibold text-white">
                    {linkedDish.name}
                  </span>
                  <span className="font-mono tabular-nums text-sm font-bold text-amber-400">
                    {RESTAURANT_INFO.currency}{linkedDish.price}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  {linkedDish.portionOptions[0].label} ({linkedDish.portionOptions[0].serves})
                </p>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-zinc-800/80 space-y-2">
            {linkedDish ? (
              <button
                onClick={() => {
                  onClose();
                  onOrderDish(linkedDish);
                }}
                className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] text-zinc-950 font-bold rounded-lg text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <UtensilsCrossed className="w-4 h-4 text-zinc-950" />
                <span>Order This Dish (From {RESTAURANT_INFO.currency}{linkedDish.price})</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onBookTable();
                }}
                className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] text-zinc-950 font-bold rounded-lg text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Calendar className="w-4 h-4 text-zinc-950" />
                <span>Reserve a Table in this Hall</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full py-2.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer text-center"
            >
              Back to Gallery
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
