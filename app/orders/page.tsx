'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Key, Copy, Check, ShieldCheck, Gamepad2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { StoreService } from '@/lib/store-service';
import { Order } from '@/lib/types';

export default function OrdersPage() {
  const { user, showToast } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    const activeUserId = user ? user.userId : 'guest-user';
    const fetched = StoreService.getOrders(activeUserId);
    setOrders(fetched);
  }, [user]);

  const handleCopyKey = (keyString: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard?.writeText(keyString);
      setCopiedKey(keyString);
      showToast('Digital activation key copied to clipboard!');
      setTimeout(() => setCopiedKey(null), 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#6C6CEB] text-[#1A1A1A] min-h-screen">
      {/* Header */}
      <div className="border-b-3 border-[#1A1A1A] pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3E29B] border-2 border-[#1A1A1A] text-[#1A1A1A] text-xs font-extrabold shadow-sticker-sm mb-2 uppercase">
          <Key className="w-4 h-4 fill-[#1A1A1A]" />
          <span>DIGITAL VAULT & ACTIVATION KEYS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white glitch-text uppercase tracking-tight">
          MY ORDERS & DIGITAL KEYS
        </h1>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-[#F5F4FF] border-3 border-[#1A1A1A] rounded-3xl shadow-sticker-lg space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#F4A6C6] border-2.5 border-[#1A1A1A] flex items-center justify-center mx-auto text-[#1A1A1A] shadow-sticker-sm">
            <Key className="w-8 h-8 stroke-[2.5]" />
          </div>
          <h3 className="text-base font-extrabold text-[#1A1A1A] uppercase tracking-wide">
            NO DIGITAL KEYS ISSUED YET
          </h3>
          <p className="text-xs font-bold text-[#1A1A1A]/70 max-w-sm mx-auto">
            Purchased games and instant activation keys will appear here after checkout.
          </p>
          <Link href="/catalog" className="btn-pill-pink text-xs inline-block py-3 px-8 font-extrabold">
            EXPLORE MARKETPLACE
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.orderId} className="bg-[#F5F4FF] border-3 border-[#1A1A1A] rounded-3xl p-6 space-y-6 shadow-sticker-md">
              
              {/* Order Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#1A1A1A]/15 pb-4 text-xs font-bold text-[#1A1A1A]">
                <div>
                  <span className="text-[10px] text-[#1A1A1A]/70 uppercase block">ORDER ID</span>
                  <span className="font-extrabold text-[#6C6CEB]">{order.orderId}</span>
                </div>

                <div>
                  <span className="text-[10px] text-[#1A1A1A]/70 uppercase block">DATE</span>
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>

                <div>
                  <span className="text-[10px] text-[#1A1A1A]/70 uppercase block">PAYMENT</span>
                  <span>{order.paymentMethod}</span>
                </div>

                <div>
                  <span className="text-[10px] text-[#1A1A1A]/70 uppercase block">TOTAL</span>
                  <span className="font-extrabold text-[#1A1A1A]">${order.total.toFixed(2)}</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A9E8D6] border-2 border-[#1A1A1A] text-[#1A1A1A] text-[10px] uppercase font-extrabold shadow-sticker-sm">
                  <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                  KEY ISSUED
                </div>
              </div>

              {/* Items & Digital Keys */}
              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="bg-[#FFFFFF] border-2.5 border-[#1A1A1A] rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sticker-sm">
                    
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-14 rounded-xl overflow-hidden border-2 border-[#1A1A1A] flex-shrink-0 bg-[#B4B3E6]">
                        <Image src={item.coverImage} alt={item.title} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold text-[#1A1A1A] bg-[#F3E29B] border border-[#1A1A1A] px-2 py-0.2 rounded-full uppercase">
                          {item.platform}
                        </span>
                        <h4 className="text-sm font-extrabold text-[#1A1A1A] mt-1">{item.title}</h4>
                        <p className="text-[11px] font-bold text-[#1A1A1A]/70 mt-0.5">
                          Price: ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Key Box */}
                    <div className="flex items-center gap-3 bg-[#F5F4FF] border-2 border-[#1A1A1A] rounded-xl px-4 py-2.5 shadow-sticker-sm">
                      <div>
                        <span className="text-[9px] font-extrabold text-[#1A1A1A]/70 uppercase block">
                          ACTIVATION KEY
                        </span>
                        <span className="text-xs font-mono font-extrabold text-[#1A1A1A] tracking-wider">
                          {item.digitalKey}
                        </span>
                      </div>

                      <button
                        onClick={() => handleCopyKey(item.digitalKey)}
                        className="p-2 rounded-lg bg-[#F4A6C6] hover:bg-[#F3E29B] border border-[#1A1A1A] text-[#1A1A1A] transition-all ml-2 shadow-sticker-sm"
                        title="Copy Key"
                      >
                        {copiedKey === item.digitalKey ? (
                          <Check className="w-4 h-4 stroke-[3]" />
                        ) : (
                          <Copy className="w-4 h-4 stroke-[2.5]" />
                        )}
                      </button>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
