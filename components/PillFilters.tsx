'use client';

import React from 'react';
import { Search, RotateCcw } from 'lucide-react';

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
    <div className="bg-[#F5F4FF] border-3 border-[#1A1A1A] rounded-3xl p-5 sm:p-6 space-y-5 shadow-sticker-md">
      {/* Search Input Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-[#1A1A1A]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search retro & modern game titles..."
            className="w-full bg-[#FFFFFF] border-2.5 border-[#1A1A1A] rounded-full pl-11 pr-4 py-2.5 text-xs font-bold text-[#1A1A1A] placeholder-[#1A1A1A]/50 focus:outline-none focus:bg-[#FBD0E4] transition-colors shadow-sticker-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3 text-xs font-extrabold text-[#1A1A1A] hover:underline"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F3E29B] border-2 border-[#1A1A1A] text-xs font-extrabold text-[#1A1A1A] shadow-sticker-sm hover:scale-105 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
            RESET FILTERS
          </button>
        </div>
      </div>

      {/* Pill Groups Row - Genre */}
      <div className="space-y-2">
        <span className="text-[10px] font-extrabold text-[#1A1A1A] tracking-wider uppercase block bg-[#F4A6C6] border-2 border-[#1A1A1A] px-2.5 py-0.5 rounded-full w-fit shadow-sticker-sm">
          GENRE
        </span>
        <div className="flex flex-wrap gap-2">
          {genres.map((g) => {
            const isSelected = selectedGenre === g;
            return (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`text-xs font-extrabold px-3.5 py-1.5 rounded-full border-2 border-[#1A1A1A] transition-all ${
                  isSelected
                    ? 'bg-[#F4A6C6] text-[#1A1A1A] shadow-sticker-sm scale-105'
                    : 'bg-[#FFFFFF] text-[#1A1A1A] hover:bg-[#F3E29B]'
                }`}
              >
                {g}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pill Groups Row - Platform & Status Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t-2 border-[#1A1A1A]/15">
        <div className="space-y-2">
          <span className="text-[10px] font-extrabold text-[#1A1A1A] tracking-wider uppercase block bg-[#F3E29B] border-2 border-[#1A1A1A] px-2.5 py-0.5 rounded-full w-fit shadow-sticker-sm">
            PLATFORM
          </span>
          <div className="flex flex-wrap gap-2">
            {platforms.map((p) => {
              const isSelected = selectedPlatform === p;
              return (
                <button
                  key={p}
                  onClick={() => setSelectedPlatform(p)}
                  className={`text-xs font-extrabold px-3.5 py-1.5 rounded-full border-2 border-[#1A1A1A] transition-all ${
                    isSelected
                      ? 'bg-[#F3E29B] text-[#1A1A1A] shadow-sticker-sm scale-105'
                      : 'bg-[#FFFFFF] text-[#1A1A1A] hover:bg-[#F4A6C6]'
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-extrabold text-[#1A1A1A] tracking-wider uppercase block bg-[#A9E8D6] border-2 border-[#1A1A1A] px-2.5 py-0.5 rounded-full w-fit shadow-sticker-sm">
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
                  className={`text-xs font-extrabold px-3.5 py-1.5 rounded-full border-2 border-[#1A1A1A] transition-all uppercase ${
                    isSelected
                      ? 'bg-[#A9E8D6] text-[#1A1A1A] shadow-sticker-sm scale-105'
                      : 'bg-[#FFFFFF] text-[#1A1A1A] hover:bg-[#F3E29B]'
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
