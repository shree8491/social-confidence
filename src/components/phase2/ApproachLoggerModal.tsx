'use client';

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { ApproachLog, ChallengeItem, ChallengeLevel, InteractionOutcome } from '@/types';

interface ApproachLoggerModalProps {
  challenge?: ChallengeItem | null;
  defaultLevel?: ChallengeLevel;
  locationHub: string;
  isOpen: boolean;
  onClose: () => void;
  onSaveApproach: (approach: ApproachLog) => void;
}

export const ApproachLoggerModal: React.FC<ApproachLoggerModalProps> = ({
  challenge,
  defaultLevel = 1,
  locationHub,
  isOpen,
  onClose,
  onSaveApproach,
}) => {
  const level = challenge ? challenge.level : defaultLevel;
  const [challengeTitle, setChallengeTitle] = useState(
    challenge ? challenge.title : `Level ${level} Outreach`
  );
  const [hub, setHub] = useState(locationHub);
  const [durationCategory, setDurationCategory] = useState<'under_1' | '1_to_2' | 'over_2'>('under_1');
  const [outcome, setOutcome] = useState<InteractionOutcome>('quick_helpful_answer');
  const [hesitated, setHesitated] = useState<boolean>(false);
  const [bodyLanguage, setBodyLanguage] = useState<number>(4);
  const [immediateNotes, setImmediateNotes] = useState<string>('');
  const [coachFeedback, setCoachFeedback] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let durationSeconds = 30;
    if (durationCategory === '1_to_2') durationSeconds = 90;
    if (durationCategory === 'over_2') durationSeconds = 180;

    const newLog: ApproachLog = {
      id: 'app-' + Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      level,
      challengeTitle,
      locationHub: hub,
      durationSeconds,
      outcome,
      hesitatedMoreThan3Sec: hesitated,
      bodyLanguageScore: bodyLanguage,
      immediateNotes: immediateNotes || 'Field interaction completed.',
      coachFeedback: coachFeedback || 'Good posture and execution.',
    };

    onSaveApproach(newLog);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-7 shadow-2xl text-left my-8 space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-md text-neutral-500 hover:text-white hover:bg-neutral-900 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono uppercase text-neutral-500">
            Level {level} · On-Field Debrief
          </span>
          <h3 className="text-lg font-medium text-white">
            Log Completed Approach
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Challenge & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-neutral-500 block">
                Challenge Name
              </label>
              <input
                type="text"
                value={challengeTitle}
                onChange={(e) => setChallengeTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black border border-neutral-800 text-white text-xs focus:outline-none focus:border-neutral-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-neutral-500 block">
                Location Spot
              </label>
              <input
                type="text"
                value={hub}
                onChange={(e) => setHub(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black border border-neutral-800 text-white text-xs focus:outline-none focus:border-neutral-500"
              />
            </div>
          </div>

          {/* 3-Second Rule Hesitation Check */}
          <div className="space-y-1.5 pt-1">
            <label className="text-[10px] font-mono uppercase text-neutral-500 block">
              3-Second Rule (Hesitation Check)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setHesitated(false)}
                className={`py-2 px-3 rounded-lg border text-xs font-normal transition-colors flex items-center justify-between ${
                  !hesitated
                    ? 'bg-neutral-900 border-white text-white'
                    : 'bg-black border-neutral-850 text-neutral-400'
                }`}
              >
                <span>Moved Promptly (&lt;3s)</span>
                {!hesitated && <Check className="w-3 h-3 text-white" />}
              </button>
              <button
                type="button"
                onClick={() => setHesitated(true)}
                className={`py-2 px-3 rounded-lg border text-xs font-normal transition-colors flex items-center justify-between ${
                  hesitated
                    ? 'bg-neutral-900 border-white text-white'
                    : 'bg-black border-neutral-850 text-neutral-400'
                }`}
              >
                <span>Hesitated &gt; 3 Seconds</span>
                {hesitated && <Check className="w-3 h-3 text-white" />}
              </button>
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase text-neutral-500 block">
              Interaction Duration
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setDurationCategory('under_1')}
                className={`py-2 rounded-lg border text-xs text-center transition-colors ${
                  durationCategory === 'under_1'
                    ? 'bg-neutral-900 border-white text-white font-medium'
                    : 'bg-black border-neutral-850 text-neutral-400'
                }`}
              >
                &lt; 1 Minute
              </button>
              <button
                type="button"
                onClick={() => setDurationCategory('1_to_2')}
                className={`py-2 rounded-lg border text-xs text-center transition-colors ${
                  durationCategory === '1_to_2'
                    ? 'bg-neutral-900 border-white text-white font-medium'
                    : 'bg-black border-neutral-850 text-neutral-400'
                }`}
              >
                1 - 2 Minutes
              </button>
              <button
                type="button"
                onClick={() => {
                  setDurationCategory('over_2');
                  if (outcome === 'quick_helpful_answer') {
                    setOutcome('sustained_conversation');
                  }
                }}
                className={`py-2 rounded-lg border text-xs text-center transition-colors ${
                  durationCategory === 'over_2'
                    ? 'bg-neutral-900 border-white text-white font-medium'
                    : 'bg-black border-neutral-850 text-neutral-400'
                }`}
              >
                &gt; 2 Minutes (Rapport)
              </button>
            </div>
          </div>

          {/* Outcome */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase text-neutral-500 block">
              Outcome
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOutcome('sustained_conversation')}
                className={`p-2.5 rounded-lg border text-left transition-colors ${
                  outcome === 'sustained_conversation'
                    ? 'bg-neutral-900 border-white text-white'
                    : 'bg-black border-neutral-850 text-neutral-400'
                }`}
              >
                Sustained Conversation (&gt;2m)
              </button>
              <button
                type="button"
                onClick={() => setOutcome('contact_exchanged')}
                className={`p-2.5 rounded-lg border text-left transition-colors ${
                  outcome === 'contact_exchanged'
                    ? 'bg-neutral-900 border-white text-white'
                    : 'bg-black border-neutral-850 text-neutral-400'
                }`}
              >
                Contact / LinkedIn Swap
              </button>
              <button
                type="button"
                onClick={() => setOutcome('quick_helpful_answer')}
                className={`p-2.5 rounded-lg border text-left transition-colors ${
                  outcome === 'quick_helpful_answer'
                    ? 'bg-neutral-900 border-white text-white'
                    : 'bg-black border-neutral-850 text-neutral-400'
                }`}
              >
                Quick Answer
              </button>
              <button
                type="button"
                onClick={() => setOutcome('polite_rebuff')}
                className={`p-2.5 rounded-lg border text-left transition-colors ${
                  outcome === 'polite_rebuff'
                    ? 'bg-neutral-900 border-white text-white'
                    : 'bg-black border-neutral-850 text-neutral-400'
                }`}
              >
                Polite Rebuff
              </button>
            </div>
          </div>

          {/* Body Language Rating */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-mono uppercase text-neutral-500">
                Body Language &amp; Posture Score
              </label>
              <span className="font-mono text-neutral-300">{bodyLanguage} / 5</span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setBodyLanguage(val)}
                  className={`py-1.5 rounded border font-mono text-xs transition-colors ${
                    bodyLanguage === val
                      ? 'bg-white text-black font-semibold border-white'
                      : 'bg-black border-neutral-850 text-neutral-400'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-neutral-500 block">
                Reflection Note
              </label>
              <textarea
                rows={2}
                value={immediateNotes}
                onChange={(e) => setImmediateNotes(e.target.value)}
                placeholder="How did the approach feel?"
                className="w-full p-2.5 rounded-lg bg-black border border-neutral-850 text-xs text-neutral-200 focus:outline-none focus:border-neutral-500 resize-none font-normal"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-neutral-500 block">
                Coach Feedback
              </label>
              <textarea
                rows={2}
                value={coachFeedback}
                onChange={(e) => setCoachFeedback(e.target.value)}
                placeholder="Posture, tone, or next cue..."
                className="w-full p-2.5 rounded-lg bg-black border border-neutral-850 text-xs text-neutral-200 focus:outline-none focus:border-neutral-500 resize-none font-normal"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-2 pt-3 border-t border-neutral-900">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-neutral-850 text-xs text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-medium transition-colors"
            >
              Save Approach
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
