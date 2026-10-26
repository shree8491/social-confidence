'use client';

import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
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
  'Voice becoming quiet or breathy',
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

  return (
    <div className="space-y-10 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="space-y-1 border-b border-neutral-900 pb-5">
        <span className="text-xs font-mono uppercase text-neutral-500">
          Phase 1 · Deliverable 1
        </span>
        <h2 className="text-2xl font-medium tracking-tight text-white">
          Self-Assessment Check
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400">
          Initial mapping of anxiety triggers, past comfort zones, and specific goals before stepping into Chennai&apos;s public spaces.
        </p>
      </div>

      {/* Session Metadata Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-black border border-neutral-900">
        <div className="space-y-1.5">
          <label className="text-[10px] font-mono uppercase text-neutral-500 block">
            Participant
          </label>
          <input
            type="text"
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-neutral-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-mono uppercase text-neutral-500 block">
            Head Coach
          </label>
          <input
            type="text"
            value={coachName}
            onChange={(e) => setCoachName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-neutral-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-mono uppercase text-neutral-500 block">
            Field Hub
          </label>
          <select
            value={locationHub}
            onChange={(e) => setLocationHub(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-neutral-500"
          >
            {PROGRAM_COMMERCIALS.hotspots.map((h) => (
              <option key={h.name} value={h.name}>
                {h.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-mono uppercase text-neutral-500 block">
            Planned Approaches
          </label>
          <select
            value={targetCount}
            onChange={(e) => setTargetCount(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-neutral-500"
          >
            <option value={8}>8 Approaches (Starter)</option>
            <option value={10}>10 Approaches (Standard 5-Hr)</option>
            <option value={12}>12 Approaches (Advanced)</option>
          </select>
        </div>
      </div>

      {/* Baseline Anxiety Rating Slider */}
      <div className="p-6 rounded-2xl bg-black border border-neutral-900 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-white">
              Baseline Anxiety Rating
            </h3>
            <p className="text-xs text-neutral-500">
              Self-reported fear level before approaching strangers (1-10 scale)
            </p>
          </div>
          <div className="font-mono text-2xl font-medium text-white">
            {data.baselineAnxietyScore}<span className="text-xs text-neutral-500">/10</span>
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
          className="w-full accent-white cursor-pointer h-1 bg-neutral-800 rounded-lg appearance-none"
        />

        <div className="flex justify-between text-[10px] font-mono text-neutral-500">
          <span>1: Calm</span>
          <span>5: Moderate Discomfort</span>
          <span>10: Full Freeze</span>
        </div>
      </div>

      {/* Anxiety Triggers Mapping */}
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-medium text-white">Anxiety Triggers Mapping</h3>
          <p className="text-xs text-neutral-500">
            Select triggers experienced during spontaneous public encounters:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {COMMON_TRIGGERS.map((trigger) => {
            const active = data.triggers.includes(trigger);
            return (
              <button
                type="button"
                key={trigger}
                onClick={() => toggleTrigger(trigger)}
                className={`text-left p-3 rounded-xl text-xs font-normal border transition-colors flex items-center justify-between ${
                  active
                    ? 'bg-neutral-900 border-neutral-400 text-white'
                    : 'bg-black border-neutral-850 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <span>{trigger}</span>
                {active && <Check className="w-3.5 h-3.5 shrink-0 text-white" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Text Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-mono uppercase text-neutral-500 block">
            Current Comfort Zone Habits
          </label>
          <textarea
            rows={3}
            value={data.comfortZoneNotes}
            onChange={(e) => setData({ ...data, comfortZoneNotes: e.target.value })}
            placeholder="e.g. Looks at phone to avoid eye contact, avoids standing alone..."
            className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-850 text-xs text-neutral-200 focus:outline-none focus:border-neutral-500 resize-none font-normal"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-mono uppercase text-neutral-500 block">
            Session Target Goals
          </label>
          <textarea
            rows={3}
            value={data.sessionGoals}
            onChange={(e) => setData({ ...data, sessionGoals: e.target.value })}
            placeholder="e.g. Complete 10 approaches without hesitating >3s, hold eye contact..."
            className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-850 text-xs text-neutral-200 focus:outline-none focus:border-neutral-500 resize-none font-normal"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-900">
        <div className="text-xs font-mono text-neutral-500">
          {saved && <span>✓ Baseline locked</span>}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-full border border-neutral-800 hover:border-neutral-700 text-xs text-neutral-300 font-medium transition-colors"
          >
            Save Baseline
          </button>
          <button
            onClick={() => {
              handleSave();
              onProceedToPriming();
            }}
            className="px-5 py-2 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-medium transition-colors inline-flex items-center space-x-1.5"
          >
            <span>Proceed to Priming</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
