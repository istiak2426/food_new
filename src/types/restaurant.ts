export type Category = 
  | 'all'
  | 'starters'
  | 'soups'
  | 'sizzling'
  | 'poultry_beef'
  | 'seafood'
  | 'rice_noodles'
  | 'set_menus'
  | 'desserts_beverages';

export type SpiceLevel = 'Non-Spicy' | 'Mild' | 'Medium' | 'Szechuan Fiery';

export interface PortionOption {
  id: string;
  label: string;
  portionRatio: string; // e.g., '1:2' (serves 2) or '1:4' (serves 4)
  serves: string;
  price: number; // in BDT ৳
}

export interface MenuItem {
  id: string;
  name: string;
  bengaliName?: string;
  category: Category;
  description: string;
  price: number; // standard base price in BDT
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  isSpicy?: boolean;
  defaultSpiceLevel: SpiceLevel;
  availableSpiceLevels: SpiceLevel[];
  portionOptions: PortionOption[];
  isBestSeller?: boolean;
  isChefSpecial?: boolean;
  ingredients: string[];
  preparationTimeMinutes: number;
  caloriesApprox?: number;
}

export interface CartItem {
  cartItemId: string; // unique cart item instance ID (item + portion + spice)
  menuItemId: string;
  name: string;
  bengaliName?: string;
  image: string;
  price: number; // calculated item price for the selected portion
  portion: PortionOption;
  spiceLevel: SpiceLevel;
  quantity: number;
  specialInstructions?: string;
}

export type SeatingZone = 'jade_pavilion' | 'amber_terrace' | 'imperial_vip' | 'lotus_corner';

export type OccasionType = 'Family Gathering' | 'Birthday Party' | 'Anniversary Dinner' | 'Business Dining' | 'Casual Meal' | 'Banquet Feast';

export interface TableBooking {
  id: string;
  bookingCode: string;
  guestName: string;
  phone: string;
  email: string;
  guestsCount: number;
  date: string;
  timeSlot: string;
  seatingZone: SeatingZone;
  occasion: OccasionType;
  specialRequests?: string;
  createdAt: string;
  status: 'confirmed' | 'seated' | 'completed' | 'cancelled';
}

export type OrderStatus = 'received' | 'preparing' | 'wok_sizzling' | 'out_for_delivery' | 'delivered';

export interface Order {
  id: string;
  orderCode: string;
  customerName: string;
  phone: string;
  email?: string;
  deliveryType: 'delivery' | 'takeaway';
  deliveryArea?: string;
  deliveryAddress?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  vat: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentMethod: 'cash_on_delivery' | 'bkash_nagad' | 'pos_card';
  createdAt: string;
  estimatedDeliveryMinutes: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  bengaliTitle?: string;
  category: 'culinary' | 'ambiance' | 'sizzling' | 'dimsum' | 'banquet';
  categoryLabel: string;
  description: string;
  image: string;
  dishId?: string;
  tagline: string;
}
