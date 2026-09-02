'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Share2, Sparkles, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { Game } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';

interface HeroFeaturedProps {
  game: Game;
}

export const HeroFeatured: React.FC<HeroFeaturedProps> = ({ game }) => {
  const { wishlist, toggleWishlist, addToCart, showToast } = useAuth();
  const isWishlisted = wishlist.includes(game.gameId);

  const handleShare = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard?.writeText(window.location.origin + '/game/' + game.gameId);
      showToast('Game detail link copied to clipboard!');
    }
  };

  return (
    <section className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden py-12 px-4 sm:px-6 lg:px-8 border-b border-surface-border/40 bg-[#0a0a0a]">
      {/* Background Soft Ambient Radial Amber Glow */}
      <div className="absolute inset-0 amber-glow-hero pointer-events-none" />

      <div className="relative max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Column: Headline, Title & Subtitle */}
        <div className="lg:col-span-5 space-y-6 text-left">
          {/* Tracked Luxury Category Header */}
          <div className="flex items-center space-x-3 text-[10px] font-mono tracking-widest text-accent uppercase">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-copper" />
            <span>FEATURED SHOWCASE</span>
            <span>/</span>
            <span>{game.genre}</span>
          </div>

          <div>
            {/* Small uppercase label for metadata */}
            <div className="inline-block mb-3 px-3 py-1 rounded-full border border-amber-500/40 bg-amber-500/10 text-[10px] font-bold text-amber-300 uppercase tracking-[0.2em] shadow-sm">
              ⚡ {game.badge === 'limited' ? `LIMITED EDITION (${game.stock} COPIES)` : 'EXCLUSIVE DIGITAL KEY'}
            </div>

            {/* Display Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-light text-primary tracking-tight leading-tight">
              {game.title}
            </h1>
            {game.subtitle && (
              <p className="text-sm sm:text-base font-mono text-accent/90 uppercase tracking-widest mt-2">
                {game.subtitle}
              </p>
            )}
          </div>

          <p className="text-xs sm:text-sm text-primary-muted leading-relaxed line-clamp-3 max-w-xl">
            {game.description}
          </p>

          {/* Publisher & System Meta */}
          <div className="grid grid-cols-2 gap-4 py-3 border-y border-surface-border/50 text-xs">
            <div>
              <span className="text-[10px] text-primary-muted uppercase tracking-widest block">PUBLISHER</span>
              <span className="font-semibold text-primary">{game.publisher || 'Chronos Studio'}</span>
            </div>
            <div>
              <span className="text-[10px] text-primary-muted uppercase tracking-widest block">PLATFORM</span>
              <span className="font-mono text-accent font-semibold">{game.platform}</span>
            </div>
          </div>

          {/* Price & BUY NOW Floating Pill Button */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-primary-muted font-mono uppercase tracking-widest">PRICE</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-accent">${game.price.toFixed(2)}</span>
                {game.originalPrice && (
                  <span className="text-sm text-primary-muted line-through">${game.originalPrice.toFixed(2)}</span>
                )}
              </div>
            </div>

            <button
              onClick={() => addToCart(game)}
              className="btn-copper-pill flex items-center gap-3 text-xs py-4 px-8"
            >
              <span>BUY NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Hero Full-Bleed Product Artwork Display with Soft Ambient Glow & Floating Icons */}
        <div className="lg:col-span-7 relative flex items-center justify-center">
          
          {/* Ambient Glow behind cover art */}
          <div className="absolute w-[80%] h-[80%] rounded-full bg-accent/25 blur-3xl -z-10 animate-pulse-glow" />

          {/* Centered Product Image Panel */}
          <div className="relative w-full max-w-lg aspect-[4/5] rounded-3xl overflow-hidden border border-surface-border shadow-2xl group bg-surface">
            <Image
              src={game.coverImage}
              alt={game.title}
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/40 opacity-80" />

            {/* Floating Action Icons Floating Top-Right of Image */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <button
                onClick={() => toggleWishlist(game.gameId)}
                className={`p-3 rounded-full backdrop-blur-md border transition-all ${
                  isWishlisted
                    ? 'bg-rose-500/20 border-rose-500 text-rose-400 shadow-copper'
                    : 'bg-black/60 border-white/15 text-primary-muted hover:text-rose-400'
                }`}
                title="Wishlist Game"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-3 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-primary-muted hover:text-accent transition-all"
                title="Share Game"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Price Pill Floating Bottom-Left of Image */}
            <div className="absolute bottom-6 left-6 z-20 bg-black/80 backdrop-blur-md border border-accent/40 rounded-full px-5 py-2.5 flex items-center gap-3 shadow-copper">
              <span className="text-[10px] text-accent font-mono uppercase tracking-widest">DIGITAL KEY</span>
              <span className="text-sm font-extrabold text-primary">${game.price.toFixed(2)}</span>
            </div>

            {/* Bottom-Right Details Link */}
            <div className="absolute bottom-6 right-6 z-20">
              <Link
                href={`/game/${game.gameId}`}
                className="btn-copper-outline text-[10px] px-4 py-2 bg-black/80 backdrop-blur-md"
              >
                VIEW SPECS
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
