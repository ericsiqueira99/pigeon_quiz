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
  traits: Record<string,number>;
  image?: string
  color: string;
}

export const traitOrder = [
  "aggressive",   // top
 "adaptability",        // top-right
  "greed",        // right
  "urbanism",     // bottom-right
  "mysticism",    // bottom
   "social",// bottom-left
  "romanticism",  // left  ← shortest of the awkward ones
];


export const questions: Question[] = [
  {
    id: "q1",
    text: "A storm is about to hit the town, your pack mates are nervous and the mood is tense, feathers rustling, branches shaking. They turn towards you, seeking guidance. What do you do?",
    emoji: "🌩️",
    options: [
      { id: "a", label: "\"Fear not, my comrades, for the wind is weak compared to our strength together!\"", scores: { social: 3, aggressive: 1, mysticism: -1 } },
      { id: "b", label: "Fly to a more protected area, leaving your pack behind", scores: { social: -2, adaptability: 2 } },
      { id: "c", label: "Join wings and start a prayer circle, for the gods above shall protect the chosen ones", scores: { mysticism: 4, aggressive: -1 } },
      { id: "d", label: "Fly towards the ground, in hopes the wind will make seeds fall down and surround you with food", scores: { adaptability: 3, greed: 4, social: -1 } },
    ],
  },
  {
    id: "q2",
    text: "Do you believe penguins should be considered birds, despite the fact they are unable to fly?",
    emoji: "🐧",
    options: [
      { id: "a", label: "Yes. Flying is but a small detail in a bird's life. Besides, they look really fancy wearing a tuxedo.", scores: { romanticism: 3, social: 1 } },
      { id: "b", label: "Absolutely not! There is a reason they were banished into that ice cold prison. Whatever they are, I'm glad they are far away.", scores: { social: -2, mysticism: 3, urbanism:1 } },
      { id: "c", label: "That's such a stupid question. What about chickens? Or Kiwis? Are they not birds either?", scores: { social: 3, aggressive: 1, mysticism: -1} },
      { id: "d", label: "Anything with two legs and the skill to walk woobly in a straight line is a bird. This includes toddlers, characters from Lego movie, and stilt walkers.", scores: { adaptability: 1, social: 3, greed: 3} },
    ],
  },
   {
    id: "q3",
    text: "A nice 89 year-old grandma, who is blind in one eye, loves to leave her old hardened bread for you and your friends to eat. One day, in the midst of her dementia, she mixed up the bags, and leaves a brand new, whole grain, premium wheat, soft and warm bread for you. What do you do?",
    emoji: "👵",
    options: [
      { id: "a", label: "Her kindness will not go unoticed, I will coo until she notices her mistake.", scores: { greed: -1, social: 1, mysticism: 2 } },
      { id: "b", label: "I will protect this bread as if my life depends on it, I'll crush any bird, insect or squirrel that tries to take this poor lady's meal.", scores: { aggressive: 3, social: 1, greed:-1 } },
      { id: "c", label: "Her denture is strong, she will manage.", scores: { greed: 2, adaptability: 1 } },
      { id: "d", label: "A soft bread is easier to carry away. May god bless this feat I'm about to have.", scores: { mysticism: 1, greed: 3, social: -1 } },
    ],
  },
  {
    id: "q4",
    text: "The sun is setting in a spectacular fashion today. The breeze is warm and nice, the clouds like a canvas painted in a miriad of impossible colors. Truly an event to be witnessed. How will you enjoy this?",
    emoji: "🌅",
    options: [
      { id: "a", label: "I will fly to the top of the highest building by myself, and observe the city light start to glimmer.", scores: { urbanism: 3, social: -1 } },
      { id: "b", label: "Look for a nearby lake, so I can see the beauty in the sky and in the reflection of the waves.", scores: { urbanism: -2, mysticism: 2 } },
      { id: "c", label: "I will enjoy this beautiful opportunity to go to a park and shit on some people and steal food from any picnic in sight.", scores: { greed: 3, romanticism: -1, adaptability: 3 } },
      { id: "d", label: "The location doesn't really matter, as long as I'm in good company I'm happy.", scores: { social: 1, romanticism: 3 } },
    ],
  },
  {
    id: "q5",
    text: "You found a mate, and you are ready to start a family. As the responsible providing pigeon you are, you set out to build a nest for your future generation to be throw themselves out when they are in the ripe age of 5 weeks. How do you build your nest?",
    emoji: "🥚",
    options: [
      { id: "a", label: "Stick with the classic sticks and leaves architecture style.", scores: { urbanism: -1, romanticism: 1 } },
      { id: "b", label: "Find the best ratio of pretty nest and weak pigeon and bully them out of it.", scores: { aggressive: 3, greed: 1, social: -1 } },
      { id: "c", label: "Steal a pillow from some balcony and use that as base.", scores: { urbanism: 3, adaptability: 1 } },
      { id: "d", label: "Feel the unbearable weight of reality over your wings, remember a tarot reading a few years back that predicted you would be a terrible parent and fly away to buy cigarettes.", scores: { social: -1, mysticism:3 ,romanticism: -2 } },
    ],
  },
  {
    id: "q6",
    text: "A single piece of fried potato is laying in the middle of a busy street. You stand on the sidewalk, a seagull stands on the opposite sidewalk. The traffic light is green and the clock is ticking. What would you do?",
    emoji: "🚦",
    options: [
      { id: "a", label: "Back away from the situation, a single fry is not worth getting ran over by a car, or risking fighting a bigger bird.", scores: { greed: -1, adaptability: 1, mysticism: 1 } },
      { id: "b", label: "Wait for the light to turn red, and go for it. You are smaller and quicker than a seagull anyways, enough time to get it and fly away.", scores: { adaptability: 2, greed: 1, urbanism:1 } },
      { id: "c", label: "Fuck it, we ball. Fly into incoming traffic and take what's rightfully yours.", scores: { greed: 3, mysticism: 1, aggressive: 1 } },
      { id: "d", label: "Wait for the seagull to risk their life in the road, then fight for the fry away from the dangers of the car.", scores: { greed: 1, aggressive: 3,adaptability: 1 } },
    ],
  },
  {
    id: "q7",
    text: "The local government has implemented anti-homeless architecture against pigeons, with spikes on statues, roofs, and other structures. What's your opinion about it?",
    emoji: "🪧",
    options: [
      { id: "a", label: "This concrete jungle was always set to fail. Reject modernity, return to the woods.", scores: { adaptability: -1, urbanism: -2 } },
      { id: "b", label: "They're just trying to control this mess, if those other pigeons behaved better, there would be no problems.", scores: { social: -1, mysticism: 1, aggressive:1 } },
      { id: "c", label: "The system is broken and we must unite the pigeon class against this oppressing ruling class that used colonialism to exploit us, left us forsaken, and now they try to kick us out of a place that is rightfully ours.", scores: { social: 3, urbanism: 1, adaptability: 2 } },
      { id: "d", label: "And they just made a new lake on the park for the swans, this gentrification is getting out of hand. I say we shit on their cars and peck their fingers.", scores: { urbanism: 1, aggressive: 3, adaptability: 1 } },
    ],
  },
  {
    id: "q8",
    text: "A beautiful peacock just landed on your territory, it looks gently but slightly lost. They reveal their beutiful colorful feathers and look for some food. What do you do?",
    emoji: "🦚",
    options: [
      { id: "a", label: "Stunned by their beauty, you try your best mating dance, bobbing your head back and forth.", scores: { social: 1, romanticism: 3 } },
      { id: "b", label: "\"Big bird eat big food. Must and chase them away\"", scores: { social: -1, greed: 2, aggressive:1 } },
      { id: "c", label: "These colors are unreal, this must be a holy presage.", scores: { mysticism: 3} },
      { id: "d", label: "You welcome them to your field, and show them the best place to find food, secretly hoping karma will reward you later.", scores: { aggressive: -1, social: 2, mysticism: 1} },
    ],
  },
  {
    id: "q9",
    text: "One day, while eating food off the gutter, a group of organized rats exit the sewer and approach you. They claim you're the \"winged rat\", the child of the prophecy, the chosen one, the holy messenger. They name you the leader of the cult. What's your reaction?",
    emoji: "🐁",
    options: [
      { id: "a", label: "You always knew you were special, finally the world will see you as you were meant to be. You accept the title and recite five commands to start your new religion.", scores: { social: 1, mysticism: 3 } },
      { id: "b", label: "You reject those idiots, telling them the only rat you respect if Remy from Ratatouille, and fly way to the sound of Le Festin.", scores: { social: -1, romanticism: 1, mysticism:-1 } },
      { id: "c", label: "You accept the title, and immedalty initiate a holy war against ravens, crows and magpies.", scores: { mysticism: 2, aggressive:2, social: -1} },
      { id: "d", label: "You don't buy their bullshit, but you've watched enough movies to know rats are tricky creatures. You reluctantly accept the title and order them to bring you food. You move in to the sewers and live as a king for the rest of your life, abandoning the endless skies for an infinite tower of food.", scores: { greed:3, adaptability: 3, mysticism: -1} },
    ],
  },
  {
    id: "q10",
    text: "One rainy day, while you're flying home, you're struck by lightning, and fall to your death for 5 seconds. During this time, a moment from your fullfilling 5 year long life flashes by your eye. What is the moment?",
    emoji: "⚡",
    options: [
      { id: "a", label: "That one time someone dropped a cinnamon roll and you got to taste heaven.", scores: { greed: 1, mysticism: 1 } },
      { id: "b", label: "The empty nest you left behind, and the face of your pigeon partner staring at the rain, wondering when are you coming back.", scores: { romanticism: 2, mysticism:1 } },
      { id: "c", label: "A distorted memory, moved by your anger at dying like this, you image yourself one last time, ripping through the clouds with a sharp claw and the fire burning in your soul.", scores: { aggressive:2} },
      { id: "d", label: "You remember the one conversation with your fellow pigeons on a power line. Your buddy Timmy said \"coo coo\" and you and your friends laughed, swinging smoothly with the warm summer breeze. Classic Timmy.", scores: { social:2, urbanism: 1} },
    ],
  },
  {
    id: "q11",
    text: "You are dead! Shocking, right? Anyways, now you are in pigeon afterlife. How would you wish that to be?",
    emoji: "🕊️",
    options: [
      { id: "a", label: "Rooftops until your bird eye can see. It often rains fries and other foods.", scores: { greed: 1, urbanism: 1 } },
      { id: "b", label: "You are in hell. Everything is on fire, and there is a constant battle royale of birds. The geese are currently dominating, but you are willing to put your grudges aside and work together with ravens to defeat a common enemy.", scores: { aggressive: 2, adaptability:1, social:1 } },
      { id: "c", label: "A beautiful lushious green field, all birds live in harmony, toucans have a normal sized nose and penguins can fly. All your loved ones are there and you can forever hear the melody of harps.", scores: { mysticism:2, romanticism: 1, urbanism:-1} },
      { id: "d", label: "An emptiness, devoid of light, color, gravity or time. This lasts simultaneously forever and for a millisecond.", scores: { mysticism: -2} },
    ],
  },
];

const path = "final"

export const pigeonResults: Record<string, PigeonResult> = {
  bodybuilding: {
    id: "bodybuilding",
    name: "An Absolute Unit of a Pigeon",
    emoji: "💪",
    tagline: "No pain, no grain.",
    description:
      "Who needs to fly when you have massive pecks? You approach life head-on and rarely back down from a challenge. People naturally gravitate toward your confidence and energy. Whether you're motivating your friends or carrying the entire group on your back, you're happiest when you're pushing yourself to be bigger, better, and stronger than yesterday.",
    traits: {
      aggressive: 8,
      social: 10,
      greed: 4,
      urbanism: 3,
      mysticism: 2,
      romanticism: 1,
      adaptability: 4
    },
    color: "#E67E22",
    image: `pigeons/${path}/image_bodybuilding.png`,
  },

  sandwich: {
    id: "sandwich",
    name: "The Pigeon Sandwich",
    emoji: "🥪",
    tagline: "Completely lost in the sauce.",
    description:
      "Have you ever loved something so much it took over your entire personality? I bet you did. When something captures your attention, it becomes your hyperfocus for the next three weeks. You throw yourself into interests, hobbies, cravings, and obsessions with remarkable enthusiasm. You may occasionally lose sight of the bigger picture, but nobody can accuse you of lacking passion.",
    traits: {
      aggressive: 1,
      social: 4,
      greed: 10,
      urbanism: 4,
      mysticism: 1,
      romanticism: 1,
      adaptability: 5
    },
    color: "#F1C40F",
    image: `pigeons/${path}/image_sandwich.png`,
  },

  trainstation: {
    id: "trainstation",
    name: "Train Station Pigeon",
    emoji: "🚉",
    tagline: "Codename Crackhead.",
    description:
      "You can survive almost anything. Chaos, stress, uncertainty, poor decisions—you somehow find a way through it all. Your methods may not always make sense to outsiders, but your resilience is undeniable. Guided by the voices in your head and perhaps chemicals in your bloodstream, you take the problems life throws at you and you treat them as suggestions.",
    traits: {
      aggressive: 6,
      social: 1,
      greed: 8,
      urbanism: 10,
      mysticism: 4,
      romanticism: 2,
      adaptability: 10,
    },
    color: "#7F8C8D",
    image: `pigeons/${path}/image_trainstation.png`,
  },

  field: {
    id: "field",
    name: "Country Side Pigeon",
    emoji: "🌿",
    tagline: "Touch grass. Become enlightened.",
    description:
      "You find beauty in simple things that most people overlook. You value authenticity, quiet moments, and meaningful connections over status or competition. While others rush toward the future, you're busy appreciating the present. You are to a normal person what a mouse is to a rat, whymsical, connected with nature, and cleaner than people expect.",
    traits: {
      aggressive: 1,
      social: 7,
      greed: 1,
      urbanism: 2,
      mysticism: 8,
      romanticism: 8,
      adaptability: 2,
    },
    color: "#27AE60",
    image: `pigeons/${path}/image_field.png`,
  },

  peace: {
    id: "peace",
    name: "Peace Dove",
    emoji: "🕊️",
    tagline: "Genesis 8:11.",
    description:
      "You prefer understanding over conflict and cooperation over competition. People often come to you for advice, support, or simply a calming presence. You believe most problems can be solved through empathy, patience, and a little bit of hope. Some may find you unbearable in certain situations, but those critics may never hurt your unshakable spirit.",
    traits: {
      aggressive: 2,
      social: 6,
      greed: 2,
      urbanism: 2,
      mysticism: 10,
      romanticism: 2,
      adaptability: 5,
    },
    color: "#dadddd",
    image: `pigeons/${path}/image_peace.png`,
  },

  hipster: {
    id: "hipster",
    name: "Hipster Pigeon",
    emoji: "☕",
    tagline: "You don't fly with the flock.",
    description:
      "You follow your own path, even when nobody else understands it. Trends rarely impress you, and you take pride in finding things before they become popular. The color of your feathers was trendy in 2011, you support local bakeries, you only eat whole grain bread crumbs and organic cigarette butts, and you're secretly afraid of 5G radio waves.",
    traits: {
      aggressive: 1,
      social: 3,
      greed: 1,
      urbanism: 6,
      mysticism: 6,
      romanticism: 6,
      adaptability: 2
    },
    color: "#9B59B6",
    image: `pigeons/${path}/image_hipster.png`,
  },

  curious: {
    id: "curious",
    name: "Curious Pigeon",
    emoji: "🔎",
    tagline: "The world is a mystery waiting to be explored.",
    description:
      "You are driven by curiosity and a constant desire to discover what's around the next corner or someone else's balcony. New experiences excite you, unfamiliar places intrigue you, and learning rarely feels like work. Life is one giant adventure and you're determined not to miss any of it.",
    traits: {
      aggressive: 1,
      social: 7,
      greed: 2,
      urbanism: 5,
      mysticism: 2,
      romanticism: 7,
      adaptability: 10,
    },
    color: "#3498DB",
    image: `pigeons/${path}/image_curious.png`,
  },

  warlord: {
    id: "warlord",
    name: "Warlord Pigeon",
    emoji: "⚔️",
    tagline: "You woke up and chose violence.",
    description:
      "You are fiercely competitive and unapologetically ambitious. Fuck the world, fuck society, fuck that car that has just been washed. You will shit on people for sport, you will attack other pigeons for the fun of it. Any food that falls upon your territory is yours by right. Eagles are afraid of you.",
    traits: {
      aggressive: 10,
      social: 2,
      greed: 10,
      urbanism: 8,
      mysticism: 2,
      romanticism: 2,
      adaptability: 4,
    },
    color: "#C0392B",
    image: `pigeons/${path}/image_warlord.png`,
  },

  nerd: {
    id: "nerd",
    name: "Nerd Pigeon",
    emoji: "🤓",
    tagline: "Um, actually...",
    description:
      "You enjoy understanding how things work and are rarely satisfied with surface-level explanations. Whether it's a niche hobby, a random fact, or a deeply specific topic, you love diving into details. And ff you recognized the pokemon in that picture is not a pigeon, and said something like \"oh why didn't they use the picture of Pidove\" or some bullshit gen 10 pokemon, then congratulations, this quiz was spot on.",
    traits: {
      aggressive: 2,
      social: 4,
      greed: 2,
      urbanism: 8,
      mysticism: 2,
      romanticism: 1,
      adaptability: 3
    },
    color: "#34495E",
    image: `pigeons/${path}/image_nerd.png`,
  },

  don: {
    id: "don",
    name: "Don Pigeon",
    emoji: "❤️",
    tagline: "And they said romance is dead.",
    description:
      "You wear your heart on your sleeve and find meaning in connections with other people. You're sentimental, expressive, and never afraid to care deeply. You coo at every pretty pair of wings in the rooftops, daydream about some dove that will never fly back to you, find a new lover at every tree. Whether it's friendship, love, or respectful admiration, you believe life is better when shared.",
    traits: {
      aggressive: 2,
      social: 8,
      greed: 3,
      urbanism: 6,
      mysticism: 2,
      romanticism: 10,
      adaptability: 5,
    },
    color: "#E84393",
    image: `pigeons/${path}/image_don.png`,
  },
};