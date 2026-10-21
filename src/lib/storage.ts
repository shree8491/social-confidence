import { SessionData } from '@/types';

const STORAGE_KEY = 'social_confidence_session_v1';

export const INITIAL_SESSION: SessionData = {
  id: 'session-' + Date.now(),
  participantName: 'Arun Kumar',
  coachName: 'Shree Sundar',
  sessionDate: new Date().toISOString().split('T')[0],
  locationHub: 'Phoenix Marketcity (Velachery)',
  targetApproachesCount: 10,
  persona: 'introvert',
  selfAssessment: {
    baselineAnxietyScore: 8,
    triggers: [
      'Fear of being perceived as weird or intrusive',
      'Awkward silence after saying hello',
      'Making direct eye contact with strangers',
    ],
    comfortZoneNotes: 'Usually sits in corners with headphones on; avoids initiating casual small talk.',
    sessionGoals: 'Execute 10 real approaches without hesitating >3 seconds, talk to 2 people for >2 mins.',
    selectedLocation: 'Phoenix Marketcity (Velachery)',
  },
  primingCompleted: false,
  approaches: [],
  voiceReflections: [],
  postDebrief: {
    postSessionAnxietyScore: 3,
    npsScore: 10,
    testimonial: 'Transformational 5 hours! Having live coaching on the spot completely rewired my approach anxiety.',
    biggestBreakthrough: 'Realizing that 95% of people in Chennai are surprisingly friendly if your energy is open.',
    coachNotes: 'Tremendous breakthrough from approach #4 onwards. Posture straightened visibly.',
  },
};

export const MOCK_COMPLETED_SESSION: SessionData = {
  id: 'session-demo-complete',
  participantName: 'Karthik Raja',
  coachName: 'Shree Sundar',
  sessionDate: new Date().toISOString().split('T')[0],
  locationHub: 'Express Avenue (Royapettah)',
  targetApproachesCount: 10,
  persona: 'introvert',
  selfAssessment: {
    baselineAnxietyScore: 8,
    triggers: [
      'Heart racing when walking towards someone',
      'Mental freeze on second sentence',
      'Eye contact avoidance',
    ],
    comfortZoneNotes: 'Only speaks when spoken to at work; freezes at social mixers.',
    sessionGoals: 'Complete 8+ approaches and exchange 1 contact.',
    selectedLocation: 'Express Avenue (Royapettah)',
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  primingCompleted: true,
  approaches: [
    {
      id: 'app-1',
      timestamp: '14:15',
      level: 1,
      challengeTitle: 'Functional Hub Inquiry',
      locationHub: 'Express Avenue (Ground Floor)',
      durationSeconds: 35,
      outcome: 'quick_helpful_answer',
      hesitatedMoreThan3Sec: true,
      bodyLanguageScore: 3,
      immediateNotes: 'Felt pulse in ears, but person gave directions very kindly.',
      coachFeedback: 'Great initiation! Next time, drop your shoulders and don\'t lean backwards.',
    },
    {
      id: 'app-2',
      timestamp: '14:35',
      level: 1,
      challengeTitle: 'Curated Recommendation Ask',
      locationHub: 'Food Court Line',
      durationSeconds: 70,
      outcome: 'quick_helpful_answer',
      hesitatedMoreThan3Sec: false,
      bodyLanguageScore: 4,
      immediateNotes: 'Moved within 2 seconds. The guy recommended the mango smoothie.',
      coachFeedback: 'Huge improvement on hesitation! Voice was loud and clear.',
    },
    {
      id: 'app-3',
      timestamp: '15:10',
      level: 2,
      challengeTitle: 'Contextual Style Compliment',
      locationHub: 'Central Atrium',
      durationSeconds: 45,
      outcome: 'polite_rebuff',
      hesitatedMoreThan3Sec: false,
      bodyLanguageScore: 4,
      immediateNotes: 'Complimented a leather messenger bag. Person said thanks and walked on.',
      coachFeedback: 'Zero damage from a neutral response! You stayed grounded.',
    },
    {
      id: 'app-4',
      timestamp: '15:40',
      level: 2,
      challengeTitle: 'Situational Real-Time Observation',
      locationHub: 'Bookstore Entrance',
      durationSeconds: 150,
      outcome: 'sustained_conversation',
      hesitatedMoreThan3Sec: false,
      bodyLanguageScore: 5,
      immediateNotes: 'Commented on the sci-fi book display. Spoke for 2.5 minutes about classic sci-fi!',
      coachFeedback: 'Masterclass in active listening. Warm open palm gestures.',
    },
    {
      id: 'app-5',
      timestamp: '16:15',
      level: 2,
      challengeTitle: 'Contextual Style Compliment',
      locationHub: 'Coffee Shop Terrace',
      durationSeconds: 65,
      outcome: 'quick_helpful_answer',
      hesitatedMoreThan3Sec: false,
      bodyLanguageScore: 4,
      immediateNotes: 'Noticed artist sketchpad. Had a fun 1-minute exchange.',
      coachFeedback: 'Curiosity was authentic. Pacing was very calm.',
    },
    {
      id: 'app-6',
      timestamp: '16:45',
      level: 3,
      challengeTitle: 'Extended Dialogue Sustainer (>2 mins)',
      locationHub: 'Main Galleria',
      durationSeconds: 195,
      outcome: 'sustained_conversation',
      hesitatedMoreThan3Sec: false,
      bodyLanguageScore: 5,
      immediateNotes: 'Asked about their weekend film project. Deep conversation for over 3 minutes!',
      coachFeedback: 'Phenomenal flow. Handled eye contact hold effortlessly.',
    },
    {
      id: 'app-7',
      timestamp: '17:20',
      level: 3,
      challengeTitle: 'Contact Exchange & Pitch Test',
      locationHub: 'Atrium Seating',
      durationSeconds: 240,
      outcome: 'contact_exchanged',
      hesitatedMoreThan3Sec: false,
      bodyLanguageScore: 5,
      immediateNotes: 'Discussed design freelancing and connected on LinkedIn on the spot!',
      coachFeedback: 'Zero friction contact exchange. Professional and magnetic.',
    },
    {
      id: 'app-8',
      timestamp: '17:50',
      level: 3,
      challengeTitle: 'Extended Dialogue Sustainer (>2 mins)',
      locationHub: 'Bookstore Cafe',
      durationSeconds: 160,
      outcome: 'sustained_conversation',
      hesitatedMoreThan3Sec: false,
      bodyLanguageScore: 5,
      immediateNotes: 'Met a fellow Chennai techie visiting from Bangalore. Great banter.',
      coachFeedback: 'Full ownership of public presence. Target execution goal achieved!',
    },
  ],
  voiceReflections: [
    {
      id: 'vr-1',
      timestamp: '14:20',
      durationFormatted: '00:42',
      title: 'First Approach Heart Rate Check',
      reflectionType: 'Pre-Approach Hesitation',
      keyTakeaway: 'The physical anticipation was 10x worse than the actual reality. Nobody attacked me.',
    },
    {
      id: 'vr-2',
      timestamp: '15:45',
      durationFormatted: '01:15',
      title: 'Bookstore 2.5-Minute Breakthrough',
      reflectionType: 'Post-Win Debrief',
      keyTakeaway: 'When you genuinely listen to people without trying to perform, conversations just happen naturally.',
    },
    {
      id: 'vr-3',
      timestamp: '17:30',
      durationFormatted: '00:58',
      title: 'LinkedIn Contact Exchange Feeling',
      reflectionType: 'Final Milestone',
      keyTakeaway: 'I can actually talk to high-value strangers anytime I want. The fear was an illusion.',
    },
  ],
  postDebrief: {
    postSessionAnxietyScore: 2,
    npsScore: 10,
    testimonial: 'Before this 5-hour session, I would avoid eye contact with everyone at Express Avenue. Today I initiated 8 conversations and made a genuine professional connection. Shree\'s real-time field debriefs made all the difference.',
    biggestBreakthrough: 'The 3-second rule cures overthinking. Just move before the brain starts making up excuses.',
    coachNotes: 'Exceptional discipline. Execution rate 80% (8 completed approaches), 3 sustained conversations, 1 contact exchanged. Anxiety reduced from 8/10 to 2/10.',
    completedAt: new Date().toISOString(),
  },
};

export function loadStoredSession(): SessionData {
  if (typeof window === 'undefined') return INITIAL_SESSION;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_SESSION;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse stored session:', e);
    return INITIAL_SESSION;
  }
}

export function saveStoredSession(session: SessionData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch (e) {
    console.error('Failed to save session to localStorage:', e);
  }
}
