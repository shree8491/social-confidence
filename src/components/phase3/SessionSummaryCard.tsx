'use client';

import React from 'react';
import { 
  Printer, 
  Download, 
  Share2, 
  CheckCircle2, 
  Award, 
  Target, 
  TrendingDown, 
  TrendingUp, 
  HeartHandshake, 
  Sparkles, 
  Calendar, 
  MapPin, 
  User, 
  IndianRupee, 
  Clock,
  ShieldCheck,
  Quote
} from 'lucide-react';
import { SessionData } from '@/types';
import { PROGRAM_COMMERCIALS } from '@/lib/constants';

interface SessionSummaryCardProps {
  session: SessionData;
}

export const SessionSummaryCard: React.FC<SessionSummaryCardProps> = ({ session }) => {
  const approaches = session.approaches;
  const target = session.targetApproachesCount || 10;
  const executionRate = Math.round((approaches.length / target) * 100);

  const baselineAnxiety = session.selfAssessment.baselineAnxietyScore || 8;
  const postAnxiety = session.postDebrief.postSessionAnxietyScore || 2;
  const anxietyDelta = baselineAnxiety - postAnxiety;

  const rapportApproaches = approaches.filter(
    (a) => a.outcome === 'sustained_conversation' || a.outcome === 'contact_exchanged' || a.durationSeconds >= 120
  );
  const rapportRate = approaches.length > 0 ? Math.round((rapportApproaches.length / approaches.length) * 100) : 0;

  const npsScore = session.postDebrief.npsScore || 10;

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(session, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `session-report-${session.participantName.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Action Bar (hidden in print) */}
      <div className="no-print flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gray-900 border border-gray-800">
        <div>
          <h2 className="text-lg font-bold text-white">
            Official Program Performance Report
          </h2>
          <p className="text-xs text-gray-400">
            PRD v1.1 Verification · Certified by Shree Sundar
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold border border-gray-700 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-indigo-400" />
            <span>Print / Save PDF</span>
          </button>
          <button
            onClick={handleExport}
            className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Main Printable Document Card */}
      <div className="card-print rounded-3xl bg-gray-900/90 border border-gray-800 p-6 sm:p-10 space-y-8 shadow-2xl">
        {/* Document Header */}
        <div className="border-b border-gray-800 pb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-2 text-xs font-mono">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold uppercase">
                PRD Milestone Report · Q4 2026
              </span>
              <span className="text-gray-400">Owner: {PROGRAM_COMMERCIALS.owner}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Real-World Social Confidence &amp; Cold Outreach
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Field Execution Assessment &amp; Transformation Record · Chennai Intensive
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-800/60 border border-gray-700/60 text-right space-y-1">
            <div className="text-[11px] font-mono uppercase text-gray-400">Commercial Spec</div>
            <div className="text-lg font-extrabold text-amber-400 font-mono">
              {PROGRAM_COMMERCIALS.sessionPrice}
            </div>
            <div className="text-[11px] text-gray-400">
              5-Hour Module · Chennai Hubs
            </div>
          </div>
        </div>

        {/* Participant & Session Metadata */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-gray-950/60 border border-gray-800/80 text-xs">
          <div>
            <span className="text-gray-500 block mb-0.5 uppercase font-semibold text-[10px]">Participant</span>
            <span className="text-white font-bold text-sm">{session.participantName}</span>
          </div>
          <div>
            <span className="text-gray-500 block mb-0.5 uppercase font-semibold text-[10px]">Head Coach</span>
            <span className="text-indigo-300 font-bold text-sm">{session.coachName}</span>
          </div>
          <div>
            <span className="text-gray-500 block mb-0.5 uppercase font-semibold text-[10px]">Location Hub</span>
            <span className="text-sky-300 font-bold text-sm">{session.locationHub}</span>
          </div>
          <div>
            <span className="text-gray-500 block mb-0.5 uppercase font-semibold text-[10px]">Target Persona</span>
            <span className="text-amber-300 font-bold text-sm capitalize">{session.persona.replace('_', ' ')}</span>
          </div>
        </div>

        {/* Section 6: Key Performance Indicators (The 4 PRD KPIs) */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg sm:text-xl font-bold text-white">
              6. Success Metrics &amp; Key Performance Indicators (KPIs)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* KPI 1: Field Execution Rate */}
            <div className="p-5 rounded-2xl bg-gray-900 border border-gray-800 hover:border-indigo-500/30 transition-colors">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-400 uppercase mb-2">
                <span>Field Execution Rate</span>
                <Target className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-3xl font-black text-white font-mono mb-1">
                {executionRate}%
              </div>
              <div className="text-xs text-emerald-400 font-semibold mb-2">
                {approaches.length} of {target} planned approaches
              </div>
              <p className="text-[11px] text-gray-400 leading-tight">
                Target: &ge; 80%. {executionRate >= 80 ? '✓ Goal Exceeded' : 'Approaches in progress'}
              </p>
            </div>

            {/* KPI 2: Anxiety Reduction Score */}
            <div className="p-5 rounded-2xl bg-gray-900 border border-gray-800 hover:border-emerald-500/30 transition-colors">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-400 uppercase mb-2">
                <span>Anxiety Reduction Score</span>
                <TrendingDown className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-black text-emerald-400 font-mono mb-1">
                -{anxietyDelta} Pts
              </div>
              <div className="text-xs text-gray-300 font-medium mb-2">
                From {baselineAnxiety}/10 down to {postAnxiety}/10
              </div>
              <p className="text-[11px] text-gray-400 leading-tight">
                Self-reported decrease in approach anxiety post-session on a 10-point scale.
              </p>
            </div>

            {/* KPI 3: Conversion / Rapport Rate */}
            <div className="p-5 rounded-2xl bg-gray-900 border border-gray-800 hover:border-sky-500/30 transition-colors">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-400 uppercase mb-2">
                <span>Conversion / Rapport Rate</span>
                <TrendingUp className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-3xl font-black text-sky-400 font-mono mb-1">
                {rapportRate}%
              </div>
              <div className="text-xs text-gray-300 font-medium mb-2">
                {rapportApproaches.length} sustained / contacts
              </div>
              <p className="text-[11px] text-gray-400 leading-tight">
                Approaches leading to sustained conversation (&gt;2 mins) or contact exchange.
              </p>
            </div>

            {/* KPI 4: Client Satisfaction (NPS) */}
            <div className="p-5 rounded-2xl bg-gray-900 border border-gray-800 hover:border-amber-500/30 transition-colors">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-400 uppercase mb-2">
                <span>Client Satisfaction (NPS)</span>
                <HeartHandshake className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-black text-amber-400 font-mono mb-1">
                {npsScore} / 10
              </div>
              <div className="text-xs text-amber-300 font-medium mb-2">
                Promoter Grade Rating
              </div>
              <p className="text-[11px] text-gray-400 leading-tight">
                Post-session testimonial, voice-note feedback, and Net Promoter Score.
              </p>
            </div>
          </div>
        </div>

        {/* Qualitative Deliverables & Client Testimonial */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Testimonial Box */}
          <div className="p-6 rounded-2xl bg-gray-950/80 border border-gray-800 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase">
              <Quote className="w-4 h-4" />
              <span>Participant Testimonial</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-200 italic leading-relaxed">
              &quot;{session.postDebrief.testimonial}&quot;
            </p>
            <div className="pt-2 text-xs text-gray-400 font-medium border-t border-gray-900">
              — {session.participantName}, Chennai Intensive Participant
            </div>
          </div>

          {/* Breakthrough & Coach Notes */}
          <div className="p-6 rounded-2xl bg-gray-950/80 border border-gray-800 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-indigo-400 uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Biggest Breakthrough &amp; Coach Debrief</span>
            </div>
            <div className="text-xs text-gray-300 space-y-2">
              <p>
                <strong className="text-white">Realization:</strong> {session.postDebrief.biggestBreakthrough}
              </p>
              <p>
                <strong className="text-indigo-300">Coach Sign-Off:</strong> {session.postDebrief.coachNotes}
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Approaches Table (Chronological Ledger) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-300 uppercase">
            <span>On-Field Interaction Ledger ({approaches.length} Logged)</span>
            <span>Chennai Field Environments</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-gray-800 rounded-xl overflow-hidden">
              <thead className="bg-gray-800/80 text-gray-400 uppercase font-mono text-[10px]">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Level / Title</th>
                  <th className="p-3">Duration</th>
                  <th className="p-3">Hesitation</th>
                  <th className="p-3">Body Language</th>
                  <th className="p-3">Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 bg-gray-950/50">
                {approaches.map((app, idx) => (
                  <tr key={app.id} className="hover:bg-gray-900/50 transition-colors">
                    <td className="p-3 font-mono text-gray-500">#{idx + 1}</td>
                    <td className="p-3">
                      <div className="font-bold text-white">{app.challengeTitle}</div>
                      <div className="text-[11px] text-gray-400">{app.locationHub}</div>
                    </td>
                    <td className="p-3 font-mono text-gray-300">{app.durationSeconds}s</td>
                    <td className="p-3">
                      {app.hesitatedMoreThan3Sec ? (
                        <span className="text-rose-400">⚠ &gt;3s</span>
                      ) : (
                        <span className="text-emerald-400">✓ &lt;3s</span>
                      )}
                    </td>
                    <td className="p-3 text-amber-400 font-bold">{app.bodyLanguageScore}/5 ★</td>
                    <td className="p-3 text-gray-300 capitalize">{app.outcome.replace(/_/g, ' ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Signatures & Certification */}
        <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-gray-400">
          <div>
            <div className="text-white font-bold">Shree Sundar</div>
            <div className="text-[11px]">Program Owner &amp; Lead Social Dynamics Coach</div>
            <div className="text-[10px] text-gray-500 font-mono mt-0.5">Chennai, Tamil Nadu, India</div>
          </div>
          <div className="text-right">
            <div className="text-emerald-400 font-bold flex items-center space-x-1 sm:justify-end">
              <CheckCircle2 className="w-4 h-4" />
              <span>Certified Field Engagement</span>
            </div>
            <div className="text-[11px] text-gray-500 font-mono mt-0.5">
              Verified on {session.sessionDate}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
