'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Game } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';

interface GameCardProps {
  game: Game;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { wishlist, toggleWishlist, addToCart } = useAuth();
  const isWishlisted = wishlist.includes(game.gameId);

  const getBadgeClass = () => {
    switch (game.badge) {
      case 'limited':
        return 'badge-kawaii-pink';
      case 'new':
        return 'badge-kawaii-yellow';
      case 'sale':
        return 'badge-kawaii-mint';
      default:
        return null;
    }
  };

  const getBadgeLabel = () => {
    switch (game.badge) {
      case 'limited':
        return `LIMITED (${game.stock} KEYS)`;
      case 'new':
        return 'NEW RELEASE';
      case 'sale':
        return 'SPECIAL OFFER';
      default:
        return null;
    }
  };

  return (
    <div className="group relative rounded-2xl bg-[#F5F4FF] border-2.5 border-[#1A1A1A] shadow-sticker-md overflow-hidden flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-sticker-lg transition-all duration-200">
      {/* Glossy top sheen highlight */}
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/60 to-transparent pointer-events-none z-10" />

      {/* Top Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#B4B3E6] border-b-2.5 border-[#1A1A1A]">
        <Image
          src={game.coverImage}
          alt={game.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top-Left Badge */}
        {game.badge && getBadgeLabel() && (
          <div className="absolute top-3 left-3 z-20">
            <span className={getBadgeClass() || 'badge-kawaii-yellow'}>
              {getBadgeLabel()}
            </span>
          </div>
        )}

        {/* Top-Right Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(game.gameId);
          }}
          className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full border-2 border-[#1A1A1A] flex items-center justify-center transition-all shadow-sticker-sm ${
            isWishlisted
              ? 'bg-[#F4A6C6] scale-110'
              : 'bg-[#FFFFFF] hover:bg-[#F3E29B]'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 stroke-[#1A1A1A] stroke-[2.5] ${isWishlisted ? 'fill-[#1A1A1A]' : ''}`} />
        </button>

        {/* Platform tag bottom-left */}
        <div className="absolute bottom-3 left-3 z-20">
          <span className="text-[10px] font-extrabold text-[#1A1A1A] bg-[#FFFFFF] border-2 border-[#1A1A1A] px-2.5 py-0.5 rounded-full shadow-sticker-sm uppercase">
            {game.platform}
          </span>
        </div>
      </div>

      {/* Card Info Details */}
      <div className="p-4 flex flex-col justify-between flex-1 space-y-3 bg-[#F5F4FF]">
        <div>
          <div className="flex items-center justify-between text-[11px] font-bold text-[#1A1A1A]/70 mb-1">
            <span className="uppercase font-mono">{game.genre}</span>
            {game.rating && (
              <span className="flex items-center gap-1 text-[#1A1A1A] bg-[#F3E29B] border border-[#1A1A1A] px-1.5 py-0.2 rounded-md font-extrabold text-[10px]">
                <Star className="w-3 h-3 fill-[#1A1A1A]" />
                {game.rating}
              </span>
            )}
          </div>

          <Link href={`/game/${game.gameId}`} className="group-hover:text-[#6C6CEB] transition-colors">
            <h3 className="text-sm font-extrabold text-[#1A1A1A] line-clamp-1 tracking-tight">
              {game.title}
            </h3>
            {game.subtitle && (
              <p className="text-[11px] text-[#1A1A1A]/70 line-clamp-1 mt-0.5 font-medium">
                {game.subtitle}
              </p>
            )}
          </Link>
        </div>

        {/* Price & Buy Actions */}
        <div className="pt-2.5 border-t-2 border-[#1A1A1A]/15 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-extrabold text-[#1A1A1A]">
              ${game.price.toFixed(2)}
            </span>
            {game.originalPrice && (
              <span className="text-xs text-[#1A1A1A]/60 line-through font-semibold">
                ${game.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => addToCart(game)}
              className="px-3.5 py-1.5 rounded-full bg-[#F4A6C6] hover:bg-[#F3E29B] border-2 border-[#1A1A1A] text-[#1A1A1A] font-extrabold text-xs flex items-center gap-1 shadow-sticker-sm active:translate-y-0.5 transition-all"
              title="Add to Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>BUY</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
