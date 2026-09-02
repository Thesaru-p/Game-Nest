'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppUser, UserRole, CartItem, Game } from '@/lib/types';
import { DEMO_USERS } from '@/lib/mock-data';
import { StoreService } from '@/lib/store-service';
import { account } from '@/lib/appwrite';

interface AuthContextType {
  user: AppUser | null;
  role: UserRole;
  cart: CartItem[];
  wishlist: string[];
  toast: string | null;
  setRole: (role: UserRole) => void;
  loginDemo: (role: UserRole) => void;
  logout: () => void;
  addToCart: (game: Game) => void;
  removeFromCart: (gameId: string) => void;
  toggleWishlist: (gameId: string) => void;
  showToast: (msg: string) => void;
  refreshCart: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(DEMO_USERS.customer);
  const [role, setRoleState] = useState<UserRole>('customer');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    // Check local user session
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('gamenest_user_session');
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);
          setRoleState(parsed.role || 'customer');
        } catch {
          setUser(DEMO_USERS.customer);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      setCart(StoreService.getCart(user.userId));
      setWishlist(StoreService.getWishlist(user.userId));
    }
  }, [user]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (user) {
      const updatedUser: AppUser = { ...user, role: newRole };
      setUser(updatedUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('gamenest_user_session', JSON.stringify(updatedUser));
      }
    }
  };

  const loginDemo = (selectedRole: UserRole) => {
    const demoUser = selectedRole === 'seller' ? DEMO_USERS.seller : DEMO_USERS.customer;
    setUser(demoUser);
    setRoleState(selectedRole);
    if (typeof window !== 'undefined') {
      localStorage.setItem('gamenest_user_session', JSON.stringify(demoUser));
    }
    showToast(`Signed in as ${demoUser.name} (${selectedRole.toUpperCase()})`);
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('gamenest_user_session');
    }
    showToast('Logged out successfully');
  };

  const addToCart = (game: Game) => {
    const activeUserId = user ? user.userId : 'guest-user';
    const updatedCart = StoreService.addToCart(activeUserId, game);
    setCart([...updatedCart]);
    showToast(`Added "${game.title}" to cart`);
  };

  const removeFromCart = (gameId: string) => {
    const activeUserId = user ? user.userId : 'guest-user';
    const updatedCart = StoreService.removeFromCart(activeUserId, gameId);
    setCart([...updatedCart]);
  };

  const toggleWishlist = (gameId: string) => {
    const activeUserId = user ? user.userId : 'guest-user';
    const updatedWishlist = StoreService.toggleWishlist(activeUserId, gameId);
    setWishlist([...updatedWishlist]);
    const added = updatedWishlist.includes(gameId);
    showToast(added ? 'Saved to Wishlist' : 'Removed from Wishlist');
  };

  const refreshCart = () => {
    const activeUserId = user ? user.userId : 'guest-user';
    setCart(StoreService.getCart(activeUserId));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        cart,
        wishlist,
        toast,
        setRole,
        loginDemo,
        logout,
        addToCart,
        removeFromCart,
        toggleWishlist,
        showToast,
        refreshCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
