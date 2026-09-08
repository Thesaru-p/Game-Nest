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
  const { loginDemo } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginDemo(selectedRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in">
      <div className="relative w-full max-w-md bg-[#F5F4FF] border-3 border-[#1A1A1A] rounded-3xl shadow-sticker-lg p-5 sm:p-8 max-h-[92vh] overflow-y-auto text-[#1A1A1A]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-[#FFFFFF] border-2 border-[#1A1A1A] text-[#1A1A1A] transition-colors"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full border-2 border-[#1A1A1A] bg-[#F4A6C6] flex items-center justify-center mx-auto mb-3 text-[#1A1A1A] shadow-sticker-sm">
            <Lock className="w-5 h-5 stroke-[2.5]" />
          </div>
          <h3 className="text-xl font-extrabold text-[#1A1A1A] uppercase tracking-tight italic glitch-subhead">
            {mode === 'signin' ? 'WELCOME BACK' : 'CREATE ACCOUNT'}
          </h3>
          <p className="text-xs font-bold text-[#1A1A1A]/70 mt-1">
            Access digital game keys & seller portal
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="mb-6">
          <label className="block text-[10px] font-extrabold text-[#1A1A1A] tracking-wider uppercase mb-2">
            SELECT YOUR ROLE
          </label>
          <div className="grid grid-cols-2 gap-3 p-1 bg-[#FFFFFF] border-2 border-[#1A1A1A] rounded-2xl shadow-sticker-sm">
            <button
              type="button"
              onClick={() => setSelectedRole('customer')}
              className={`flex items-center justify-center gap-2 py-2 text-xs font-extrabold rounded-xl transition-all ${
                selectedRole === 'customer'
                  ? 'bg-[#F4A6C6] text-[#1A1A1A] border-2 border-[#1A1A1A] shadow-sticker-sm'
                  : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A]'
              }`}
            >
              <UserCheck className="w-4 h-4 stroke-[2.5]" />
              CUSTOMER
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('seller')}
              className={`flex items-center justify-center gap-2 py-2 text-xs font-extrabold rounded-xl transition-all ${
                selectedRole === 'seller'
                  ? 'bg-[#F3E29B] text-[#1A1A1A] border-2 border-[#1A1A1A] shadow-sticker-sm'
                  : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A]'
              }`}
            >
              <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
              SELLER
            </button>
          </div>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-bold text-xs">
          {mode === 'signup' && (
            <div>
              <label className="block text-[10px] text-[#1A1A1A] uppercase mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Gamer Tag or Name"
                className="w-full bg-[#FFFFFF] border-2 border-[#1A1A1A] rounded-2xl px-4 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:bg-[#F3E29B]"
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] text-[#1A1A1A] uppercase mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="user@gamenest.com"
              className="w-full bg-[#FFFFFF] border-2 border-[#1A1A1A] rounded-2xl px-4 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:bg-[#F3E29B]"
            />
          </div>

          <div>
            <label className="block text-[10px] text-[#1A1A1A] uppercase mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#FFFFFF] border-2 border-[#1A1A1A] rounded-2xl px-4 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:bg-[#F3E29B]"
            />
          </div>

          <button
            type="submit"
            className="w-full btn-pill-pink text-xs py-3 mt-2 font-extrabold tracking-wider"
          >
            {mode === 'signin' ? `SIGN IN AS ${selectedRole.toUpperCase()}` : `JOIN GAME NEST AS ${selectedRole.toUpperCase()}`}
          </button>
        </form>

        {/* Quick Demo Access Bar */}
        <div className="mt-6 pt-5 border-t-2 border-[#1A1A1A]/15 text-center">
          <p className="text-[10px] font-extrabold text-[#1A1A1A] tracking-wider uppercase mb-3 flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5 fill-[#1A1A1A]" /> ONE-CLICK DEMO LOGIN
          </p>
          <div className="grid grid-cols-2 gap-3 font-extrabold">
            <button
              onClick={() => {
                loginDemo('customer');
                onClose();
              }}
              className="py-2 px-3 rounded-full bg-[#A9E8D6] border-2 border-[#1A1A1A] text-xs text-[#1A1A1A] shadow-sticker-sm hover:scale-105 transition-all"
            >
              Demo Customer
            </button>
            <button
              onClick={() => {
                loginDemo('seller');
                onClose();
              }}
              className="py-2 px-3 rounded-full bg-[#F3E29B] border-2 border-[#1A1A1A] text-xs text-[#1A1A1A] shadow-sticker-sm hover:scale-105 transition-all"
            >
              Demo Seller
            </button>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="text-[11px] font-extrabold text-[#6C6CEB] hover:underline"
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
