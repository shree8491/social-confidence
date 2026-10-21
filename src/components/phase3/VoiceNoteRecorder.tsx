'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Mic, 
  Square, 
  Play, 
  Pause, 
  Trash2, 
  Volume2, 
  Sparkles, 
  Tag, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { VoiceReflection } from '@/types';

interface VoiceNoteRecorderProps {
  reflections: VoiceReflection[];
  onAddReflection: (reflection: VoiceReflection) => void;
  onDeleteReflection: (id: string) => void;
}

export const VoiceNoteRecorder: React.FC<VoiceNoteRecorderProps> = ({
  reflections,
  onAddReflection,
  onDeleteReflection,
}) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [reflectionType, setReflectionType] = useState<VoiceReflection['reflectionType']>('Post-Win Debrief');
  const [keyTakeaway, setKeyTakeaway] = useState<string>('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [micError, setMicError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startRecording = async () => {
    setMicError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);
          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);
        setRecordingSeconds(0);
        timerRef.current = setInterval(() => {
          setRecordingSeconds((prev) => prev + 1);
        }, 1000);
      } else {
        // Fallback simulation mode
        simulateRecording();
      }
    } catch (err: any) {
      console.warn('Microphone permission not granted or unavailable, using simulation mode:', err);
      setMicError('Microphone not detected or permission denied. Switched to voice note simulation mode.');
      simulateRecording();
    }
  };

  const simulateRecording = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    timerRef.current = setInterval(() => {
      setRecordingSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    } else {
      // Mock audio blob
      setAudioUrl('simulated-recording');
    }
  };

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedDuration = `${Math.floor(recordingSeconds / 60)
      .toString()
      .padStart(2, '0')}:${(recordingSeconds % 60).toString().padStart(2, '0')}`;

    const newReflection: VoiceReflection = {
      id: 'vr-' + Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      durationFormatted: formattedDuration === '00:00' ? '00:45' : formattedDuration,
      audioBlobUrl: audioUrl || undefined,
      title: title || `${reflectionType} reflection`,
      reflectionType,
      keyTakeaway: keyTakeaway || 'Felt genuine relief after verbalizing the interaction out loud.',
    };

    onAddReflection(newReflection);

    // Reset form
    setTitle('');
    setKeyTakeaway('');
    setAudioUrl(null);
    setRecordingSeconds(0);
  };

  const formatSecs = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-gray-900/80 border border-gray-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
              <Volume2 className="w-4 h-4" />
              <span>Structured Voice-Note Reflections</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Field Audio Reflection Logger
            </h3>
            <p className="text-xs text-gray-400">
              Record 30-90 second verbal debriefs between approaches to process emotional adrenaline and lock in learnings.
            </p>
          </div>

          <span className="text-xs font-mono font-bold text-gray-400 px-3 py-1 rounded-full bg-gray-800">
            {reflections.length} Audio Debriefs Logged
          </span>
        </div>

        {micError && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{micError}</span>
          </div>
        )}

        {/* Live Audio Recorder Unit */}
        <div className="p-5 rounded-2xl bg-gray-950/80 border border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-5">
          {/* Recorder Controls */}
          <div className="flex items-center space-x-4">
            {!isRecording ? (
              <button
                type="button"
                onClick={startRecording}
                className="w-14 h-14 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-600/30 transition-all hover:scale-105"
              >
                <Mic className="w-6 h-6" />
              </button>
            ) : (
              <button
                type="button"
                onClick={stopRecording}
                className="w-14 h-14 rounded-2xl bg-gray-800 border-2 border-rose-500 text-rose-400 flex items-center justify-center shadow-lg shadow-rose-500/20 animate-pulse"
              >
                <Square className="w-6 h-6 fill-current" />
              </button>
            )}

            <div>
              <div className="text-sm font-bold text-white">
                {isRecording ? 'Recording Voice Debrief...' : audioUrl ? 'Recording Ready to Save' : 'Tap Mic to Record'}
              </div>
              <div className="text-xs font-mono text-gray-400">
                {isRecording ? (
                  <span className="text-rose-400 font-bold flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block" />
                    <span>{formatSecs(recordingSeconds)}</span>
                  </span>
                ) : (
                  <span>Optimal: 30 - 60 seconds reflection</span>
                )}
              </div>
            </div>
          </div>

          {/* Animated Waveform Visualizer */}
          <div className="flex items-center space-x-1.5 h-10 px-4 py-2 rounded-xl bg-gray-900 border border-gray-800">
            <div className={`w-1 rounded-full bg-indigo-500 ${isRecording ? 'wave-bar-1' : 'h-2'}`} />
            <div className={`w-1 rounded-full bg-indigo-400 ${isRecording ? 'wave-bar-2' : 'h-4'}`} />
            <div className={`w-1 rounded-full bg-amber-400 ${isRecording ? 'wave-bar-3' : 'h-6'}`} />
            <div className={`w-1 rounded-full bg-indigo-400 ${isRecording ? 'wave-bar-4' : 'h-3'}`} />
            <div className={`w-1 rounded-full bg-indigo-500 ${isRecording ? 'wave-bar-5' : 'h-2'}`} />
            <div className={`w-1 rounded-full bg-sky-400 ${isRecording ? 'wave-bar-2' : 'h-5'}`} />
            <div className={`w-1 rounded-full bg-emerald-400 ${isRecording ? 'wave-bar-1' : 'h-2'}`} />
          </div>
        </div>

        {/* Audio Meta Form */}
        {(audioUrl || isRecording) && (
          <form onSubmit={handleSaveReflection} className="p-4 rounded-2xl bg-gray-900 border border-gray-800 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
                  Reflection Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Breakthrough at Express Avenue Atrium"
                  className="w-full px-3 py-2 rounded-xl bg-gray-800 border border-gray-700 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
                  Reflection Stage
                </label>
                <select
                  value={reflectionType}
                  onChange={(e) => setReflectionType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-800 border border-gray-700 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Pre-Approach Hesitation">Pre-Approach Hesitation</option>
                  <option value="Post-Win Debrief">Post-Win Debrief</option>
                  <option value="Rejection Processing">Rejection Processing</option>
                  <option value="Final Milestone">Final Milestone</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
                Key Breakthrough / Takeaway
              </label>
              <input
                type="text"
                value={keyTakeaway}
                onChange={(e) => setKeyTakeaway(e.target.value)}
                placeholder="What was the main cognitive realization?"
                className="w-full px-3 py-2 rounded-xl bg-gray-800 border border-gray-700 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setAudioUrl(null);
                  setIsRecording(false);
                }}
                className="px-3 py-1.5 rounded-lg text-xs text-gray-400 hover:text-white"
              >
                Discard
              </button>
              <button
                type="submit"
                disabled={isRecording}
                className="px-5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs transition-colors shadow-md shadow-indigo-600/20"
              >
                Save Voice Reflection
              </button>
            </div>
          </form>
        )}

        {/* Saved Audio Reflections List */}
        <div className="space-y-3 pt-2">
          {reflections.length === 0 ? (
            <div className="text-center py-6 text-xs text-gray-500 border border-dashed border-gray-800 rounded-2xl">
              No voice reflections logged yet. Record your thoughts immediately after an approach!
            </div>
          ) : (
            reflections.map((ref) => (
              <div
                key={ref.id}
                className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-gray-700 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-white">{ref.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 font-semibold border border-indigo-500/20">
                      {ref.reflectionType}
                    </span>
                    <span className="text-[11px] font-mono text-gray-500">
                      {ref.timestamp} ({ref.durationFormatted})
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    <strong className="text-gray-300">Takeaway:</strong> {ref.keyTakeaway}
                  </p>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  {ref.audioBlobUrl && ref.audioBlobUrl !== 'simulated-recording' ? (
                    <audio controls src={ref.audioBlobUrl} className="h-8 max-w-[200px]" />
                  ) : (
                    <div className="text-[11px] font-mono text-emerald-400 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Audio Logged</span>
                    </div>
                  )}

                  <button
                    onClick={() => onDeleteReflection(ref.id)}
                    title="Delete voice note"
                    className="p-1.5 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-gray-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
