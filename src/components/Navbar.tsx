'use client';

import React from 'react';
import { RefreshCw, Download, FileText, CheckCircle2, Sparkles } from 'lucide-react';
import { SessionData } from '@/types';
import { MOCK_COMPLETED_SESSION, INITIAL_SESSION } from '@/lib/storage';

interface NavbarProps {
  session: SessionData;
  activeTab: 'landing' | 'phase1' | 'phase2' | 'phase3' | 'summary';
  setActiveTab: (tab: 'landing' | 'phase1' | 'phase2' | 'phase3' | 'summary') => void;
  onUpdateSession: (newSession: SessionData) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  session,
  activeTab,
  setActiveTab,
  onUpdateSession,
}) => {
  const approachesCount = session.approaches.length;
  const targetCount = session.targetApproachesCount || 10;

  const handleLoadDemo = () => {
    if (confirm('Load completed demo dataset (8 approaches, audio notes, and calculated KPIs)?')) {
      onUpdateSession(MOCK_COMPLETED_SESSION);
      setActiveTab('summary');
    }
  };

  const handleReset = () => {
    if (confirm('Reset session? All unsaved active session data will be cleared.')) {
      onUpdateSession({ ...INITIAL_SESSION, id: 'session-' + Date.now() });
      setActiveTab('landing');
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(session, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `session-${session.participantName.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo & Program Title */}
          <button
            onClick={() => setActiveTab('landing')}
            className="flex items-center space-x-2.5 text-left group"
          >
            <div className="w-6 h-6 rounded-md bg-white text-black font-mono text-xs font-bold flex items-center justify-center">
              SC
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-sm text-white tracking-tight">
                  Social Confidence
                </span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                  Chennai
                </span>
              </div>
            </div>
          </button>

          {/* Minimalist Navigation Pills */}
          <nav className="hidden md:flex items-center space-x-1 p-1 rounded-full bg-neutral-950 border border-neutral-900 text-xs font-medium">
            <button
              onClick={() => setActiveTab('landing')}
              className={`px-3 py-1 rounded-full transition-colors ${
                activeTab === 'landing'
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('phase1')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-full transition-colors ${
                activeTab === 'phase1'
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>Phase 1: Mindset</span>
              {session.primingCompleted && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('phase2')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-full transition-colors ${
                activeTab === 'phase2'
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>Phase 2: Field</span>
              {approachesCount > 0 && (
                <span className="font-mono text-[10px] text-neutral-400">
                  ({approachesCount}/{targetCount})
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('phase3')}
              className={`px-3 py-1 rounded-full transition-colors ${
                activeTab === 'phase3'
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Phase 3: Debrief
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-colors ${
                activeTab === 'summary'
                  ? 'bg-white text-black font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <FileText className="w-3 h-3" />
              <span>KPI Report</span>
            </button>
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center space-x-1.5">
            <button
              onClick={handleLoadDemo}
              title="Load completed demo session"
              className="flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-900 border border-neutral-800 transition-colors"
            >
              <Sparkles className="w-3 h-3 text-neutral-400" />
              <span className="hidden sm:inline">Demo</span>
            </button>

            <button
              onClick={handleExportJson}
              title="Export JSON"
              className="p-1.5 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800/80 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleReset}
              title="Reset Session"
              className="p-1.5 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800/80 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center justify-between py-2 border-t border-neutral-900 overflow-x-auto text-xs space-x-1">
          <button
            onClick={() => setActiveTab('landing')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'landing' ? 'bg-neutral-800 text-white' : 'text-neutral-400'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('phase1')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'phase1' ? 'bg-neutral-800 text-white' : 'text-neutral-400'
            }`}
          >
            Mindset
          </button>
          <button
            onClick={() => setActiveTab('phase2')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'phase2' ? 'bg-neutral-800 text-white' : 'text-neutral-400'
            }`}
          >
            Field ({approachesCount}/{targetCount})
          </button>
          <button
            onClick={() => setActiveTab('phase3')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'phase3' ? 'bg-neutral-800 text-white' : 'text-neutral-400'
            }`}
          >
            Debrief
          </button>
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'summary' ? 'bg-white text-black font-semibold' : 'text-neutral-400'
            }`}
          >
            KPIs
          </button>
        </div>
      </div>
    </header>
  );
};
