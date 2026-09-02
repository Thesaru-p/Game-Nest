'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Flame, Tag, Clock } from 'lucide-react';
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
    <div className="space-y-12 pb-20">
      
      {/* Featured Game Hero */}
      {featuredGame && <HeroFeatured game={featuredGame} />}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Filter Section Header */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-surface-border pb-4">
            <div>
              <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">
                Browse Collection
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-primary">
                GAME CATALOG
              </h2>
            </div>

            <Link href="/catalog" className="text-xs font-bold text-accent hover:underline flex items-center gap-1">
              View All Games ({games.length})
              <ArrowRight className="w-3.5 h-3.5" />
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
              <div key={i} className="h-96 rounded-2xl bg-surface animate-pulse border border-surface-border" />
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            
            {filteredGames.length === 0 ? (
              <div className="text-center py-16 bg-surface rounded-2xl border border-surface-border">
                <p className="text-xs font-mono text-primary-muted uppercase">
                  NO GAMES FOUND MATCHING YOUR FILTERS
                </p>
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
              <div className="space-y-6 pt-6 border-t border-surface-border">
                <div className="flex items-center gap-2 text-accent">
                  <Tag className="w-5 h-5" />
                  <h3 className="text-xl font-bold font-display text-primary uppercase">
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
              <div className="space-y-6 pt-6 border-t border-surface-border">
                <div className="flex items-center gap-2 text-amber-400">
                  <Clock className="w-5 h-5" />
                  <h3 className="text-xl font-bold font-display text-primary uppercase">
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
