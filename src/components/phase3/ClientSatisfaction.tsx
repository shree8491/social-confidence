'use client';

import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Smile, 
  Sparkles, 
  CheckCircle2, 
  TrendingDown, 
  Award, 
  Star,
  Quote
} from 'lucide-react';
import { PostSessionDebriefData, SessionData } from '@/types';

interface ClientSatisfactionProps {
  session: SessionData;
  onUpdateDebrief: (debrief: PostSessionDebriefData) => void;
  onViewSummary: () => void;
}

export const ClientSatisfaction: React.FC<ClientSatisfactionProps> = ({
  session,
  onUpdateDebrief,
  onViewSummary,
}) => {
  const [data, setData] = useState<PostSessionDebriefData>(session.postDebrief);
  const baselineAnxiety = session.selfAssessment.baselineAnxietyScore || 8;
  const postAnxiety = data.postSessionAnxietyScore;

  // PRD KPI: Anxiety Reduction Score (Pre - Post delta)
  const anxietyDelta = baselineAnxiety - postAnxiety;

  const getNpsCategory = (score: number) => {
    if (score >= 9) return { label: 'Promoter (High Satisfaction)', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
    if (score >= 7) return { label: 'Passive', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
    return { label: 'Detractor', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' };
  };

  const handleSave = () => {
    const updated = {
      ...data,
      completedAt: new Date().toISOString(),
    };
    setData(updated);
    onUpdateDebrief(updated);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-800 pb-5">
        <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
          <span>Phase 3: Retention &amp; Growth</span>
          <span>·</span>
          <span>Deliverable 2</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Post-Session Debrief &amp; Client Satisfaction
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Self-reported comfort scores, Anxiety Reduction Delta calculation, and post-session Net Promoter Score audit.
        </p>
      </div>

      {/* Anxiety Reduction Score KPI Card (PRD Section 6) */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-gray-900 via-emerald-950/30 to-gray-900 border border-emerald-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              <TrendingDown className="w-4 h-4" />
              <span>PRD Primary Metric · Anxiety Reduction Score</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Approach Anxiety Delta ($\Delta$)
            </h3>
            <p className="text-xs text-gray-400">
              Measured pre-session baseline vs. post-session comfort rating on a 10-point scale
            </p>
          </div>

          {/* Delta Metric Display */}
          <div className="flex items-center space-x-4">
            <div className="text-center p-3 rounded-2xl bg-gray-900 border border-gray-800">
              <span className="text-[10px] text-gray-400 uppercase block">Pre-Session</span>
              <span className="text-xl font-black text-rose-400 font-mono">{baselineAnxiety} / 10</span>
            </div>
            <span className="text-gray-500 text-lg font-bold">→</span>
            <div className="text-center p-3 rounded-2xl bg-gray-900 border border-gray-800">
              <span className="text-[10px] text-gray-400 uppercase block">Post-Session</span>
              <span className="text-xl font-black text-emerald-400 font-mono">{postAnxiety} / 10</span>
            </div>
            <div className="text-center p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40">
              <span className="text-[10px] text-emerald-300 uppercase font-bold block">Delta Reduction</span>
              <span className="text-xl font-black text-emerald-300 font-mono">
                {anxietyDelta >= 0 ? `-${anxietyDelta}` : `+${Math.abs(anxietyDelta)}`} Pts
              </span>
            </div>
          </div>
        </div>

        {/* Post-Session Anxiety Slider */}
        <div className="space-y-2 pt-3">
          <div className="flex justify-between items-center text-xs">
            <label className="font-semibold text-gray-300">
              Adjust Post-Session Approach Anxiety Score (1-10)
            </label>
            <span className="text-emerald-400 font-bold font-mono">{postAnxiety}/10</span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            value={postAnxiety}
            onChange={(e) =>
              setData({ ...data, postSessionAnxietyScore: Number(e.target.value) })
            }
            className="w-full accent-emerald-500 cursor-pointer h-2 bg-gray-700 rounded-lg"
          />
          <div className="flex justify-between text-[11px] text-gray-500">
            <span>1: Completely at Ease in Public</span>
            <span>5: Normal Excitement</span>
            <span>10: Paralyzed Freeze</span>
          </div>
        </div>
      </div>

      {/* Client Satisfaction & NPS (PRD Section 6) */}
      <div className="p-6 rounded-3xl bg-gray-900/80 border border-gray-800 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              <Award className="w-4 h-4" />
              <span>Client Satisfaction &amp; Net Promoter Score (NPS)</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              How likely are you to recommend this 5-Hour Field Program?
            </h3>
            <p className="text-xs text-gray-400">
              Standard 10-point NPS rating for coaching quality and on-field breakthroughs.
            </p>
          </div>

          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getNpsCategory(data.npsScore).color}`}>
            {getNpsCategory(data.npsScore).label}
          </span>
        </div>

        {/* 1 - 10 Score Selector */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setData({ ...data, npsScore: num })}
              className={`py-3 rounded-xl font-mono text-sm font-bold border transition-all ${
                data.npsScore === num
                  ? 'bg-amber-500 text-gray-950 border-amber-400 shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white hover:bg-gray-750'
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Testimonial & Breakthrough Fields */}
        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Client Testimonial &amp; Field Experience Reflection
            </label>
            <div className="relative">
              <Quote className="w-4 h-4 text-gray-600 absolute left-3 top-3" />
              <textarea
                rows={3}
                value={data.testimonial}
                onChange={(e) => setData({ ...data, testimonial: e.target.value })}
                placeholder="How did the real-world coaching shift your perspective on cold outreach in Chennai?"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-xs sm:text-sm text-gray-200 focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Biggest Realization / Breakthrough
              </label>
              <textarea
                rows={2}
                value={data.biggestBreakthrough}
                onChange={(e) => setData({ ...data, biggestBreakthrough: e.target.value })}
                placeholder="e.g. Realizing people don't bite; 3-second rule stopped my overthinking..."
                className="w-full p-2.5 rounded-xl bg-gray-800 border border-gray-700 text-xs text-gray-200 focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-indigo-300 mb-1.5">
                Coach Final Debrief &amp; Retention Plan
              </label>
              <textarea
                rows={2}
                value={data.coachNotes}
                onChange={(e) => setData({ ...data, coachNotes: e.target.value })}
                placeholder="Coach notes for client ongoing weekly maintenance drills..."
                className="w-full p-2.5 rounded-xl bg-gray-800 border border-indigo-500/40 text-xs text-gray-200 focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-800">
        <button
          onClick={handleSave}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold border border-gray-700"
        >
          Save Debrief Data
        </button>

        <button
          onClick={() => {
            handleSave();
            onViewSummary();
          }}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-950 font-bold text-xs shadow-lg shadow-amber-500/30 flex items-center justify-center space-x-2"
        >
          <span>Generate Full KPI Performance Report</span>
          <Award className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
