'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
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
  const anxietyDelta = baselineAnxiety - postAnxiety;

  const handleSave = () => {
    const updated = {
      ...data,
      completedAt: new Date().toISOString(),
    };
    setData(updated);
    onUpdateDebrief(updated);
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="space-y-1 border-b border-neutral-900 pb-5">
        <span className="text-xs font-mono uppercase text-neutral-500">
          Phase 3 · Audit
        </span>
        <h2 className="text-2xl font-medium tracking-tight text-white">
          Post-Session Debrief &amp; Client Satisfaction
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400">
          Quantify the anxiety reduction delta score and capture participant Net Promoter feedback.
        </p>
      </div>

      {/* Anxiety Reduction Delta Card */}
      <div className="p-6 rounded-2xl bg-black border border-neutral-900 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase text-neutral-500 block">
              PRD Primary Metric
            </span>
            <h3 className="text-sm font-medium text-white">
              Anxiety Reduction Score ($\Delta$)
            </h3>
            <p className="text-xs text-neutral-500">
              Pre-session baseline vs. post-session anxiety score
            </p>
          </div>

          <div className="flex items-center space-x-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-900 text-center">
              <span className="text-[10px] text-neutral-500 block">Pre</span>
              <span className="text-base font-medium text-neutral-300">{baselineAnxiety}/10</span>
            </div>
            <span className="text-neutral-600">→</span>
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-900 text-center">
              <span className="text-[10px] text-neutral-500 block">Post</span>
              <span className="text-base font-medium text-neutral-300">{postAnxiety}/10</span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-400 block font-semibold">Delta</span>
              <span className="text-base font-medium text-white font-mono">
                {anxietyDelta >= 0 ? `-${anxietyDelta}` : `+${Math.abs(anxietyDelta)}`} Pts
              </span>
            </div>
          </div>
        </div>

        {/* Post-Session Anxiety Slider */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-neutral-400">Post-Session Comfort Rating</span>
            <span className="font-mono text-white">{postAnxiety} / 10</span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            value={postAnxiety}
            onChange={(e) =>
              setData({ ...data, postSessionAnxietyScore: Number(e.target.value) })
            }
            className="w-full accent-white cursor-pointer h-1 bg-neutral-800 rounded-lg appearance-none"
          />
        </div>
      </div>

      {/* NPS Scale */}
      <div className="p-6 rounded-2xl bg-black border border-neutral-900 space-y-4">
        <div>
          <span className="text-[10px] font-mono uppercase text-neutral-500 block">
            Net Promoter Score (NPS)
          </span>
          <h3 className="text-sm font-medium text-white">
            How likely are you to recommend this 5-Hour Field Program?
          </h3>
          <p className="text-xs text-neutral-500">
            1 = Not likely, 10 = Extremely likely
          </p>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setData({ ...data, npsScore: num })}
              className={`py-2 rounded-lg font-mono text-xs transition-colors border ${
                data.npsScore === num
                  ? 'bg-white text-black font-semibold border-white'
                  : 'bg-neutral-950 border-neutral-850 text-neutral-400 hover:text-white'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Testimonial & Breakthrough Notes */}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-mono uppercase text-neutral-500 block">
            Client Testimonial &amp; Field Reflection
          </label>
          <textarea
            rows={3}
            value={data.testimonial}
            onChange={(e) => setData({ ...data, testimonial: e.target.value })}
            placeholder="How did live in-person field coaching shift your perspective on cold outreach?"
            className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-850 text-xs text-neutral-200 focus:outline-none focus:border-neutral-500 resize-none font-normal"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase text-neutral-500 block">
              Biggest Breakthrough
            </label>
            <textarea
              rows={2}
              value={data.biggestBreakthrough}
              onChange={(e) => setData({ ...data, biggestBreakthrough: e.target.value })}
              placeholder="e.g. 3-second rule eliminated overthinking..."
              className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-850 text-xs text-neutral-200 focus:outline-none focus:border-neutral-500 resize-none font-normal"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase text-neutral-500 block">
              Coach Final Sign-Off &amp; Retention Plan
            </label>
            <textarea
              rows={2}
              value={data.coachNotes}
              onChange={(e) => setData({ ...data, coachNotes: e.target.value })}
              placeholder="Post-session maintenance drills..."
              className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-850 text-xs text-neutral-200 focus:outline-none focus:border-neutral-500 resize-none font-normal"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-900">
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-full border border-neutral-800 text-xs text-neutral-300 hover:border-neutral-600 transition-colors"
        >
          Save Debrief
        </button>

        <button
          onClick={() => {
            handleSave();
            onViewSummary();
          }}
          className="px-5 py-2 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-medium transition-colors inline-flex items-center space-x-1.5"
        >
          <span>Generate Official KPI Report</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
