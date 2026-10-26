'use client';

import React from 'react';
import { ArrowRight, ChevronRight, Check } from 'lucide-react';
import { PROGRAM_COMMERCIALS, PERSONA_PROFILES } from '@/lib/constants';
import { PersonaType, SessionData } from '@/types';

interface LandingHeroProps {
  session: SessionData;
  onSelectPersona: (persona: PersonaType) => void;
  onStartSession: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  session,
  onSelectPersona,
  onStartSession,
}) => {
  return (
    <div className="space-y-16 pb-20 max-w-5xl mx-auto">
      {/* Hero Section */}
      <section className="pt-6 sm:pt-10 space-y-6">
        <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400">
          <span>PRD v{PROGRAM_COMMERCIALS.version}</span>
          <span>·</span>
          <span>Owner: {PROGRAM_COMMERCIALS.owner}</span>
          <span>·</span>
          <span>Target: {PROGRAM_COMMERCIALS.launchWindow}</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-medium tracking-tight text-white leading-tight">
            Real-World Social Confidence <br className="hidden sm:block" />
            <span className="text-neutral-400">&amp; Cold Outreach</span>
          </h1>

          <p className="max-w-2xl text-sm sm:text-base text-neutral-400 leading-relaxed font-normal">
            An immersive, field-based coaching program and digital companion framework. Participants build genuine comfort in spontaneous interactions, dissolve approach anxiety, and master high-value communication skills across Chennai&apos;s public spaces.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button
            onClick={onStartSession}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors text-xs font-semibold"
          >
            <span>Start Active Field Session</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <span className="text-xs text-neutral-500 font-mono">
            5 Hours · Chennai Hubs · ₹6,999 Intensive
          </span>
        </div>
      </section>

      {/* Program Commercials & Operational Logistics (PRD Section 2) */}
      <section className="space-y-4 pt-4 border-t border-neutral-900">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            2. Program Commercials &amp; Operational Logistics
          </h2>
          <span className="text-[11px] font-mono text-neutral-500">Standard Module</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-900">
          <div className="bg-black p-5 space-y-1">
            <span className="text-[10px] uppercase font-mono text-neutral-500 block">Session Pricing</span>
            <div className="text-2xl font-medium text-white">{PROGRAM_COMMERCIALS.sessionPrice}</div>
            <p className="text-xs text-neutral-400">Complete intensive field module.</p>
          </div>

          <div className="bg-black p-5 space-y-1">
            <span className="text-[10px] uppercase font-mono text-neutral-500 block">Duration</span>
            <div className="text-2xl font-medium text-white">5 Hours</div>
            <p className="text-xs text-neutral-400">Priming, execution, and live debriefs.</p>
          </div>

          <div className="bg-black p-5 space-y-1">
            <span className="text-[10px] uppercase font-mono text-neutral-500 block">Primary Location</span>
            <div className="text-2xl font-medium text-white">Chennai</div>
            <p className="text-xs text-neutral-400">Conducted across high-footfall public hubs.</p>
          </div>

          <div className="bg-black p-5 space-y-1">
            <span className="text-[10px] uppercase font-mono text-neutral-500 block">Transit Policy</span>
            <div className="text-xl font-medium text-white">Client-Borne</div>
            <p className="text-xs text-neutral-400">Travel covered outside Chennai limits.</p>
          </div>
        </div>

        {/* Chennai Hubs list */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-mono text-neutral-500">Active Field Hubs:</span>
          {PROGRAM_COMMERCIALS.hotspots.map((hub) => (
            <span
              key={hub.name}
              className="px-2.5 py-1 rounded-md text-xs text-neutral-300 bg-neutral-950 border border-neutral-800"
            >
              {hub.name.split(' (')[0]}
            </span>
          ))}
        </div>
      </section>

      {/* Target Audience & Persona Profiles (PRD Section 3) */}
      <section className="space-y-4 pt-4 border-t border-neutral-900">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            3. Target Audience &amp; Persona Profiles
          </h2>
          <span className="text-[11px] font-mono text-neutral-500">Select Profile</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PERSONA_PROFILES.map((profile) => {
            const isSelected = session.persona === profile.id;
            return (
              <div
                key={profile.id}
                onClick={() => onSelectPersona(profile.id)}
                className={`cursor-pointer p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-neutral-900/60 border-neutral-400'
                    : 'bg-black border-neutral-800/80 hover:border-neutral-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono uppercase text-neutral-400">
                      Persona
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-mono text-white flex items-center space-x-1">
                        <Check className="w-3 h-3" />
                        <span>Active</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-medium text-white mb-1">
                    {profile.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mb-4 font-normal">
                    {profile.tagline}
                  </p>

                  <div className="space-y-2.5 text-xs text-neutral-400 pt-3 border-t border-neutral-900">
                    <div>
                      <span className="text-neutral-500 font-mono text-[10px] uppercase block">Need</span>
                      <p className="text-neutral-300">{profile.primaryNeeds}</p>
                    </div>
                    <div>
                      <span className="text-neutral-500 font-mono text-[10px] uppercase block">Pain Point</span>
                      <p className="text-neutral-400">{profile.keyPainPoints}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Core Problem Statement & Solutions (PRD Section 4) */}
      <section className="space-y-4 pt-4 border-t border-neutral-900">
        <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
          4. Core Problem Statement &amp; Solutions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-black border border-neutral-900 space-y-2">
            <span className="text-xs font-mono uppercase text-neutral-500 block">The Challenge</span>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Social anxiety, fear of cold outreach, and overthinking prevent people from making meaningful public connections. <strong className="text-white font-medium">Theory alone cannot cure approach anxiety.</strong> Reading books leaves the autonomic nervous system completely unprepared for real-world spontaneous human interactions.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-black border border-neutral-900 space-y-2">
            <span className="text-xs font-mono uppercase text-neutral-500 block">The Solution</span>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Structured, real-world field exposure combined with actionable frameworks for mindset, body language, and immediate feedback. Guided progressive escalation in Chennai public environments desensitizes the freeze response systematically.
            </p>
          </div>
        </div>
      </section>

      {/* 3-Phase Deliverables (PRD Section 5) */}
      <section className="space-y-4 pt-4 border-t border-neutral-900">
        <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
          5. Key Functional &amp; Core Deliverables
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-black border border-neutral-900 space-y-2">
            <span className="text-[10px] font-mono uppercase text-neutral-500 block">Phase 1 · Preparation</span>
            <h3 className="text-sm font-medium text-white">Pre-Session Mindset</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Self-Assessment trigger mapping and 5-minute low-stakes priming drills with 4-4-4-4 box breathing.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-black border border-neutral-900 space-y-2">
            <span className="text-[10px] font-mono uppercase text-neutral-500 block">Phase 2 · Execution</span>
            <h3 className="text-sm font-medium text-white">Cold Outreach Engine</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Progressive roadmap across Levels 1 (Direct Info), 2 (Observational), and 3 (Pitching/Value) with live coaching loop debriefs.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-black border border-neutral-900 space-y-2">
            <span className="text-[10px] font-mono uppercase text-neutral-500 block">Phase 3 · Retention &amp; Growth</span>
            <h3 className="text-sm font-medium text-white">Debrief &amp; Tracking</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Structured voice-note reflections, interaction ledger, anxiety delta score, and NPS satisfaction report.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
