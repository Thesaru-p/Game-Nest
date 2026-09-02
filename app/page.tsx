'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Shield, Flame, Award } from 'lucide-react';
import { HeroFeatured } from '@/components/HeroFeatured';
import { GameCard } from '@/components/GameCard';
import { PillFilters } from '@/components/PillFilters';
import { StoreService } from '@/lib/store-service';
import { Game } from '@/lib/types';

export default function StorefrontPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters state for storefront inline filter preview
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

  // Filtered games logic
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

  const limitedGames = games.filter((g) => g.badge === 'limited');
  const newReleases = games.filter((g) => g.badge === 'new' || g.badge === null);
  const onSaleGames = games.filter((g) => g.badge === 'sale' || (g.originalPrice && g.originalPrice > g.price));

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. Hero Featured Game Showcase */}
      {featuredGame && <HeroFeatured game={featuredGame} />}

      {/* 2. Horizontal Filter Bar & Catalog Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-surface-border/60 pb-6">
          <div>
            <div className="flex items-center gap-2 text-accent font-mono text-[10px] tracking-[0.25em] uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EXPLORE CATALOGUE</span>
            </div>
            <h2 className="text-3xl font-display font-light text-primary uppercase tracking-tight">
              CURATED <span className="text-accent font-semibold">DIGITAL VAULT</span>
            </h2>
          </div>
          <Link
            href="/catalog"
            className="flex items-center gap-2 text-xs font-bold text-accent hover:text-primary transition-colors tracking-widest uppercase"
          >
            VIEW ALL GAMES ({games.length})
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Pill Filters Group */}
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

        {/* Filtered Grid or Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 rounded-2xl bg-surface animate-pulse border border-surface-border" />
            ))}
          </div>
        ) : filteredGames.length === 0 ? (
          <div className="text-center py-16 bg-surface rounded-2xl border border-surface-border space-y-3">
            <p className="text-sm font-mono text-primary-muted uppercase tracking-widest">
              NO GAMES MATCHED YOUR FILTERS
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedGenre('ALL');
                setSelectedPlatform('ALL');
                setSelectedBadge('ALL');
              }}
              className="btn-copper-outline text-xs"
            >
              CLEAR FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredGames.map((game) => (
              <GameCard key={game.gameId} game={game} />
            ))}
          </div>
        )}
      </section>

      {/* 3. Category Section - LIMITED STOCK KEYS (Horizontal Scroll / Card Row) */}
      {limitedGames.length > 0 && (
        <section className="bg-surface/40 border-y border-surface-border/50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-amber-400 tracking-[0.25em] uppercase block mb-1">
                  ⚡ HIGH DEMAND COPIES
                </span>
                <h3 className="text-2xl font-display font-light text-primary uppercase">
                  LIMITED STOCK <span className="text-accent font-bold">COLLECTOR KEYS</span>
                </h3>
              </div>
              <Link href="/catalog?badge=limited" className="text-xs text-accent hover:underline font-mono">
                View Collection →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {limitedGames.map((game) => (
                <GameCard key={game.gameId} game={game} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Category Section - ON SALE & DEALS */}
      {onSaleGames.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-rose-400 tracking-[0.25em] uppercase block mb-1">
                🔥 SPECIAL PROMOTIONS
              </span>
              <h3 className="text-2xl font-display font-light text-primary uppercase">
                ON SALE & <span className="text-rose-400 font-bold">VIP DISCOUNTS</span>
              </h3>
            </div>
            <Link href="/catalog?badge=sale" className="text-xs text-accent hover:underline font-mono">
              Browse All Deals →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {onSaleGames.map((game) => (
              <GameCard key={game.gameId} game={game} />
            ))}
          </div>
        </section>
      )}

      {/* 5. Luxury Chronoswiss Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-accent/30 bg-gradient-to-r from-[#181818] via-[#121212] to-[#1a120b] p-8 sm:p-12 shadow-copper">
          <div className="max-w-xl space-y-4">
            <span className="text-[10px] font-mono text-accent uppercase tracking-[0.3em] block">
              VERIFIED SELLER NETWORK
            </span>
            <h3 className="text-3xl font-display font-light text-primary uppercase tracking-tight">
              BECOME A <span className="text-accent font-semibold">GAME-NEST SELLER</span>
            </h3>
            <p className="text-xs text-primary-muted leading-relaxed">
              List digital game keys directly to thousands of luxury collectors and discerning gamers. Low commission fees, instant payouts, and seller dashboard analytics.
            </p>
            <div className="pt-2">
              <Link href="/dashboard" className="btn-copper-pill inline-block text-xs py-3 px-6">
                OPEN YOUR STORE
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
