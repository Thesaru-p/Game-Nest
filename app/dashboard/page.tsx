'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Trash2, Edit3, ShieldCheck, DollarSign, Package, Sparkles, X, Check, ArrowUpRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { StoreService } from '@/lib/store-service';
import { Game, GameBadge } from '@/lib/types';

export default function SellerDashboardPage() {
  const { user, role, setRole, showToast } = useAuth();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State for Adding New Game
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('Action RPG');
  const [platform, setPlatform] = useState('PC (Steam)');
  const [price, setPrice] = useState('59.99');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80');
  const [badge, setBadge] = useState<GameBadge>('new');
  const [stock, setStock] = useState('50');

  useEffect(() => {
    async function load() {
      const data = await StoreService.getGames();
      setGames(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleCreateGame = async (e: React.FormEvent) => {
    e.preventDefault();
    const newGame = await StoreService.createGame({
      sellerId: user ? user.userId : 'seller-demo',
      sellerName: user ? (user.storeName || user.name) : 'Chronos Vault Store',
      title,
      subtitle,
      description,
      genre,
      platform,
      price: parseFloat(price) || 49.99,
      coverImage: coverImage || '/images/chronos_hero.png',
      badge,
      stock: parseInt(stock) || 20,
    });

    setGames([newGame, ...games]);
    setIsAddModalOpen(false);
    showToast(`Successfully listed "${title}" on marketplace!`);

    // Reset Form
    setTitle('');
    setSubtitle('');
    setDescription('');
  };

  const handleDeleteGame = async (gameId: string, gameTitle: string) => {
    if (confirm(`Are you sure you want to remove "${gameTitle}" from your seller listings?`)) {
      await StoreService.deleteGame(gameId);
      setGames(games.filter((g) => g.gameId !== gameId));
      showToast(`Removed "${gameTitle}"`);
    }
  };

  // Seller Dashboard Revenue Calculation
  const totalListings = games.length;
  const totalStock = games.reduce((sum, g) => sum + g.stock, 0);
  const estimatedRevenue = games.reduce((sum, g) => sum + g.price * g.stock, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2 text-accent font-mono text-[10px] tracking-[0.25em] uppercase mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SELLER PORTAL & INVENTORY MANAGEMENT</span>
          </div>
          <h1 className="text-3xl font-display font-light text-primary uppercase tracking-tight">
            SELLER <span className="text-accent font-bold">DASHBOARD</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Role Switcher prompt if customer */}
          {role !== 'seller' && (
            <button
              onClick={() => {
                setRole('seller');
                showToast('Switched role to Seller');
              }}
              className="text-xs font-bold text-amber-300 bg-amber-600/20 border border-amber-500/50 px-4 py-2 rounded-full uppercase tracking-wider hover:bg-amber-600/30 transition-all"
            >
              SWITCH TO SELLER MODE
            </button>
          )}

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-copper-pill text-xs py-2.5 px-6 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            LIST NEW GAME
          </button>
        </div>
      </div>

      {/* Seller Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-surface border border-surface-border rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-primary-muted">
            <span className="text-[10px] font-mono uppercase tracking-widest">ACTIVE LISTINGS</span>
            <Package className="w-4 h-4 text-accent" />
          </div>
          <p className="text-3xl font-extrabold text-primary">{totalListings}</p>
        </div>

        <div className="bg-surface border border-surface-border rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-primary-muted">
            <span className="text-[10px] font-mono uppercase tracking-widest">AVAILABLE DIGITAL KEYS</span>
            <Sparkles className="w-4 h-4 text-accent" />
          </div>
          <p className="text-3xl font-extrabold text-accent">{totalStock}</p>
        </div>

        <div className="bg-surface border border-surface-border rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-primary-muted">
            <span className="text-[10px] font-mono uppercase tracking-widest">POTENTIAL INVENTORY VALUE</span>
            <DollarSign className="w-4 h-4 text-accent" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-400">${estimatedRevenue.toFixed(2)}</p>
        </div>
      </div>

      {/* Listings Table / Grid */}
      <div className="bg-surface border border-surface-border rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-mono font-bold text-accent uppercase tracking-widest">
            YOUR STORE LISTINGS
          </h3>
          <span className="text-xs text-primary-muted font-mono">{games.length} Active Items</span>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs font-mono text-primary-muted">
            LOADING LISTINGS...
          </div>
        ) : games.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <p className="text-xs font-mono text-primary-muted uppercase tracking-widest">
              YOU HAVE NO ACTIVE GAME LISTINGS
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn-copper-outline text-xs"
            >
              CREATE YOUR FIRST LISTING
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="border-b border-surface-border text-primary-muted uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">GAME TITLE</th>
                  <th className="py-3 px-4">PLATFORM</th>
                  <th className="py-3 px-4">PRICE</th>
                  <th className="py-3 px-4">STOCK</th>
                  <th className="py-3 px-4">EDITION BADGE</th>
                  <th className="py-3 px-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/40">
                {games.map((g) => (
                  <tr key={g.gameId} className="hover:bg-surface-hover/50 transition-colors">
                    <td className="py-4 px-4 flex items-center gap-3">
                      <div className="relative w-10 h-12 rounded overflow-hidden border border-surface-border flex-shrink-0 bg-surface">
                        <Image src={g.coverImage} alt={g.title} fill className="object-cover" />
                      </div>
                      <div>
                        <Link href={`/game/${g.gameId}`} className="font-bold text-primary hover:text-accent flex items-center gap-1">
                          {g.title}
                          <ArrowUpRight className="w-3 h-3 opacity-60" />
                        </Link>
                        <span className="text-[9px] text-primary-muted block">{g.genre}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-primary-muted">{g.platform}</td>
                    <td className="py-4 px-4 font-bold text-accent">${g.price.toFixed(2)}</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded bg-surface-border text-primary">
                        {g.stock} keys
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {g.badge ? (
                        <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-accent/20 text-accent border border-accent/30">
                          {g.badge}
                        </span>
                      ) : (
                        <span className="text-[9px] text-primary-dark">Standard</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleDeleteGame(g.gameId, g.title)}
                        className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded transition-colors"
                        title="Remove Listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Game Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="relative w-full max-w-xl bg-[#121212] border border-surface-border rounded-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-panel">
            <div className="flex items-center justify-between border-b border-surface-border pb-4">
              <h3 className="text-base font-display font-light text-primary uppercase tracking-widest">
                LIST NEW GAME ON <span className="text-accent font-bold">GAME-NEST</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-primary-muted hover:text-primary p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGame} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] text-accent font-mono uppercase mb-1">Game Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. STARFIELD: CONSTELLATION EDITION"
                  className="w-full bg-surface border border-surface-border rounded-xl px-4 py-2.5 text-primary focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-[10px] text-accent font-mono uppercase mb-1">Subtitle / Key Type</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={e => setSubtitle(e.target.value)}
                  placeholder="e.g. DIGITAL STEAM KEY + PREORDER BONUS"
                  className="w-full bg-surface border border-surface-border rounded-xl px-4 py-2.5 text-primary focus:outline-none focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-accent font-mono uppercase mb-1">Genre</label>
                  <select
                    value={genre}
                    onChange={e => setGenre(e.target.value)}
                    className="w-full bg-surface border border-surface-border rounded-xl px-4 py-2.5 text-primary focus:outline-none focus:border-accent"
                  >
                    <option value="Action RPG">Action RPG</option>
                    <option value="Dark Fantasy">Dark Fantasy</option>
                    <option value="Sci-Fi Cyberpunk">Sci-Fi Cyberpunk</option>
                    <option value="Action-Adventure">Action-Adventure</option>
                    <option value="Racing">Racing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-accent font-mono uppercase mb-1">Platform</label>
                  <select
                    value={platform}
                    onChange={e => setPlatform(e.target.value)}
                    className="w-full bg-surface border border-surface-border rounded-xl px-4 py-2.5 text-primary focus:outline-none focus:border-accent"
                  >
                    <option value="PC (Steam)">PC (Steam)</option>
                    <option value="PlayStation 5">PlayStation 5</option>
                    <option value="Xbox Series X">Xbox Series X</option>
                    <option value="Nintendo Switch">Nintendo Switch</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] text-accent font-mono uppercase mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    className="w-full bg-surface border border-surface-border rounded-xl px-4 py-2.5 text-primary focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-accent font-mono uppercase mb-1">Stock (Keys)</label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={e => setStock(e.target.value)}
                    className="w-full bg-surface border border-surface-border rounded-xl px-4 py-2.5 text-primary focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-accent font-mono uppercase mb-1">Badge Tag</label>
                  <select
                    value={badge || ''}
                    onChange={e => setBadge((e.target.value || null) as GameBadge)}
                    className="w-full bg-surface border border-surface-border rounded-xl px-4 py-2.5 text-primary focus:outline-none focus:border-accent"
                  >
                    <option value="new">NEW</option>
                    <option value="limited">LIMITED</option>
                    <option value="sale">SALE</option>
                    <option value="">None</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-accent font-mono uppercase mb-1">Cover Image URL</label>
                <input
                  type="url"
                  required
                  value={coverImage}
                  onChange={e => setCoverImage(e.target.value)}
                  className="w-full bg-surface border border-surface-border rounded-xl px-4 py-2.5 text-primary focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-[10px] text-accent font-mono uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Detailed synopsis of the game edition and keys included..."
                  className="w-full bg-surface border border-surface-border rounded-xl px-4 py-2.5 text-primary focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-surface-border text-primary-muted hover:text-primary text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-copper-pill text-xs py-2.5 px-6"
                >
                  PUBLISH LISTING
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
