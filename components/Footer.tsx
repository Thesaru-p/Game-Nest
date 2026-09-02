'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Zap, Lock, Headphones } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#080808] border-t border-surface-border mt-24">
      {/* Guarantees bar */}
      <div className="border-b border-surface-border/50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-widest text-primary uppercase">INSTANT DELIVERY</h4>
              <p className="text-[11px] text-primary-muted mt-0.5">Digital keys issued within seconds</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-widest text-primary uppercase">100% OFFICIAL KEYS</h4>
              <p className="text-[11px] text-primary-muted mt-0.5">Directly sourced from verified sellers</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-widest text-primary uppercase">SECURE CHECKOUT</h4>
              <p className="text-[11px] text-primary-muted mt-0.5">Encrypted payment & Appwrite Auth</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-widest text-primary uppercase">24/7 VIP SUPPORT</h4>
              <p className="text-[11px] text-primary-muted mt-0.5">Dedicated concierge gaming team</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full border border-accent bg-surface flex items-center justify-center">
              <span className="text-accent font-extrabold text-sm">G</span>
            </div>
            <span className="text-primary font-display font-light text-xl tracking-[0.2em]">
              GAME<span className="text-accent font-semibold">NEST</span>
            </span>
          </div>
          <p className="text-xs text-primary-muted leading-relaxed max-w-sm">
            Curated premium video game marketplace. Connecting verified luxury sellers with discerning players across all platforms.
          </p>
          <div className="mt-6 flex items-center space-x-3 text-xs text-accent">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span className="tracking-widest uppercase text-[10px] font-mono">CHRONOSWISS-INSPIRED DESIGN SYSTEM</span>
          </div>
        </div>

        <div>
          <h5 className="text-[11px] font-bold text-accent tracking-[0.25em] uppercase mb-4">MARKETPLACE</h5>
          <ul className="space-y-2.5 text-xs text-primary-muted">
            <li><Link href="/catalog" className="hover:text-primary transition-colors">Browse Catalog</Link></li>
            <li><Link href="/catalog?badge=limited" className="hover:text-primary transition-colors">Limited Collector Keys</Link></li>
            <li><Link href="/catalog?badge=new" className="hover:text-primary transition-colors">New Releases</Link></li>
            <li><Link href="/catalog?badge=sale" className="hover:text-primary transition-colors">On Sale & Deals</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="text-[11px] font-bold text-accent tracking-[0.25em] uppercase mb-4">FOR SELLERS</h5>
          <ul className="space-y-2.5 text-xs text-primary-muted">
            <li><Link href="/dashboard" className="hover:text-primary transition-colors">Seller Dashboard</Link></li>
            <li><Link href="/dashboard" className="hover:text-primary transition-colors">List New Game</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Verification Process</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Payout System</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="text-[11px] font-bold text-accent tracking-[0.25em] uppercase mb-4">LEGAL & TRUST</h5>
          <ul className="space-y-2.5 text-xs text-primary-muted">
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Digital Delivery Terms</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Appwrite Security</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-surface-border/40 py-6 text-center text-[11px] text-primary-dark">
        © {new Date().getFullYear()} Game-Nest Marketplace. All rights reserved. Powered by Next.js & Appwrite.
      </div>
    </footer>
  );
};
