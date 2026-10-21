'use client';

import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  Star, 
  Sparkles, 
  MapPin, 
  MessageSquare,
  AlertCircle
} from 'lucide-react';
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
    challenge ? challenge.title : `Level ${level} Public Interaction`
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
      immediateNotes: immediateNotes || 'Smooth execution in field.',
      coachFeedback: coachFeedback || 'Good effort. Keep the posture open on the initial step.',
    };

    onSaveApproach(newLog);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-left my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider mb-1">
            <span
              className={`px-2.5 py-0.5 rounded-full ${
                level === 1
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : level === 2
                  ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}
            >
              Level {level} Cold Outreach
            </span>
            <span className="text-gray-400">· Real-Time Debrief</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Log Completed Approach
          </h3>
          <p className="text-xs text-gray-400">
            Immediate in-person debrief: capture physiological feedback right after the conversation.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm">
          {/* Challenge & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
                Challenge Name
              </label>
              <input
                type="text"
                value={challengeTitle}
                onChange={(e) => setChallengeTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
                Specific Location Spot
              </label>
              <input
                type="text"
                value={hub}
                onChange={(e) => setHub(e.target.value)}
                placeholder="e.g. Phoenix Food Court escalators"
                className="w-full px-3 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* 3-Second Rule Hesitation Check (Critical PRD Debrief Item) */}
          <div className="p-4 rounded-2xl bg-gray-800/80 border border-gray-700/70 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-white text-xs sm:text-sm block">
                  The 3-Second Rule Adherence
                </span>
                <span className="text-[11px] text-gray-400">
                  Did you approach within 3 seconds of spotting the person, or did you hesitate?
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => setHesitated(false)}
                className={`py-2 px-3 rounded-xl font-semibold text-xs border transition-all ${
                  !hesitated
                    ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300'
                    : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white'
                }`}
              >
                ✓ Moved Instantly (&lt;3s)
              </button>
              <button
                type="button"
                onClick={() => setHesitated(true)}
                className={`py-2 px-3 rounded-xl font-semibold text-xs border transition-all ${
                  hesitated
                    ? 'bg-rose-600/30 border-rose-500 text-rose-300'
                    : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white'
                }`}
              >
                ⚠ Hesitated &gt; 3 Seconds
              </button>
            </div>
          </div>

          {/* Duration Category */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase mb-1.5">
              Interaction Duration
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setDurationCategory('under_1')}
                className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                  durationCategory === 'under_1'
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : 'bg-gray-800 border-gray-700 text-gray-400'
                }`}
              >
                &lt; 1 Minute
              </button>
              <button
                type="button"
                onClick={() => setDurationCategory('1_to_2')}
                className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                  durationCategory === '1_to_2'
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : 'bg-gray-800 border-gray-700 text-gray-400'
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
                className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                  durationCategory === 'over_2'
                    ? 'bg-emerald-600 border-emerald-500 text-white'
                    : 'bg-gray-800 border-gray-700 text-gray-400'
                }`}
              >
                &gt; 2 Mins (Target KPI)
              </button>
            </div>
          </div>

          {/* Outcome Selection */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase mb-1.5">
              Interaction Outcome (Calibrates Rapport Rate KPI)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOutcome('sustained_conversation')}
                className={`p-2.5 rounded-xl text-xs font-semibold border text-left transition-all ${
                  outcome === 'sustained_conversation'
                    ? 'bg-emerald-600/30 border-emerald-500 text-emerald-200'
                    : 'bg-gray-800 border-gray-700 text-gray-300'
                }`}
              >
                💬 Sustained Conversation (&gt;2 mins)
              </button>
              <button
                type="button"
                onClick={() => setOutcome('contact_exchanged')}
                className={`p-2.5 rounded-xl text-xs font-semibold border text-left transition-all ${
                  outcome === 'contact_exchanged'
                    ? 'bg-amber-500/30 border-amber-400 text-amber-200'
                    : 'bg-gray-800 border-gray-700 text-gray-300'
                }`}
              >
                📇 Contact / LinkedIn Exchanged
              </button>
              <button
                type="button"
                onClick={() => setOutcome('quick_helpful_answer')}
                className={`p-2.5 rounded-xl text-xs font-semibold border text-left transition-all ${
                  outcome === 'quick_helpful_answer'
                    ? 'bg-sky-600/30 border-sky-500 text-sky-200'
                    : 'bg-gray-800 border-gray-700 text-gray-300'
                }`}
              >
                👍 Quick &amp; Helpful Answer
              </button>
              <button
                type="button"
                onClick={() => setOutcome('polite_rebuff')}
                className={`p-2.5 rounded-xl text-xs font-semibold border text-left transition-all ${
                  outcome === 'polite_rebuff'
                    ? 'bg-gray-700 border-gray-500 text-gray-200'
                    : 'bg-gray-800 border-gray-700 text-gray-400'
                }`}
              >
                👋 Polite Rebuff / In a Hurry
              </button>
            </div>
          </div>

          {/* Body Language Score (1 - 5) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase">
                Body Language &amp; Posture Score
              </label>
              <span className="text-xs text-amber-400 font-bold">{bodyLanguage} / 5 Stars</span>
            </div>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setBodyLanguage(star)}
                  className={`flex-1 py-2 rounded-xl border flex items-center justify-center transition-all ${
                    bodyLanguage >= star
                      ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                      : 'bg-gray-800 border-gray-700 text-gray-600'
                  }`}
                >
                  <Star className="w-4 h-4 fill-current" />
                </button>
              ))}
            </div>
            <span className="text-[11px] text-gray-500 block mt-1">
              Evaluates: Open shoulders, grounded feet, eye contact hold, and vocal projection.
            </span>
          </div>

          {/* Debrief Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Participant Reflection Note
              </label>
              <textarea
                rows={2}
                value={immediateNotes}
                onChange={(e) => setImmediateNotes(e.target.value)}
                placeholder="What did you feel in your chest? How did they react?"
                className="w-full p-2.5 rounded-xl bg-gray-800 border border-gray-700 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-indigo-300 mb-1">
                Coach Live Debrief Cue
              </label>
              <textarea
                rows={2}
                value={coachFeedback}
                onChange={(e) => setCoachFeedback(e.target.value)}
                placeholder="Coach feedback: stance adjustments, vocal tone, next step..."
                className="w-full p-2.5 rounded-xl bg-gray-800 border border-indigo-500/40 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold shadow-lg shadow-indigo-600/30"
            >
              Save Approach &amp; Update KPI
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
