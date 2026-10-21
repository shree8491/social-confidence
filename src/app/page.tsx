'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from '@/components/Navbar';
import { LandingHero } from '@/components/LandingHero';
import { SelfAssessment } from '@/components/phase1/SelfAssessment';
import { PrimingRoutine } from '@/components/phase1/PrimingRoutine';
import { ChallengeRoadmap } from '@/components/phase2/ChallengeRoadmap';
import { LiveCoachingLoop } from '@/components/phase2/LiveCoachingLoop';
import { ApproachLoggerModal } from '@/components/phase2/ApproachLoggerModal';
import { VoiceNoteRecorder } from '@/components/phase3/VoiceNoteRecorder';
import { FeedbackTracker } from '@/components/phase3/FeedbackTracker';
import { ClientSatisfaction } from '@/components/phase3/ClientSatisfaction';
import { SessionSummaryCard } from '@/components/phase3/SessionSummaryCard';
import { loadStoredSession, saveStoredSession, INITIAL_SESSION } from '@/lib/storage';
import { ApproachLog, ChallengeItem, ChallengeLevel, PersonaType, PostSessionDebriefData, SessionData, VoiceReflection } from '@/types';

export default function Home() {
  const [session, setSession] = useState<SessionData>(INITIAL_SESSION);
  const [activeTab, setActiveTab] = useState<'landing' | 'phase1' | 'phase2' | 'phase3' | 'summary'>('landing');
  const [phase1Subtab, setPhase1Subtab] = useState<'assessment' | 'priming'>('assessment');
  const [phase2Subtab, setPhase2Subtab] = useState<'roadmap' | 'coach_loop'>('roadmap');
  const [phase3Subtab, setPhase3Subtab] = useState<'tracker' | 'audio' | 'satisfaction'>('tracker');

  // Modal State
  const [isLoggerOpen, setIsLoggerOpen] = useState<boolean>(false);
  const [activeChallengeForModal, setActiveChallengeForModal] = useState<ChallengeItem | null>(null);
  const [activeLevelForModal, setActiveLevelForModal] = useState<ChallengeLevel>(1);

  // Load from local storage on mount
  useEffect(() => {
    const loaded = loadStoredSession();
    setSession(loaded);
  }, []);

  // Sync to local storage
  const handleUpdateSession = (newSession: SessionData) => {
    setSession(newSession);
    saveStoredSession(newSession);
  };

  const handleSelectPersona = (persona: PersonaType) => {
    handleUpdateSession({
      ...session,
      persona,
    });
  };

  const handleOpenLogger = (challenge?: ChallengeItem | null, level?: ChallengeLevel) => {
    setActiveChallengeForModal(challenge || null);
    setActiveLevelForModal(level || (challenge ? challenge.level : 1));
    setIsLoggerOpen(true);
  };

  const handleSaveApproach = (approach: ApproachLog) => {
    const updatedApproaches = [...session.approaches, approach];
    const newSession: SessionData = {
      ...session,
      approaches: updatedApproaches,
    };
    handleUpdateSession(newSession);

    // Check if target execution rate (80%) just reached!
    const target = session.targetApproachesCount || 10;
    const rate = (updatedApproaches.length / target) * 100;
    if (rate >= 80 && (updatedApproaches.length - 1) / target * 100 < 80) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleDeleteApproach = (id: string) => {
    handleUpdateSession({
      ...session,
      approaches: session.approaches.filter((a) => a.id !== id),
    });
  };

  const handleAddVoiceReflection = (reflection: VoiceReflection) => {
    handleUpdateSession({
      ...session,
      voiceReflections: [reflection, ...session.voiceReflections],
    });
  };

  const handleDeleteVoiceReflection = (id: string) => {
    handleUpdateSession({
      ...session,
      voiceReflections: session.voiceReflections.filter((r) => r.id !== id),
    });
  };

  const handleUpdateDebrief = (debrief: PostSessionDebriefData) => {
    handleUpdateSession({
      ...session,
      postDebrief: debrief,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-gray-100">
      <Navbar
        session={session}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onUpdateSession={handleUpdateSession}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* VIEW 1: Overview & Commercials Landing */}
        {activeTab === 'landing' && (
          <LandingHero
            session={session}
            onSelectPersona={handleSelectPersona}
            onStartSession={() => {
              setActiveTab('phase1');
              setPhase1Subtab('assessment');
            }}
          />
        )}

        {/* VIEW 2: Phase 1 (Mindset & Priming) */}
        {activeTab === 'phase1' && (
          <div className="space-y-6 pb-16">
            {/* Sub-tab pills */}
            <div className="flex items-center space-x-2 border-b border-gray-800 pb-3">
              <button
                onClick={() => setPhase1Subtab('assessment')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  phase1Subtab === 'assessment'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white bg-gray-900 border border-gray-800'
                }`}
              >
                1. Self-Assessment Check
              </button>
              <button
                onClick={() => setPhase1Subtab('priming')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  phase1Subtab === 'priming'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white bg-gray-900 border border-gray-800'
                }`}
              >
                2. 5-Min Priming Routine
              </button>
            </div>

            {phase1Subtab === 'assessment' ? (
              <SelfAssessment
                session={session}
                onUpdateSession={handleUpdateSession}
                onProceedToPriming={() => setPhase1Subtab('priming')}
              />
            ) : (
              <PrimingRoutine
                session={session}
                onUpdateSession={handleUpdateSession}
                onProceedToField={() => {
                  setActiveTab('phase2');
                  setPhase2Subtab('roadmap');
                }}
              />
            )}
          </div>
        )}

        {/* VIEW 3: Phase 2 (Cold Outreach Execution Engine) */}
        {activeTab === 'phase2' && (
          <div className="space-y-6 pb-16">
            {/* Sub-tab pills */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setPhase2Subtab('roadmap')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    phase2Subtab === 'roadmap'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-gray-400 hover:text-white bg-gray-900 border border-gray-800'
                  }`}
                >
                  Progressive Challenge Roadmap
                </button>
                <button
                  onClick={() => setPhase2Subtab('coach_loop')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    phase2Subtab === 'coach_loop'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-gray-400 hover:text-white bg-gray-900 border border-gray-800'
                  }`}
                >
                  Live In-Person Coaching Loop
                </button>
              </div>

              <button
                onClick={() => handleOpenLogger(null, 1)}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20"
              >
                + Quick Log Approach
              </button>
            </div>

            {phase2Subtab === 'roadmap' ? (
              <ChallengeRoadmap
                session={session}
                onOpenLogger={handleOpenLogger}
                onProceedToDebrief={() => {
                  setActiveTab('phase3');
                  setPhase3Subtab('tracker');
                }}
              />
            ) : (
              <LiveCoachingLoop session={session} />
            )}
          </div>
        )}

        {/* VIEW 4: Phase 3 (Debrief, Voice Notes & Tracking) */}
        {activeTab === 'phase3' && (
          <div className="space-y-6 pb-16">
            {/* Sub-tab pills */}
            <div className="flex items-center space-x-2 border-b border-gray-800 pb-3">
              <button
                onClick={() => setPhase3Subtab('tracker')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  phase3Subtab === 'tracker'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white bg-gray-900 border border-gray-800'
                }`}
              >
                Interaction Ledger ({session.approaches.length})
              </button>
              <button
                onClick={() => setPhase3Subtab('audio')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  phase3Subtab === 'audio'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white bg-gray-900 border border-gray-800'
                }`}
              >
                Voice-Note Reflections ({session.voiceReflections.length})
              </button>
              <button
                onClick={() => setPhase3Subtab('satisfaction')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  phase3Subtab === 'satisfaction'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white bg-gray-900 border border-gray-800'
                }`}
              >
                Comfort Delta &amp; NPS Audit
              </button>
            </div>

            {phase3Subtab === 'tracker' && (
              <FeedbackTracker
                session={session}
                onDeleteApproach={handleDeleteApproach}
                onOpenLogger={() => handleOpenLogger(null, 1)}
              />
            )}

            {phase3Subtab === 'audio' && (
              <VoiceNoteRecorder
                reflections={session.voiceReflections}
                onAddReflection={handleAddVoiceReflection}
                onDeleteReflection={handleDeleteVoiceReflection}
              />
            )}

            {phase3Subtab === 'satisfaction' && (
              <ClientSatisfaction
                session={session}
                onUpdateDebrief={handleUpdateDebrief}
                onViewSummary={() => setActiveTab('summary')}
              />
            )}
          </div>
        )}

        {/* VIEW 5: KPI Executive Summary & Verification Report */}
        {activeTab === 'summary' && (
          <SessionSummaryCard session={session} />
        )}
      </main>

      {/* Approach Quick-Logger Modal */}
      <ApproachLoggerModal
        isOpen={isLoggerOpen}
        challenge={activeChallengeForModal}
        defaultLevel={activeLevelForModal}
        locationHub={session.locationHub}
        onClose={() => setIsLoggerOpen(false)}
        onSaveApproach={handleSaveApproach}
      />

      {/* Footer */}
      <footer className="no-print mt-auto border-t border-gray-800/80 bg-gray-950/60 py-6 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <strong className="text-gray-300">Real-World Social Confidence &amp; Cold Outreach</strong> · Q4 2026 Spec
          </div>
          <div>
            Built for Shree Sundar (GitHub: <span className="font-mono text-indigo-400">shree8491</span>) · Chennai Field Operations
          </div>
        </div>
      </footer>
    </div>
  );
}
