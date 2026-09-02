'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, CreditCard, CheckCircle2, Zap, ArrowRight, Wallet } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '@/context/AuthContext';
import { StoreService } from '@/lib/store-service';

export default function CheckoutPage() {
  const router = useRouter();
  const { user, cart, showToast, refreshCart } = useAuth();

  const [email, setEmail] = useState(user ? user.email : 'customer@gamenest.com');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto' | 'paypal'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.game.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsProcessing(true);

    setTimeout(() => {
      const activeUserId = user ? user.userId : 'guest-user';
      const order = StoreService.createOrder(activeUserId, email, cart, total, paymentMethod.toUpperCase());
      
      refreshCart();
      setIsProcessing(false);

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#c9884f', '#e09f53', '#ffffff'],
        });
      } catch {}

      showToast(`Order #${order.orderId} placed successfully! Digital keys issued.`);
      router.push('/orders');
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-xl font-display uppercase tracking-widest text-primary">
          YOUR CART IS EMPTY
        </h2>
        <p className="text-xs text-primary-muted">
          Add luxury games to your cart to proceed with checkout.
        </p>
        <Link href="/catalog" className="btn-copper-pill text-xs inline-block py-3 px-8">
          EXPLORE CATALOG
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-surface-border/60 pb-6">
        <div className="flex items-center gap-2 text-accent font-mono text-[10px] tracking-[0.25em] uppercase mb-1">
          <Lock className="w-3.5 h-3.5" />
          <span>ENCRYPTED SECURE CHECKOUT</span>
        </div>
        <h1 className="text-3xl font-display font-light text-primary uppercase tracking-tight">
          CHECKOUT & <span className="text-accent font-bold">DIGITAL ISSUANCE</span>
        </h1>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Delivery Email & Payment Method */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Digital Delivery Email */}
          <div className="bg-surface border border-surface-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold text-accent uppercase tracking-widest flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center text-[10px]">1</span>
                DIGITAL KEY DELIVERY EMAIL
              </h3>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <Zap className="w-3 h-3" /> Instant Code
              </span>
            </div>

            <div>
              <label className="block text-[10px] text-primary-muted font-mono uppercase mb-1">
                Email Address for Key Delivery
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="customer@gamenest.com"
                className="w-full bg-[#0a0a0a] border border-surface-border rounded-xl px-4 py-3 text-xs text-primary focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          {/* Step 2: Payment Method Selector */}
          <div className="bg-surface border border-surface-border rounded-2xl p-6 space-y-6">
            <h3 className="text-xs font-mono font-bold text-accent uppercase tracking-widest flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center text-[10px]">2</span>
              PAYMENT METHOD
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-3 px-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-accent/15 border-accent text-accent shadow-copper'
                    : 'bg-[#0a0a0a] border-surface-border text-primary-muted hover:border-accent/40'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span className="text-[10px] font-bold tracking-widest uppercase">CREDIT CARD</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('crypto')}
                className={`py-3 px-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  paymentMethod === 'crypto'
                    ? 'bg-accent/15 border-accent text-accent shadow-copper'
                    : 'bg-[#0a0a0a] border-surface-border text-primary-muted hover:border-accent/40'
                }`}
              >
                <Wallet className="w-5 h-5" />
                <span className="text-[10px] font-bold tracking-widest uppercase">CRYPTO / BTC</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                className={`py-3 px-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  paymentMethod === 'paypal'
                    ? 'bg-accent/15 border-accent text-accent shadow-copper'
                    : 'bg-[#0a0a0a] border-surface-border text-primary-muted hover:border-accent/40'
                }`}
              >
                <ShieldCheck className="w-5 h-5" />
                <span className="text-[10px] font-bold tracking-widest uppercase">PAYPAL VIP</span>
              </button>
            </div>

            {/* Card Inputs */}
            {paymentMethod === 'card' && (
              <div className="space-y-4 pt-2 border-t border-surface-border/50">
                <div>
                  <label className="block text-[10px] text-primary-muted font-mono uppercase mb-1">Card Number</label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-surface-border rounded-xl px-4 py-2.5 text-xs font-mono text-primary focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-primary-muted font-mono uppercase mb-1">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={e => setCardExpiry(e.target.value)}
                      className="w-full bg-[#0a0a0a] border border-surface-border rounded-xl px-4 py-2.5 text-xs font-mono text-primary focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-primary-muted font-mono uppercase mb-1">CVC Code</label>
                    <input
                      type="password"
                      required
                      value={cardCvc}
                      onChange={e => setCardCvc(e.target.value)}
                      className="w-full bg-[#0a0a0a] border border-surface-border rounded-xl px-4 py-2.5 text-xs font-mono text-primary focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Order Summary & Place Order CTA */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface border border-surface-border rounded-2xl p-6 space-y-5">
            <h3 className="text-xs font-mono font-bold text-accent uppercase tracking-widest border-b border-surface-border/50 pb-3">
              ORDER SUMMARY ({cart.length} ITEMS)
            </h3>

            {/* Cart items preview */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-12 rounded overflow-hidden border border-surface-border flex-shrink-0 bg-[#0a0a0a]">
                      <Image src={item.game.coverImage} alt={item.game.title} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-primary truncate max-w-[160px]">{item.game.title}</p>
                      <p className="text-[9px] text-accent font-mono uppercase">{item.game.platform}</p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-primary">${(item.game.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t border-surface-border/60 text-xs font-mono">
              <div className="flex justify-between text-primary-muted">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-primary-muted">
                <span>Tax & Digital Fee (5%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-accent pt-2 border-t border-surface-border/60">
                <span>TOTAL DUE</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full btn-copper-pill text-xs py-4 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isProcessing ? (
                <span className="animate-pulse font-mono">ISSUING DIGITAL KEYS...</span>
              ) : (
                <>
                  <span>PAY NOW (${total.toFixed(2)})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-primary-muted">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
              <span>Instant Digital Key Access on Confirmation</span>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
