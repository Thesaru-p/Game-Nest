'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Sparkles } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useAuth();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in">
      <div className="flex items-center gap-3 bg-[#181818] border border-accent/60 rounded-full px-5 py-3 shadow-copper">
        <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <span className="text-xs font-semibold text-primary tracking-wide">
          {toast}
        </span>
      </div>
    </div>
  );
};
