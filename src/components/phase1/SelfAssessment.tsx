'use client';

import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, MapPin, Target, Sparkles, User, HelpCircle } from 'lucide-react';
import { SessionData, SelfAssessmentData } from '@/types';
import { PROGRAM_COMMERCIALS } from '@/lib/constants';

interface SelfAssessmentProps {
  session: SessionData;
  onUpdateSession: (newSession: SessionData) => void;
  onProceedToPriming: () => void;
}

const COMMON_TRIGGERS = [
  'Paralyzing fear of rejection / freeze response',
  'Rapid heartbeat & dry mouth before approaching',
  'Fear of being noticed or judged by bystanders',
  'Awkward silence / running out of things to say',
  'Intimidation by perceived status / attractive strangers',
  'Over-analyzing the exact perfect opener script',
  'Voice becoming quiet, breathy, or trembling',
];

export const SelfAssessment: React.FC<SelfAssessmentProps> = ({
  session,
  onUpdateSession,
  onProceedToPriming,
}) => {
  const [data, setData] = useState<SelfAssessmentData>(session.selfAssessment);
  const [participantName, setParticipantName] = useState(session.participantName);
  const [coachName, setCoachName] = useState(session.coachName);
  const [locationHub, setLocationHub] = useState(session.locationHub);
  const [targetCount, setTargetCount] = useState(session.targetApproachesCount);
  const [saved, setSaved] = useState(!!session.selfAssessment.completedAt);

  const toggleTrigger = (trigger: string) => {
    setData((prev) => {
      const exists = prev.triggers.includes(trigger);
      return {
        ...prev,
        triggers: exists ? prev.triggers.filter((t) => t !== trigger) : [...prev.triggers, trigger],
      };
    });
  };

  const handleSave = () => {
    const updatedAssessment = {
      ...data,
      selectedLocation: locationHub,
      completedAt: new Date().toISOString(),
    };
    setData(updatedAssessment);
    setSaved(true);
    onUpdateSession({
      ...session,
      participantName,
      coachName,
      locationHub,
      targetApproachesCount: targetCount,
      selfAssessment: updatedAssessment,
    });
  };

  const getScoreDescription = (score: number) => {
    if (score >= 9) return 'Extreme Panic & Full Freeze: Flight response triggered immediately around strangers.';
    if (score >= 7) return 'High Anxiety & Overthinking: Rapid pulse, takes minutes to build courage, high avoidance.';
    if (score >= 5) return 'Moderate Discomfort: Can function when forced, but feels rigid and self-conscious.';
    if (score >= 3) return 'Mild Hesitation: Slight butterfly feelings, warms up quickly after one interaction.';
    return 'Calm & Grounded: Socially at ease, minor situational tension only.';
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-800 pb-5">
        <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
          <span>Phase 1: Mindset &amp; Foundations</span>
          <span>·</span>
          <span>Deliverable 1</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Self-Assessment Check
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Initial mapping of anxiety triggers, past comfort zones, and specific goals before taking the field in Chennai.
        </p>
      </div>

      {/* Session Metadata Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-gray-900/60 border border-gray-800">
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase mb-1.5">
            Participant Name
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            <input
              type="text"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase mb-1.5">
            Coach Name
          </label>
          <div className="relative">
            <Sparkles className="w-4 h-4 text-amber-400 absolute left-3 top-3" />
            <input
              type="text"
              value={coachName}
              onChange={(e) => setCoachName(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase mb-1.5">
            Chennai Field Hub
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-sky-400 absolute left-3 top-3" />
            <select
              value={locationHub}
              onChange={(e) => setLocationHub(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
            >
              {PROGRAM_COMMERCIALS.hotspots.map((h) => (
                <option key={h.name} value={h.name}>
                  {h.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase mb-1.5">
            Target Approaches Count
          </label>
          <div className="relative">
            <Target className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
            <select
              value={targetCount}
              onChange={(e) => setTargetCount(Number(e.target.value))}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value={8}>8 Approaches (Starter)</option>
              <option value={10}>10 Approaches (Standard 5-Hr)</option>
              <option value={12}>12 Approaches (Advanced)</option>
              <option value={15}>15 Approaches (High Intensity)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Baseline Anxiety Rating Slider */}
      <div className="p-6 rounded-2xl bg-gray-900/80 border border-gray-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <span>Initial Baseline Anxiety Rating (1 - 10)</span>
            </h3>
            <p className="text-xs text-gray-400">
              Rate your current fear level before stepping out into the public hub.
            </p>
          </div>
          <div className="text-3xl font-black text-amber-400 px-4 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 font-mono">
            {data.baselineAnxietyScore}
            <span className="text-xs text-gray-400 font-sans">/10</span>
          </div>
        </div>

        <input
          type="range"
          min={1}
          max={10}
          value={data.baselineAnxietyScore}
          onChange={(e) =>
            setData({ ...data, baselineAnxietyScore: Number(e.target.value) })
          }
          className="w-full accent-amber-500 cursor-pointer h-2 bg-gray-700 rounded-lg"
        />

        <div className="flex justify-between text-[11px] text-gray-500 font-medium">
          <span>1: Completely Calm</span>
          <span>5: Moderate Tension</span>
          <span>10: Severe Panic Freeze</span>
        </div>

        <div className="p-3.5 rounded-xl bg-gray-800/70 border border-gray-700/60 text-xs text-gray-300">
          <strong className="text-amber-300">Current State:</strong> {getScoreDescription(data.baselineAnxietyScore)}
        </div>
      </div>

      {/* Anxiety Triggers Mapping */}
      <div className="space-y-3">
        <div>
          <h3 className="text-base font-bold text-white">Anxiety Triggers Mapping</h3>
          <p className="text-xs text-gray-400">
            Select the exact physical &amp; psychological triggers you experience in spontaneous public situations:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {COMMON_TRIGGERS.map((trigger) => {
            const active = data.triggers.includes(trigger);
            return (
              <div
                key={trigger}
                onClick={() => toggleTrigger(trigger)}
                className={`cursor-pointer p-3.5 rounded-xl text-xs font-medium border transition-all flex items-center space-x-3 ${
                  active
                    ? 'bg-rose-950/40 border-rose-500/80 text-rose-200'
                    : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:text-gray-200 hover:border-gray-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 border ${
                    active ? 'bg-rose-600 border-rose-500 text-white' : 'border-gray-600'
                  }`}
                >
                  {active && '✓'}
                </div>
                <span>{trigger}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comfort Zone Notes & Specific Session Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            Current Comfort Zone &amp; Behavioral Habits
          </label>
          <textarea
            rows={3}
            value={data.comfortZoneNotes}
            onChange={(e) => setData({ ...data, comfortZoneNotes: e.target.value })}
            placeholder="e.g. Usually wears AirPods, looks down at phone when someone passes by..."
            className="w-full p-3 rounded-xl bg-gray-900 border border-gray-800 text-xs sm:text-sm text-gray-200 focus:outline-none focus:border-indigo-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            Specific Goals for this 5-Hour Session
          </label>
          <textarea
            rows={3}
            value={data.sessionGoals}
            onChange={(e) => setData({ ...data, sessionGoals: e.target.value })}
            placeholder="e.g. Execute 10 approaches without hesitating >3 seconds, talk to 2 people for >2 mins..."
            className="w-full p-3 rounded-xl bg-gray-900 border border-gray-800 text-xs sm:text-sm text-gray-200 focus:outline-none focus:border-indigo-500 resize-none"
          />
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-800">
        <div className="text-xs text-gray-400">
          {saved && (
            <span className="flex items-center space-x-1.5 text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>Baseline locked ({new Date(data.completedAt || '').toLocaleTimeString()})</span>
            </span>
          )}
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            onClick={handleSave}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold border border-gray-700 transition-colors"
          >
            Save Baseline
          </button>
          <button
            onClick={() => {
              handleSave();
              onProceedToPriming();
            }}
            className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02]"
          >
            Proceed to 5-Min Priming Drills →
          </button>
        </div>
      </div>
    </div>
  );
};
