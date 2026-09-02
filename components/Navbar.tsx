'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ShoppingBag, Heart, User, ShieldCheck, Gamepad2, X, Menu } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { AuthModal } from './AuthModal';
import { CartDrawer } from './CartDrawer';

function NavbarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentBadge = searchParams.get('badge');

  const { user, role, setRole, cart, wishlist, logout } = useAuth();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/catalog', label: 'Catalog' },
    { href: '/catalog?badge=limited', label: 'Limited Keys' },
    { href: '/catalog?badge=new', label: 'New Releases' },
  ];

  const getIsActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '/catalog') return pathname === '/catalog' && !currentBadge;
    if (href === '/catalog?badge=limited') return pathname === '/catalog' && currentBadge === 'limited';
    if (href === '/catalog?badge=new') return pathname === '/catalog' && currentBadge === 'new';
    return pathname === href;
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0a0a0a]/90 border-b border-surface-border/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/30 to-amber-900/40 border border-accent/40 flex items-center justify-center text-accent font-bold text-lg group-hover:border-accent transition-all shadow-copper">
              <Gamepad2 className="w-5 h-5 text-accent" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold tracking-tight text-primary uppercase">
                GAME<span className="text-accent">NEST</span>
              </span>
              <span className="text-[9px] font-mono text-primary-muted tracking-wider uppercase">
                Digital Game Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold tracking-wide">
            {navLinks.map((link) => {
              const isActive = getIsActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors py-1 relative ${
                    isActive ? 'text-accent font-bold' : 'text-primary-muted hover:text-primary'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Role Selector */}
          <div className="flex items-center space-x-4">
            
            {/* Customer vs Seller Role Switcher */}
            <button
              onClick={() => setRole(role === 'customer' ? 'seller' : 'customer')}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-surface-border text-[11px] font-mono text-primary-muted hover:border-accent/50 transition-all"
              title="Toggle Customer or Seller Portal view"
            >
              <span className="text-[10px] text-primary-muted uppercase">Role:</span>
              <span className={`font-bold uppercase ${role === 'seller' ? 'text-amber-400' : 'text-accent'}`}>
                {role}
              </span>
            </button>

            {/* Wishlist Icon */}
            <Link
              href="/catalog?wishlist=true"
              className="relative p-2 text-primary-muted hover:text-rose-400 transition-colors"
              title="My Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-primary-muted hover:text-accent transition-colors"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-accent text-[#0a0a0a] text-[9px] font-extrabold flex items-center justify-center shadow-copper">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account / Auth Modal Trigger */}
            {user ? (
              <div className="flex items-center gap-3 pl-2 border-l border-surface-border">
                {role === 'seller' && (
                  <Link
                    href="/dashboard"
                    className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-full hover:bg-amber-500/20 transition-all"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Dashboard
                  </Link>
                )}

                <Link
                  href="/orders"
                  className="hidden sm:flex items-center gap-2 text-xs font-medium text-primary hover:text-accent transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-surface border border-surface-border flex items-center justify-center font-bold text-xs text-accent">
                    {user.name.charAt(0)}
                  </div>
                  <span className="max-w-[100px] truncate">{user.name}</span>
                </Link>

                <button
                  onClick={logout}
                  className="text-[11px] font-mono text-primary-muted hover:text-rose-400 uppercase tracking-wider"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="btn-copper-pill text-xs py-2 px-5 font-bold flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-primary-muted hover:text-primary"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0a0a0a] border-b border-surface-border px-4 pt-2 pb-6 space-y-4">
            <div className="flex flex-col space-y-3 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium text-primary hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
              {role === 'seller' && (
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-bold text-amber-400"
                >
                  Seller Dashboard
                </Link>
              )}
              <Link
                href="/orders"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium text-primary hover:text-accent"
              >
                My Orders & Keys
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal & Cart Drawer */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export function Navbar() {
  return (
    <Suspense fallback={<div className="h-20 bg-[#0a0a0a] border-b border-surface-border" />}>
      <NavbarContent />
    </Suspense>
  );
}
