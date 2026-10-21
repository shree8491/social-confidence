'use client';

import React from 'react';
import { Compass, Sparkles, RefreshCw, Download, FileText, CheckCircle2 } from 'lucide-react';
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
  const executionRate = Math.round((approachesCount / targetCount) * 100);

  const handleLoadDemo = () => {
    if (confirm('Load pre-filled completed demo session with 8 approaches, audio notes, and calculated KPIs?')) {
      onUpdateSession(MOCK_COMPLETED_SESSION);
      setActiveTab('summary');
    }
  };

  const handleReset = () => {
    if (confirm('Reset to a new clean session? All unsaved current session data will be cleared.')) {
      onUpdateSession({ ...INITIAL_SESSION, id: 'session-' + Date.now() });
      setActiveTab('landing');
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(session, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `social-confidence-session-${session.participantName.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <header className="sticky top-0 z-50 bg-[#090d16]/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Program Title */}
          <div
            onClick={() => setActiveTab('landing')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-amber-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base sm:text-lg text-white tracking-tight">
                  Social Confidence
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Chennai Field
                </span>
              </div>
              <p className="text-xs text-gray-400 hidden sm:block">
                PRD v1.1 · Shree Sundar · ₹6,999 Intensive
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-gray-900/80 p-1 rounded-xl border border-gray-800 text-xs font-medium">
            <button
              onClick={() => setActiveTab('landing')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'landing'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('phase1')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'phase1'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <span>Phase 1: Mindset</span>
              {session.primingCompleted && (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('phase2')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'phase2'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <span>Phase 2: Field Engine</span>
              {approachesCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-900 text-indigo-200">
                  {approachesCount}/{targetCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('phase3')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'phase3'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              Phase 3: Debrief & Audio
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'summary'
                  ? 'bg-amber-500 text-gray-950 font-semibold shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>KPI Report</span>
            </button>
          </nav>

          {/* Quick Session Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleLoadDemo}
              title="Load completed 8-approach demo session"
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 border border-indigo-500/30 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Load Demo Data</span>
            </button>

            <button
              onClick={handleExportJson}
              title="Export Session JSON"
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={handleReset}
              title="Reset Session"
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Subnav */}
        <div className="flex md:hidden items-center justify-between py-2 border-t border-gray-800/80 overflow-x-auto text-xs space-x-2">
          <button
            onClick={() => setActiveTab('landing')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${
              activeTab === 'landing' ? 'bg-indigo-600 text-white' : 'text-gray-400'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('phase1')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${
              activeTab === 'phase1' ? 'bg-indigo-600 text-white' : 'text-gray-400'
            }`}
          >
            Phase 1: Priming
          </button>
          <button
            onClick={() => setActiveTab('phase2')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${
              activeTab === 'phase2' ? 'bg-indigo-600 text-white' : 'text-gray-400'
            }`}
          >
            Phase 2: Field ({approachesCount}/{targetCount})
          </button>
          <button
            onClick={() => setActiveTab('phase3')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${
              activeTab === 'phase3' ? 'bg-indigo-600 text-white' : 'text-gray-400'
            }`}
          >
            Phase 3: Debrief
          </button>
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${
              activeTab === 'summary' ? 'bg-amber-500 text-gray-950 font-bold' : 'text-gray-400'
            }`}
          >
            KPIs
          </button>
        </div>
      </div>
    </header>
  );
};
