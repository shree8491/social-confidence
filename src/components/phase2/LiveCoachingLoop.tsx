'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Flame, 
  MessageSquare,
  Users,
  Star
} from 'lucide-react';
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
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Overview Card */}
      <div className="p-6 rounded-3xl bg-gray-900/80 border border-indigo-500/20">
        <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">
          <span>Phase 2: Execution Engine</span>
          <span>·</span>
          <span>Deliverable 2</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Live In-Person Coaching Loop
        </h3>
        <p className="text-xs sm:text-sm text-gray-400">
          Real-time physical &amp; psychological feedback delivered by the coach within 15 seconds of every public approach.
        </p>

        {/* Real-Time Telemetry Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-2xl bg-gray-800/60 border border-gray-700/60">
            <span className="text-xs text-gray-400 block mb-1">
              3-Second Rule Adherence
            </span>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                {adherenceRate}%
              </span>
              <span className="text-xs text-gray-400 font-medium">
                ({total - hesitatedCount} of {total} prompt moves)
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gray-800/60 border border-gray-700/60">
            <span className="text-xs text-gray-400 block mb-1">
              Avg. Body Language Score
            </span>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                {avgBodyLanguage}
              </span>
              <span className="text-xs text-gray-400 font-medium">/ 5.0 Stars</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gray-800/60 border border-gray-700/60">
            <span className="text-xs text-gray-400 block mb-1">
              Field Coach in Attendance
            </span>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-base font-bold text-white">
                {session.coachName || 'Shree Sundar'}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold">
                Chennai Active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Immediate Field Debrief Cheat Sheet */}
      <div className="space-y-4">
        <div>
          <h4 className="text-base font-bold text-white">
            Instant Field Debrief Cues (Coach Diagnostic Matrix)
          </h4>
          <p className="text-xs text-gray-400">
            Micro-corrections applied on the sidewalk or mall concourse immediately after an interaction:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-2">
            <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase">
              <AlertTriangle className="w-4 h-4" />
              <span>Symptom: Hesitation Freeze (&gt;3 Seconds)</span>
            </div>
            <p className="text-xs text-gray-300">
              <strong className="text-white">Coach Action:</strong> Do not analyze the hesitation. Count out loud &quot;3, 2, 1, Move&quot; and take the first two steps with them to transfer kinetic momentum.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-2">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase">
              <Star className="w-4 h-4" />
              <span>Symptom: Quiet / Breathy Vocal Delivery</span>
            </div>
            <p className="text-xs text-gray-300">
              <strong className="text-white">Coach Action:</strong> Have the participant project their voice to the coach positioned 5 paces behind. Emphasize speaking from diaphragm, not throat.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-2">
            <div className="flex items-center space-x-2 text-sky-400 font-bold text-xs uppercase">
              <MessageSquare className="w-4 h-4" />
              <span>Symptom: Awkward Silence After Opener</span>
            </div>
            <p className="text-xs text-gray-300">
              <strong className="text-white">Coach Action:</strong> Teach the &quot;Last-3-Words Echo&quot; or ask &quot;What brought you out to Chennai today?&quot; — lets the other person carry conversational weight.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase">
              <CheckCircle2 className="w-4 h-4" />
              <span>Symptom: Rebuffed or Strangers In a Rush</span>
            </div>
            <p className="text-xs text-gray-300">
              <strong className="text-white">Coach Action:</strong> Immediate high-five. Celebrate taking action regardless of response. Prove to the amygdala that nothing dangerous occurred.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
