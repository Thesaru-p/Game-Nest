'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart } = useAuth();

  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.game.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in">
      {/* Overlay Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-[#F5F4FF] border-l-3 border-[#1A1A1A] shadow-sticker-lg flex flex-col justify-between text-[#1A1A1A]">
          
          {/* Header */}
          <div className="p-6 border-b-2.5 border-[#1A1A1A] flex items-center justify-between bg-[#6C6CEB]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#F3E29B] border-2 border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] shadow-sticker-sm">
                <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wide">
                YOUR CART ({cart.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-[#FFFFFF] border-2 border-[#1A1A1A] text-[#1A1A1A]"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#F4A6C6] border-2.5 border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] mb-4 shadow-sticker-sm">
                  <ShoppingBag className="w-8 h-8 stroke-[2.5]" />
                </div>
                <p className="text-sm font-extrabold text-[#1A1A1A] uppercase tracking-wide">
                  CART IS EMPTY
                </p>
                <p className="text-xs font-bold text-[#1A1A1A]/70 mt-1 max-w-xs">
                  Explore our Y2K retro game marketplace to claim instant digital keys.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 btn-pill-pink text-xs font-extrabold"
                >
                  EXPLORE STOREFRONT
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartItemId} className="bg-[#FFFFFF] border-2 border-[#1A1A1A] rounded-2xl p-4 flex items-center gap-4 shadow-sticker-sm">
                  {/* Game Cover Image */}
                  <div className="relative w-16 h-20 rounded-xl overflow-hidden border-2 border-[#1A1A1A] flex-shrink-0 bg-[#B4B3E6]">
                    <Image
                      src={item.game.coverImage}
                      alt={item.game.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 font-bold">
                    <span className="text-[10px] font-extrabold text-[#1A1A1A] bg-[#F3E29B] border border-[#1A1A1A] px-2 py-0.2 rounded-full uppercase">
                      {item.game.platform}
                    </span>
                    <h4 className="text-xs font-extrabold text-[#1A1A1A] truncate mt-1">
                      {item.game.title}
                    </h4>
                    <p className="text-[10px] text-[#1A1A1A]/70 mt-0.5">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-xs font-extrabold text-[#1A1A1A] mt-1">
                      ${(item.game.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.gameId)}
                    className="p-2 text-[#1A1A1A] hover:bg-rose-300 rounded-full border border-[#1A1A1A] transition-colors shadow-sticker-sm"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t-2.5 border-[#1A1A1A] bg-[#FFFFFF] space-y-4">
              <div className="flex items-center justify-between text-xs font-extrabold text-[#1A1A1A]">
                <span>SUBTOTAL</span>
                <span className="text-lg font-extrabold">${total.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-extrabold text-[#1A1A1A]/80">
                <ShieldCheck className="w-4 h-4 stroke-[2.5] text-[#1A1A1A]" />
                <span>Instant digital key issuance upon payment</span>
              </div>

              <Link
                href="/checkout"
                onClick={onClose}
                className="w-full btn-pill-pink text-xs flex items-center justify-center gap-2 py-3.5 font-extrabold text-sm"
              >
                PROCEED TO CHECKOUT
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
