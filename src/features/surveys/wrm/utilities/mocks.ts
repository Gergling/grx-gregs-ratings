import { ArchetypeKey, WRMQuestion } from "../config";
import { WRMStoreAnswer, WRMStoreProps } from "../types";

export const mockQuestion = (id: number): WRMQuestion => ({
  name: `q${id}`,
  title: `Question ${id}`,
  type: 'radiogroup',
  choices: [
    { value: 'mage', text: 'Mage answer' },
    { value: 'rogue', text: 'Rogue answer' },
    { value: 'warrior', text: 'Warrior answer' },
  ],
});

export const mockAnswers = (answersCount: number): WRMStoreAnswer[] => Array.from({ length: answersCount }, (_, i) => ({
  question: mockQuestion(i),
  answer: 'mage' as ArchetypeKey,
}));

export const mockStore = (store: Partial<WRMStoreProps> = {}): WRMStoreProps => {
  const answers = store.answers ?? [];
  const lastQuestion = mockQuestion(answers.length);

  return {
    answers,
    lastQuestion,
    page: answers.length,
    scores: { mage: 0, rogue: 0, warrior: 0 },
    phase: 'initial',
    questions: [lastQuestion],
    seeder: () => 0.5,
    ...store,
  } as WRMStoreProps;
};
