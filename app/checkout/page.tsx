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

      // Trigger Y2K Confetti Celebration
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F4A6C6', '#F3E29B', '#A9E8D6', '#6C6CEB'],
        });
      } catch {}

      showToast(`Order #${order.orderId} placed successfully! Digital keys issued.`);
      router.push('/orders');
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4 bg-[#6C6CEB] min-h-screen">
        <h2 className="text-xl font-extrabold uppercase tracking-wider text-white">
          YOUR CART IS EMPTY
        </h2>
        <p className="text-xs font-bold text-white/80">
          Add retro & next-gen games to your cart to proceed with checkout.
        </p>
        <Link href="/catalog" className="btn-pill-yellow text-xs inline-block py-3 px-8 font-extrabold">
          EXPLORE CATALOG
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#6C6CEB] text-[#1A1A1A] min-h-screen">
      
      {/* Header */}
      <div className="border-b-3 border-[#1A1A1A] pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A9E8D6] border-2 border-[#1A1A1A] text-[#1A1A1A] text-xs font-extrabold shadow-sticker-sm mb-2 uppercase">
          <Lock className="w-4 h-4 stroke-[2.5]" />
          <span>ENCRYPTED SECURE CHECKOUT</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white glitch-text uppercase tracking-tight">
          CHECKOUT & DIGITAL ISSUANCE
        </h1>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Delivery Email & Payment Method */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Digital Delivery Email */}
          <div className="bg-[#F5F4FF] border-3 border-[#1A1A1A] rounded-3xl p-6 space-y-4 shadow-sticker-md">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F4A6C6] border-2 border-[#1A1A1A] text-[#1A1A1A] flex items-center justify-center text-xs font-extrabold">1</span>
                DIGITAL KEY DELIVERY EMAIL
              </h3>
              <span className="text-[10px] bg-[#F3E29B] border border-[#1A1A1A] text-[#1A1A1A] px-2 py-0.5 rounded-full font-extrabold flex items-center gap-1">
                <Zap className="w-3 h-3 fill-[#1A1A1A]" /> Instant Dispatch
              </span>
            </div>

            <div>
              <label className="block text-[10px] text-[#1A1A1A] font-extrabold uppercase mb-1">
                Email Address for Key Delivery
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="customer@gamenest.com"
                className="w-full bg-[#FFFFFF] border-2 border-[#1A1A1A] rounded-2xl px-4 py-3 text-xs font-bold text-[#1A1A1A] focus:outline-none focus:bg-[#F3E29B]"
              />
            </div>
          </div>

          {/* Step 2: Payment Method Selector */}
          <div className="bg-[#F5F4FF] border-3 border-[#1A1A1A] rounded-3xl p-6 space-y-6 shadow-sticker-md">
            <h3 className="text-xs font-extrabold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#F3E29B] border-2 border-[#1A1A1A] text-[#1A1A1A] flex items-center justify-center text-xs font-extrabold">2</span>
              PAYMENT METHOD
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-3 px-4 rounded-2xl border-2 border-[#1A1A1A] flex flex-col items-center gap-2 transition-all font-extrabold ${
                  paymentMethod === 'card'
                    ? 'bg-[#F4A6C6] text-[#1A1A1A] shadow-sticker-sm scale-105'
                    : 'bg-[#FFFFFF] text-[#1A1A1A] hover:bg-[#F3E29B]'
                }`}
              >
                <CreditCard className="w-5 h-5 stroke-[2.5]" />
                <span className="text-[10px] tracking-wider uppercase">CREDIT CARD</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('crypto')}
                className={`py-3 px-4 rounded-2xl border-2 border-[#1A1A1A] flex flex-col items-center gap-2 transition-all font-extrabold ${
                  paymentMethod === 'crypto'
                    ? 'bg-[#F3E29B] text-[#1A1A1A] shadow-sticker-sm scale-105'
                    : 'bg-[#FFFFFF] text-[#1A1A1A] hover:bg-[#F4A6C6]'
                }`}
              >
                <Wallet className="w-5 h-5 stroke-[2.5]" />
                <span className="text-[10px] tracking-wider uppercase">CRYPTO / BTC</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                className={`py-3 px-4 rounded-2xl border-2 border-[#1A1A1A] flex flex-col items-center gap-2 transition-all font-extrabold ${
                  paymentMethod === 'paypal'
                    ? 'bg-[#A9E8D6] text-[#1A1A1A] shadow-sticker-sm scale-105'
                    : 'bg-[#FFFFFF] text-[#1A1A1A] hover:bg-[#F3E29B]'
                }`}
              >
                <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
                <span className="text-[10px] tracking-wider uppercase">PAYPAL VIP</span>
              </button>
            </div>

            {/* Card Inputs */}
            {paymentMethod === 'card' && (
              <div className="space-y-4 pt-3 border-t-2 border-[#1A1A1A]/15 font-bold">
                <div>
                  <label className="block text-[10px] text-[#1A1A1A] uppercase mb-1">Card Number</label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value)}
                    className="w-full bg-[#FFFFFF] border-2 border-[#1A1A1A] rounded-2xl px-4 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:bg-[#F3E29B]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-[#1A1A1A] uppercase mb-1">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={e => setCardExpiry(e.target.value)}
                      className="w-full bg-[#FFFFFF] border-2 border-[#1A1A1A] rounded-2xl px-4 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:bg-[#F3E29B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#1A1A1A] uppercase mb-1">CVC Code</label>
                    <input
                      type="password"
                      required
                      value={cardCvc}
                      onChange={e => setCardCvc(e.target.value)}
                      className="w-full bg-[#FFFFFF] border-2 border-[#1A1A1A] rounded-2xl px-4 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:bg-[#F3E29B]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#F5F4FF] border-3 border-[#1A1A1A] rounded-3xl p-6 space-y-5 shadow-sticker-lg">
            <h3 className="text-xs font-extrabold text-[#1A1A1A] uppercase tracking-wider bg-[#F4A6C6] border-2 border-[#1A1A1A] px-3 py-1 rounded-full w-fit shadow-sticker-sm">
              ORDER SUMMARY ({cart.length} ITEMS)
            </h3>

            {/* Cart items preview */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex items-center justify-between text-xs font-bold text-[#1A1A1A]">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-12 rounded-lg overflow-hidden border-2 border-[#1A1A1A] flex-shrink-0 bg-[#B4B3E6]">
                      <Image src={item.game.coverImage} alt={item.game.title} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-extrabold text-[#1A1A1A] truncate max-w-[160px]">{item.game.title}</p>
                      <p className="text-[10px] text-[#6C6CEB] uppercase font-extrabold">{item.game.platform}</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-[#1A1A1A]">${(item.game.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t-2 border-[#1A1A1A]/15 text-xs font-bold text-[#1A1A1A]">
              <div className="flex justify-between text-[#1A1A1A]/70">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#1A1A1A]/70">
                <span>Tax & Digital Fee (5%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#1A1A1A] pt-2 border-t-2 border-[#1A1A1A]/15">
                <span>TOTAL DUE</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full btn-pill-pink text-xs py-4 flex items-center justify-center gap-3 font-extrabold text-sm disabled:opacity-50"
            >
              {isProcessing ? (
                <span className="animate-pulse">ISSUING DIGITAL KEYS...</span>
              ) : (
                <>
                  <span>PAY NOW (${total.toFixed(2)})</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] font-extrabold text-[#1A1A1A]/80">
              <CheckCircle2 className="w-4 h-4 stroke-[2.5] stroke-[#1A1A1A] fill-[#A9E8D6]" />
              <span>Instant Digital Key Access on Confirmation</span>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
