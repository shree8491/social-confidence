'use client';

import React from 'react';
import { 
  History, 
  Trash2, 
  Clock, 
  MapPin, 
  Star, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
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

  // PRD KPI: Conversion / Rapport Rate
  // "Percentage of cold approaches leading to sustained conversation (>2 mins) or contact exchange."
  const rapportApproaches = approaches.filter(
    (a) => a.outcome === 'sustained_conversation' || a.outcome === 'contact_exchanged' || a.durationSeconds >= 120
  );
  const rapportRate = total > 0 ? Math.round((rapportApproaches.length / total) * 100) : 0;

  const getOutcomeBadge = (outcome: ApproachLog['outcome']) => {
    switch (outcome) {
      case 'sustained_conversation':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px] font-semibold">
            💬 Sustained Conversation (&gt;2m)
          </span>
        );
      case 'contact_exchanged':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[11px] font-semibold">
            📇 Contact Exchanged
          </span>
        );
      case 'quick_helpful_answer':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20 text-[11px] font-semibold">
            👍 Quick Answer
          </span>
        );
      case 'polite_rebuff':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-gray-700/50 text-gray-300 border border-gray-600 text-[11px] font-semibold">
            👋 Polite Rebuff
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[11px] font-semibold">
            Ignored
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Interaction Log Header & Telemetry */}
      <div className="p-6 rounded-3xl bg-gray-900/80 border border-gray-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
              <History className="w-4 h-4" />
              <span>Structured Interaction Log</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Field Execution Ledger ({total} Approaches)
            </h3>
            <p className="text-xs text-gray-400">
              Live chronological log of all interactions during the 5-hour Chennai field module.
            </p>
          </div>

          {/* Conversion / Rapport Rate KPI Banner (PRD Section 6) */}
          <div className="flex items-center space-x-3 p-3 rounded-2xl bg-gray-800/80 border border-indigo-500/30">
            <div className="text-right">
              <div className="text-xs text-gray-400 uppercase font-bold">Conversion / Rapport Rate</div>
              <div className="text-xl font-black text-white font-mono">
                {rapportRate}%{' '}
                <span className="text-xs text-gray-400 font-sans font-normal">
                  ({rapportApproaches.length} of {total} sustained)
                </span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Approaches Table / Cards */}
        {approaches.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-gray-800 rounded-2xl text-xs text-gray-500 space-y-2">
            <p>No approaches recorded in this session yet.</p>
            <button
              onClick={onOpenLogger}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs"
            >
              Log First Approach
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {approaches.map((app, idx) => (
              <div
                key={app.id}
                className="p-4 rounded-2xl bg-gray-950/70 border border-gray-800 hover:border-gray-700 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-6 h-6 rounded-lg bg-gray-800 text-gray-300 font-mono text-xs flex items-center justify-center font-bold">
                      #{idx + 1}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        app.level === 1
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : app.level === 2
                          ? 'bg-sky-500/10 text-sky-400'
                          : 'bg-amber-500/10 text-amber-400'
                      }`}
                    >
                      L{app.level}
                    </span>
                    <span className="text-sm font-bold text-white">{app.challengeTitle}</span>
                  </div>

                  <div className="flex items-center space-x-3 text-xs">
                    <span className="flex items-center space-x-1 text-gray-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{app.durationSeconds}s</span>
                    </span>
                    <span className="text-gray-500 font-mono text-[11px]">{app.timestamp}</span>
                    {getOutcomeBadge(app.outcome)}
                    <button
                      onClick={() => onDeleteApproach(app.id)}
                      className="p-1 text-gray-600 hover:text-rose-400 transition-colors"
                      title="Delete log"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Sub details: 3s rule, body language & coach feedback */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1 border-t border-gray-900">
                  <div className="flex items-center space-x-1 text-gray-400">
                    <span className="font-semibold text-gray-300">Hesitation:</span>
                    {app.hesitatedMoreThan3Sec ? (
                      <span className="text-rose-400 font-medium">⚠ Hesitated &gt;3s</span>
                    ) : (
                      <span className="text-emerald-400 font-medium">✓ Moved in &lt;3s</span>
                    )}
                  </div>

                  <div className="flex items-center space-x-1 text-gray-400">
                    <span className="font-semibold text-gray-300">Body Language:</span>
                    <span className="text-amber-400 font-bold">{app.bodyLanguageScore}/5 Stars</span>
                  </div>

                  <div className="flex items-center space-x-1 text-gray-400">
                    <MapPin className="w-3 h-3 text-sky-400" />
                    <span className="truncate">{app.locationHub}</span>
                  </div>
                </div>

                {/* Debrief Notes */}
                {(app.immediateNotes || app.coachFeedback) && (
                  <div className="p-2.5 rounded-xl bg-gray-900 border border-gray-800/80 text-xs space-y-1">
                    {app.immediateNotes && (
                      <p className="text-gray-300">
                        <strong className="text-gray-400">Reflection:</strong> {app.immediateNotes}
                      </p>
                    )}
                    {app.coachFeedback && (
                      <p className="text-indigo-200">
                        <strong className="text-indigo-400">Coach Feedback:</strong> {app.coachFeedback}
                      </p>
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
