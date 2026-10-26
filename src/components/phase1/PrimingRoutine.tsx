'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ArrowRight, Check } from 'lucide-react';
import { SessionData } from '@/types';
import { PRIMING_DRILLS } from '@/lib/constants';

interface PrimingRoutineProps {
  session: SessionData;
  onUpdateSession: (newSession: SessionData) => void;
  onProceedToField: () => void;
}

export const PrimingRoutine: React.FC<PrimingRoutineProps> = ({
  session,
  onUpdateSession,
  onProceedToField,
}) => {
  const TOTAL_SECONDS = 300; // 5 minutes
  const [secondsRemaining, setSecondsRemaining] = useState<number>(TOTAL_SECONDS);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedDrills, setCompletedDrills] = useState<string[]>(
    session.primingCompleted ? ['drill-1', 'drill-2', 'drill-3'] : []
  );

  // Box breathing state (4s Inhale, 4s Hold, 4s Exhale, 4s Hold)
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Hold Empty'>('Inhale');
  const [breathCount, setBreathCount] = useState<number>(4);

  // Timer loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isRunning) {
      setIsRunning(false);
      onCompletePriming();
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsRemaining]);

  // Breathing cadence cycle
  useEffect(() => {
    let breathTimer: NodeJS.Timeout;
    if (isRunning) {
      breathTimer = setInterval(() => {
        setBreathCount((prev) => {
          if (prev <= 1) {
            setBreathPhase((currentPhase) => {
              if (currentPhase === 'Inhale') return 'Hold';
              if (currentPhase === 'Hold') return 'Exhale';
              if (currentPhase === 'Exhale') return 'Hold Empty';
              return 'Inhale';
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(breathTimer);
  }, [isRunning]);

  const toggleDrillComplete = (drillId: string) => {
    setCompletedDrills((prev) => {
      const exists = prev.includes(drillId);
      const updated = exists ? prev.filter((id) => id !== drillId) : [...prev, drillId];
      if (updated.length === PRIMING_DRILLS.length) {
        onUpdateSession({ ...session, primingCompleted: true });
      }
      return updated;
    });
  };

  const onCompletePriming = () => {
    setCompletedDrills(['drill-1', 'drill-2', 'drill-3']);
    onUpdateSession({ ...session, primingCompleted: true });
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="space-y-1 border-b border-neutral-900 pb-5">
        <span className="text-xs font-mono uppercase text-neutral-500">
          Phase 1 · Deliverable 2
        </span>
        <h2 className="text-2xl font-medium tracking-tight text-white">
          Low-Stakes Priming Routine
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400">
          5-minute warm-up drills to down-regulate the nervous system and warm up vocal resonance before moving to deeper conversations.
        </p>
      </div>

      {/* Minimal Timer & Visual Breath Cadence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Timer Card */}
        <div className="p-8 rounded-2xl bg-black border border-neutral-900 flex flex-col justify-between items-center text-center space-y-6">
          <span className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">
            Warm-Up Timer
          </span>

          <div className="font-mono text-5xl font-light text-white tracking-tight">
            {formatTime(secondsRemaining)}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors text-xs font-semibold"
            >
              {isRunning ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start Priming</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setIsRunning(false);
                setSecondsRemaining(TOTAL_SECONDS);
              }}
              className="p-2 rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
              title="Reset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Minimalist Breathing Circle */}
        <div className="p-8 rounded-2xl bg-black border border-neutral-900 flex flex-col justify-between items-center text-center space-y-4">
          <span className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">
            4-4-4-4 Box Breathing
          </span>

          <div className="relative w-32 h-32 flex items-center justify-center">
            <div
              className={`w-28 h-28 rounded-full border border-neutral-700 flex flex-col items-center justify-center transition-transform duration-1000 ${
                breathPhase === 'Inhale' || breathPhase === 'Hold'
                  ? 'scale-110 border-white'
                  : 'scale-90 border-neutral-700'
              }`}
            >
              <span className="font-mono text-2xl font-light text-white">{breathCount}s</span>
              <span className="text-[10px] font-mono uppercase text-neutral-400 mt-0.5">
                {breathPhase}
              </span>
            </div>
          </div>

          <p className="text-xs text-neutral-500 max-w-xs font-normal">
            Breathe into the lower abdomen to silence the sympathetic fight-or-flight freeze.
          </p>
        </div>
      </div>

      {/* 3 Step Priming Drills Checklist */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-white">The 3 Priming Drills</h3>

        <div className="space-y-2">
          {PRIMING_DRILLS.map((drill, index) => {
            const isCompleted = completedDrills.includes(drill.id);
            return (
              <div
                key={drill.id}
                onClick={() => toggleDrillComplete(drill.id)}
                className={`cursor-pointer p-4 rounded-xl border transition-colors flex items-start space-x-3 ${
                  isCompleted
                    ? 'bg-neutral-950 border-neutral-700'
                    : 'bg-black border-neutral-850 hover:border-neutral-750'
                }`}
              >
                <div
                  className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 text-xs font-mono border ${
                    isCompleted
                      ? 'bg-white text-black border-white'
                      : 'border-neutral-700 text-neutral-500'
                  }`}
                >
                  {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : index + 1}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-medium text-white">{drill.title}</h4>
                    <span className="text-[10px] font-mono text-neutral-500">{drill.durationSeconds}s</span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1 font-normal leading-relaxed">
                    {drill.instruction}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-900">
        <span className="text-xs font-mono text-neutral-500">
          {completedDrills.length} of {PRIMING_DRILLS.length} drills completed
        </span>

        <button
          onClick={() => {
            onCompletePriming();
            onProceedToField();
          }}
          className="px-5 py-2 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-medium transition-colors inline-flex items-center space-x-1.5"
        >
          <span>Enter Cold Outreach Engine</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
