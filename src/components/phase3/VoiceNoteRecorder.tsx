'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Trash2 } from 'lucide-react';
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

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startRecording = async () => {
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
        simulateRecording();
      }
    } catch {
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
      keyTakeaway: keyTakeaway || 'Action desensitizes anticipation anxiety.',
    };

    onAddReflection(newReflection);
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
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="space-y-1 border-b border-neutral-900 pb-5">
        <span className="text-xs font-mono uppercase text-neutral-500">
          Phase 3 · Audio Reflections
        </span>
        <h2 className="text-2xl font-medium tracking-tight text-white">
          Voice-Note Reflections
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400">
          Record 30-90 second verbal debriefs between approaches to process emotional adrenaline.
        </p>
      </div>

      {/* Minimalist Recorder Unit */}
      <div className="p-6 rounded-2xl bg-black border border-neutral-900 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {!isRecording ? (
              <button
                type="button"
                onClick={startRecording}
                className="w-10 h-10 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors flex items-center justify-center"
                title="Start recording"
              >
                <Mic className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={stopRecording}
                className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center animate-pulse"
                title="Stop recording"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
              </button>
            )}

            <div>
              <div className="text-xs font-medium text-white">
                {isRecording ? 'Recording Debrief' : audioUrl ? 'Recording Ready' : 'Tap to Record'}
              </div>
              <div className="text-[11px] font-mono text-neutral-500">
                {isRecording ? formatSecs(recordingSeconds) : '30-60s recommended'}
              </div>
            </div>
          </div>

          {/* Minimalist waveform indicator */}
          <div className="flex items-center space-x-1 h-6 px-3 rounded-full bg-neutral-950 border border-neutral-900">
            <div className={`w-0.5 rounded-full bg-neutral-400 ${isRecording ? 'wave-min-1' : 'h-1'}`} />
            <div className={`w-0.5 rounded-full bg-neutral-400 ${isRecording ? 'wave-min-2' : 'h-2'}`} />
            <div className={`w-0.5 rounded-full bg-white ${isRecording ? 'wave-min-3' : 'h-3'}`} />
            <div className={`w-0.5 rounded-full bg-neutral-400 ${isRecording ? 'wave-min-4' : 'h-2'}`} />
            <div className={`w-0.5 rounded-full bg-neutral-400 ${isRecording ? 'wave-min-5' : 'h-1'}`} />
          </div>
        </div>

        {/* Save Form */}
        {(audioUrl || isRecording) && (
          <form onSubmit={handleSaveReflection} className="p-4 rounded-xl bg-neutral-950 border border-neutral-900 space-y-3 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-neutral-500 block">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Approach #3 Breakthrough"
                  className="w-full px-3 py-2 rounded-lg bg-black border border-neutral-850 text-xs text-white focus:outline-none focus:border-neutral-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-neutral-500 block">
                  Stage
                </label>
                <select
                  value={reflectionType}
                  onChange={(e) => setReflectionType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg bg-black border border-neutral-850 text-xs text-white focus:outline-none focus:border-neutral-500"
                >
                  <option value="Pre-Approach Hesitation">Pre-Approach Hesitation</option>
                  <option value="Post-Win Debrief">Post-Win Debrief</option>
                  <option value="Rejection Processing">Rejection Processing</option>
                  <option value="Final Milestone">Final Milestone</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-neutral-500 block">
                Key Realization
              </label>
              <input
                type="text"
                value={keyTakeaway}
                onChange={(e) => setKeyTakeaway(e.target.value)}
                placeholder="What did you learn from this interaction?"
                className="w-full px-3 py-2 rounded-lg bg-black border border-neutral-850 text-xs text-white focus:outline-none focus:border-neutral-500"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setAudioUrl(null);
                  setIsRecording(false);
                }}
                className="px-3 py-1.5 text-xs text-neutral-500 hover:text-white"
              >
                Discard
              </button>
              <button
                type="submit"
                disabled={isRecording}
                className="px-4 py-1.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-medium disabled:opacity-50"
              >
                Save Note
              </button>
            </div>
          </form>
        )}

        {/* Logged Reflections */}
        <div className="space-y-2 pt-2">
          {reflections.length === 0 ? (
            <div className="text-center py-8 text-xs font-mono text-neutral-600 border border-dashed border-neutral-900 rounded-xl">
              No audio reflections recorded yet
            </div>
          ) : (
            reflections.map((ref) => (
              <div
                key={ref.id}
                className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-900 flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-white">{ref.title}</span>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase">
                      {ref.reflectionType}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-600">
                      ({ref.durationFormatted})
                    </span>
                  </div>
                  <p className="text-neutral-400 font-normal text-[11px]">{ref.keyTakeaway}</p>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  {ref.audioBlobUrl && ref.audioBlobUrl !== 'simulated-recording' ? (
                    <audio controls src={ref.audioBlobUrl} className="h-7 max-w-[160px]" />
                  ) : (
                    <span className="text-[10px] font-mono text-neutral-500">Audio Logged</span>
                  )}
                  <button
                    onClick={() => onDeleteReflection(ref.id)}
                    className="p-1 text-neutral-600 hover:text-white transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
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
