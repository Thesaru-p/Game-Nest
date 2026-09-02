export type UserRole = 'seller' | 'customer' | 'admin';

export interface AppUser {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  storeName?: string;
  createdAt: string;
}

export type GameBadge = 'limited' | 'new' | 'sale' | null;

export interface Game {
  gameId: string;
  sellerId: string;
  sellerName?: string;
  title: string;
  subtitle?: string;
  description: string;
  genre: string; // 'Action RPG', 'Sci-Fi Cyberpunk', 'Strategy', 'Adventure', 'Racing', etc.
  platform: string; // 'PC (Steam)', 'PlayStation 5', 'Xbox Series X', 'Nintendo Switch'
  price: number;
  originalPrice?: number;
  coverImage: string;
  badge: GameBadge;
  stock: number;
  status: 'active' | 'removed';
  createdAt: string;
  rating?: number;
  publisher?: string;
  releaseDate?: string;
  features?: string[];
  systemReqs?: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
}

export interface CartItem {
  cartItemId: string;
  customerId: string;
  gameId: string;
  game: Game;
  quantity: number;
}

export interface OrderItem {
  gameId: string;
  title: string;
  price: number;
  coverImage: string;
  digitalKey: string;
  platform: string;
}

export interface Order {
  orderId: string;
  customerId: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  status: 'completed' | 'pending' | 'cancelled';
  createdAt: string;
  paymentMethod: string;
}

export interface WishlistItem {
  wishlistItemId: string;
  customerId: string;
  gameId: string;
}
