import { ArchetypeKey } from "./config";

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
