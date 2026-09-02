'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, Heart, ShieldCheck, Zap } from 'lucide-react';
import { Game } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';

interface HeroFeaturedProps {
  game: Game;
}

export function HeroFeatured({ game }: HeroFeaturedProps) {
  const { wishlist, toggleWishlist, addToCart } = useAuth();
  const isWishlisted = wishlist.includes(game.gameId);

  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0a] py-8 sm:py-12 border-b border-surface-border">
      
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface/80 border border-surface-border rounded-3xl p-6 sm:p-10 relative overflow-hidden backdrop-blur-md shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Info Column */}
            <div className="lg:col-span-6 space-y-6 text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                <SparklesIcon />
                <span>Featured Game of the Month</span>
              </div>

              <div>
                <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">
                  {game.genre} • {game.platform}
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-primary tracking-tight leading-tight">
                  {game.title}
                </h1>
                {game.subtitle && (
                  <p className="text-sm font-mono text-primary-muted mt-2">
                    {game.subtitle}
                  </p>
                )}
              </div>

              <p className="text-xs sm:text-sm text-primary-muted leading-relaxed line-clamp-3">
                {game.description}
              </p>

              {/* Price & Rating Row */}
              <div className="flex items-center gap-6 pt-2">
                <div>
                  <span className="text-[10px] text-primary-muted font-mono uppercase block">Digital Key Price</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold text-accent">${game.price.toFixed(2)}</span>
                    {game.originalPrice && (
                      <span className="text-sm text-primary-muted line-through">${game.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                </div>

                {game.rating && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold">{game.rating}</span>
                    <span className="text-[10px] text-primary-muted">/ 5.0</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => addToCart(game)}
                  className="btn-copper-pill text-xs py-3.5 px-8 font-bold flex items-center gap-2"
                >
                  <span>Buy Now (${game.price.toFixed(2)})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  href={`/game/${game.gameId}`}
                  className="btn-copper-outline text-xs py-3 px-6 font-bold"
                >
                  View Details
                </Link>

                <button
                  onClick={() => toggleWishlist(game.gameId)}
                  className={`p-3 rounded-full border transition-all ${
                    isWishlisted
                      ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                      : 'bg-surface border-surface-border text-primary-muted hover:text-rose-400'
                  }`}
                  title="Save to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              {/* Instant Delivery Feature */}
              <div className="flex items-center gap-4 text-[11px] text-primary-muted font-mono pt-2 border-t border-surface-border/60">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-accent" />
                  <span>Instant Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                  <span>Official Key Guarantee</span>
                </div>
              </div>

            </div>

            {/* Right Product Image Column */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden border border-surface-border shadow-2xl bg-[#0a0a0a] group">
                <Image
                  src={game.coverImage}
                  alt={game.title}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
                
                {game.badge && (
                  <span className="absolute top-4 left-4 text-[10px] font-bold px-3 py-1 rounded-full bg-amber-600/90 text-amber-100 uppercase tracking-wider">
                    {game.badge}
                  </span>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

function SparklesIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
  );
}
