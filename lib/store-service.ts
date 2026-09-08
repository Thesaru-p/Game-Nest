import { Game, CartItem, Order, WishlistItem, AppUser, UserRole } from './types';
import { INITIAL_GAMES, DEMO_USERS } from './mock-data';
import { databases, APPWRITE_CONFIG } from './appwrite';
import { ID, Query } from 'appwrite';

const GAMES_KEY = 'gamenest_games_v2';
const CART_KEY = 'gamenest_cart_v1';
const ORDERS_KEY = 'gamenest_orders_v1';
const WISHLIST_KEY = 'gamenest_wishlist_v1';

// Helper to check if Appwrite is initialized & configured
const isAppwriteReady = () => {
  return (
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID &&
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID !== 'game-nest-project'
  );
};

export const StoreService = {
  // Get all active games
  async getGames(): Promise<Game[]> {
    if (isAppwriteReady()) {
      try {
        const response = await databases.listDocuments(
          APPWRITE_CONFIG.databaseId,
          APPWRITE_CONFIG.collections.games,
          [Query.equal('status', 'active')]
        );
        return response.documents as unknown as Game[];
      } catch (err) {
        console.warn('Appwrite list error, falling back to local storage:', err);
      }
    }

    if (typeof window === 'undefined') return INITIAL_GAMES;

    const stored = localStorage.getItem(GAMES_KEY);
    if (!stored) {
      localStorage.setItem(GAMES_KEY, JSON.stringify(INITIAL_GAMES));
      return INITIAL_GAMES;
    }
    try {
      const parsed: Game[] = JSON.parse(stored);
      return parsed.filter(g => g.status === 'active');
    } catch {
      return INITIAL_GAMES;
    }
  },

  // Get single game by ID
  async getGameById(id: string): Promise<Game | null> {
    const games = await this.getGames();
    return games.find(g => g.gameId === id) || null;
  },

  // Add/Create new game listing (Seller feature)
  async createGame(gameData: Omit<Game, 'gameId' | 'createdAt' | 'status'>): Promise<Game> {
    const newGame: Game = {
      ...gameData,
      gameId: 'game-' + Date.now(),
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    if (isAppwriteReady()) {
      try {
        const response = await databases.createDocument(
          APPWRITE_CONFIG.databaseId,
          APPWRITE_CONFIG.collections.games,
          ID.unique(),
          newGame
        );
        return response as unknown as Game;
      } catch (err) {
        console.warn('Appwrite create error, saving locally:', err);
      }
    }

    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(GAMES_KEY);
      const list: Game[] = stored ? JSON.parse(stored) : [...INITIAL_GAMES];
      list.unshift(newGame);
      localStorage.setItem(GAMES_KEY, JSON.stringify(list));
    }
    return newGame;
  },

  // Delete/Remove game listing (Seller feature)
  async deleteGame(gameId: string): Promise<boolean> {
    if (isAppwriteReady()) {
      try {
        await databases.updateDocument(
          APPWRITE_CONFIG.databaseId,
          APPWRITE_CONFIG.collections.games,
          gameId,
          { status: 'removed' }
        );
        return true;
      } catch (err) {
        console.warn('Appwrite delete error:', err);
      }
    }

    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(GAMES_KEY);
      if (stored) {
        const list: Game[] = JSON.parse(stored);
        const updated = list.map(g => (g.gameId === gameId ? { ...g, status: 'removed' as const } : g));
        localStorage.setItem(GAMES_KEY, JSON.stringify(updated));
      }
    }
    return true;
  },

  // Cart operations
  getCart(customerId: string): CartItem[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(CART_KEY + '_' + customerId);
    return stored ? JSON.parse(stored) : [];
  },

  addToCart(customerId: string, game: Game): CartItem[] {
    const cart = this.getCart(customerId);
    const existingIndex = cart.findIndex(ci => ci.gameId === game.gameId);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        cartItemId: 'ci-' + Date.now(),
        customerId,
        gameId: game.gameId,
        game,
        quantity: 1,
      });
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(CART_KEY + '_' + customerId, JSON.stringify(cart));
    }
    return cart;
  },

  removeFromCart(customerId: string, gameId: string): CartItem[] {
    const cart = this.getCart(customerId);
    const updated = cart.filter(ci => ci.gameId !== gameId);
    if (typeof window !== 'undefined') {
      localStorage.setItem(CART_KEY + '_' + customerId, JSON.stringify(updated));
    }
    return updated;
  },

  clearCart(customerId: string) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CART_KEY + '_' + customerId);
    }
  },

  // Wishlist operations
  getWishlist(customerId: string): string[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(WISHLIST_KEY + '_' + customerId);
    return stored ? JSON.parse(stored) : [];
  },

  toggleWishlist(customerId: string, gameId: string): string[] {
    let wishlist = this.getWishlist(customerId);
    if (wishlist.includes(gameId)) {
      wishlist = wishlist.filter(id => id !== gameId);
    } else {
      wishlist.push(gameId);
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(WISHLIST_KEY + '_' + customerId, JSON.stringify(wishlist));
    }
    return wishlist;
  },

  // Order Placement
  createOrder(customerId: string, customerEmail: string, items: CartItem[], total: number, paymentMethod: string): Order {
    const orderItems = items.map(ci => ({
      gameId: ci.gameId,
      title: ci.game.title,
      price: ci.game.price,
      coverImage: ci.game.coverImage,
      digitalKey: `GN-${ci.game.platform.slice(0, 2).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      platform: ci.game.platform,
    }));

    const newOrder: Order = {
      orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      customerId,
      customerEmail,
      items: orderItems,
      total,
      status: 'completed',
      createdAt: new Date().toISOString(),
      paymentMethod,
    };

    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(ORDERS_KEY + '_' + customerId);
      const orders: Order[] = stored ? JSON.parse(stored) : [];
      orders.unshift(newOrder);
      localStorage.setItem(ORDERS_KEY + '_' + customerId, JSON.stringify(orders));
      this.clearCart(customerId);
    }

    return newOrder;
  },

  getOrders(customerId: string): Order[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(ORDERS_KEY + '_' + customerId);
    return stored ? JSON.parse(stored) : [];
  },
};
