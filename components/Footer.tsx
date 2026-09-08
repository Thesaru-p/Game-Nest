'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Zap, Lock, Headphones, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#6C6CEB] border-t-3 border-[#1A1A1A] mt-20 relative overflow-hidden">
      {/* Coiled Cable Divider Motif SVG */}
      <div className="w-full h-8 bg-[#B4B3E6] border-b-2.5 border-[#1A1A1A] flex items-center justify-center overflow-hidden">
        <div className="flex items-center gap-6 opacity-75">
          {[...Array(12)].map((_, i) => (
            <svg key={i} width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 8C6 2 12 2 16 8C20 14 26 14 30 8C34 2 38 2 40 8" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          ))}
        </div>
      </div>

      {/* Guarantees Bar in Sticker Cards */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#F3E29B] border-2.5 border-[#1A1A1A] rounded-2xl p-5 shadow-sticker-md flex items-center gap-4 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-xl bg-[#FFFFFF] border-2 border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] shadow-sticker-sm">
              <Zap className="w-6 h-6 fill-[#F3E29B]" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-[#1A1A1A] uppercase tracking-wide">INSTANT DISPATCH</h4>
              <p className="text-[11px] font-medium text-[#1A1A1A]/80 mt-0.5">Keys issued in seconds</p>
            </div>
          </div>

          <div className="bg-[#F4A6C6] border-2.5 border-[#1A1A1A] rounded-2xl p-5 shadow-sticker-md flex items-center gap-4 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-xl bg-[#FFFFFF] border-2 border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] shadow-sticker-sm">
              <ShieldCheck className="w-6 h-6 fill-[#F4A6C6]" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-[#1A1A1A] uppercase tracking-wide">100% OFFICIAL KEYS</h4>
              <p className="text-[11px] font-medium text-[#1A1A1A]/80 mt-0.5">Direct publisher sourcing</p>
            </div>
          </div>

          <div className="bg-[#A9E8D6] border-2.5 border-[#1A1A1A] rounded-2xl p-5 shadow-sticker-md flex items-center gap-4 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-xl bg-[#FFFFFF] border-2 border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] shadow-sticker-sm">
              <Lock className="w-6 h-6 fill-[#A9E8D6]" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-[#1A1A1A] uppercase tracking-wide">SAFE CHECKOUT</h4>
              <p className="text-[11px] font-medium text-[#1A1A1A]/80 mt-0.5">Encrypted transaction vault</p>
            </div>
          </div>

          <div className="bg-[#F5F4FF] border-2.5 border-[#1A1A1A] rounded-2xl p-5 shadow-sticker-md flex items-center gap-4 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-xl bg-[#F4A6C6] border-2 border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] shadow-sticker-sm">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-[#1A1A1A] uppercase tracking-wide">24/7 GAMER SUPPORT</h4>
              <p className="text-[11px] font-medium text-[#1A1A1A]/80 mt-0.5">Round the clock assistance</p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="mt-12 pt-8 border-t-2.5 border-[#1A1A1A] grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <img
                src="/images/logo.png"
                alt="Game Nest Logo"
                className="h-16 w-auto object-contain drop-shadow-[3px_3px_0px_#1A1A1A]"
              />
            </Link>
            <p className="text-xs font-medium text-white max-w-sm leading-relaxed drop-shadow-[1px_1px_0px_#1A1A1A]">
              The ultimate Y2K retro-inspired digital key marketplace. Connecting verified sellers with discerning players across all platforms.
            </p>
            <div className="inline-flex items-center gap-2 bg-[#F3E29B] border-2 border-[#1A1A1A] px-3 py-1 rounded-full text-[10px] font-extrabold text-[#1A1A1A] shadow-sticker-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>RETRO GAMING BRAND SYSTEM v2.0</span>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-extrabold text-[#1A1A1A] tracking-wider uppercase mb-3 bg-[#F4A6C6] border-2 border-[#1A1A1A] inline-block px-3 py-1 rounded-full shadow-sticker-sm">
              MARKETPLACE
            </h5>
            <ul className="space-y-2 text-xs font-bold text-white">
              <li><Link href="/catalog" className="hover:underline decoration-[#F3E29B] decoration-2">Browse Catalog</Link></li>
              <li><Link href="/catalog?badge=limited" className="hover:underline decoration-[#F4A6C6] decoration-2">Limited Collector Keys</Link></li>
              <li><Link href="/catalog?badge=new" className="hover:underline decoration-[#A9E8D6] decoration-2">New Releases</Link></li>
              <li><Link href="/catalog?badge=sale" className="hover:underline decoration-[#F3E29B] decoration-2">On Sale & Deals</Link></li>
              <li><Link href="/about" className="hover:underline decoration-[#F4A6C6] decoration-2">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-extrabold text-[#1A1A1A] tracking-wider uppercase mb-3 bg-[#F3E29B] border-2 border-[#1A1A1A] inline-block px-3 py-1 rounded-full shadow-sticker-sm">
              FOR SELLERS
            </h5>
            <ul className="space-y-2 text-xs font-bold text-white">
              <li><Link href="/dashboard" className="hover:underline decoration-[#F4A6C6] decoration-2">Seller Dashboard</Link></li>
              <li><Link href="/dashboard" className="hover:underline decoration-[#A9E8D6] decoration-2">List New Game</Link></li>
              <li><Link href="#" className="hover:underline decoration-[#F3E29B] decoration-2">Verification Process</Link></li>
              <li><Link href="#" className="hover:underline decoration-[#F4A6C6] decoration-2">Payout System</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-extrabold text-[#1A1A1A] tracking-wider uppercase mb-3 bg-[#A9E8D6] border-2 border-[#1A1A1A] inline-block px-3 py-1 rounded-full shadow-sticker-sm">
              LEGAL & TRUST
            </h5>
            <ul className="space-y-2 text-xs font-bold text-white">
              <li><a href="#" className="hover:underline decoration-[#F4A6C6] decoration-2">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline decoration-[#F3E29B] decoration-2">Terms of Service</a></li>
              <li><a href="#" className="hover:underline decoration-[#A9E8D6] decoration-2">Digital Delivery Terms</a></li>
              <li><a href="#" className="hover:underline decoration-[#F4A6C6] decoration-2">Appwrite Security</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t-2 border-[#1A1A1A] text-center text-xs font-extrabold text-white">
          © {new Date().getFullYear()} Game Nest Marketplace. All rights reserved. Powered by Next.js & Appwrite.
        </div>
      </div>
    </footer>
  );
};
