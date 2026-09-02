'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Key, Copy, Check, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
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
      showToast('Digital key copied to clipboard!');
      setTimeout(() => setCopiedKey(null), 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-surface-border/60 pb-6">
        <div className="flex items-center gap-2 text-accent font-mono text-[10px] tracking-[0.25em] uppercase mb-1">
          <Key className="w-3.5 h-3.5" />
          <span>DIGITAL VAULT & ACTIVATION KEYS</span>
        </div>
        <h1 className="text-3xl font-display font-light text-primary uppercase tracking-tight">
          MY ORDERS & <span className="text-accent font-bold">DIGITAL KEYS</span>
        </h1>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-surface border border-surface-border rounded-2xl space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#0a0a0a] border border-surface-border flex items-center justify-center mx-auto text-accent">
            <Key className="w-8 h-8" />
          </div>
          <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-primary">
            NO DIGITAL KEYS ISSUED YET
          </h3>
          <p className="text-xs text-primary-muted max-w-sm mx-auto">
            Purchased games and instant activation keys will appear here after checkout.
          </p>
          <Link href="/catalog" className="btn-copper-pill text-xs inline-block py-3 px-8">
            EXPLORE MARKETPLACE
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.orderId} className="bg-surface border border-surface-border rounded-2xl p-6 space-y-6">
              
              {/* Order Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-border/50 pb-4 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-primary-muted uppercase block">ORDER ID</span>
                  <span className="font-bold text-accent">{order.orderId}</span>
                </div>

                <div>
                  <span className="text-[10px] text-primary-muted uppercase block">DATE</span>
                  <span className="text-primary">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>

                <div>
                  <span className="text-[10px] text-primary-muted uppercase block">PAYMENT</span>
                  <span className="text-primary">{order.paymentMethod}</span>
                </div>

                <div>
                  <span className="text-[10px] text-primary-muted uppercase block">TOTAL</span>
                  <span className="font-bold text-emerald-400">${order.total.toFixed(2)}</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] uppercase font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  KEY ISSUED
                </div>
              </div>

              {/* Items & Digital Keys */}
              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="bg-[#0a0a0a] border border-surface-border rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-14 rounded overflow-hidden border border-surface-border flex-shrink-0 bg-surface">
                        <Image src={item.coverImage} alt={item.title} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-accent uppercase tracking-widest block">
                          {item.platform}
                        </span>
                        <h4 className="text-sm font-bold text-primary">{item.title}</h4>
                        <p className="text-[10px] text-primary-muted font-mono mt-0.5">
                          Price: ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Key Box */}
                    <div className="flex items-center gap-3 bg-surface border border-accent/40 rounded-xl px-4 py-2.5">
                      <div>
                        <span className="text-[9px] font-mono text-primary-muted uppercase tracking-widest block">
                          ACTIVATION KEY
                        </span>
                        <span className="text-xs font-mono font-extrabold text-accent tracking-wider">
                          {item.digitalKey}
                        </span>
                      </div>

                      <button
                        onClick={() => handleCopyKey(item.digitalKey)}
                        className="p-2 rounded-lg bg-accent/15 text-accent hover:bg-accent hover:text-[#0a0a0a] transition-all ml-2"
                        title="Copy Key"
                      >
                        {copiedKey === item.digitalKey ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
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
