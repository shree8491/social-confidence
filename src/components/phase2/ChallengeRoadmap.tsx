'use client';

import React, { useState } from 'react';
import { Copy, Check, Plus, ArrowRight } from 'lucide-react';
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
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="space-y-1 border-b border-neutral-900 pb-5">
        <span className="text-xs font-mono uppercase text-neutral-500">
          Phase 2 · Deliverable 1
        </span>
        <h2 className="text-2xl font-medium tracking-tight text-white">
          Progressive Challenge Roadmap
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400">
          Gradual escalation from functional queries to contextual compliments and high-value pitching across Chennai hubs.
        </p>
      </div>

      {/* Field Execution Rate Meter (Target: >= 80%) */}
      <div className="p-6 rounded-2xl bg-black border border-neutral-900 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-neutral-400 uppercase">Field Execution Rate (Target: &ge; 80%)</span>
          <span className="text-white font-medium">
            {completedApproaches.length} / {targetCount} ({executionRate}%)
          </span>
        </div>

        {/* Thin minimalist progress bar */}
        <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${Math.min(executionRate, 100)}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-neutral-500 font-mono">
          <span>Hub: {session.locationHub.split(' (')[0]}</span>
          <span>{executionRate >= 80 ? '✓ Target Met' : `${targetCount - completedApproaches.length} remaining`}</span>
        </div>
      </div>

      {/* Level Selector Tabs */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setSelectedLevel(1)}
          className={`p-3.5 rounded-xl border text-left transition-colors ${
            selectedLevel === 1
              ? 'bg-neutral-900 border-neutral-400 text-white'
              : 'bg-black border-neutral-850 text-neutral-400 hover:border-neutral-700'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono uppercase">
            <span>Level 1</span>
            <span className="text-[10px] text-neutral-500">{countByLevel(1)} done</span>
          </div>
          <div className="text-sm font-medium mt-0.5 text-white">Direct Info</div>
        </button>

        <button
          onClick={() => setSelectedLevel(2)}
          className={`p-3.5 rounded-xl border text-left transition-colors ${
            selectedLevel === 2
              ? 'bg-neutral-900 border-neutral-400 text-white'
              : 'bg-black border-neutral-850 text-neutral-400 hover:border-neutral-700'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono uppercase">
            <span>Level 2</span>
            <span className="text-[10px] text-neutral-500">{countByLevel(2)} done</span>
          </div>
          <div className="text-sm font-medium mt-0.5 text-white">Observational</div>
        </button>

        <button
          onClick={() => setSelectedLevel(3)}
          className={`p-3.5 rounded-xl border text-left transition-colors ${
            selectedLevel === 3
              ? 'bg-neutral-900 border-neutral-400 text-white'
              : 'bg-black border-neutral-850 text-neutral-400 hover:border-neutral-700'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono uppercase">
            <span>Level 3</span>
            <span className="text-[10px] text-neutral-500">{countByLevel(3)} done</span>
          </div>
          <div className="text-sm font-medium mt-0.5 text-white">Pitching / Value</div>
        </button>
      </div>

      {/* Challenge Cards List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase text-neutral-500">
            Level {selectedLevel} Challenges
          </span>
          <button
            onClick={() => onOpenLogger(null, selectedLevel)}
            className="text-xs font-mono text-neutral-400 hover:text-white transition-colors inline-flex items-center space-x-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Custom Log</span>
          </button>
        </div>

        <div className="space-y-3">
          {filteredChallenges.map((challenge) => {
            const isCopied = copiedId === challenge.id;
            return (
              <div
                key={challenge.id}
                className="p-5 rounded-2xl bg-black border border-neutral-900 space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-white">{challenge.title}</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">{challenge.description}</p>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-400 shrink-0">
                    Target: {challenge.targetCount}
                  </span>
                </div>

                {/* Opener script */}
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-900 flex items-center justify-between gap-3">
                  <p className="text-xs text-neutral-200 font-mono italic">
                    {challenge.openerScript}
                  </p>
                  <button
                    onClick={() => handleCopyScript(challenge.id, challenge.openerScript)}
                    className="p-1 text-neutral-500 hover:text-white transition-colors shrink-0"
                    title="Copy"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-400 font-normal">
                  <div>
                    <span className="text-neutral-500 font-mono text-[10px] uppercase block">Tactical Cue</span>
                    <span>{challenge.proTip}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 font-mono text-[10px] uppercase block">Chennai Spot</span>
                    <span>{challenge.fieldHotspotTip}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-900">
                  <button
                    onClick={() => onOpenLogger(challenge)}
                    className="px-4 py-2 rounded-full border border-neutral-800 hover:border-neutral-600 text-xs text-neutral-200 font-medium transition-colors"
                  >
                    Log Approach for this Drill
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-900">
        <span className="text-xs font-mono text-neutral-500">
          {completedApproaches.length} logged
        </span>

        <button
          onClick={onProceedToDebrief}
          className="px-5 py-2 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-medium transition-colors inline-flex items-center space-x-1.5"
        >
          <span>Proceed to Phase 3: Debrief</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
