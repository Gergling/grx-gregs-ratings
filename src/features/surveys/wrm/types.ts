import { Seeder } from "../../../common/types";
import { SurveyProgressProps } from "../common/types";
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

export type WRMStoreAnswer = {
  question: WRMQuestion;
  answer: ArchetypeKey;
};

export type WRMState = {
  // Answers are gathered.
  answers: WRMStoreAnswer[];
  // Last question is chosen.
  lastQuestion: WRMQuestion;
  // Remaining questions are updated.
  questions: WRMQuestion[];
  // Updated by navigation.
  page: number;
  // Updated once and used for anything which may require randomisation.
  seeder: Seeder;
};

type Action = {
  navigateQuestion: (page: number, answer?: ArchetypeKey) => void;
  reset: () => void;
  setSeeder: (seeder: Seeder) => void;
};

export type WRMStoreProps = WRMState & Action;

// Computed from last question and scores.
export type WRMSurveyPhase = 'initial' | 'adaptive' | 'final' | 'done';

export type WRMSurveyProps = {
  // Current answer state.
  selectedAnswer?: ArchetypeKey;
  setSelectedAnswer: (answer: ArchetypeKey) => void;

  // Question navigation state.
  navigateAnyQuestion: (page: number) => void;
  navigatePreviousQuestion: () => void;
  navigateNextQuestion: () => void;

  // Computed from page number and current selected answer.
  navigation: {
    isLast: boolean;
    isFirst: boolean;
    question: WRMQuestion;
  };
  
  // Computed from answers.
  scores: ArchetypeScores;

  // Computed from page number, answers and phase.
  progress: SurveyProgressProps;

  // Computed from phase, which is computed from last question and scores.
  isComplete: boolean;
};

export type WRMArchetypeReadableMapping = { [K in ArchetypeKey]: string; };
