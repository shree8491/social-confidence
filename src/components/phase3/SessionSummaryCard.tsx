'use client';

import React from 'react';
import { Printer, Download, Check } from 'lucide-react';
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
    <div className="space-y-8 max-w-4xl mx-auto pb-20">
      {/* Action Bar (hidden in print) */}
      <div className="no-print flex items-center justify-between p-4 rounded-2xl bg-black border border-neutral-900">
        <div className="space-y-0.5">
          <h2 className="text-sm font-medium text-white">
            Performance Summary Report
          </h2>
          <p className="text-xs text-neutral-500 font-mono">
            PRD v1.1 Verification · Certified by Shree Sundar
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full border border-neutral-800 hover:border-neutral-700 text-xs text-neutral-300 font-medium transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>
          <button
            onClick={handleExport}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Main Printable Document Card */}
      <div className="card-print rounded-2xl bg-black border border-neutral-900 p-8 sm:p-10 space-y-8">
        {/* Document Header */}
        <div className="border-b border-neutral-900 pb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-neutral-500">
              PRD Specification Record · Q4 2026
            </span>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
              Real-World Social Confidence &amp; Cold Outreach
            </h1>
            <p className="text-xs text-neutral-400">
              Field Execution Assessment &amp; Transformation Record · Chennai Intensive
            </p>
          </div>

          <div className="text-right sm:border-l sm:border-neutral-900 sm:pl-6 space-y-0.5 font-mono">
            <span className="text-[10px] uppercase text-neutral-500 block">Commercial Spec</span>
            <div className="text-lg font-medium text-white">{PROGRAM_COMMERCIALS.sessionPrice}</div>
            <div className="text-[11px] text-neutral-500">5-Hour Module · Chennai Hubs</div>
          </div>
        </div>

        {/* Participant & Session Metadata */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-neutral-950 border border-neutral-900 text-xs font-mono">
          <div>
            <span className="text-neutral-500 uppercase text-[10px] block">Participant</span>
            <span className="text-white font-medium">{session.participantName}</span>
          </div>
          <div>
            <span className="text-neutral-500 uppercase text-[10px] block">Lead Coach</span>
            <span className="text-white font-medium">{session.coachName}</span>
          </div>
          <div>
            <span className="text-neutral-500 uppercase text-[10px] block">Location Hub</span>
            <span className="text-white font-medium">{session.locationHub.split(' (')[0]}</span>
          </div>
          <div>
            <span className="text-neutral-500 uppercase text-[10px] block">Persona Profile</span>
            <span className="text-white font-medium capitalize">{session.persona.replace('_', ' ')}</span>
          </div>
        </div>

        {/* Section 6: Key Performance Indicators (The 4 PRD KPIs) */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500">
            6. Key Performance Indicators (KPIs)
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-neutral-900 rounded-xl overflow-hidden border border-neutral-900">
            {/* KPI 1 */}
            <div className="bg-black p-4 space-y-1">
              <span className="text-[10px] uppercase font-mono text-neutral-500 block">
                Execution Rate
              </span>
              <div className="text-2xl font-light font-mono text-white">{executionRate}%</div>
              <p className="text-[11px] text-neutral-400 font-mono">
                {approaches.length}/{target} approaches ({executionRate >= 80 ? 'Target ≥80% Met' : 'In Progress'})
              </p>
            </div>

            {/* KPI 2 */}
            <div className="bg-black p-4 space-y-1">
              <span className="text-[10px] uppercase font-mono text-neutral-500 block">
                Anxiety Delta ($\Delta$)
              </span>
              <div className="text-2xl font-light font-mono text-white">
                {anxietyDelta >= 0 ? `-${anxietyDelta}` : `+${Math.abs(anxietyDelta)}`} Pts
              </div>
              <p className="text-[11px] text-neutral-400 font-mono">
                {baselineAnxiety}/10 to {postAnxiety}/10
              </p>
            </div>

            {/* KPI 3 */}
            <div className="bg-black p-4 space-y-1">
              <span className="text-[10px] uppercase font-mono text-neutral-500 block">
                Rapport Rate
              </span>
              <div className="text-2xl font-light font-mono text-white">{rapportRate}%</div>
              <p className="text-[11px] text-neutral-400 font-mono">
                {rapportApproaches.length} sustained (&gt;2m/contact)
              </p>
            </div>

            {/* KPI 4 */}
            <div className="bg-black p-4 space-y-1">
              <span className="text-[10px] uppercase font-mono text-neutral-500 block">
                Satisfaction (NPS)
              </span>
              <div className="text-2xl font-light font-mono text-white">{npsScore} / 10</div>
              <p className="text-[11px] text-neutral-400 font-mono">
                Promoter Rating
              </p>
            </div>
          </div>
        </div>

        {/* Qualitative Deliverables & Client Testimonial */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-900 space-y-2">
            <span className="text-[10px] font-mono uppercase text-neutral-500 block">
              Participant Testimonial
            </span>
            <p className="text-xs sm:text-sm text-neutral-300 italic leading-relaxed font-normal">
              &quot;{session.postDebrief.testimonial}&quot;
            </p>
            <div className="pt-2 text-[11px] text-neutral-500 font-mono border-t border-neutral-900">
              — {session.participantName}
            </div>
          </div>

          <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-900 space-y-2">
            <span className="text-[10px] font-mono uppercase text-neutral-500 block">
              Breakthrough &amp; Coach Debrief
            </span>
            <div className="text-xs text-neutral-300 space-y-1.5 font-normal">
              <p><strong className="text-white">Realization:</strong> {session.postDebrief.biggestBreakthrough}</p>
              <p><strong className="text-white">Coach Retention:</strong> {session.postDebrief.coachNotes}</p>
            </div>
          </div>
        </div>

        {/* Detailed Approaches Table */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase text-neutral-500 block">
            Interaction Ledger ({approaches.length} Logged)
          </span>

          <div className="border border-neutral-900 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-950 text-neutral-500 font-mono text-[10px] uppercase border-b border-neutral-900">
                <tr>
                  <th className="p-2.5">#</th>
                  <th className="p-2.5">Challenge</th>
                  <th className="p-2.5">Duration</th>
                  <th className="p-2.5">Hesitation</th>
                  <th className="p-2.5">Body Language</th>
                  <th className="p-2.5">Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 font-mono text-[11px]">
                {approaches.map((app, idx) => (
                  <tr key={app.id}>
                    <td className="p-2.5 text-neutral-600">#{idx + 1}</td>
                    <td className="p-2.5 font-sans font-medium text-neutral-200">
                      {app.challengeTitle}
                    </td>
                    <td className="p-2.5 text-neutral-400">{app.durationSeconds}s</td>
                    <td className="p-2.5 text-neutral-400">
                      {app.hesitatedMoreThan3Sec ? '⚠ >3s' : '✓ <3s'}
                    </td>
                    <td className="p-2.5 text-neutral-400">{app.bodyLanguageScore}/5</td>
                    <td className="p-2.5 font-sans capitalize text-neutral-300">
                      {app.outcome.replace(/_/g, ' ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Certification Footer */}
        <div className="pt-6 border-t border-neutral-900 flex items-center justify-between text-xs text-neutral-500 font-mono">
          <div>
            <div className="text-white font-sans font-medium">Shree Sundar</div>
            <div className="text-[11px]">Program Owner · Lead Coach, Chennai</div>
          </div>
          <div className="text-right">
            <div className="text-white flex items-center space-x-1 sm:justify-end">
              <Check className="w-3.5 h-3.5" />
              <span>Certified Field Engagement</span>
            </div>
            <div className="text-[11px] text-neutral-500">{session.sessionDate}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
