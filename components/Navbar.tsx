'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Heart, Shield, User as UserIcon, LayoutDashboard, Key, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { AuthModal } from './AuthModal';
import { CartDrawer } from './CartDrawer';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, role, cart, wishlist, logout, setRole } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { href: '/', label: 'STOREFRONT' },
    { href: '/catalog', label: 'CATALOG' },
    { href: '/catalog?badge=limited', label: 'LIMITED KEYS' },
    { href: '/catalog?badge=new', label: 'NEW RELEASES' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo - Luxury Chronoswiss-inspired styling */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-accent/40 bg-surface flex items-center justify-center group-hover:border-accent group-hover:shadow-copper transition-all">
              <span className="text-accent font-extrabold tracking-widest text-lg">G</span>
            </div>
            <div className="flex flex-col">
              <span className="text-primary font-display font-light text-xl tracking-[0.2em] group-hover:text-accent transition-colors">
                GAME<span className="text-accent font-semibold">NEST</span>
              </span>
              <span className="text-[9px] text-accent font-mono uppercase tracking-[0.3em]">
                PREMIUM MARKETPLACE
              </span>
            </div>
          </Link>

          {/* Center Category Links - Uppercase tracked out text */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-semibold tracking-widest-luxury transition-all relative py-1 ${
                    isActive
                      ? 'text-accent'
                      : 'text-primary-muted hover:text-primary'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent shadow-copper" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Menu Controls */}
          <div className="flex items-center space-x-5">
            {/* Currency Indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border border-surface-border bg-surface/50 text-[10px] text-primary-muted font-mono tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>USD $</span>
            </div>

            {/* Role Badge (Quick Toggle indicator) */}
            <div className="hidden lg:flex items-center bg-surface border border-accent/30 rounded-full px-2.5 py-1">
              <span className="text-[10px] text-primary-muted uppercase tracking-wider mr-2">Role:</span>
              <button
                onClick={() => setRole(role === 'seller' ? 'customer' : 'seller')}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all uppercase tracking-wider ${
                  role === 'seller'
                    ? 'bg-amber-600/30 text-amber-300 border border-amber-500/50'
                    : 'bg-accent/20 text-accent border border-accent/40'
                }`}
                title="Click to toggle role preview"
              >
                {role}
              </button>
            </div>

            {/* Wishlist Link */}
            <Link
              href="/catalog?wishlist=true"
              className="relative p-2 text-primary-muted hover:text-accent transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-accent text-[#0a0a0a] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-primary-muted hover:text-accent transition-colors"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-accent text-[#0a0a0a] text-[10px] font-bold rounded-full flex items-center justify-center shadow-copper">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile / Auth Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-surface-border bg-surface hover:border-accent/40 transition-all text-xs"
                >
                  <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/40 text-accent font-bold flex items-center justify-center text-[11px]">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden sm:inline font-medium tracking-wide text-primary max-w-[100px] truncate">
                    {user.name}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-surface-card border border-surface-border rounded-xl shadow-panel py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-surface-border">
                      <p className="text-xs font-semibold text-primary">{user.name}</p>
                      <p className="text-[10px] text-primary-muted truncate">{user.email}</p>
                      <div className="mt-1 flex items-center gap-1">
                        <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-accent/15 text-accent font-mono">
                          {role}
                        </span>
                      </div>
                    </div>

                    {role === 'seller' && (
                      <Link
                        href="/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs text-primary-muted hover:text-accent hover:bg-surface-hover transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Seller Dashboard
                      </Link>
                    )}

                    <Link
                      href="/orders"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-primary-muted hover:text-accent hover:bg-surface-hover transition-colors"
                    >
                      <Key className="w-4 h-4" />
                      My Digital Keys & Orders
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-rose-400 hover:bg-rose-500/10 transition-colors border-t border-surface-border mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="btn-copper-outline text-xs"
              >
                SIGN IN
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
