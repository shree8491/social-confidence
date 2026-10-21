import { ChallengeItem, PersonaProfile } from '@/types';

export const PROGRAM_COMMERCIALS = {
  title: 'Real-World Social Confidence & Cold Outreach',
  version: '1.1',
  owner: 'Shree Sundar',
  launchWindow: 'Q4 2026',
  sessionPrice: '₹6,999',
  sessionPriceRaw: 6999,
  durationHours: 5,
  durationText: '5 Hours Intensive (Priming, Field Execution, Live Debriefs)',
  primaryLocation: 'Chennai (Public High-Footfall Environments)',
  transitPolicy: 'Client-borne outside Chennai limits (Additional travel & transit expenses covered by client)',
  hotspots: [
    { name: 'Phoenix Marketcity (Velachery)', footfall: 'High', vibe: 'Retail, coffee shops, escalators' },
    { name: 'Express Avenue (Royapettah)', footfall: 'Very High', vibe: 'Food court, central atrium, bookstore' },
    { name: 'Besant Nagar Promenade (Elliot\'s Beach)', footfall: 'High', vibe: 'Casual walkers, cafes, evening buzz' },
    { name: 'Marina Beach Promenade', footfall: 'Intense', vibe: 'Vibrant, open ocean air, street stalls' },
    { name: 'Anna Nagar Tower Park', footfall: 'Moderate-High', vibe: 'Joggers, outdoor seating, approachable crowd' },
  ],
};

export const PERSONA_PROFILES: PersonaProfile[] = [
  {
    id: 'introvert',
    title: 'The Over-Thinking Introvert',
    tagline: 'Stuck in analysis paralysis when approaching strangers',
    primaryNeeds: 'Safe, guided environment to initiate conversations in public with an in-person wing coach.',
    keyPainPoints: 'Paralyzing fear of rejection, mental freezing, agonizing over "what if they think I\'m weird".',
    recommendedFocus: '3-Second Rule execution, breaking eye contact friction, observational openers.',
  },
  {
    id: 'career_professional',
    title: 'The Career Professional / Sales Aspirant',
    tagline: 'Needs spontaneous charisma for business networking & closing',
    primaryNeeds: 'Persuasive body language, rapid rapport-building, pitch delivery under high stimulation.',
    keyPainPoints: 'Struggling with spontaneous selling, hesitation when speaking to high-status individuals, stiff posture.',
    recommendedFocus: 'Level 3 pitching drills, assertive posture, conversational hook mastery.',
  },
  {
    id: 'socially_anxious',
    title: 'The Socially Anxious Individual',
    tagline: 'Experiencing acute physical anxiety symptoms around crowds',
    primaryNeeds: 'Step-by-step progressive exposure to public interactions with safety net feedback.',
    keyPainPoints: 'Elevated heart rate, hyper-awareness of public perception, reflexive avoidance behavior.',
    recommendedFocus: 'Physiological box breathing reset, micro-drills, functional direct inquiries.',
  },
];

export const CHALLENGE_ROADMAP: ChallengeItem[] = [
  // Level 1: Direct Info
  {
    id: 'lvl1-01',
    level: 1,
    category: 'Direct Info',
    title: 'Functional Hub Inquiry',
    subtitle: 'Low-threat question where anyone would gladly help',
    description: 'Ask a stranger in the mall or street for a functional piece of information.',
    openerScript: '"Excuse me! Do you know where the nearest escalator / specialty bookstore is in this wing?"',
    proTip: 'Keep walking or stand at a 45-degree angle. Don\'t trap them; let your posture signal zero threat.',
    fieldHotspotTip: 'Phoenix Marketcity ground atrium or Express Avenue central escalator.',
    targetCount: 4,
  },
  {
    id: 'lvl1-02',
    level: 1,
    category: 'Direct Info',
    title: 'Curated Recommendation Ask',
    subtitle: 'Inviting subjective taste without social pressure',
    description: 'Ask someone holding a beverage or food item what they think of it.',
    openerScript: '"Quick question — is that coffee from Starbucks or the local roastery around the corner? Is it worth the line?"',
    proTip: 'Look at what they\'re holding, ask with genuine curiosity, and say "Thanks, appreciate it!" with a warm smile.',
    fieldHotspotTip: 'Food court or cafe queue.',
    targetCount: 3,
  },

  // Level 2: Observational
  {
    id: 'lvl2-01',
    level: 2,
    category: 'Observational',
    title: 'Contextual Style Compliment',
    subtitle: 'Positive observational opener without hidden agenda',
    description: 'Notice something unique (shoes, jacket, watch, laptop sticker) and give an immediate genuine compliment.',
    openerScript: '"Hey, just wanted to say those sneakers are sharp — where did you find that colorway?"',
    proTip: 'Compliment something they chose (their style or choice), not innate biological traits. Move on without expecting anything in return.',
    fieldHotspotTip: 'Walking through retail wings or beachfront cafes.',
    targetCount: 3,
  },
  {
    id: 'lvl2-02',
    level: 2,
    category: 'Observational',
    title: 'Situational Real-Time Observation',
    subtitle: 'Bonding over a shared environmental anomaly',
    description: 'Comment on something happening right now in the environment.',
    openerScript: '"That line at the gelato stall looks like a sneaker drop! Have you tried it yet?"',
    proTip: 'Adopt an amused, relaxed tone. Speak loud enough to be heard over background ambient music.',
    fieldHotspotTip: 'Crowded pop-up kiosks or weekend weekend events.',
    targetCount: 3,
  },

  // Level 3: Pitching / Value
  {
    id: 'lvl3-01',
    level: 3,
    category: 'Pitching/Value',
    title: 'Extended Dialogue Sustainer (>2 mins)',
    subtitle: 'Transition from small talk to meaningful curiosity',
    description: 'Hook into their response with an open-ended "What brought you to Chennai / this event?" and sustain dialogue for 2+ minutes.',
    openerScript: '"I\'m actually working on a challenge to meet 5 new interesting people today in Chennai. What\'s the project or passion you\'re most focused on right now?"',
    proTip: 'Active listening: repeat the last 3 words as a question, use open hand gestures, and let pauses breathe.',
    fieldHotspotTip: 'Bookstore reading lounge, outdoor seating at Elliot\'s Beach.',
    targetCount: 2,
  },
  {
    id: 'lvl3-02',
    level: 3,
    category: 'Pitching/Value',
    title: 'Contact Exchange & Pitch Test',
    subtitle: 'Testing real-world conversion with zero awkwardness',
    description: 'Ask for a LinkedIn or Instagram handle, or pitch a 30-second idea or collaboration.',
    openerScript: '"You have great energy! Let\'s stay connected on LinkedIn / Instagram — let me scan your QR code before I run."',
    proTip: 'Have your QR code or handle ready instantly. Keep the tone completely detached from the outcome.',
    fieldHotspotTip: 'Coworking cafes or networking spaces.',
    targetCount: 2,
  },
];

export const PRIMING_DRILLS = [
  {
    id: 'drill-1',
    title: '4-4-4-4 Box Breathing Physiological Reset',
    durationSeconds: 120,
    instruction: 'Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold empty for 4 seconds. Lowers heart rate, clears cortisol, and relaxes facial muscles.',
  },
  {
    id: 'drill-2',
    title: 'The 3-Second Eye Contact & Micro-Smile Hold',
    durationSeconds: 90,
    instruction: 'Walk 50 meters. Make gentle eye contact with 3 passersby, offer a 10% warm micro-nod/smile, and don\'t look down first. Notice that nobody gets upset.',
  },
  {
    id: 'drill-3',
    title: 'Low-Stakes Vocal Resonance Warmup',
    durationSeconds: 90,
    instruction: 'Speak to a store clerk or security guard: "Good afternoon! How\'s your day going so far?" Notice your vocal tone resonate from your chest, not throat.',
  },
];
