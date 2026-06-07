export interface Option {
  id: string;
  label: string;
  scores: Record<string, number>;
}

export interface Question {
  id: string;
  text: string;
  emoji: string;
  options: Option[];
}

export interface PigeonResult {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  vector: number[]
  traits: string[]
  image?: string
  color: string;
}

export const questions: Question[] = [
  {
    id: "q1",
    text: "It's a sunny morning in the city. Where do you head first?",
    emoji: "🌤️",
    options: [
      { id: "a", label: "Straight to the best bread crumb spot I know", scores: { foodie: 3, explorer: 1 } },
      { id: "b", label: "Scouting a new rooftop with a great view", scores: { explorer: 3, philosopher: 1 } },
      { id: "c", label: "Staying on my favourite ledge — why change a good thing?", scores: { homebody: 3, philosopher: 1 } },
      { id: "d", label: "Following the crowd, something interesting is always happening", scores: { socialite: 3, foodie: 1 } },
    ],
  },
  // {
  //   id: "q2",
  //   text: "Someone drops a whole sandwich near you. What do you do?",
  //   emoji: "🥪",
  //   options: [
  //     { id: "a", label: "Call my friends over immediately — sharing is caring", scores: { socialite: 3, homebody: 1 } },
  //     { id: "b", label: "Guard it fiercely. This is MY sandwich now.", scores: { foodie: 3, philosopher: 1 } },
  //     { id: "c", label: "Inspect it carefully before committing", scores: { philosopher: 3, explorer: 1 } },
  //     { id: "d", label: "Take a quick bite and move on — I'm not attached to things", scores: { explorer: 3, socialite: 1 } },
  //   ],
  // },
  // {
  //   id: "q3",
  //   text: "A tourist points a camera at you. Your reaction?",
  //   emoji: "📸",
  //   options: [
  //     { id: "a", label: "Pose confidently — I was born for this", scores: { socialite: 3, foodie: 1 } },
  //     { id: "b", label: "Stare deeply into the lens. Let them wonder.", scores: { philosopher: 3, homebody: 1 } },
  //     { id: "c", label: "Fly away immediately — I value my privacy", scores: { homebody: 3, explorer: 1 } },
  //     { id: "d", label: "Walk closer to investigate the strange device", scores: { explorer: 3, philosopher: 1 } },
  //   ],
  // },
  // {
  //   id: "q4",
  //   text: "What's your ideal perch for the afternoon?",
  //   emoji: "🏙️",
  //   options: [
  //     { id: "a", label: "A busy market — so much to see and smell", scores: { foodie: 3, socialite: 1 } },
  //     { id: "b", label: "The top of a clock tower, surveying everything", scores: { philosopher: 3, explorer: 1 } },
  //     { id: "c", label: "The same windowsill I've used for three years", scores: { homebody: 3, foodie: 1 } },
  //     { id: "d", label: "Wherever my flock decides — I go with the flow", scores: { socialite: 3, homebody: 1 } },
  //   ],
  // },
  // {
  //   id: "q5",
  //   text: "How do you handle a rival pigeon invading your territory?",
  //   emoji: "😤",
  //   options: [
  //     { id: "a", label: "Puff up and do my most impressive strut", scores: { socialite: 3, philosopher: 1 } },
  //     { id: "b", label: "Coo aggressively until they get the message", scores: { homebody: 3, foodie: 1 } },
  //     { id: "c", label: "Befriend them — more pigeons, more fun", scores: { socialite: 2, explorer: 2 } },
  //     { id: "d", label: "Fly off and find somewhere better anyway", scores: { explorer: 3, philosopher: 1 } },
  //   ],
  // },
  // {
  //   id: "q6",
  //   text: "What's the first thing you do when it starts raining?",
  //   emoji: "🌧️",
  //   options: [
  //     { id: "a", label: "Find the nearest overhang — I have a routine", scores: { homebody: 3, philosopher: 1 } },
  //     { id: "b", label: "Keep going, a little rain never stopped me", scores: { explorer: 3, socialite: 1 } },
  //     { id: "c", label: "Gather with my flock under the bridge", scores: { socialite: 3, homebody: 1 } },
  //     { id: "d", label: "Stand in it and contemplate the nature of wetness", scores: { philosopher: 3, foodie: 1 } },
  //   ],
  // },
  // {
  //   id: "q7",
  //   text: "If you could deliver a message to anyone, who would it be?",
  //   emoji: "💌",
  //   options: [
  //     { id: "a", label: "The bakery that throws out bread every Friday", scores: { foodie: 3, homebody: 1 } },
  //     { id: "b", label: "A distant flock — let's see what's out there", scores: { explorer: 3, socialite: 1 } },
  //     { id: "c", label: "The pigeon who understood me best", scores: { philosopher: 3, homebody: 1 } },
  //     { id: "d", label: "Whoever needs it most — I'm here for the community", scores: { socialite: 3, philosopher: 1 } },
  //   ],
  // },
];

export const pigeonResults: Record<string, PigeonResult> = {
  foodie: {
    id: "foodie",
    name: "The Gourmet Scavenger",
    emoji: "🍕",
    tagline: "You live to eat. And eat. And eat some more.",
    description:
      "You are a pigeon of refined taste (by pigeon standards). You know every pizza crust, every dropped pretzel, and every bakery back door in a 5km radius. Food is your love language, your passion, and your primary motivation. You have a mental map of every crumb opportunity in the city.",
    traits: ["aggression","social","greed","urban","mysticism"],
    color: "#F6AD55",
    vector: [4, 1, 5, 5, 0],
    image: "image.png"
  },
  explorer: {
    id: "explorer",
    name: "The Urban Adventurer",
    emoji: "🗺️",
    tagline: "New rooftop? New district? Count you in.",
    description:
      "You're never on the same ledge twice. While others cling to their familiar perches, you're already three neighbourhoods away investigating something interesting. You were probably the first pigeon to land on that new skyscraper. You carry the spirit of a thousand generations of carrier pigeons — restless, curious, and always moving.",
    traits: ["aggression","social","greed","urban","mysticism"],
    color: "#68D391",
    vector: [4, 1, 5, 5, 0],
    image: "image.png"
  },
  homebody: {
    id: "homebody",
    name: "The Ledge Loyalist",
    emoji: "🏠",
    tagline: "Home is where the ledge is.",
    description:
      "You found your spot — and you've claimed it forever. Your ledge has the perfect sun angle, the ideal wind break, and years of sentimental value. Change is overrated. Routine is comfort. You are the steadfast, dependable pigeon who has been on the same windowsill since 2019. The residents inside consider you practically family.",
    traits: ["aggression","social","greed","urban","mysticism"],
    color: "#76E4F7",
    vector: [4, 1, 5, 5, 0],
    image: "image.png"
  },
  socialite: {
    id: "socialite",
    name: "The Flock Star",
    emoji: "✨",
    tagline: "Why fly alone when you can fly in formation?",
    description:
      "You are the social glue of every pigeon gang in the park. You know everyone, you remember everyone's favourite crumbs, and you somehow always know where the crowd is heading next. When you coo, heads turn. You are equally comfortable with pigeons, sparrows, and that one brave squirrel who keeps hanging around.",
    traits: ["aggression","social","greed","urban","mysticism"],
    color: "#B794F4",
    vector: [4, 1, 5, 5, 0],
    image: "image.png"
  },
  philosopher: {
    id: "philosopher",
    name: "The Deep Brooder",
    emoji: "🧠",
    tagline: "You stare into the void. The void stares back. You coo softly.",
    description:
      "You sit on your perch and watch the city move below you with an unsettling level of wisdom in your tiny eyes. People often feel judged by you, and perhaps they should. You are a pigeon of few coos but deep thoughts. Scientists would probably want to study you. You'd probably cooperate, then stare at them too long.",
    traits: ["aggression","social","greed","urban","mysticism"],
    color: "#FC8181",
    vector: [4, 1, 5, 5, 0],
    image: "image.png"
  },
};