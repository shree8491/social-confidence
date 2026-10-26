'use client';

import React from 'react';
import { SessionData } from '@/types';

interface LiveCoachingLoopProps {
  session: SessionData;
}

export const LiveCoachingLoop: React.FC<LiveCoachingLoopProps> = ({ session }) => {
  const approaches = session.approaches;
  const total = approaches.length;

  const hesitatedCount = approaches.filter((a) => a.hesitatedMoreThan3Sec).length;
  const adherenceRate = total > 0 ? Math.round(((total - hesitatedCount) / total) * 100) : 100;

  const avgBodyLanguage =
    total > 0
      ? (approaches.reduce((acc, a) => acc + (a.bodyLanguageScore || 4), 0) / total).toFixed(1)
      : '5.0';

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="space-y-1 border-b border-neutral-900 pb-5">
        <span className="text-xs font-mono uppercase text-neutral-500">
          Phase 2 · Deliverable 2
        </span>
        <h2 className="text-2xl font-medium tracking-tight text-white">
          Live In-Person Coaching Loop
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400">
          Real-time physical and psychological feedback delivered by the coach immediately following an interaction.
        </p>
      </div>

      {/* Telemetry Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-900">
        <div className="bg-black p-5 space-y-1">
          <span className="text-[10px] uppercase font-mono text-neutral-500 block">
            3-Second Rule Adherence
          </span>
          <div className="text-3xl font-light text-white font-mono">{adherenceRate}%</div>
          <p className="text-xs text-neutral-400 font-mono">
            {total - hesitatedCount} of {total} prompt moves
          </p>
        </div>

        <div className="bg-black p-5 space-y-1">
          <span className="text-[10px] uppercase font-mono text-neutral-500 block">
            Body Language Avg.
          </span>
          <div className="text-3xl font-light text-white font-mono">{avgBodyLanguage}</div>
          <p className="text-xs text-neutral-400 font-mono">out of 5.0 rating</p>
        </div>

        <div className="bg-black p-5 space-y-1">
          <span className="text-[10px] uppercase font-mono text-neutral-500 block">
            Lead Field Coach
          </span>
          <div className="text-lg font-medium text-white">{session.coachName || 'Shree Sundar'}</div>
          <p className="text-xs text-neutral-400">Chennai Field Session</p>
        </div>
      </div>

      {/* Diagnostic Matrix */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-white">
          Field Diagnostic Micro-Corrections
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-black border border-neutral-900 space-y-1.5">
            <span className="text-xs font-mono uppercase text-neutral-400 block">
              Hesitation (&gt;3 Seconds)
            </span>
            <p className="text-xs text-neutral-400 leading-relaxed">
              <strong className="text-neutral-200">Coach Cue:</strong> Count 1-2-3 out loud and take the first two steps beside them to transfer kinetic momentum.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black border border-neutral-900 space-y-1.5">
            <span className="text-xs font-mono uppercase text-neutral-400 block">
              Quiet / Breathy Voice
            </span>
            <p className="text-xs text-neutral-400 leading-relaxed">
              <strong className="text-neutral-200">Coach Cue:</strong> Have the participant project directly to the coach standing 5 meters away; speak from the diaphragm.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black border border-neutral-900 space-y-1.5">
            <span className="text-xs font-mono uppercase text-neutral-400 block">
              Awkward Silence
            </span>
            <p className="text-xs text-neutral-400 leading-relaxed">
              <strong className="text-neutral-200">Coach Cue:</strong> Echo the last 3 words as a question, or ask &quot;What brought you out to Chennai today?&quot;.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black border border-neutral-900 space-y-1.5">
            <span className="text-xs font-mono uppercase text-neutral-400 block">
              Rebuff / In a Rush
            </span>
            <p className="text-xs text-neutral-400 leading-relaxed">
              <strong className="text-neutral-200">Coach Cue:</strong> Immediate smile, &quot;Have a great day!&quot;, and coach high-five to condition that no physical danger occurred.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
