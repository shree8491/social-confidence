'use client';

import React from 'react';
import { Send, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-neutral-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2.5 group">
            <div className="w-6 h-6 rounded-md bg-white text-black font-mono text-xs font-bold flex items-center justify-center">
              SC
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-sm text-white tracking-tight">
                Social Confidence
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                Chennai
              </span>
            </div>
          </a>

          {/* Telegram CTA */}
          <a
            href="https://t.me/shree_wolverine"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors text-xs font-medium"
          >
            <Send className="w-3 h-3 -rotate-12" />
            <span>Reach Out</span>
            <ArrowUpRight className="w-3 h-3 text-neutral-600" />
          </a>
        </div>
      </div>
    </header>
  );
};
