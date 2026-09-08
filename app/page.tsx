'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Tag, Clock, Gamepad2 } from 'lucide-react';
import { HeroFeatured } from '@/components/HeroFeatured';
import { GameCard } from '@/components/GameCard';
import { PillFilters } from '@/components/PillFilters';
import { StoreService } from '@/lib/store-service';
import { Game } from '@/lib/types';

export default function StorefrontPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('ALL');
  const [selectedPlatform, setSelectedPlatform] = useState('ALL');
  const [selectedBadge, setSelectedBadge] = useState('ALL');

  useEffect(() => {
    async function load() {
      const data = await StoreService.getGames();
      setGames(data);
      setLoading(false);
    }
    load();
  }, []);

  const featuredGame = games[0] || null;

  const filteredGames = games.filter((g) => {
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

  const dealsGames = games.filter((g) => g.badge === 'sale' || (g.originalPrice && g.originalPrice > g.price));
  const newGames = games.filter((g) => g.badge === 'new');

  return (
    <div className="space-y-10 pb-20 bg-[#6C6CEB]">
      
      {/* Featured Game Hero */}
      {featuredGame && <HeroFeatured game={featuredGame} />}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Filter Section Header */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-3 border-[#1A1A1A] pb-4">
            <div>
              <span className="text-xs font-extrabold text-[#1A1A1A] uppercase tracking-wider block mb-1 bg-[#F4A6C6] border-2 border-[#1A1A1A] px-3 py-0.5 rounded-full w-fit shadow-sticker-sm">
                Browse Retro & Next-Gen Collection
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white glitch-text tracking-tight uppercase mt-2">
                GAME CATALOG
              </h2>
            </div>

            <Link href="/catalog" className="btn-pill-yellow text-xs py-2 px-5 font-extrabold flex items-center gap-1">
              <span>View All ({games.length})</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Link>
          </div>

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
            }}
          />
        </div>

        {/* Filtered Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 rounded-2xl bg-[#F5F4FF] border-3 border-[#1A1A1A] animate-pulse shadow-sticker-md" />
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            
            {filteredGames.length === 0 ? (
              <div className="text-center py-16 bg-[#F5F4FF] rounded-3xl border-3 border-[#1A1A1A] shadow-sticker-lg space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F4A6C6] border-2.5 border-[#1A1A1A] flex items-center justify-center mx-auto shadow-sticker-sm">
                  <Gamepad2 className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="text-lg font-extrabold text-[#1A1A1A] uppercase">NO GAMES FOUND MATCHING YOUR FILTERS</h3>
                <p className="text-xs font-bold text-[#1A1A1A]/70">Try clearing your search query or resetting platform tags.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredGames.map((game) => (
                  <GameCard key={game.gameId} game={game} />
                ))}
              </div>
            )}

            {/* Special Deals Section */}
            {dealsGames.length > 0 && (
              <div className="space-y-6 pt-8 border-t-3 border-[#1A1A1A]">
                <div className="flex items-center gap-2">
                  <Tag className="w-6 h-6 stroke-[2.5] stroke-[#1A1A1A]" />
                  <h3 className="text-2xl font-extrabold text-white glitch-text tracking-tight uppercase">
                    SPECIAL DEALS & DISCOUNTS
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dealsGames.map((game) => (
                    <GameCard key={game.gameId} game={game} />
                  ))}
                </div>
              </div>
            )}

            {/* New Releases Section */}
            {newGames.length > 0 && (
              <div className="space-y-6 pt-8 border-t-3 border-[#1A1A1A]">
                <div className="flex items-center gap-2">
                  <Clock className="w-6 h-6 stroke-[2.5] stroke-[#1A1A1A]" />
                  <h3 className="text-2xl font-extrabold text-white glitch-text tracking-tight uppercase">
                    NEW RELEASES
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {newGames.map((game) => (
                    <GameCard key={game.gameId} game={game} />
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
