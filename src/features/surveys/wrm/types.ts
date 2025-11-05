import { Seeder, StoreOp } from "../../../common/types";
import { ArchetypeKey, WRMQuestion } from "./config";

export type ArchetypeScores = {
  [K in ArchetypeKey]: number;
};

type ArchetypeScore = {
  key: ArchetypeKey;
  score: number;
};

export type ScoringCategoryProps
  = { type: 'equal'; score: number; }
  | { type: 'lead'; trailer: ArchetypeScore; score: number; }
  | { type: 'trailer'; lead: ArchetypeScore; score: number; }
  | { type: 'done'; trailer: ArchetypeScore; lead: ArchetypeScore; other: ArchetypeScore; };

export type ProgressMarker = {
  answered: boolean;
  current: boolean;
};

export type WRMStoreQuestions = {
  remaining: WRMQuestion[];
  current: WRMQuestion;
};

export type WRMStoreAnswer = {
  question: WRMQuestion;
  answer: ArchetypeKey;
};

export type WRMState = {
  answers: WRMStoreAnswer[];
  // TODO: Navigation properties can/should probably be grouped together.
  // This will replace the selected... properties.
  // navigation: {
  //   isLast: boolean;
  //   isFirst: boolean;
  //   idx: number;
  //   question: WRMQuestion;
  //   answer?: ArchetypeKey;
  // };
  // This is explicitly for the last question and answer.
  // last: {
  //   question: WRMQuestion;
  //   answer?: ArchetypeKey;
  // };
  questions: WRMStoreQuestions;
  scores: ArchetypeScores;
  seeder: Seeder;
  selectedAnswer?: ArchetypeKey;
  selectedQuestion: WRMQuestion;
  selectedQuestionIdx: number;
};

type Action = {
  navigateNextQuestion: () => void;
  navigatePreviousQuestion: () => void;
  reset: () => void;
  setSeeder: (seeder: Seeder) => void;
  setSelectedAnswer: (answer: ArchetypeKey | undefined) => void;
};

export type WRMStoreProps = WRMState & Action;

export type WRMStoreOp = StoreOp<WRMStoreProps>;
