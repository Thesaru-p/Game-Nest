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
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121212] border-l border-surface-border shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-surface-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/40 flex items-center justify-center text-accent">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-display tracking-[0.2em] font-light text-primary uppercase">
                YOUR CART ({cart.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-primary-muted hover:text-primary p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-surface-border/40">
            {cart.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-surface border border-surface-border flex items-center justify-center text-primary-muted mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-sm font-medium text-primary uppercase tracking-widest">
                  CART IS EMPTY
                </p>
                <p className="text-xs text-primary-muted mt-1 max-w-xs">
                  Explore our luxury game marketplace to claim exclusive digital keys.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 btn-copper-outline text-xs"
                >
                  EXPLORE STOREFRONT
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartItemId} className="pt-4 first:pt-0 flex items-center gap-4">
                  {/* Game Cover Image */}
                  <div className="relative w-16 h-20 rounded-lg overflow-hidden border border-surface-border flex-shrink-0 bg-surface">
                    <Image
                      src={item.game.coverImage}
                      alt={item.game.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-mono text-accent uppercase tracking-widest block">
                      {item.game.platform}
                    </span>
                    <h4 className="text-xs font-bold text-primary truncate">
                      {item.game.title}
                    </h4>
                    <p className="text-[10px] text-primary-muted mt-0.5">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-xs font-bold text-accent mt-1">
                      ${(item.game.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.gameId)}
                    className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-surface-border bg-[#0d0d0d] space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-primary-muted">SUBTOTAL</span>
                <span className="text-base font-bold text-accent">${total.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-primary-muted">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                <span>Instant digital key issuance upon payment</span>
              </div>

              <Link
                href="/checkout"
                onClick={onClose}
                className="w-full btn-copper-pill text-xs flex items-center justify-center gap-2 py-3.5"
              >
                PROCEED TO CHECKOUT
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
