'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, UserCheck, Sparkles, Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/lib/types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { loginDemo, showToast } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth & assign selected role
    loginDemo(selectedRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
      <div className="relative w-full max-w-md bg-[#121212] border border-surface-border rounded-2xl shadow-panel p-6 sm:p-8 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-primary-muted hover:text-primary transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full border border-accent/40 bg-surface flex items-center justify-center mx-auto mb-3 text-accent shadow-copper">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-display tracking-[0.2em] font-light text-primary uppercase">
            {mode === 'signin' ? 'WELCOME BACK' : 'CREATE ACCOUNT'}
          </h3>
          <p className="text-xs text-primary-muted mt-1">
            Access luxury digital game keys & seller tools
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="mb-6">
          <label className="block text-[10px] font-bold text-accent tracking-widest uppercase mb-2">
            SELECT YOUR ROLE
          </label>
          <div className="grid grid-cols-2 gap-3 p-1 bg-surface border border-surface-border rounded-xl">
            <button
              type="button"
              onClick={() => setSelectedRole('customer')}
              className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all ${
                selectedRole === 'customer'
                  ? 'bg-accent text-[#0a0a0a] shadow-copper'
                  : 'text-primary-muted hover:text-primary'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              CUSTOMER
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('seller')}
              className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all ${
                selectedRole === 'seller'
                  ? 'bg-amber-600 text-white shadow-copper'
                  : 'text-primary-muted hover:text-primary'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              SELLER
            </button>
          </div>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-[10px] text-primary-muted font-mono uppercase mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Alexander Chronos"
                className="w-full bg-surface border border-surface-border rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] text-primary-muted font-mono uppercase mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="user@gamenest.com"
              className="w-full bg-surface border border-surface-border rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] text-primary-muted font-mono uppercase mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-surface border border-surface-border rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full btn-copper-pill text-xs py-3 mt-2 font-bold tracking-widest"
          >
            {mode === 'signin' ? `SIGN IN AS ${selectedRole.toUpperCase()}` : `JOIN GAME-NEST AS ${selectedRole.toUpperCase()}`}
          </button>
        </form>

        {/* Quick Demo Access Bar */}
        <div className="mt-6 pt-6 border-t border-surface-border text-center">
          <p className="text-[10px] text-accent tracking-widest uppercase mb-3 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3" /> ONE-CLICK DEMO LOGIN
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                loginDemo('customer');
                onClose();
              }}
              className="py-2 px-3 rounded-xl bg-surface border border-surface-border hover:border-accent/40 text-[11px] font-semibold text-primary transition-all"
            >
              Demo Customer
            </button>
            <button
              onClick={() => {
                loginDemo('seller');
                onClose();
              }}
              className="py-2 px-3 rounded-xl bg-surface border border-amber-500/40 hover:border-amber-400 text-[11px] font-semibold text-amber-300 transition-all"
            >
              Demo Seller
            </button>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="text-[11px] text-primary-muted hover:text-accent transition-colors"
          >
            {mode === 'signin'
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};
