'use client';

import React, { useState, useEffect } from 'react';
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
    <div className="min-h-screen flex flex-col bg-black text-neutral-100 font-sans antialiased selection:bg-neutral-800 selection:text-white">
      <Navbar
        session={session}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onUpdateSession={handleUpdateSession}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-6">
        {/* VIEW 1: Overview */}
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

        {/* VIEW 2: Phase 1 */}
        {activeTab === 'phase1' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-1 p-1 rounded-full bg-neutral-950 border border-neutral-900 w-fit text-xs font-medium">
              <button
                onClick={() => setPhase1Subtab('assessment')}
                className={`px-3 py-1 rounded-full transition-colors ${
                  phase1Subtab === 'assessment'
                    ? 'bg-neutral-800 text-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                1. Self-Assessment
              </button>
              <button
                onClick={() => setPhase1Subtab('priming')}
                className={`px-3 py-1 rounded-full transition-colors ${
                  phase1Subtab === 'priming'
                    ? 'bg-neutral-800 text-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                2. 5-Min Priming
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

        {/* VIEW 3: Phase 2 */}
        {activeTab === 'phase2' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 p-1 rounded-full bg-neutral-950 border border-neutral-900 text-xs font-medium">
                <button
                  onClick={() => setPhase2Subtab('roadmap')}
                  className={`px-3 py-1 rounded-full transition-colors ${
                    phase2Subtab === 'roadmap'
                      ? 'bg-neutral-800 text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Challenge Roadmap
                </button>
                <button
                  onClick={() => setPhase2Subtab('coach_loop')}
                  className={`px-3 py-1 rounded-full transition-colors ${
                    phase2Subtab === 'coach_loop'
                      ? 'bg-neutral-800 text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Live Coaching Loop
                </button>
              </div>

              <button
                onClick={() => handleOpenLogger(null, 1)}
                className="px-3 py-1.5 rounded-full border border-neutral-800 hover:border-neutral-700 text-xs text-neutral-300 font-medium transition-colors"
              >
                + Quick Log
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

        {/* VIEW 4: Phase 3 */}
        {activeTab === 'phase3' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-1 p-1 rounded-full bg-neutral-950 border border-neutral-900 w-fit text-xs font-medium">
              <button
                onClick={() => setPhase3Subtab('tracker')}
                className={`px-3 py-1 rounded-full transition-colors ${
                  phase3Subtab === 'tracker'
                    ? 'bg-neutral-800 text-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Ledger ({session.approaches.length})
              </button>
              <button
                onClick={() => setPhase3Subtab('audio')}
                className={`px-3 py-1 rounded-full transition-colors ${
                  phase3Subtab === 'audio'
                    ? 'bg-neutral-800 text-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Voice Notes ({session.voiceReflections.length})
              </button>
              <button
                onClick={() => setPhase3Subtab('satisfaction')}
                className={`px-3 py-1 rounded-full transition-colors ${
                  phase3Subtab === 'satisfaction'
                    ? 'bg-neutral-800 text-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Delta &amp; NPS
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

        {/* VIEW 5: Summary */}
        {activeTab === 'summary' && (
          <SessionSummaryCard session={session} />
        )}
      </main>

      {/* Modal */}
      <ApproachLoggerModal
        isOpen={isLoggerOpen}
        challenge={activeChallengeForModal}
        defaultLevel={activeLevelForModal}
        locationHub={session.locationHub}
        onClose={() => setIsLoggerOpen(false)}
        onSaveApproach={handleSaveApproach}
      />

      {/* Minimal Footer */}
      <footer className="no-print mt-auto border-t border-neutral-900 py-6 text-center text-xs text-neutral-500 font-mono">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>Social Confidence &amp; Cold Outreach · PRD v1.1</div>
          <div>Shree Sundar (shree8491) · Chennai Field Operations</div>
        </div>
      </footer>
    </div>
  );
}
