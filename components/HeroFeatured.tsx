'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, Heart, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { Game } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';

interface HeroFeaturedProps {
  game: Game;
}

export function HeroFeatured({ game }: HeroFeaturedProps) {
  const { wishlist, toggleWishlist, addToCart } = useAuth();
  const isWishlisted = wishlist.includes(game.gameId);

  return (
    <section className="relative w-full overflow-hidden bg-[#6C6CEB] py-4 sm:py-10">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="bg-[#F5F4FF] border-3 border-[#1A1A1A] rounded-2xl sm:rounded-3xl p-4 sm:p-10 relative overflow-hidden shadow-sticker-lg">
          {/* Top Sheen */}
          <div className="absolute top-0 left-0 right-0 h-2/5 bg-gradient-to-b from-white/70 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center relative z-10">
            
            {/* Top/Right Product Image Column - Appears FIRST on Mobile */}
            <div className="lg:col-span-6 relative flex justify-center order-1 lg:order-2">
              <div className="relative w-full max-w-md aspect-[16/10] sm:aspect-[4/5] max-h-56 sm:max-h-none rounded-xl sm:rounded-2xl overflow-hidden border-2.5 sm:border-3 border-[#1A1A1A] shadow-sticker-md sm:shadow-sticker-lg bg-[#B4B3E6] group">
                <Image
                  src={game.coverImage}
                  alt={game.title}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {game.badge && (
                  <span className="absolute top-3 left-3 text-[10px] sm:text-[11px] font-extrabold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#F4A6C6] text-[#1A1A1A] border-2 border-[#1A1A1A] shadow-sticker-sm uppercase">
                    {game.badge}
                  </span>
                )}
              </div>
            </div>

            {/* Info Column - Concise Content on Mobile */}
            <div className="lg:col-span-6 space-y-3 sm:space-y-5 text-left order-2 lg:order-1">
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3E29B] border-2 border-[#1A1A1A] text-[#1A1A1A] text-[10px] sm:text-xs font-extrabold shadow-sticker-sm">
                <Sparkles className="w-3.5 h-3.5 fill-[#1A1A1A]" />
                <span className="uppercase">FEATURED GAME OF THE MONTH</span>
              </div>

              <div>
                <span className="text-[11px] sm:text-xs font-extrabold text-[#6C6CEB] uppercase tracking-wider block mb-0.5 sm:mb-1">
                  {game.genre} • {game.platform}
                </span>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A1A] tracking-tight leading-tight italic glitch-subhead">
                  {game.title}
                </h1>
                {game.subtitle && (
                  <p className="hidden sm:block text-xs sm:text-sm font-bold text-[#1A1A1A]/70 mt-1">
                    {game.subtitle}
                  </p>
                )}
              </div>

              {/* Description Paragraph - Hidden on mobile view, visible on desktop */}
              <p className="hidden sm:block text-xs sm:text-sm text-[#1A1A1A]/80 font-medium leading-relaxed line-clamp-3">
                {game.description}
              </p>

              {/* Price & Rating Row */}
              <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-6 pt-1 sm:pt-2">
                <div>
                  <span className="text-[9px] sm:text-[10px] text-[#1A1A1A]/60 font-bold uppercase block">Digital Key Price</span>
                  <div className="flex items-baseline gap-2 sm:gap-3">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">${game.price.toFixed(2)}</span>
                    {game.originalPrice && (
                      <span className="text-xs sm:text-sm text-[#1A1A1A]/50 line-through font-bold">${game.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                </div>

                {game.rating && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F3E29B] border-2 border-[#1A1A1A] text-[#1A1A1A] text-xs font-extrabold shadow-sticker-sm">
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#1A1A1A]" />
                    <span className="font-extrabold">{game.rating}</span>
                    <span className="text-[10px] text-[#1A1A1A]/70 hidden xs:inline">/ 5.0</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 pt-1 sm:pt-2">
                <button
                  onClick={() => addToCart(game)}
                  className="btn-pill-pink text-xs py-2.5 sm:py-3 px-5 sm:px-8 font-extrabold flex items-center gap-2 flex-1 sm:flex-initial justify-center"
                >
                  <span>Buy Now (${game.price.toFixed(2)})</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                <Link
                  href={`/game/${game.gameId}`}
                  className="btn-pill-yellow text-xs py-2.5 sm:py-3 px-4 sm:px-6 font-extrabold"
                >
                  Details
                </Link>

                <button
                  onClick={() => toggleWishlist(game.gameId)}
                  className={`p-2.5 sm:p-3 rounded-full border-2 border-[#1A1A1A] transition-all shadow-sticker-sm ${
                    isWishlisted
                      ? 'bg-[#F4A6C6]'
                      : 'bg-[#FFFFFF] hover:bg-[#F4A6C6]'
                  }`}
                  title="Save to Wishlist"
                >
                  <Heart className={`w-4 h-4 sm:w-5 sm:h-5 stroke-[#1A1A1A] stroke-[2.5] ${isWishlisted ? 'fill-[#1A1A1A]' : ''}`} />
                </button>
              </div>

              {/* Instant Delivery Feature - Hidden on small mobile to keep content minimal */}
              <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#1A1A1A]/80 font-bold pt-3 border-t-2 border-[#1A1A1A]/15">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 fill-[#F3E29B] stroke-[#1A1A1A] stroke-[2]" />
                  <span>Instant Dispatch</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 fill-[#A9E8D6] stroke-[#1A1A1A] stroke-[2]" />
                  <span>Official Key Guarantee</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
