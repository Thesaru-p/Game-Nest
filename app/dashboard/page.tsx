'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Trash2, ShieldCheck, DollarSign, Package, Sparkles, X, ArrowUpRight } from 'lucide-react';
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
      sellerName: user ? (user.storeName || user.name) : 'Game Nest Merchant',
      title,
      subtitle,
      description,
      genre,
      platform,
      price: parseFloat(price) || 49.99,
      coverImage: coverImage || '/images/logo.png',
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

  // Analytics
  const totalListings = games.length;
  const totalStock = games.reduce((sum, g) => sum + g.stock, 0);
  const estimatedRevenue = games.reduce((sum, g) => sum + g.price * g.stock, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#6C6CEB] text-[#1A1A1A] min-h-screen">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-3 border-[#1A1A1A] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A9E8D6] border-2 border-[#1A1A1A] text-[#1A1A1A] text-xs font-extrabold shadow-sticker-sm mb-2 uppercase">
            <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
            <span>SELLER PORTAL & INVENTORY MANAGEMENT</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white glitch-text uppercase tracking-tight">
            SELLER DASHBOARD
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {role !== 'seller' && (
            <button
              onClick={() => {
                setRole('seller');
                showToast('Switched role to Seller');
              }}
              className="btn-pill-yellow text-xs py-2 px-4 font-extrabold"
            >
              SWITCH TO SELLER MODE
            </button>
          )}

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-pill-pink text-xs py-2.5 px-6 font-extrabold flex items-center gap-2"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            LIST NEW GAME
          </button>
        </div>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#F5F4FF] border-3 border-[#1A1A1A] rounded-2xl p-5 space-y-2 shadow-sticker-md">
          <div className="flex items-center justify-between text-[#1A1A1A]/70 font-extrabold">
            <span className="text-[10px] uppercase tracking-wider">ACTIVE LISTINGS</span>
            <Package className="w-5 h-5 stroke-[2.5] text-[#1A1A1A]" />
          </div>
          <p className="text-3xl font-extrabold text-[#1A1A1A]">{totalListings}</p>
        </div>

        <div className="bg-[#F3E29B] border-3 border-[#1A1A1A] rounded-2xl p-5 space-y-2 shadow-sticker-md">
          <div className="flex items-center justify-between text-[#1A1A1A]/70 font-extrabold">
            <span className="text-[10px] uppercase tracking-wider">AVAILABLE DIGITAL KEYS</span>
            <Sparkles className="w-5 h-5 fill-[#1A1A1A]" />
          </div>
          <p className="text-3xl font-extrabold text-[#1A1A1A]">{totalStock}</p>
        </div>

        <div className="bg-[#A9E8D6] border-3 border-[#1A1A1A] rounded-2xl p-5 space-y-2 shadow-sticker-md">
          <div className="flex items-center justify-between text-[#1A1A1A]/70 font-extrabold">
            <span className="text-[10px] uppercase tracking-wider">INVENTORY VALUE</span>
            <DollarSign className="w-5 h-5 stroke-[2.5] text-[#1A1A1A]" />
          </div>
          <p className="text-3xl font-extrabold text-[#1A1A1A]">${estimatedRevenue.toFixed(2)}</p>
        </div>
      </div>

      {/* Listings Table / Grid */}
      <div className="bg-[#F5F4FF] border-3 border-[#1A1A1A] rounded-3xl p-6 space-y-6 shadow-sticker-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-[#1A1A1A] uppercase tracking-wider bg-[#F4A6C6] border-2 border-[#1A1A1A] px-3 py-1 rounded-full shadow-sticker-sm">
            YOUR STORE LISTINGS
          </h3>
          <span className="text-xs text-[#1A1A1A] font-extrabold">{games.length} Active Items</span>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs font-bold text-[#1A1A1A]/70">
            LOADING LISTINGS...
          </div>
        ) : games.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <p className="text-xs font-extrabold text-[#1A1A1A] uppercase tracking-wider">
              YOU HAVE NO ACTIVE GAME LISTINGS
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn-pill-pink text-xs font-extrabold"
            >
              CREATE YOUR FIRST LISTING
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-bold">
              <thead className="border-b-2 border-[#1A1A1A]/20 text-[#1A1A1A]/70 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">GAME TITLE</th>
                  <th className="py-3 px-4">PLATFORM</th>
                  <th className="py-3 px-4">PRICE</th>
                  <th className="py-3 px-4">STOCK</th>
                  <th className="py-3 px-4">BADGE</th>
                  <th className="py-3 px-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y border-[#1A1A1A]/10">
                {games.map((g) => (
                  <tr key={g.gameId} className="hover:bg-[#FFFFFF] transition-colors">
                    <td className="py-4 px-4 flex items-center gap-3">
                      <div className="relative w-10 h-12 rounded-lg overflow-hidden border-2 border-[#1A1A1A] flex-shrink-0 bg-[#B4B3E6]">
                        <Image src={g.coverImage} alt={g.title} fill className="object-cover" />
                      </div>
                      <div>
                        <Link href={`/game/${g.gameId}`} className="font-extrabold text-[#1A1A1A] hover:text-[#6C6CEB] flex items-center gap-1">
                          {g.title}
                          <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                        </Link>
                        <span className="text-[10px] text-[#1A1A1A]/70 block">{g.genre}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[#1A1A1A]/80">{g.platform}</td>
                    <td className="py-4 px-4 font-extrabold text-[#1A1A1A]">${g.price.toFixed(2)}</td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#F3E29B] border border-[#1A1A1A] text-[#1A1A1A] font-extrabold">
                        {g.stock} keys
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {g.badge ? (
                        <span className="text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-[#F4A6C6] text-[#1A1A1A] border border-[#1A1A1A] shadow-sticker-sm">
                          {g.badge}
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#1A1A1A]/60">Standard</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleDeleteGame(g.gameId, g.title)}
                        className="p-2 text-[#1A1A1A] hover:bg-rose-300 rounded-full border border-[#1A1A1A] transition-colors shadow-sticker-sm"
                        title="Remove Listing"
                      >
                        <Trash2 className="w-4 h-4 stroke-[2.5]" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-xl bg-[#F5F4FF] border-3 border-[#1A1A1A] rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-sticker-lg">
            <div className="flex items-center justify-between border-b-2 border-[#1A1A1A]/20 pb-4">
              <h3 className="text-base font-extrabold text-[#1A1A1A] uppercase tracking-tight">
                LIST NEW GAME ON <span className="text-[#6C6CEB]">GAME NEST</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full bg-[#FFFFFF] border-2 border-[#1A1A1A] text-[#1A1A1A]"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            <form onSubmit={handleCreateGame} className="space-y-4 text-xs font-bold text-[#1A1A1A]">
              <div>
                <label className="block text-[10px] text-[#1A1A1A] uppercase mb-1">Game Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. CYBERPUNK 2077: PHANTOM LIBERTY"
                  className="w-full bg-[#FFFFFF] border-2 border-[#1A1A1A] rounded-2xl px-4 py-2.5 text-[#1A1A1A] focus:outline-none focus:bg-[#F3E29B]"
                />
              </div>

              <div>
                <label className="block text-[10px] text-[#1A1A1A] uppercase mb-1">Subtitle / Key Type</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={e => setSubtitle(e.target.value)}
                  placeholder="e.g. DIGITAL STEAM KEY + EXPANSION PASS"
                  className="w-full bg-[#FFFFFF] border-2 border-[#1A1A1A] rounded-2xl px-4 py-2.5 text-[#1A1A1A] focus:outline-none focus:bg-[#F3E29B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] text-[#1A1A1A] uppercase mb-1">Genre</label>
                  <select
                    value={genre}
                    onChange={e => setGenre(e.target.value)}
                    className="w-full bg-[#FFFFFF] border-2 border-[#1A1A1A] rounded-2xl px-4 py-2.5 text-[#1A1A1A] focus:outline-none focus:bg-[#F3E29B]"
                  >
                    <option value="Action RPG">Action RPG</option>
                    <option value="Dark Fantasy">Dark Fantasy</option>
                    <option value="Sci-Fi Cyberpunk">Sci-Fi Cyberpunk</option>
                    <option value="Action-Adventure">Action-Adventure</option>
                    <option value="Racing">Racing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-[#1A1A1A] uppercase mb-1">Platform</label>
                  <select
                    value={platform}
                    onChange={e => setPlatform(e.target.value)}
                    className="w-full bg-[#FFFFFF] border-2 border-[#1A1A1A] rounded-2xl px-4 py-2.5 text-[#1A1A1A] focus:outline-none focus:bg-[#F3E29B]"
                  >
                    <option value="PC (Steam)">PC (Steam)</option>
                    <option value="PlayStation 5">PlayStation 5</option>
                    <option value="Xbox Series X">Xbox Series X</option>
                    <option value="Nintendo Switch">Nintendo Switch</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-[10px] text-[#1A1A1A] uppercase mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    className="w-full bg-[#FFFFFF] border-2 border-[#1A1A1A] rounded-2xl px-4 py-2.5 text-[#1A1A1A] focus:outline-none focus:bg-[#F3E29B]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#1A1A1A] uppercase mb-1">Stock (Keys)</label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={e => setStock(e.target.value)}
                    className="w-full bg-[#FFFFFF] border-2 border-[#1A1A1A] rounded-2xl px-4 py-2.5 text-[#1A1A1A] focus:outline-none focus:bg-[#F3E29B]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#1A1A1A] uppercase mb-1">Badge Tag</label>
                  <select
                    value={badge || ''}
                    onChange={e => setBadge((e.target.value || null) as GameBadge)}
                    className="w-full bg-[#FFFFFF] border-2 border-[#1A1A1A] rounded-2xl px-4 py-2.5 text-[#1A1A1A] focus:outline-none focus:bg-[#F3E29B]"
                  >
                    <option value="new">NEW</option>
                    <option value="limited">LIMITED</option>
                    <option value="sale">SALE</option>
                    <option value="">None</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-[#1A1A1A] uppercase mb-1">Cover Image URL</label>
                <input
                  type="url"
                  required
                  value={coverImage}
                  onChange={e => setCoverImage(e.target.value)}
                  className="w-full bg-[#FFFFFF] border-2 border-[#1A1A1A] rounded-2xl px-4 py-2.5 text-[#1A1A1A] focus:outline-none focus:bg-[#F3E29B]"
                />
              </div>

              <div>
                <label className="block text-[10px] text-[#1A1A1A] uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Detailed synopsis of game edition and keys included..."
                  className="w-full bg-[#FFFFFF] border-2 border-[#1A1A1A] rounded-2xl px-4 py-2.5 text-[#1A1A1A] focus:outline-none focus:bg-[#F3E29B] resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2 rounded-full border-2 border-[#1A1A1A] bg-[#FFFFFF] text-[#1A1A1A] font-extrabold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-pill-pink text-xs py-2 px-6 font-extrabold"
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
