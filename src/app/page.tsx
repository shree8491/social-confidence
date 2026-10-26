'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { 
  ArrowRight, 
  Send, 
  ArrowUpRight, 
  MapPin, 
  Check, 
  Clock, 
  IndianRupee, 
  Car,
  Target,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Award
} from 'lucide-react';
import { PROGRAM_COMMERCIALS, PERSONA_PROFILES } from '@/lib/constants';

export default function Home() {
  const TELEGRAM_URL = 'https://t.me/shree_wolverine';

  return (
    <div className="min-h-screen flex flex-col bg-black text-neutral-100 font-sans antialiased selection:bg-neutral-800 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-10 pb-24 space-y-20">
        {/* 1. Hero Section */}
        <section className="space-y-6 pt-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-500">
            <span>PRD v{PROGRAM_COMMERCIALS.version}</span>
            <span>·</span>
            <span>Owner: {PROGRAM_COMMERCIALS.owner}</span>
            <span>·</span>
            <span>Target: {PROGRAM_COMMERCIALS.launchWindow}</span>
            <span>·</span>
            <span className="text-neutral-400">Chennai Field Intensive</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-medium tracking-tight text-white leading-tight">
              Real-World Social Confidence <br className="hidden sm:block" />
              <span className="text-neutral-400">&amp; Cold Outreach</span>
            </h1>

            <p className="max-w-2xl text-sm sm:text-base text-neutral-400 leading-relaxed font-normal">
              An immersive, field-based coaching program and digital framework designed to transform introverted, socially anxious individuals into confident communicators. By pairing real-world cold outreach challenges in public spaces with structured feedback loops, participants build genuine comfort in spontaneous interactions, overcome approach anxiety, and master high-value communication skills.
            </p>
          </div>

          {/* Primary Telegram CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors text-xs font-semibold shadow-sm"
            >
              <Send className="w-3.5 h-3.5 -rotate-12" />
              <span>Reach Out on Telegram</span>
              <span className="font-mono text-neutral-500">(@shree_wolverine)</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-600" />
            </a>

            <div className="text-xs text-neutral-500 font-mono">
              ₹6,999 · 5 Hours · In-Person Across Chennai Public Hubs
            </div>
          </div>
        </section>

        {/* 2. Program Commercials & Operational Logistics (PRD Section 2) */}
        <section className="space-y-4 pt-4 border-t border-neutral-900">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              2. Program Commercials &amp; Operational Logistics
            </h2>
            <span className="text-[11px] font-mono text-neutral-500">Fixed Rate</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-900">
            <div className="bg-black p-5 space-y-1">
              <span className="text-[10px] uppercase font-mono text-neutral-500 block">Session Pricing</span>
              <div className="text-2xl font-medium text-white">{PROGRAM_COMMERCIALS.sessionPrice}</div>
              <p className="text-xs text-neutral-400">Standard rate for a complete intensive field module.</p>
            </div>

            <div className="bg-black p-5 space-y-1">
              <span className="text-[10px] uppercase font-mono text-neutral-500 block">Duration</span>
              <div className="text-2xl font-medium text-white">5 Hours</div>
              <p className="text-xs text-neutral-400">Includes priming, field execution, and live debriefs.</p>
            </div>

            <div className="bg-black p-5 space-y-1">
              <span className="text-[10px] uppercase font-mono text-neutral-500 block">Primary Location</span>
              <div className="text-2xl font-medium text-white">Chennai</div>
              <p className="text-xs text-neutral-400">Conducted across high-footfall public environments.</p>
            </div>

            <div className="bg-black p-5 space-y-1">
              <span className="text-[10px] uppercase font-mono text-neutral-500 block">Transit Policy</span>
              <div className="text-xl font-medium text-white">Client-Borne</div>
              <p className="text-xs text-neutral-400">Additional transit covered for outside Chennai limits.</p>
            </div>
          </div>

          {/* Chennai Field Hotspots */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-900 space-y-2">
            <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
              Conducted Across Chennai Public Hubs
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
              {PROGRAM_COMMERCIALS.hotspots.map((hub) => (
                <div key={hub.name} className="flex items-center space-x-2 text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 shrink-0" />
                  <span className="font-medium">{hub.name.split(' (')[0]}</span>
                  <span className="text-neutral-500 text-[11px] font-mono">({hub.footfall})</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Target Audience & Persona Profiles (PRD Section 3) */}
        <section className="space-y-4 pt-4 border-t border-neutral-900">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              3. Target Audience &amp; Persona Profiles
            </h2>
            <span className="text-[11px] font-mono text-neutral-500">Core Profiles</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {PERSONA_PROFILES.map((profile) => (
              <div
                key={profile.id}
                className="p-5 rounded-2xl bg-black border border-neutral-900 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-neutral-500 block">
                    Target Persona
                  </span>
                  <h3 className="text-sm font-medium text-white">
                    {profile.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-normal leading-relaxed">
                    {profile.tagline}
                  </p>
                </div>

                <div className="space-y-2 text-xs pt-3 border-t border-neutral-900">
                  <div>
                    <span className="text-neutral-500 font-mono text-[10px] uppercase block">Primary Need</span>
                    <p className="text-neutral-300 leading-relaxed">{profile.primaryNeeds}</p>
                  </div>
                  <div>
                    <span className="text-neutral-500 font-mono text-[10px] uppercase block">Key Pain Point</span>
                    <p className="text-neutral-400 leading-relaxed">{profile.keyPainPoints}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Core Problem Statement & Solutions (PRD Section 4) */}
        <section className="space-y-4 pt-4 border-t border-neutral-900">
          <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            4. Core Problem Statement &amp; Solutions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-black border border-neutral-900 space-y-2">
              <span className="text-xs font-mono uppercase text-neutral-500 block">The Challenge</span>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Social anxiety, fear of cold outreach, and overthinking prevent people from making meaningful public connections. <strong className="text-white font-medium">Theory alone cannot cure approach anxiety.</strong> Reading books or watching social dynamics tutorials leaves the autonomic nervous system completely unprepared for real-world spontaneous human interactions.
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

        {/* 5. Key Functional & Core Deliverables (PRD Section 5) */}
        <section className="space-y-4 pt-4 border-t border-neutral-900">
          <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            5. Key Functional &amp; Core Deliverables (3 Phases)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-black border border-neutral-900 space-y-2">
              <span className="text-[10px] font-mono uppercase text-neutral-500 block">
                Phase 1 · Preparation
              </span>
              <h3 className="text-sm font-medium text-white">Pre-Session Mindset</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                <strong className="text-neutral-200">Self-Assessment Check:</strong> Initial mapping of anxiety triggers, past comfort zones, and specific session goals. <br />
                <strong className="text-neutral-200">Low-Stakes Priming:</strong> 5-minute warm-up drills with 4-4-4-4 box breathing physiological reset.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black border border-neutral-900 space-y-2">
              <span className="text-[10px] font-mono uppercase text-neutral-500 block">
                Phase 2 · Execution
              </span>
              <h3 className="text-sm font-medium text-white">Cold Outreach Engine</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                <strong className="text-neutral-200">Progressive Challenge Roadmap:</strong> Level 1 (Direct Info), Level 2 (Observational), and Level 3 (Pitching/Value). <br />
                <strong className="text-neutral-200">Live In-Person Coaching Loop:</strong> Instant feedback immediately following each approach with 3-second rule audit.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black border border-neutral-900 space-y-2">
              <span className="text-[10px] font-mono uppercase text-neutral-500 block">
                Phase 3 · Retention &amp; Growth
              </span>
              <h3 className="text-sm font-medium text-white">Debrief &amp; Tracking</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                <strong className="text-neutral-200">Feedback &amp; Progress Tracker:</strong> Structured voice-note reflections, interaction ledger, comfort score delta, and retention maintenance framework.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Success Metrics & Key Performance Indicators (PRD Section 6) */}
        <section className="space-y-4 pt-4 border-t border-neutral-900">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              6. Success Metrics &amp; Key Performance Indicators (KPIs)
            </h2>
            <span className="text-[11px] font-mono text-neutral-500">Measurable Outcomes</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-900">
            <div className="bg-black p-5 space-y-1">
              <span className="text-[10px] uppercase font-mono text-neutral-500 block">Field Execution Rate</span>
              <div className="text-2xl font-light font-mono text-white">&ge; 80%</div>
              <p className="text-xs text-neutral-400">Percentage of planned approaches completed live.</p>
            </div>

            <div className="bg-black p-5 space-y-1">
              <span className="text-[10px] uppercase font-mono text-neutral-500 block">Anxiety Reduction</span>
              <div className="text-2xl font-light font-mono text-white">10-Pt Scale</div>
              <p className="text-xs text-neutral-400">Self-reported decrease in approach anxiety post-session.</p>
            </div>

            <div className="bg-black p-5 space-y-1">
              <span className="text-[10px] uppercase font-mono text-neutral-500 block">Conversion / Rapport</span>
              <div className="text-2xl font-light font-mono text-white">&gt; 2 Mins</div>
              <p className="text-xs text-neutral-400">Approaches leading to sustained dialogue or contact swap.</p>
            </div>

            <div className="bg-black p-5 space-y-1">
              <span className="text-[10px] uppercase font-mono text-neutral-500 block">Client Satisfaction</span>
              <div className="text-2xl font-light font-mono text-white">NPS Audit</div>
              <p className="text-xs text-neutral-400">Post-session testimonial, voice-notes, and ratings.</p>
            </div>
          </div>
        </section>

        {/* 7. Final Call to Action Section */}
        <section className="p-8 sm:p-10 rounded-3xl bg-neutral-950 border border-neutral-850 text-center space-y-6">
          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
              Ready to Conquer Approach Anxiety?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
              Book your intensive 5-hour real-world coaching session in Chennai. Reach out directly to Shree Sundar on Telegram to schedule your field module.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors text-xs font-semibold shadow-md"
            >
              <Send className="w-3.5 h-3.5 -rotate-12" />
              <span>Contact on Telegram: t.me/shree_wolverine</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-600" />
            </a>
          </div>

          <div className="text-[11px] font-mono text-neutral-500">
            Fast Response · Direct 1-on-1 Consultation · Standard Fee: ₹6,999
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-6 text-center text-xs text-neutral-500 font-mono">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>Social Confidence &amp; Cold Outreach · PRD v1.1</div>
          <div>
            Coach: Shree Sundar · Telegram:{' '}
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white underline underline-offset-2"
            >
              @shree_wolverine
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
