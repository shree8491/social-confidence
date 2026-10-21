'use client';

import React, { useState } from 'react';
import { 
  Zap, 
  Copy, 
  Check, 
  MapPin, 
  Lightbulb, 
  PlusCircle, 
  Target, 
  TrendingUp, 
  Award,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { ChallengeItem, ChallengeLevel, SessionData } from '@/types';
import { CHALLENGE_ROADMAP } from '@/lib/constants';

interface ChallengeRoadmapProps {
  session: SessionData;
  onOpenLogger: (challenge?: ChallengeItem | null, level?: ChallengeLevel) => void;
  onProceedToDebrief: () => void;
}

export const ChallengeRoadmap: React.FC<ChallengeRoadmapProps> = ({
  session,
  onOpenLogger,
  onProceedToDebrief,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<ChallengeLevel>(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const completedApproaches = session.approaches;
  const targetCount = session.targetApproachesCount || 10;
  const executionRate = Math.round((completedApproaches.length / targetCount) * 100);

  // Group challenges by level
  const filteredChallenges = CHALLENGE_ROADMAP.filter(
    (item) => item.level === selectedLevel
  );

  const handleCopyScript = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const countByLevel = (lvl: ChallengeLevel) =>
    completedApproaches.filter((a) => a.level === lvl).length;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-800 pb-5">
        <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
          <span>Phase 2: Execution Engine</span>
          <span>·</span>
          <span>Deliverable 1</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Progressive Challenge Roadmap
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Progressively escalate from non-threatening functional questions to observational rapport and high-value pitching in Chennai public hubs.
        </p>
      </div>

      {/* Field Execution Rate KPI Meter (Target: >= 80%) */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-gray-900 via-indigo-950/40 to-gray-900 border border-indigo-500/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-bold text-white">
                Field Execution Rate (PRD KPI Target: &ge; 80%)
              </h3>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Percentage of planned approaches completed during the 5-hour engagement
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-2xl font-black text-white font-mono">
                {completedApproaches.length} / {targetCount}
              </div>
              <div className="text-[10px] text-gray-400 uppercase font-semibold">Approaches</div>
            </div>
            <div
              className={`px-3.5 py-2 rounded-2xl font-mono text-xl font-black border ${
                executionRate >= 80
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
              }`}
            >
              {executionRate}%
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              executionRate >= 80
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-lg shadow-emerald-500/30'
                : 'bg-gradient-to-r from-indigo-500 to-sky-400'
            }`}
            style={{ width: `${Math.min(executionRate, 100)}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-[11px] text-gray-400 mt-2 font-medium">
          <span>Current Hub: <strong className="text-gray-200">{session.locationHub}</strong></span>
          {executionRate >= 80 ? (
            <span className="text-emerald-400 font-bold flex items-center space-x-1">
              <Award className="w-3.5 h-3.5" />
              <span>Target KPI Met (&ge;80% Execution)</span>
            </span>
          ) : (
            <span>{Math.max(0, Math.ceil(targetCount * 0.8) - completedApproaches.length)} more approaches to hit 80% target</span>
          )}
        </div>
      </div>

      {/* Level Selector Tabs */}
      <div className="grid grid-cols-3 gap-3">
        {/* Level 1 Tab */}
        <button
          onClick={() => setSelectedLevel(1)}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedLevel === 1
              ? 'bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-500/10'
              : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Level 1
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300">
              {countByLevel(1)} Done
            </span>
          </div>
          <div className="text-sm font-bold text-white">Direct Info</div>
          <div className="text-[11px] text-gray-400 mt-0.5">
            Non-threatening functional inquiries
          </div>
        </button>

        {/* Level 2 Tab */}
        <button
          onClick={() => setSelectedLevel(2)}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedLevel === 2
              ? 'bg-sky-950/40 border-sky-500 shadow-lg shadow-sky-500/10'
              : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Level 2
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300">
              {countByLevel(2)} Done
            </span>
          </div>
          <div className="text-sm font-bold text-white">Observational</div>
          <div className="text-[11px] text-gray-400 mt-0.5">
            Contextual compliments &amp; situational banter
          </div>
        </button>

        {/* Level 3 Tab */}
        <button
          onClick={() => setSelectedLevel(3)}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedLevel === 3
              ? 'bg-amber-950/40 border-amber-500 shadow-lg shadow-amber-500/10'
              : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Level 3
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300">
              {countByLevel(3)} Done
            </span>
          </div>
          <div className="text-sm font-bold text-white">Pitching / Value</div>
          <div className="text-[11px] text-gray-400 mt-0.5">
            Extended dialogue (&gt;2m) &amp; contact swap
          </div>
        </button>
      </div>

      {/* Challenge Cards List */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-gray-300 uppercase tracking-wider">
            Level {selectedLevel} Active Field Drills
          </div>
          <button
            onClick={() => onOpenLogger(null, selectedLevel)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-white border border-gray-700 transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5 text-indigo-400" />
            <span>Log Custom Level {selectedLevel} Approach</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredChallenges.map((challenge) => {
            const isCopied = copiedId === challenge.id;
            return (
              <div
                key={challenge.id}
                className="p-6 rounded-3xl bg-gray-900/80 border border-gray-800 hover:border-gray-700 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                      {challenge.category}
                    </span>
                    <span className="text-[11px] text-gray-400">
                      Target: {challenge.targetCount} reps
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-1">
                    {challenge.title}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    {challenge.description}
                  </p>

                  {/* Opener Script Box */}
                  <div className="p-3.5 rounded-2xl bg-gray-950/90 border border-gray-800/80 relative group">
                    <div className="text-[10px] font-mono font-bold text-gray-400 uppercase mb-1">
                      Starter Opener Script:
                    </div>
                    <p className="text-xs text-indigo-200 italic font-medium pr-8">
                      {challenge.openerScript}
                    </p>
                    <button
                      onClick={() => handleCopyScript(challenge.id, challenge.openerScript)}
                      title="Copy script"
                      className="absolute top-3 right-3 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  {/* Pro Tip */}
                  <div className="flex items-start space-x-2 text-[11px] text-amber-300/90 bg-amber-500/5 p-2.5 rounded-xl border border-amber-500/10">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Pro Tip:</strong> {challenge.proTip}</span>
                  </div>

                  {/* Hotspot Tip */}
                  <div className="flex items-start space-x-2 text-[11px] text-sky-300/90 bg-sky-500/5 p-2.5 rounded-xl border border-sky-500/10">
                    <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span><strong>Chennai Spot:</strong> {challenge.fieldHotspotTip}</span>
                  </div>

                  {/* Log Action Button */}
                  <button
                    onClick={() => onOpenLogger(challenge)}
                    className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/20"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Log Approach for this Drill</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-800">
        <div className="text-xs text-gray-400">
          Completed {completedApproaches.length} of {targetCount} approaches ({executionRate}% execution rate)
        </div>

        <button
          onClick={onProceedToDebrief}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center space-x-2"
        >
          <span>Proceed to Phase 3: Post-Session Debrief</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
