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

  const getBadgeStyle = () => {
    switch (game.badge) {
      case 'limited':
        return 'bg-amber-600/90 text-amber-100 border-amber-400/50 shadow-copper';
      case 'new':
        return 'bg-emerald-600/90 text-emerald-100 border-emerald-400/50';
      case 'sale':
        return 'bg-rose-600/90 text-rose-100 border-rose-400/50';
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
    <div className="group relative rounded-2xl card-luxury overflow-hidden flex flex-col justify-between">
      {/* Top Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface">
        <Image
          src={game.coverImage}
          alt={game.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Overlay for bottom text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30 opacity-90" />

        {/* Top-Left Badge */}
        {game.badge && getBadgeLabel() && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`text-[9px] font-bold px-2.5 py-1 rounded-full border tracking-widest uppercase shadow-md backdrop-blur-md ${getBadgeStyle()}`}
            >
              {getBadgeLabel()}
            </span>
          </div>
        )}

        {/* Top-Right Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(game.gameId);
          }}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full backdrop-blur-md border flex items-center justify-center transition-all ${
            isWishlisted
              ? 'bg-rose-500/20 border-rose-500 text-rose-400 shadow-lg'
              : 'bg-black/50 border-white/10 text-primary-muted hover:text-rose-400 hover:border-rose-400/50'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Platform tag bottom-left of image */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="text-[10px] font-mono font-medium text-accent uppercase tracking-widest px-2 py-0.5 rounded bg-black/60 border border-accent/20 backdrop-blur-sm">
            {game.platform}
          </span>
        </div>
      </div>

      {/* Card Info Details */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-3">
        <div>
          <div className="flex items-center justify-between text-[10px] text-primary-muted font-mono mb-1">
            <span>{game.genre}</span>
            {game.rating && (
              <span className="flex items-center gap-1 text-amber-400">
                <Star className="w-3 h-3 fill-amber-400" />
                {game.rating}
              </span>
            )}
          </div>

          <Link href={`/game/${game.gameId}`} className="group-hover:text-accent transition-colors">
            <h3 className="text-sm font-bold text-primary line-clamp-1 tracking-wide">
              {game.title}
            </h3>
            {game.subtitle && (
              <p className="text-[10px] text-primary-muted line-clamp-1 mt-0.5">
                {game.subtitle}
              </p>
            )}
          </Link>
        </div>

        {/* Price & Buy Now Actions */}
        <div className="pt-2 border-t border-surface-border/50 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-extrabold text-accent">
                ${game.price.toFixed(2)}
              </span>
              {game.originalPrice && (
                <span className="text-[11px] text-primary-muted line-through">
                  ${game.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/game/${game.gameId}`}
              className="text-[10px] font-bold uppercase tracking-widest text-primary-muted hover:text-primary px-2 py-1"
            >
              DETAILS
            </Link>
            <button
              onClick={() => addToCart(game)}
              className="p-2 rounded-full bg-accent/15 border border-accent/40 text-accent hover:bg-accent hover:text-[#0a0a0a] transition-all shadow-sm"
              title="Add to Cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
