'use client';

import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { ApproachLog, SessionData } from '@/types';

interface FeedbackTrackerProps {
  session: SessionData;
  onDeleteApproach: (id: string) => void;
  onOpenLogger: () => void;
}

export const FeedbackTracker: React.FC<FeedbackTrackerProps> = ({
  session,
  onDeleteApproach,
  onOpenLogger,
}) => {
  const approaches = session.approaches;
  const total = approaches.length;

  const rapportApproaches = approaches.filter(
    (a) => a.outcome === 'sustained_conversation' || a.outcome === 'contact_exchanged' || a.durationSeconds >= 120
  );
  const rapportRate = total > 0 ? Math.round((rapportApproaches.length / total) * 100) : 0;

  const formatOutcome = (outcome: ApproachLog['outcome']) => {
    switch (outcome) {
      case 'sustained_conversation':
        return 'Sustained (>2m)';
      case 'contact_exchanged':
        return 'Contact Exchanged';
      case 'quick_helpful_answer':
        return 'Quick Answer';
      case 'polite_rebuff':
        return 'Polite Rebuff';
      default:
        return 'Ignored';
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="space-y-1 border-b border-neutral-900 pb-5">
        <span className="text-xs font-mono uppercase text-neutral-500">
          Phase 3 · Ledger
        </span>
        <h2 className="text-2xl font-medium tracking-tight text-white">
          Interaction Ledger
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400">
          Chronological record of approaches, body language evaluations, and conversational outcomes.
        </p>
      </div>

      {/* Rapport Rate KPI Banner */}
      <div className="p-5 rounded-2xl bg-black border border-neutral-900 flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono uppercase text-neutral-500 block">
            Conversion / Rapport Rate KPI
          </span>
          <div className="text-xs text-neutral-400">
            Sustained conversations (&gt;2 mins) or contact exchanges
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-light font-mono text-white">{rapportRate}%</div>
          <div className="text-[10px] font-mono text-neutral-500">
            {rapportApproaches.length} of {total} approaches
          </div>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase text-neutral-500">
            Recorded Approaches ({total})
          </span>
          <button
            onClick={onOpenLogger}
            className="text-xs font-mono text-neutral-400 hover:text-white transition-colors inline-flex items-center space-x-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log Approach</span>
          </button>
        </div>

        {approaches.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-neutral-900 rounded-2xl text-xs font-mono text-neutral-600">
            No approaches logged in this session yet
          </div>
        ) : (
          <div className="border border-neutral-900 rounded-2xl overflow-hidden divide-y divide-neutral-900 bg-black">
            {approaches.map((app, idx) => (
              <div
                key={app.id}
                className="p-4 hover:bg-neutral-950/60 transition-colors space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-neutral-500 text-[11px]">#{idx + 1}</span>
                    <span className="font-mono uppercase text-[10px] text-neutral-500">L{app.level}</span>
                    <span className="font-medium text-white">{app.challengeTitle}</span>
                  </div>

                  <div className="flex items-center space-x-3 text-neutral-400 text-xs font-mono">
                    <span>{app.durationSeconds}s</span>
                    <span className="text-neutral-300 font-sans">{formatOutcome(app.outcome)}</span>
                    <button
                      onClick={() => onDeleteApproach(app.id)}
                      className="p-1 text-neutral-600 hover:text-white transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-neutral-500 font-mono">
                  <span>Hesitation: {app.hesitatedMoreThan3Sec ? '⚠ >3s' : '✓ <3s'}</span>
                  <span>Body Language: {app.bodyLanguageScore}/5</span>
                  <span>Spot: {app.locationHub}</span>
                </div>

                {(app.immediateNotes || app.coachFeedback) && (
                  <div className="text-[11px] space-y-0.5 pt-1 text-neutral-400 font-normal">
                    {app.immediateNotes && (
                      <p><span className="text-neutral-500 font-mono">Reflection:</span> {app.immediateNotes}</p>
                    )}
                    {app.coachFeedback && (
                      <p><span className="text-neutral-500 font-mono">Coach:</span> {app.coachFeedback}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
