'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { ShoppingBag, Heart, User, ShieldCheck, X, Menu, Sparkles } from 'lucide-react';
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
    { href: '/about', label: 'About Us' },
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
      <header className="sticky top-0 z-40 w-full bg-[#6C6CEB] border-b-3 border-[#1A1A1A] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo - Top Left */}
          <Link href="/" className="flex items-center gap-3 group relative">
            <div className="h-14 w-auto flex items-center justify-center transition-transform group-hover:scale-105">
              <img
                src="/images/logo.png"
                alt="Game Nest Logo"
                className="h-12 w-auto object-contain drop-shadow-[2px_2px_0px_#1A1A1A]"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-2 bg-[#F5F4FF] border-2.5 border-[#1A1A1A] px-4 py-1.5 rounded-full shadow-sticker-sm">
            {navLinks.map((link) => {
              const isActive = getIsActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase transition-all ${
                    isActive
                      ? 'bg-[#F4A6C6] text-[#1A1A1A] border-2 border-[#1A1A1A] shadow-sticker-sm scale-105'
                      : 'text-[#1A1A1A] hover:bg-[#F3E29B] hover:border-2 hover:border-[#1A1A1A]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Role Selector */}
          <div className="flex items-center space-x-3">
            
            {/* Customer vs Seller Role Switcher */}
            <button
              onClick={() => setRole(role === 'customer' ? 'seller' : 'customer')}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F3E29B] border-2.5 border-[#1A1A1A] text-xs font-extrabold text-[#1A1A1A] shadow-sticker-sm hover:translate-y-[-1px] transition-all"
              title="Toggle Customer or Seller Portal view"
            >
              <span className="text-[10px] uppercase font-bold text-[#1A1A1A]/70">ROLE:</span>
              <span className="font-extrabold uppercase text-[#1A1A1A] underline decoration-[#F4A6C6] decoration-2">
                {role}
              </span>
            </button>

            {/* Wishlist Icon */}
            <Link
              href="/catalog?wishlist=true"
              className="relative p-2.5 rounded-full bg-[#F5F4FF] border-2.5 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#F4A6C6] shadow-sticker-sm transition-all"
              title="My Wishlist"
            >
              <Heart className="w-4 h-4 fill-rose-300 stroke-[#1A1A1A] stroke-[2.5]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#F4A6C6] border-2 border-[#1A1A1A] text-[#1A1A1A] text-[10px] font-extrabold flex items-center justify-center shadow-sticker-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-[#F3E29B] border-2.5 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#F4A6C6] shadow-sticker-sm transition-all"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 stroke-[#1A1A1A] stroke-[2.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#A9E8D6] border-2 border-[#1A1A1A] text-[#1A1A1A] text-[10px] font-extrabold flex items-center justify-center shadow-sticker-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account / Auth Modal Trigger */}
            {user ? (
              <div className="flex items-center gap-2 pl-1">
                {role === 'seller' && (
                  <Link
                    href="/dashboard"
                    className="hidden sm:flex items-center gap-1 text-xs font-extrabold text-[#1A1A1A] bg-[#A9E8D6] border-2.5 border-[#1A1A1A] px-3 py-1.5 rounded-full shadow-sticker-sm hover:scale-105 transition-all"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Dashboard
                  </Link>
                )}

                <Link
                  href="/orders"
                  className="hidden sm:flex items-center gap-2 text-xs font-bold text-[#1A1A1A] bg-[#F5F4FF] border-2.5 border-[#1A1A1A] px-3 py-1.5 rounded-full shadow-sticker-sm hover:bg-[#F4A6C6] transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-[#F4A6C6] border-2 border-[#1A1A1A] flex items-center justify-center font-extrabold text-xs text-[#1A1A1A]">
                    {user.name.charAt(0)}
                  </div>
                  <span className="max-w-[80px] truncate">{user.name}</span>
                </Link>

                <button
                  onClick={logout}
                  className="text-[11px] font-extrabold text-[#1A1A1A] bg-[#F5F4FF] hover:bg-rose-300 border-2 border-[#1A1A1A] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sticker-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="btn-pill-pink text-xs py-2 px-5 font-extrabold flex items-center gap-1.5"
              >
                <User className="w-4 h-4 stroke-[2.5]" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-[#F5F4FF] border-2 border-[#1A1A1A] text-[#1A1A1A]"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#F5F4FF] border-t-2.5 border-[#1A1A1A] px-4 pt-3 pb-6 space-y-3">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-extrabold text-[#1A1A1A] bg-[#FFFFFF] border-2 border-[#1A1A1A] rounded-xl px-4 py-2 hover:bg-[#F4A6C6]"
                >
                  {link.label}
                </Link>
              ))}
              {role === 'seller' && (
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-extrabold text-[#1A1A1A] bg-[#A9E8D6] border-2 border-[#1A1A1A] rounded-xl px-4 py-2"
                >
                  Seller Dashboard
                </Link>
              )}
              <Link
                href="/orders"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-extrabold text-[#1A1A1A] bg-[#F3E29B] border-2 border-[#1A1A1A] rounded-xl px-4 py-2"
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
    <Suspense fallback={<div className="h-20 bg-[#6C6CEB] border-b-3 border-[#1A1A1A]" />}>
      <NavbarContent />
    </Suspense>
  );
}
