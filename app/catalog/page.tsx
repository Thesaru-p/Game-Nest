'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sparkles, ArrowUpDown, Gamepad2 } from 'lucide-react';
import { GameCard } from '@/components/GameCard';
import { PillFilters } from '@/components/PillFilters';
import { StoreService } from '@/lib/store-service';
import { Game } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialBadge = searchParams.get('badge') || 'ALL';
  const isWishlistOnly = searchParams.get('wishlist') === 'true';

  const { wishlist } = useAuth();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('ALL');
  const [selectedPlatform, setSelectedPlatform] = useState('ALL');
  const [selectedBadge, setSelectedBadge] = useState(initialBadge);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  useEffect(() => {
    async function load() {
      const data = await StoreService.getGames();
      setGames(data);
      setLoading(false);
    }
    load();
  }, []);

  // Sync param badge change if user clicks nav links
  useEffect(() => {
    if (searchParams.get('badge')) {
      setSelectedBadge(searchParams.get('badge')!);
    }
  }, [searchParams]);

  let filtered = games.filter((g) => {
    if (isWishlistOnly && !wishlist.includes(g.gameId)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = g.title.toLowerCase().includes(q);
      const matchGenre = g.genre.toLowerCase().includes(q);
      const matchPlatform = g.platform.toLowerCase().includes(q);
      if (!matchTitle && !matchGenre && !matchPlatform) return false;
    }
    if (selectedGenre !== 'ALL' && g.genre !== selectedGenre) return false;
    if (selectedPlatform !== 'ALL' && g.platform !== selectedPlatform) return false;
    if (selectedBadge !== 'ALL' && g.badge !== selectedBadge) return false;
    return true;
  });

  // Sorting
  if (sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#6C6CEB]">
      
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-3 border-[#1A1A1A] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4A6C6] border-2 border-[#1A1A1A] text-[#1A1A1A] text-xs font-extrabold shadow-sticker-sm mb-2">
            <Sparkles className="w-4 h-4 fill-[#1A1A1A]" />
            <span>{isWishlistOnly ? 'SAVED ITEMS' : 'MARKETPLACE CATALOG'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white glitch-text uppercase tracking-tight">
            {isWishlistOnly ? 'MY WISHLIST' : 'RETRO & NEXT-GEN DIRECTORY'}
          </h1>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 bg-[#F5F4FF] border-2.5 border-[#1A1A1A] rounded-full px-4 py-2 text-xs shadow-sticker-sm">
          <ArrowUpDown className="w-4 h-4 stroke-[2.5] stroke-[#1A1A1A]" />
          <span className="text-[#1A1A1A] font-extrabold uppercase text-[10px]">SORT BY:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-transparent text-[#1A1A1A] font-extrabold focus:outline-none cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rating</option>
          </select>
        </div>
      </div>

      {/* Filter Component */}
      {!isWishlistOnly && (
        <PillFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          selectedPlatform={selectedPlatform}
          setSelectedPlatform={setSelectedPlatform}
          selectedBadge={selectedBadge}
          setSelectedBadge={setSelectedBadge}
          onReset={() => {
            setSearchQuery('');
            setSelectedGenre('ALL');
            setSelectedPlatform('ALL');
            setSelectedBadge('ALL');
            setSortBy('featured');
          }}
        />
      )}

      {/* Results Count Bar */}
      <div className="flex items-center justify-between text-xs font-extrabold text-white">
        <span className="bg-[#1A1A1A] px-3 py-1 rounded-full border border-white/20">
          SHOWING {filtered.length} {filtered.length === 1 ? 'RESULT' : 'RESULTS'}
        </span>
        {selectedBadge !== 'ALL' && (
          <span className="bg-[#F3E29B] text-[#1A1A1A] border-2 border-[#1A1A1A] px-3 py-1 rounded-full uppercase shadow-sticker-sm">
            Filter: {selectedBadge}
          </span>
        )}
      </div>

      {/* Grid Display */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-96 rounded-2xl bg-[#F5F4FF] border-3 border-[#1A1A1A] animate-pulse shadow-sticker-md" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-[#F5F4FF] rounded-3xl border-3 border-[#1A1A1A] shadow-sticker-lg space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#F4A6C6] border-2.5 border-[#1A1A1A] flex items-center justify-center mx-auto shadow-sticker-sm">
            <Gamepad2 className="w-8 h-8 stroke-[2.5]" />
          </div>
          <p className="text-sm font-extrabold text-[#1A1A1A] uppercase tracking-wide">
            {isWishlistOnly ? 'YOUR WISHLIST IS CURRENTLY EMPTY' : 'NO GAMES MATCHED YOUR CRITERIA'}
          </p>
          <p className="text-xs font-bold text-[#1A1A1A]/70 max-w-sm mx-auto">
            Try adjusting your search terms or selecting another genre or platform filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((game) => (
            <GameCard key={game.gameId} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-xs font-bold text-white">LOADING CATALOG...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
