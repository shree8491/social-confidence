'use client';

import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Wind, 
  Eye, 
  Smile, 
  Volume2, 
  ArrowRight,
  Flame,
  Award
} from 'lucide-react';
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
  const [activeDrillIndex, setActiveDrillIndex] = useState<number>(0);
  const [completedDrills, setCompletedDrills] = useState<string[]>(
    session.primingCompleted ? ['drill-1', 'drill-2', 'drill-3'] : []
  );

  // Box breathing state (4s Inhale, 4s Hold, 4s Exhale, 4s Hold)
  const [breathPhase, setBreathPhase] = useState<'Inhale (4s)' | 'Hold (4s)' | 'Exhale (4s)' | 'Hold Empty (4s)'>('Inhale (4s)');
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
              if (currentPhase === 'Inhale (4s)') return 'Hold (4s)';
              if (currentPhase === 'Hold (4s)') return 'Exhale (4s)';
              if (currentPhase === 'Exhale (4s)') return 'Hold Empty (4s)';
              return 'Inhale (4s)';
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

  const progressPercent = Math.round(((TOTAL_SECONDS - secondsRemaining) / TOTAL_SECONDS) * 100);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-800 pb-5">
        <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
          <span>Phase 1: Mindset &amp; Foundations</span>
          <span>·</span>
          <span>Deliverable 2</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Low-Stakes Priming Routine
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Quick 5-minute warm-up drills to regulate the nervous system and warm up vocal resonance before entering high-stakes cold outreach.
        </p>
      </div>

      {/* 5-Minute Timer & Box Breathing Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Countdown Timer Card */}
        <div className="p-6 rounded-3xl bg-gray-900/90 border border-gray-800 flex flex-col justify-between items-center text-center space-y-5">
          <div className="w-full flex items-center justify-between text-xs text-gray-400 font-mono">
            <span>DRILL TIMER</span>
            <span className="text-indigo-400 font-bold">{progressPercent}% COMPLETE</span>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="w-44 h-44 rounded-full border-4 border-gray-800 flex flex-col items-center justify-center relative">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight font-mono">
                {formatTime(secondsRemaining)}
              </span>
              <span className="text-xs text-gray-400 uppercase tracking-wider mt-1">
                {isRunning ? 'Priming Active' : 'Ready to Prime'}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg ${
                isRunning
                  ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause Timer</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start 5-Min Priming</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setIsRunning(false);
                setSecondsRemaining(TOTAL_SECONDS);
              }}
              title="Reset Timer"
              className="p-2.5 rounded-xl bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Visual Box-Breathing Pacer */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-gray-900/80 to-gray-900 border border-indigo-500/30 flex flex-col justify-between items-center text-center">
          <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-300 uppercase tracking-wider">
            <Wind className="w-4 h-4" />
            <span>Physiological Reset · 4-4-4-4 Box Breathing</span>
          </div>

          {/* Dynamic Breathing Circle */}
          <div className="my-6 relative flex items-center justify-center">
            <div
              className={`w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all duration-1000 ${
                breathPhase.startsWith('Inhale')
                  ? 'scale-125 bg-indigo-600/30 border-2 border-indigo-400 shadow-xl shadow-indigo-500/20'
                  : breathPhase === 'Hold (4s)'
                  ? 'scale-125 bg-amber-500/20 border-2 border-amber-400 shadow-xl shadow-amber-500/20'
                  : breathPhase.startsWith('Exhale')
                  ? 'scale-90 bg-sky-600/20 border-2 border-sky-400'
                  : 'scale-90 bg-gray-800 border-2 border-gray-600'
              }`}
            >
              <span className="text-3xl font-black text-white font-mono">{breathCount}s</span>
              <span className="text-[11px] font-bold text-gray-200 uppercase mt-0.5 px-2">
                {breathPhase.split(' ')[0]}
              </span>
            </div>
          </div>

          <div className="text-xs text-gray-300 max-w-xs leading-relaxed">
            Inhale deeply into the diaphragm. Lowers cardiac output and halts the sympathetic fight-or-flight freeze before public interaction.
          </div>
        </div>
      </div>

      {/* 3 Step Priming Drills Checklist */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-bold text-white">The 3 Sequential Field Priming Drills</h3>
          <p className="text-xs text-gray-400">
            Execute these 3 low-stakes drills with your coach before approaching anyone for sustained conversation:
          </p>
        </div>

        <div className="space-y-3">
          {PRIMING_DRILLS.map((drill, index) => {
            const isCompleted = completedDrills.includes(drill.id);
            return (
              <div
                key={drill.id}
                onClick={() => toggleDrillComplete(drill.id)}
                className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-start space-x-4 ${
                  isCompleted
                    ? 'bg-emerald-950/20 border-emerald-500/50 text-gray-200'
                    : 'bg-gray-900/60 border-gray-800 hover:border-gray-700 text-gray-300'
                }`}
              >
                <div
                  className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border text-xs font-bold transition-colors ${
                    isCompleted
                      ? 'bg-emerald-600 border-emerald-500 text-white'
                      : 'border-gray-700 text-gray-500 bg-gray-800'
                  }`}
                >
                  {isCompleted ? '✓' : index + 1}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{drill.title}</h4>
                    <span className="text-[10px] font-mono text-gray-400">
                      {drill.durationSeconds}s drill
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    {drill.instruction}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-800">
        <div className="text-xs text-gray-400 flex items-center space-x-2">
          {completedDrills.length === PRIMING_DRILLS.length ? (
            <span className="text-emerald-400 font-bold flex items-center space-x-1.5">
              <Award className="w-4 h-4" />
              <span>Priming Complete! Nervous system calibrated.</span>
            </span>
          ) : (
            <span>{completedDrills.length} of {PRIMING_DRILLS.length} priming drills checked</span>
          )}
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            onClick={onCompletePriming}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold border border-gray-700"
          >
            Mark All Completed
          </button>
          <button
            onClick={() => {
              onCompletePriming();
              onProceedToField();
            }}
            className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2"
          >
            <span>Enter Phase 2: Cold Outreach Engine</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
