'use client';

import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';

interface PillFiltersProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedGenre: string;
  setSelectedGenre: (g: string) => void;
  selectedPlatform: string;
  setSelectedPlatform: (p: string) => void;
  selectedBadge: string;
  setSelectedBadge: (b: string) => void;
  onReset: () => void;
}

export const PillFilters: React.FC<PillFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedGenre,
  setSelectedGenre,
  selectedPlatform,
  setSelectedPlatform,
  selectedBadge,
  setSelectedBadge,
  onReset,
}) => {
  const genres = ['ALL', 'Action RPG', 'Dark Fantasy', 'Sci-Fi Cyberpunk', 'Action-Adventure', 'Racing'];
  const platforms = ['ALL', 'PC (Steam)', 'PlayStation 5', 'Xbox Series X'];
  const badges = ['ALL', 'limited', 'new', 'sale'];

  return (
    <div className="bg-[#121212] border border-surface-border rounded-2xl p-5 sm:p-6 space-y-5 shadow-panel">
      {/* Search Input Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-primary-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search luxury game titles, platforms, publishers..."
            className="w-full bg-surface border border-surface-border rounded-full pl-11 pr-4 py-3 text-xs text-primary placeholder-primary-muted focus:outline-none focus:border-accent transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3.5 text-xs text-primary-muted hover:text-primary"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-surface-border hover:border-accent/40 text-[11px] font-mono text-primary-muted hover:text-accent transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            RESET FILTERS
          </button>
        </div>
      </div>

      {/* Pill Groups Row - Genre */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono font-bold text-accent tracking-[0.2em] uppercase block">
          GENRE
        </span>
        <div className="flex flex-wrap gap-2">
          {genres.map((g) => {
            const isSelected = selectedGenre === g;
            return (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`text-[11px] font-medium tracking-wider px-3.5 py-1.5 rounded-full border transition-all ${
                  isSelected
                    ? 'bg-accent text-[#0a0a0a] border-accent font-bold shadow-copper'
                    : 'bg-surface border-surface-border text-primary-muted hover:text-primary hover:border-accent/40'
                }`}
              >
                {g}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pill Groups Row - Platform & Status Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t border-surface-border/40">
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold text-accent tracking-[0.2em] uppercase block">
            PLATFORM
          </span>
          <div className="flex flex-wrap gap-2">
            {platforms.map((p) => {
              const isSelected = selectedPlatform === p;
              return (
                <button
                  key={p}
                  onClick={() => setSelectedPlatform(p)}
                  className={`text-[11px] font-medium tracking-wider px-3.5 py-1.5 rounded-full border transition-all ${
                    isSelected
                      ? 'bg-accent text-[#0a0a0a] border-accent font-bold shadow-copper'
                      : 'bg-surface border-surface-border text-primary-muted hover:text-primary hover:border-accent/40'
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold text-accent tracking-[0.2em] uppercase block">
            COLLECTION / EDITION
          </span>
          <div className="flex flex-wrap gap-2">
            {badges.map((b) => {
              const isSelected = selectedBadge === b;
              const label = b === 'ALL' ? 'ALL EDITIONS' : b === 'limited' ? 'LIMITED STOCK' : b === 'new' ? 'NEW RELEASES' : 'ON SALE';
              return (
                <button
                  key={b}
                  onClick={() => setSelectedBadge(b)}
                  className={`text-[11px] font-medium tracking-wider px-3.5 py-1.5 rounded-full border transition-all uppercase ${
                    isSelected
                      ? 'bg-accent text-[#0a0a0a] border-accent font-bold shadow-copper'
                      : 'bg-surface border-surface-border text-primary-muted hover:text-primary hover:border-accent/40'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
