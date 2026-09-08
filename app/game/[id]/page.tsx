'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Heart, Share2, ShieldCheck, ArrowRight, Star, Cpu, CheckCircle2, ChevronRight, Zap, Award } from 'lucide-react';
import { StoreService } from '@/lib/store-service';
import { Game } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';

export default function GameDetailPage() {
  const params = useParams();
  const gameId = params.id as string;

  const { wishlist, toggleWishlist, addToCart, showToast } = useAuth();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'reqs' | 'seller'>('overview');

  useEffect(() => {
    async function load() {
      if (!gameId) return;
      const found = await StoreService.getGameById(gameId);
      setGame(found);
      setLoading(false);
    }
    load();
  }, [gameId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#6C6CEB] flex items-center justify-center text-xs font-extrabold text-white">
        LOADING GAME DETAILS...
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-[#6C6CEB] flex flex-col items-center justify-center space-y-4">
        <p className="text-sm font-extrabold text-white uppercase tracking-widest">
          GAME NOT FOUND IN VAULT
        </p>
        <Link href="/catalog" className="btn-pill-yellow text-xs font-extrabold">
          RETURN TO CATALOG
        </Link>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(game.gameId);

  const handleShare = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Game page URL copied to clipboard!');
    }
  };

  return (
    <div className="space-y-10 pb-24 bg-[#6C6CEB] text-[#1A1A1A]">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center gap-2 text-xs font-extrabold text-white uppercase tracking-wider bg-[#1A1A1A] px-4 py-2 rounded-full w-fit border border-white/20">
          <Link href="/" className="hover:underline">STOREFRONT</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/catalog" className="hover:underline">CATALOG</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#F3E29B]">{game.genre}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="truncate max-w-[200px] text-[#F4A6C6]">{game.title}</span>
        </div>
      </div>

      {/* Hero Product Layout Section */}
      <section className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Product Image Container */}
          <div className="lg:col-span-7 relative flex justify-center">
            <div className="relative w-full max-w-xl aspect-[4/5] rounded-3xl overflow-hidden border-3 border-[#1A1A1A] shadow-sticker-lg bg-[#F5F4FF] group">
              <Image
                src={game.coverImage}
                alt={game.title}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Top-Left Edition Badge */}
              {game.badge && (
                <div className="absolute top-5 left-5 z-20">
                  <span className="text-xs font-extrabold px-3.5 py-1.5 rounded-full bg-[#F4A6C6] text-[#1A1A1A] border-2 border-[#1A1A1A] uppercase tracking-wider shadow-sticker-sm">
                    {game.badge === 'limited' ? `LIMITED KEY (${game.stock} LEFT)` : game.badge.toUpperCase()}
                  </span>
                </div>
              )}

              {/* Action Icons Floating Top-Right */}
              <div className="absolute top-5 right-5 z-20 flex items-center gap-3">
                <button
                  onClick={() => toggleWishlist(game.gameId)}
                  className={`p-3 rounded-full border-2 border-[#1A1A1A] transition-all shadow-sticker-sm ${
                    isWishlisted
                      ? 'bg-[#F4A6C6]'
                      : 'bg-[#FFFFFF] hover:bg-[#F3E29B]'
                  }`}
                  title="Wishlist Game"
                >
                  <Heart className={`w-5 h-5 stroke-[#1A1A1A] stroke-[2.5] ${isWishlisted ? 'fill-[#1A1A1A]' : ''}`} />
                </button>

                <button
                  onClick={handleShare}
                  className="p-3 rounded-full bg-[#FFFFFF] border-2 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#F3E29B] transition-all shadow-sticker-sm"
                  title="Share Game"
                >
                  <Share2 className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

              {/* Bottom Floating Price & BUY NOW Pill Button */}
              <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:bottom-6 sm:left-6 z-20 flex items-center justify-between sm:justify-start gap-3 sm:gap-4 bg-[#F5F4FF] border-2.5 border-[#1A1A1A] rounded-2xl sm:rounded-full px-4 sm:px-6 py-2.5 sm:py-3 shadow-sticker-md">
                <div className="flex flex-col">
                  <span className="text-[9px] sm:text-[10px] text-[#1A1A1A]/70 font-extrabold uppercase">DIGITAL KEY</span>
                  <span className="text-xl sm:text-2xl font-extrabold text-[#1A1A1A]">${game.price.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => addToCart(game)}
                  className="btn-pill-pink text-xs py-2 sm:py-2.5 px-4 sm:px-6 flex items-center gap-1.5 sm:gap-2 font-extrabold"
                >
                  BUY NOW
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

            </div>
          </div>

          {/* Right Column Details */}
          <div className="lg:col-span-5 bg-[#F5F4FF] border-3 border-[#1A1A1A] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sticker-lg text-left">
            <div>
              <span className="text-xs font-extrabold text-[#1A1A1A] uppercase tracking-wider block mb-1 bg-[#F3E29B] border-2 border-[#1A1A1A] px-3 py-0.5 rounded-full w-fit shadow-sticker-sm">
                {game.platform} • {game.genre}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight italic glitch-subhead mt-2">
                {game.title}
              </h1>
              {game.subtitle && (
                <p className="text-xs sm:text-sm font-extrabold text-[#6C6CEB] uppercase tracking-wider mt-1">
                  {game.subtitle}
                </p>
              )}
            </div>

            {/* Price & Rating Header */}
            <div className="flex items-center justify-between py-4 border-y-2 border-[#1A1A1A]/15">
              <div>
                <span className="text-[10px] text-[#1A1A1A]/70 font-extrabold uppercase tracking-wider block">INSTANT DIGITAL PRICE</span>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-[#1A1A1A]">${game.price.toFixed(2)}</span>
                  {game.originalPrice && (
                    <span className="text-sm text-[#1A1A1A]/50 line-through font-bold">${game.originalPrice.toFixed(2)}</span>
                  )}
                </div>
              </div>

              {game.rating && (
                <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F3E29B] border-2 border-[#1A1A1A] text-[#1A1A1A] font-extrabold text-xs shadow-sticker-sm">
                  <Star className="w-4 h-4 fill-[#1A1A1A]" />
                  <span>{game.rating}</span>
                  <span className="text-[10px] text-[#1A1A1A]/70">/ 5.0</span>
                </div>
              )}
            </div>

            {/* Quick Feature Badges */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-[#FFFFFF] border-2 border-[#1A1A1A] shadow-sticker-sm flex items-center gap-3">
                <Zap className="w-5 h-5 fill-[#F3E29B] stroke-[#1A1A1A] stroke-[2]" />
                <div>
                  <p className="text-[9px] text-[#1A1A1A]/70 font-extrabold uppercase">DELIVERY</p>
                  <p className="font-extrabold text-[#1A1A1A]">Instant Dispatch</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#FFFFFF] border-2 border-[#1A1A1A] shadow-sticker-sm flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 fill-[#A9E8D6] stroke-[#1A1A1A] stroke-[2]" />
                <div>
                  <p className="text-[9px] text-[#1A1A1A]/70 font-extrabold uppercase">GUARANTEE</p>
                  <p className="font-extrabold text-[#1A1A1A]">100% Authentic</p>
                </div>
              </div>
            </div>

            {/* Add to Cart CTA */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => addToCart(game)}
                className="w-full btn-pill-pink text-xs py-4 flex items-center justify-center gap-3 font-extrabold text-sm"
              >
                <span>ADD TO CART (${game.price.toFixed(2)})</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <p className="text-[11px] text-center font-extrabold text-[#1A1A1A]/80 flex items-center justify-center gap-1">
                <Award className="w-4 h-4 text-[#1A1A1A]" />
                Verified key issued by {game.sellerName || 'Verified Game Nest Seller'}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Tabbed Product Details Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Tab Buttons */}
        <div className="flex gap-3 text-xs font-extrabold uppercase overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-2.5 rounded-full border-2 border-[#1A1A1A] shadow-sticker-sm transition-all ${
              activeTab === 'overview'
                ? 'bg-[#F4A6C6] text-[#1A1A1A] scale-105'
                : 'bg-[#FFFFFF] text-[#1A1A1A] hover:bg-[#F3E29B]'
            }`}
          >
            OVERVIEW & FEATURES
          </button>

          <button
            onClick={() => setActiveTab('reqs')}
            className={`px-5 py-2.5 rounded-full border-2 border-[#1A1A1A] shadow-sticker-sm transition-all ${
              activeTab === 'reqs'
                ? 'bg-[#F3E29B] text-[#1A1A1A] scale-105'
                : 'bg-[#FFFFFF] text-[#1A1A1A] hover:bg-[#F4A6C6]'
            }`}
          >
            SYSTEM REQUIREMENTS
          </button>

          <button
            onClick={() => setActiveTab('seller')}
            className={`px-5 py-2.5 rounded-full border-2 border-[#1A1A1A] shadow-sticker-sm transition-all ${
              activeTab === 'seller'
                ? 'bg-[#A9E8D6] text-[#1A1A1A] scale-105'
                : 'bg-[#FFFFFF] text-[#1A1A1A] hover:bg-[#F3E29B]'
            }`}
          >
            SELLER & WARRANTY
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="py-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-[#F5F4FF] rounded-3xl p-6 sm:p-8 border-3 border-[#1A1A1A] shadow-sticker-lg space-y-5">
                <h3 className="text-xl font-extrabold text-[#1A1A1A] uppercase tracking-tight">
                  SYNOPSIS & GAMEPLAY
                </h3>
                <p className="text-xs font-bold text-[#1A1A1A]/80 leading-relaxed">
                  {game.description}
                </p>

                {game.features && game.features.length > 0 && (
                  <div className="pt-4 space-y-3">
                    <h4 className="text-xs font-extrabold text-[#1A1A1A] uppercase tracking-wider bg-[#F4A6C6] border-2 border-[#1A1A1A] px-3 py-1 rounded-full w-fit shadow-sticker-sm">
                      KEY HIGHLIGHTS
                    </h4>
                    <ul className="space-y-2 text-xs font-bold text-[#1A1A1A]">
                      {game.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 stroke-[2.5] stroke-[#1A1A1A] fill-[#A9E8D6] flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Sidebar Quick Specs */}
              <div className="bg-[#F5F4FF] rounded-3xl p-6 border-3 border-[#1A1A1A] shadow-sticker-lg space-y-4">
                <h4 className="text-xs font-extrabold text-[#1A1A1A] uppercase tracking-wider bg-[#F3E29B] border-2 border-[#1A1A1A] px-3 py-1 rounded-full w-fit shadow-sticker-sm">
                  PRODUCT METADATA
                </h4>
                <div className="space-y-3 text-xs font-bold text-[#1A1A1A]">
                  <div className="flex justify-between border-b-2 border-[#1A1A1A]/15 pb-2">
                    <span className="text-[#1A1A1A]/70">Platform</span>
                    <span className="font-extrabold">{game.platform}</span>
                  </div>
                  <div className="flex justify-between border-b-2 border-[#1A1A1A]/15 pb-2">
                    <span className="text-[#1A1A1A]/70">Publisher</span>
                    <span className="font-extrabold">{game.publisher || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between border-b-2 border-[#1A1A1A]/15 pb-2">
                    <span className="text-[#1A1A1A]/70">Release Date</span>
                    <span className="font-extrabold">{game.releaseDate || 'Available Now'}</span>
                  </div>
                  <div className="flex justify-between border-b-2 border-[#1A1A1A]/15 pb-2">
                    <span className="text-[#1A1A1A]/70">Stock Status</span>
                    <span className="text-[#1A1A1A] bg-[#A9E8D6] border border-[#1A1A1A] px-2 py-0.5 rounded-full font-extrabold">{game.stock} Keys Ready</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reqs' && (
            <div className="bg-[#F5F4FF] rounded-3xl p-6 sm:p-8 border-3 border-[#1A1A1A] shadow-sticker-lg space-y-6">
              <div className="flex items-center gap-3 text-xs font-extrabold text-[#1A1A1A] uppercase">
                <Cpu className="w-5 h-5 stroke-[2.5]" />
                <span>RECOMMENDED HARDWARE SPECIFICATIONS ({game.platform})</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-extrabold">
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-[#FFFFFF] border-2 border-[#1A1A1A] shadow-sticker-sm">
                    <span className="text-[10px] text-[#1A1A1A]/70 uppercase block">OPERATING SYSTEM</span>
                    <span className="text-[#1A1A1A]">{game.systemReqs?.os || 'Windows 10/11 64-bit'}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FFFFFF] border-2 border-[#1A1A1A] shadow-sticker-sm">
                    <span className="text-[10px] text-[#1A1A1A]/70 uppercase block">PROCESSOR / CPU</span>
                    <span className="text-[#1A1A1A]">{game.systemReqs?.processor || 'Intel Core i7 / Ryzen 7'}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FFFFFF] border-2 border-[#1A1A1A] shadow-sticker-sm">
                    <span className="text-[10px] text-[#1A1A1A]/70 uppercase block">MEMORY / RAM</span>
                    <span className="text-[#1A1A1A]">{game.systemReqs?.memory || '16 GB RAM'}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-[#FFFFFF] border-2 border-[#1A1A1A] shadow-sticker-sm">
                    <span className="text-[10px] text-[#1A1A1A]/70 uppercase block">GRAPHICS / GPU</span>
                    <span className="text-[#1A1A1A]">{game.systemReqs?.graphics || 'NVIDIA RTX 3070 / AMD RX 6800'}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FFFFFF] border-2 border-[#1A1A1A] shadow-sticker-sm">
                    <span className="text-[10px] text-[#1A1A1A]/70 uppercase block">STORAGE CAPACITY</span>
                    <span className="text-[#1A1A1A]">{game.systemReqs?.storage || '80 GB NVMe SSD'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'seller' && (
            <div className="bg-[#F5F4FF] rounded-3xl p-6 sm:p-8 border-3 border-[#1A1A1A] shadow-sticker-lg space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#F3E29B] border-2.5 border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] font-extrabold text-lg shadow-sticker-sm">
                  {(game.sellerName || 'G').charAt(0)}
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-[#1A1A1A]">{game.sellerName || 'Game Nest Official Merchant'}</h4>
                  <p className="text-[11px] font-extrabold text-[#6C6CEB] uppercase tracking-wider">
                    VERIFIED SELLER #{game.sellerId}
                  </p>
                </div>
              </div>

              <p className="text-xs font-bold text-[#1A1A1A]/80 leading-relaxed">
                All game keys sold on Game Nest undergo multi-point security validation against publisher API clusters. Keys are issued immediately into your account order vault upon payment confirmation.
              </p>
            </div>
          )}
        </div>

      </section>
    </div>
  );
}
