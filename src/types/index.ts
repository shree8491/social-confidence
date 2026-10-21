export type PersonaType = 'introvert' | 'career_professional' | 'socially_anxious';

export interface PersonaProfile {
  id: PersonaType;
  title: string;
  tagline: string;
  primaryNeeds: string;
  keyPainPoints: string;
  recommendedFocus: string;
}

export interface SelfAssessmentData {
  baselineAnxietyScore: number; // 1 - 10
  triggers: string[];
  comfortZoneNotes: string;
  sessionGoals: string;
  selectedLocation: string;
  completedAt?: string;
}

export type ChallengeLevel = 1 | 2 | 3;

export interface ChallengeItem {
  id: string;
  level: ChallengeLevel;
  title: string;
  subtitle: string;
  category: 'Direct Info' | 'Observational' | 'Pitching/Value';
  description: string;
  openerScript: string;
  proTip: string;
  fieldHotspotTip: string;
  targetCount: number;
}

export type InteractionOutcome =
  | 'sustained_conversation' // > 2 mins
  | 'contact_exchanged'       // phone / linkedin / socials
  | 'quick_helpful_answer'
  | 'polite_rebuff'
  | 'ignored_or_brush_off';

export interface ApproachLog {
  id: string;
  timestamp: string;
  level: ChallengeLevel;
  challengeTitle: string;
  locationHub: string;
  durationSeconds: number;
  outcome: InteractionOutcome;
  hesitatedMoreThan3Sec: boolean;
  bodyLanguageScore: number; // 1 - 5
  immediateNotes: string;
  coachFeedback: string;
}

export interface VoiceReflection {
  id: string;
  timestamp: string;
  durationFormatted: string;
  audioBlobUrl?: string;
  audioBase64?: string;
  title: string;
  reflectionType: 'Pre-Approach Hesitation' | 'Post-Win Debrief' | 'Rejection Processing' | 'Final Milestone';
  keyTakeaway: string;
}

export interface PostSessionDebriefData {
  postSessionAnxietyScore: number; // 1 - 10
  npsScore: number; // 1 - 10
  testimonial: string;
  biggestBreakthrough: string;
  coachNotes: string;
  completedAt?: string;
}

export interface SessionData {
  id: string;
  participantName: string;
  coachName: string;
  sessionDate: string;
  locationHub: string;
  targetApproachesCount: number;
  persona: PersonaType;
  selfAssessment: SelfAssessmentData;
  primingCompleted: boolean;
  approaches: ApproachLog[];
  voiceReflections: VoiceReflection[];
  postDebrief: PostSessionDebriefData;
}
