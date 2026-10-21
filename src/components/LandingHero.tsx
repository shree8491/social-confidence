'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  IndianRupee, 
  Car, 
  Target, 
  Flame, 
  ArrowRight, 
  Users, 
  BrainCircuit, 
  Sparkles,
  ChevronRight,
  Award
} from 'lucide-react';
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
    <div className="space-y-12 pb-16">
      {/* PRD Header & Metadata Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-indigo-950/60 via-gray-900/40 to-transparent border border-indigo-500/20 p-6 sm:p-10">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-semibold">
            <span className="px-3 py-1 rounded-full bg-indigo-600/20 text-indigo-300 border border-indigo-500/30">
              PRD Specification v{PROGRAM_COMMERCIALS.version}
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
              Target Launch: {PROGRAM_COMMERCIALS.launchWindow}
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">
              Program Owner: {PROGRAM_COMMERCIALS.owner}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Status: Draft / Review
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            Real-World Social Confidence &amp;{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-amber-300 bg-clip-text text-transparent">
              Cold Outreach
            </span>
          </h1>

          <div className="max-w-3xl space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
            <p className="font-medium text-gray-200">
              An immersive, field-based coaching program and digital framework designed to transform
              introverted, socially anxious individuals into confident communicators.
            </p>
            <p className="text-gray-400">
              By pairing real-world cold outreach challenges in public spaces with structured feedback
              loops, participants build genuine comfort in spontaneous interactions, overcome approach
              anxiety, and master high-value communication skills.
            </p>
          </div>

          {/* Quick CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onStartSession}
              className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
            >
              <span>Launch Active 5-Hour Field Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-2 text-xs text-gray-400 px-3 py-2 bg-gray-900/60 rounded-xl border border-gray-800">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Includes 5-min Mindset Priming, Progressive Tiers, and Live Debrief Loop</span>
            </div>
          </div>
        </div>
      </div>

      {/* Program Commercials & Operational Logistics (PRD Section 2) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              2. Program Commercials &amp; Operational Logistics
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Full-service field engagement terms and execution parameters
            </p>
          </div>
          <span className="text-xs uppercase font-mono tracking-wider text-indigo-400 bg-indigo-950/60 px-2.5 py-1 rounded-md border border-indigo-800">
            Chennai Standard
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pricing Card */}
          <div className="p-5 rounded-2xl bg-gray-900/80 border border-gray-800 hover:border-amber-500/40 transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                <IndianRupee className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Session Pricing
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
              {PROGRAM_COMMERCIALS.sessionPrice}
            </div>
            <p className="text-xs text-gray-400">
              Standard rate for a complete intensive field module engagement.
            </p>
          </div>

          {/* Duration Card */}
          <div className="p-5 rounded-2xl bg-gray-900/80 border border-gray-800 hover:border-indigo-500/40 transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-all pointer-events-none" />
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Duration
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
              5 Hours
            </div>
            <p className="text-xs text-gray-400">
              Includes initial priming, live field execution, and post-approach debriefs.
            </p>
          </div>

          {/* Primary Location Card */}
          <div className="p-5 rounded-2xl bg-gray-900/80 border border-gray-800 hover:border-sky-500/40 transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 rounded-full blur-xl group-hover:bg-sky-500/20 transition-all pointer-events-none" />
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/20">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Primary Location
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white mb-1">
              Chennai
            </div>
            <p className="text-xs text-gray-400">
              Conducted across high-footfall public hubs (Malls, Promenades &amp; Parks).
            </p>
          </div>

          {/* Transit Policy Card */}
          <div className="p-5 rounded-2xl bg-gray-900/80 border border-gray-800 hover:border-emerald-500/40 transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all pointer-events-none" />
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <Car className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Transit Policy
              </span>
            </div>
            <div className="text-lg font-bold text-emerald-300 mb-1">
              Client-Borne
            </div>
            <p className="text-xs text-gray-400">
              Additional travel &amp; transit expenses covered by client outside Chennai limits.
            </p>
          </div>
        </div>

        {/* Chennai Field Hotspots Showcase */}
        <div className="bg-gray-900/50 rounded-2xl p-5 border border-gray-800/80">
          <div className="flex items-center space-x-2 mb-3 text-xs font-semibold text-gray-300">
            <MapPin className="w-4 h-4 text-indigo-400" />
            <span>Target Chennai Public Field Hubs:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PROGRAM_COMMERCIALS.hotspots.map((hub) => (
              <div
                key={hub.name}
                className="flex items-start justify-between p-3 rounded-xl bg-gray-800/60 border border-gray-700/50"
              >
                <div>
                  <div className="text-xs font-bold text-gray-100">{hub.name}</div>
                  <div className="text-[11px] text-gray-400">{hub.vibe}</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 font-mono">
                  {hub.footfall} Footfall
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience & Persona Profiles (PRD Section 3) */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            3. Target Audience &amp; Persona Profiles
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Select your primary persona profile to calibrate session drills and target challenge roadmap
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PERSONA_PROFILES.map((profile) => {
            const isSelected = session.persona === profile.id;
            return (
              <div
                key={profile.id}
                onClick={() => onSelectPersona(profile.id)}
                className={`cursor-pointer rounded-2xl p-6 border transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-indigo-950/40 border-indigo-500 shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-500'
                    : 'bg-gray-900/70 border-gray-800 hover:border-gray-700 hover:bg-gray-900'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500 text-white">
                    Active Persona
                  </span>
                )}
                <div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
                    {profile.id === 'introvert' && <BrainCircuit className="w-6 h-6" />}
                    {profile.id === 'career_professional' && <Target className="w-6 h-6" />}
                    {profile.id === 'socially_anxious' && <ShieldCheck className="w-6 h-6" />}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                    {profile.title}
                  </h3>
                  <p className="text-xs text-indigo-300 font-medium mb-4">
                    {profile.tagline}
                  </p>

                  <div className="space-y-3 text-xs mb-6">
                    <div>
                      <span className="text-gray-400 font-semibold block mb-0.5">Primary Needs:</span>
                      <p className="text-gray-200">{profile.primaryNeeds}</p>
                    </div>
                    <div>
                      <span className="text-rose-400 font-semibold block mb-0.5">Key Pain Points:</span>
                      <p className="text-gray-300">{profile.keyPainPoints}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between text-xs font-semibold">
                  <span className="text-indigo-400">
                    {isSelected ? '✓ Selected Profile' : 'Click to Select'}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Core Problem Statement & Solutions (PRD Section 4) */}
      <section className="rounded-3xl bg-gray-900/80 border border-gray-800 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            4. Core Problem Statement &amp; Solutions
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Why intellectual understanding fails without real-world sensory exposure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-2">
            <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
              <Flame className="w-4 h-4" />
              <span>The Challenge</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Social anxiety, fear of cold outreach, and overthinking prevent people from making
              meaningful public connections. <strong className="text-rose-200">Theory alone cannot cure approach anxiety.</strong> Reading books or watching tutorials leaves the autonomic nervous system completely unprepared for real human proximity.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-900/40 space-y-2">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>The Solution</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Structured, real-world field exposure combined with actionable frameworks for mindset, body
              language, and immediate feedback. Guided progressive escalation in Chennai public environments desensitizes the freeze response permanently.
            </p>
          </div>
        </div>
      </section>

      {/* 3-Phase Execution Roadmap Overview */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            5. Key Functional &amp; Core Deliverables (3 Phases)
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            A battle-tested 3-stage protocol designed for immediate neuro-associative rewiring
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-3">
            <div className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
              Phase 1 · Preparation
            </div>
            <h3 className="font-bold text-white text-base">Pre-Session Mindset &amp; Foundations</h3>
            <ul className="text-xs text-gray-400 space-y-2 list-disc list-inside">
              <li><strong className="text-gray-200">Self-Assessment Check:</strong> Initial mapping of anxiety triggers, past comfort zones, and specific goals.</li>
              <li><strong className="text-gray-200">Low-Stakes Priming Routine:</strong> Quick 5-minute warm-up drills before moving to deeper conversations.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-3">
            <div className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
              Phase 2 · Execution
            </div>
            <h3 className="font-bold text-white text-base">On-Field Cold Outreach Engine</h3>
            <ul className="text-xs text-gray-400 space-y-2 list-disc list-inside">
              <li><strong className="text-gray-200">Progressive Challenge Roadmap:</strong> Level 1 (Direct Info), Level 2 (Observational), Level 3 (Pitching/Value).</li>
              <li><strong className="text-gray-200">Live In-Person Coaching Loop:</strong> Real-time feedback immediately following an interaction.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-3">
            <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              Phase 3 · Retention &amp; Growth
            </div>
            <h3 className="font-bold text-white text-base">Post-Session Debrief &amp; Tracking</h3>
            <ul className="text-xs text-gray-400 space-y-2 list-disc list-inside">
              <li><strong className="text-gray-200">Feedback &amp; Progress Tracker:</strong> Structured voice-note reflections, interaction log, comfort score (1-10).</li>
              <li><strong className="text-gray-200">KPI Performance Report:</strong> Field execution rate, anxiety reduction score, and NPS audit.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
