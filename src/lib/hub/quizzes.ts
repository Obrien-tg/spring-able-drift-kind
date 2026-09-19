export type QuizQuestion = {
  prompt: string;
  options: string[];
  answer: number;
  hint: string;
};

export type Quiz = {
  slug: string;
  title: string;
  subject: string;
  minutes: number;
  blurb: string;
  materialTitle: string;
  questions: QuizQuestion[];
};

export const QUIZZES: Quiz[] = [
  {
    slug: "fractions",
    title: "Fraction stars",
    subject: "Mathematics",
    minutes: 6,
    blurb: "Equal parts, pizza slices, and which piece is larger.",
    materialTitle: "Fun with Fractions",
    questions: [
      {
        prompt: "A sandwich cut into 2 equal pieces. You eat 1 piece. What fraction did you eat?",
        options: ["1/4", "1/2", "2/2", "1/3"],
        answer: 1,
        hint: "Two equal parts, one of them is yours.",
      },
      {
        prompt: "Which is larger?",
        options: ["1/3", "1/2", "They are the same", "1/8"],
        answer: 1,
        hint: "Fewer equal shares means each share is bigger.",
      },
      {
        prompt: "A pizza has 8 slices. You eat 3. What fraction is that?",
        options: ["3/5", "8/3", "3/8", "1/3"],
        answer: 2,
        hint: "Eaten slices over all slices.",
      },
      {
        prompt: "2/4 is equal to…",
        options: ["1/4", "1/2", "2/2", "1/8"],
        answer: 1,
        hint: "Two of four equal parts is the same as one of two.",
      },
    ],
  },
  {
    slug: "times-tables",
    title: "Jumping twos and fives",
    subject: "Mathematics",
    minutes: 5,
    blurb: "Skip-count your way through friendly times-table facts.",
    materialTitle: "Times Tables Adventure",
    questions: [
      {
        prompt: "2 × 6 =",
        options: ["8", "10", "12", "16"],
        answer: 2,
        hint: "Six jumps of 2: 2, 4, 6, 8, 10, 12.",
      },
      {
        prompt: "5 × 4 =",
        options: ["9", "20", "15", "25"],
        answer: 1,
        hint: "Four jumps of 5.",
      },
      {
        prompt: "10 × 7 =",
        options: ["17", "70", "77", "7"],
        answer: 1,
        hint: "Write a zero after the 7.",
      },
      {
        prompt: "Any number times 0 is…",
        options: ["the same number", "1", "10", "0"],
        answer: 3,
        hint: "Zero groups of anything is nothing.",
      },
    ],
  },
  {
    slug: "water-cycle",
    title: "A drop’s journey",
    subject: "Science",
    minutes: 5,
    blurb: "Evaporation, clouds, rain, and looking after every drop.",
    materialTitle: "The Water Cycle",
    questions: [
      {
        prompt: "When the sun warms a puddle, water turns into vapour. That is…",
        options: ["precipitation", "evaporation", "collection", "freezing"],
        answer: 1,
        hint: "The puddle seems to disappear into the air.",
      },
      {
        prompt: "Rain, hail, or snow falling from a cloud is…",
        options: ["evaporation", "condensation", "precipitation", "soil"],
        answer: 2,
        hint: "It precipitates — it falls.",
      },
      {
        prompt: "Clothes dry faster on a sunny, windy day because…",
        options: [
          "the cotton changes colour",
          "evaporation happens faster",
          "rain fills the fibres",
          "clouds sit on the washing line",
        ],
        answer: 1,
        hint: "Heat and moving air help water leave the fabric.",
      },
    ],
  },
];

export function getQuiz(slug: string) {
  return QUIZZES.find((q) => q.slug === slug) ?? null;
}

export function scoreQuiz(quiz: Quiz, picks: number[]) {
  const correct = quiz.questions.reduce(
    (sum, q, i) => sum + (picks[i] === q.answer ? 1 : 0),
    0,
  );
  return Math.round((correct / quiz.questions.length) * 100);
}
