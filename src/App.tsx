/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { DishModal } from './components/DishModal';
import { GallerySection } from './components/GallerySection';
import { TableBookingSection } from './components/TableBookingSection';
import { CartDrawer } from './components/CartDrawer';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { BookingsListModal } from './components/BookingsListModal';
import { Footer } from './components/Footer';
import { MenuItem, PortionOption, SpiceLevel, CartItem, Order, TableBooking, Category } from './types/restaurant';
import { RESTAURANT_INFO } from './data/restaurantData';
import { ShoppingBag, Check, Phone, ArrowUp, X } from 'lucide-react';

const LOCAL_STORAGE_CART_KEY = 'chinagarden_cart_v1';
const LOCAL_STORAGE_ORDERS_KEY = 'chinagarden_orders_v1';
const LOCAL_STORAGE_BOOKINGS_KEY = 'chinagarden_bookings_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<'menu' | 'gallery' | 'booking' | 'sets'>('menu');
  const [showTopBanner, setShowTopBanner] = useState<boolean>(true);

  // Cart state persisted in localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // User orders persisted
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // User table bookings persisted
  const [bookings, setBookings] = useState<TableBooking[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_BOOKINGS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedDishModal, setSelectedDishModal] = useState<MenuItem | null>(null);
  const [activeOrderTracker, setActiveOrderTracker] = useState<Order | null>(null);
  const [isBookingsModalOpen, setIsBookingsModalOpen] = useState<boolean>(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save to localStorage on state changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_BOOKINGS_KEY, JSON.stringify(bookings));
    } catch (e) {
      console.error('Failed to save bookings to localStorage', e);
    }
  }, [bookings]);

  // Derived cart numbers
  const cartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);
  const cartTotal = cartItems.reduce((acc, it) => acc + it.price * it.quantity, 0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Add to cart handler
  const handleAddToCart = (
    dish: MenuItem,
    portion: PortionOption,
    spiceLevel: SpiceLevel,
    quantity: number,
    specialInstructions: string
  ) => {
    const cartItemId = `${dish.id}-${portion.id}-${spiceLevel}-${(specialInstructions || '').trim()}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      }
      const newItem: CartItem = {
        cartItemId,
        menuItemId: dish.id,
        name: dish.name,
        bengaliName: dish.bengaliName,
        image: dish.image,
        price: portion.price,
        portion,
        spiceLevel,
        quantity,
        specialInstructions,
      };
      return [...prev, newItem];
    });

    showToast(`Added ${quantity}x ${dish.name} (${portion.label}) to your bag`);
  };

  // Quick add from menu card
  const handleQuickAdd = (
    dish: MenuItem,
    portion: PortionOption,
    spiceLevel: SpiceLevel
  ) => {
    handleAddToCart(dish, portion, spiceLevel, 1, '');
  };

  // Update quantity in drawer
  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((it) => (it.cartItemId === cartItemId ? { ...it, quantity: newQty } : it))
    );
  };

  // Remove item
  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((it) => it.cartItemId !== cartItemId));
  };

  // Clear cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Table booking confirmed
  const handleBookingConfirmed = (newBooking: TableBooking) => {
    setBookings((prev) => [newBooking, ...prev]);
    showToast(`Table reserved! Code: ${newBooking.bookingCode}`);
  };

  // Order completed
  const handleOrderCompleted = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrderTracker(newOrder);
    showToast(`Order placed! Tracking ID: ${newOrder.orderCode}`);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    showToast('Reservation cancelled');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-amber-500 selection:text-white">
      
      {/* Promotional Top Bar (Slim, dismissible, <= 40px) */}
      {showTopBanner && (
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-zinc-950 text-xs font-semibold px-4 py-2 flex items-center justify-between z-50">
          <div className="max-w-7xl mx-auto flex items-center gap-3 text-center truncate">
            <span className="hidden sm:inline">🍜 Special Dhaka Offer:</span>
            <span>Free Home Delivery across Dhaka on orders over ৳2500 · Use code <strong>CHINAGARDEN10</strong> for 10% off</span>
          </div>
          <button
            onClick={() => setShowTopBanner(false)}
            className="p-1 hover:text-black transition-colors cursor-pointer shrink-0 ml-2"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBookings={() => setIsBookingsModalOpen(true)}
        activeBookingsCount={bookings.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onExploreMenu={() => {
            setActiveTab('menu');
            document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onBookTable={() => {
            setActiveTab('booking');
            document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onViewSets={() => {
            setActiveTab('sets');
            document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Tab-driven View */}
        {activeTab === 'menu' && (
          <>
            <MenuSection
              initialCategory="all"
              onSelectDish={(dish) => setSelectedDishModal(dish)}
              onQuickAdd={handleQuickAdd}
            />
            <GallerySection
              onOrderDish={(dish) => setSelectedDishModal(dish)}
              onBookTable={() => {
                setActiveTab('booking');
                document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <TableBookingSection
              onBookingConfirmed={handleBookingConfirmed}
              onViewBookings={() => setIsBookingsModalOpen(true)}
            />
          </>
        )}

        {activeTab === 'sets' && (
          <>
            <MenuSection
              initialCategory="set_menus"
              onSelectDish={(dish) => setSelectedDishModal(dish)}
              onQuickAdd={handleQuickAdd}
            />
            <TableBookingSection
              onBookingConfirmed={handleBookingConfirmed}
              onViewBookings={() => setIsBookingsModalOpen(true)}
            />
          </>
        )}

        {activeTab === 'gallery' && (
          <>
            <GallerySection
              onOrderDish={(dish) => setSelectedDishModal(dish)}
              onBookTable={() => {
                setActiveTab('booking');
                document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <MenuSection
              initialCategory="all"
              onSelectDish={(dish) => setSelectedDishModal(dish)}
              onQuickAdd={handleQuickAdd}
            />
          </>
        )}

        {activeTab === 'booking' && (
          <>
            <TableBookingSection
              onBookingConfirmed={handleBookingConfirmed}
              onViewBookings={() => setIsBookingsModalOpen(true)}
            />
            <GallerySection
              onOrderDish={(dish) => setSelectedDishModal(dish)}
              onBookTable={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer onSelectTab={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* Dish Customizer Modal */}
      {selectedDishModal && (
        <DishModal
          dish={selectedDishModal}
          onClose={() => setSelectedDishModal(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Order Tracker Modal */}
      {activeOrderTracker && (
        <OrderTrackerModal
          order={activeOrderTracker}
          onClose={() => setActiveOrderTracker(null)}
        />
      )}

      {/* Bookings List Modal */}
      <BookingsListModal
        isOpen={isBookingsModalOpen}
        onClose={() => setIsBookingsModalOpen(false)}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
        onOpenNewBooking={() => {
          setIsBookingsModalOpen(false);
          setActiveTab('booking');
        }}
      />

      {/* Floating Active Order Shortcut (if user has active orders) */}
      {orders.length > 0 && !activeOrderTracker && (
        <div className="fixed bottom-6 left-6 z-40">
          <button
            onClick={() => setActiveOrderTracker(orders[0])}
            className="flex items-center gap-2.5 px-4 py-2.5 bg-zinc-900/90 hover:bg-zinc-800 backdrop-blur-md border border-amber-400/40 text-xs font-semibold text-white rounded-full shadow-lg transition-all hover:scale-105 cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Track Order ({orders[0].orderCode})</span>
          </button>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
          <div className="flex items-center gap-2.5 px-4 py-3 bg-zinc-900 border border-zinc-700 text-xs font-medium text-white rounded-xl shadow-2xl">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
            <button
              onClick={() => setIsCartOpen(true)}
              className="text-amber-400 hover:underline font-bold ml-2 cursor-pointer"
            >
              View Bag
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
