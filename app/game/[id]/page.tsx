'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Heart, Share2, ShieldCheck, ArrowRight, Star, Cpu, HardDrive, CheckCircle2, ChevronRight, Zap, Award } from 'lucide-react';
import { StoreService } from '@/lib/store-service';
import { Game } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';

export default function GameDetailPage() {
  const params = useParams();
  const router = useRouter();
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
      <div className="min-h-screen flex items-center justify-center text-xs font-mono text-accent">
        LOADING GAME DETAILS...
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <p className="text-sm font-mono text-primary-muted uppercase tracking-widest">
          GAME NOT FOUND
        </p>
        <Link href="/catalog" className="btn-copper-outline text-xs">
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
    <div className="space-y-12 pb-24">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center gap-2 text-[10px] font-mono text-primary-muted uppercase tracking-widest">
          <Link href="/" className="hover:text-accent">STOREFRONT</Link>
          <ChevronRight className="w-3 h-3 text-surface-border" />
          <Link href="/catalog" className="hover:text-accent">CATALOG</Link>
          <ChevronRight className="w-3 h-3 text-surface-border" />
          <span className="text-accent">{game.genre}</span>
          <ChevronRight className="w-3 h-3 text-surface-border" />
          <span className="text-primary truncate max-w-[200px]">{game.title}</span>
        </div>
      </div>

      {/* Hero Product Layout Section (Chronoswiss Anchor Spec) */}
      <section className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8">
        
        {/* Soft Ambient Radial Glow Behind Product Shot */}
        <div className="absolute inset-0 amber-glow-hero pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Centered Large Product Image (Game Cover / Key Art) */}
          <div className="lg:col-span-7 relative flex justify-center">
            
            {/* Background Radial Amber Glow behind key art */}
            <div className="absolute w-[85%] h-[85%] rounded-full bg-accent/20 blur-3xl -z-10 animate-pulse-glow" />

            {/* Product Card Showcase Container */}
            <div className="relative w-full max-w-xl aspect-[4/5] rounded-3xl overflow-hidden border border-surface-border shadow-2xl bg-surface group">
              <Image
                src={game.coverImage}
                alt={game.title}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Dark Vignette Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/30 opacity-75" />

              {/* Top-Left Edition Badge */}
              {game.badge && (
                <div className="absolute top-5 left-5 z-20">
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-amber-600/90 text-amber-100 border border-amber-400/50 uppercase tracking-widest shadow-copper">
                    {game.badge === 'limited' ? `LIMITED KEY (${game.stock} LEFT)` : game.badge.toUpperCase()}
                  </span>
                </div>
              )}

              {/* Floating Action Icons Floating Top-Right of Image */}
              <div className="absolute top-5 right-5 z-20 flex items-center gap-3">
                <button
                  onClick={() => toggleWishlist(game.gameId)}
                  className={`p-3.5 rounded-full backdrop-blur-md border transition-all ${
                    isWishlisted
                      ? 'bg-rose-500/25 border-rose-500 text-rose-400 shadow-copper'
                      : 'bg-black/60 border-white/15 text-primary-muted hover:text-rose-400'
                  }`}
                  title="Wishlist Game"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                </button>

                <button
                  onClick={handleShare}
                  className="p-3.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-primary-muted hover:text-accent transition-all"
                  title="Share Game"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Bottom-Left Floating Price & BUY NOW Pill Button */}
              <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3 bg-black/85 backdrop-blur-md border border-accent/40 rounded-full px-6 py-3 shadow-copper">
                <div className="flex flex-col">
                  <span className="text-[9px] text-accent font-mono uppercase tracking-widest">DIGITAL KEY</span>
                  <span className="text-xl font-extrabold text-primary">${game.price.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => addToCart(game)}
                  className="btn-copper-pill text-xs py-2.5 px-6 ml-2 flex items-center gap-2"
                >
                  BUY NOW
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Title, Subtitle, Quick Specs, Buy Bar */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div>
              <span className="text-[10px] font-mono text-accent uppercase tracking-[0.25em] block mb-1">
                {game.platform} / {game.genre}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light text-primary tracking-tight uppercase leading-tight">
                {game.title}
              </h1>
              {game.subtitle && (
                <p className="text-xs sm:text-sm font-mono text-accent/90 uppercase tracking-widest mt-2">
                  {game.subtitle}
                </p>
              )}
            </div>

            {/* Price & Rating Header */}
            <div className="flex items-center justify-between py-4 border-y border-surface-border/50">
              <div>
                <span className="text-[10px] text-primary-muted font-mono uppercase tracking-widest block">INSTANT DIGITAL PRICE</span>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-accent">${game.price.toFixed(2)}</span>
                  {game.originalPrice && (
                    <span className="text-sm text-primary-muted line-through">${game.originalPrice.toFixed(2)}</span>
                  )}
                </div>
              </div>

              {game.rating && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{game.rating}</span>
                  <span className="text-[10px] text-primary-muted">/ 5.0</span>
                </div>
              )}
            </div>

            {/* Quick Feature Badges */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-surface border border-surface-border flex items-center gap-3">
                <Zap className="w-4 h-4 text-accent" />
                <div>
                  <p className="text-[9px] text-primary-muted font-mono uppercase">DELIVERY</p>
                  <p className="font-semibold text-primary">Instant Key Code</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface border border-surface-border flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <div>
                  <p className="text-[9px] text-primary-muted font-mono uppercase">GUARANTEE</p>
                  <p className="font-semibold text-primary">100% Authentic</p>
                </div>
              </div>
            </div>

            {/* Add to Cart CTA */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => addToCart(game)}
                className="w-full btn-copper-pill text-xs py-4 flex items-center justify-center gap-3"
              >
                <span>ADD TO CART (${game.price.toFixed(2)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-primary-muted flex items-center justify-center gap-1">
                <Award className="w-3.5 h-3.5 text-accent" />
                Verified key issued by {game.sellerName || 'Verified Luxury Seller'}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Tabbed Product Details Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Tab Buttons */}
        <div className="flex border-b border-surface-border space-x-8 text-xs font-mono tracking-widest uppercase">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 relative font-bold transition-all ${
              activeTab === 'overview' ? 'text-accent' : 'text-primary-muted hover:text-primary'
            }`}
          >
            OVERVIEW & FEATURES
            {activeTab === 'overview' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent shadow-copper" />}
          </button>

          <button
            onClick={() => setActiveTab('reqs')}
            className={`py-3 relative font-bold transition-all ${
              activeTab === 'reqs' ? 'text-accent' : 'text-primary-muted hover:text-primary'
            }`}
          >
            SYSTEM REQUIREMENTS
            {activeTab === 'reqs' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent shadow-copper" />}
          </button>

          <button
            onClick={() => setActiveTab('seller')}
            className={`py-3 relative font-bold transition-all ${
              activeTab === 'seller' ? 'text-accent' : 'text-primary-muted hover:text-primary'
            }`}
          >
            SELLER & WARRANTY
            {activeTab === 'seller' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent shadow-copper" />}
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="py-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-display text-primary uppercase tracking-wide">
                  SYNOPSIS & GAMEPLAY
                </h3>
                <p className="text-xs text-primary-muted leading-relaxed">
                  {game.description}
                </p>

                {game.features && game.features.length > 0 && (
                  <div className="pt-4 space-y-3">
                    <h4 className="text-xs font-mono font-bold text-accent uppercase tracking-widest">
                      KEY HIGHLIGHTS
                    </h4>
                    <ul className="space-y-2 text-xs text-primary-muted">
                      {game.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Sidebar Quick Specs */}
              <div className="bg-surface border border-surface-border rounded-2xl p-6 space-y-4">
                <h4 className="text-xs font-mono font-bold text-accent uppercase tracking-widest">
                  PRODUCT METADATA
                </h4>
                <div className="space-y-3 text-xs font-mono">
                  <div className="flex justify-between border-b border-surface-border/50 pb-2">
                    <span className="text-primary-muted">Platform</span>
                    <span className="text-primary">{game.platform}</span>
                  </div>
                  <div className="flex justify-between border-b border-surface-border/50 pb-2">
                    <span className="text-primary-muted">Publisher</span>
                    <span className="text-primary">{game.publisher || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between border-b border-surface-border/50 pb-2">
                    <span className="text-primary-muted">Release Date</span>
                    <span className="text-primary">{game.releaseDate || 'Available Now'}</span>
                  </div>
                  <div className="flex justify-between border-b border-surface-border/50 pb-2">
                    <span className="text-primary-muted">Stock Status</span>
                    <span className="text-emerald-400 font-bold">{game.stock} Digital Keys</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reqs' && (
            <div className="bg-surface border border-surface-border rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-3 text-accent font-mono text-xs tracking-widest uppercase">
                <Cpu className="w-4 h-4" />
                <span>RECOMMENDED HARDWARE SPECIFICATIONS ({game.platform})</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-[#0a0a0a] border border-surface-border">
                    <span className="text-[10px] text-primary-muted uppercase block">OPERATING SYSTEM</span>
                    <span className="text-primary font-bold">{game.systemReqs?.os || 'Windows 10/11 64-bit'}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0a0a0a] border border-surface-border">
                    <span className="text-[10px] text-primary-muted uppercase block">PROCESSOR / CPU</span>
                    <span className="text-primary font-bold">{game.systemReqs?.processor || 'Intel Core i7 / Ryzen 7'}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0a0a0a] border border-surface-border">
                    <span className="text-[10px] text-primary-muted uppercase block">MEMORY / RAM</span>
                    <span className="text-primary font-bold">{game.systemReqs?.memory || '16 GB RAM'}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-[#0a0a0a] border border-surface-border">
                    <span className="text-[10px] text-primary-muted uppercase block">GRAPHICS / GPU</span>
                    <span className="text-primary font-bold">{game.systemReqs?.graphics || 'NVIDIA RTX 3070 / AMD RX 6800'}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0a0a0a] border border-surface-border">
                    <span className="text-[10px] text-primary-muted uppercase block">STORAGE CAPACITY</span>
                    <span className="text-primary font-bold">{game.systemReqs?.storage || '80 GB NVMe SSD'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'seller' && (
            <div className="bg-surface border border-surface-border rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 border border-accent/40 flex items-center justify-center text-accent font-bold text-lg">
                  {(game.sellerName || 'S').charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary">{game.sellerName || 'Chronos Official Store'}</h4>
                  <p className="text-[10px] text-accent font-mono uppercase tracking-widest">
                    VERIFIED SELLER #{game.sellerId}
                  </p>
                </div>
              </div>

              <p className="text-xs text-primary-muted leading-relaxed">
                All game keys sold on Game-Nest undergo automated security validation against vendor APIs. Digital keys are delivered immediately to your account order dashboard.
              </p>
            </div>
          )}
        </div>

      </section>
    </div>
  );
}
