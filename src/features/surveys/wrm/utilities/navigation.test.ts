import { describe, it, expect, vi } from 'vitest';
import { navigateQuestionFactory } from './navigation';
import { mockStore, mockQuestion, mockAnswers } from './mocks';
import * as questionUtils from './question';
import { TOTAL_INITIAL_QUESTIONS } from '../constants';
import { ArchetypeKey } from '../config';

describe('navigateQuestionFactory', () => {
  it('should navigate to a previous page without changing the answer', () => {
    const answers = mockAnswers(3);
    const initialState = mockStore({ answers, page: 2 });

    const navigate = navigateQuestionFactory(1); // Navigate back to page 1
    const newState = navigate(initialState);

    expect(newState.page).toBe(1);
    expect(newState.answers).toEqual(initialState.answers); // No change
    expect(newState.lastQuestion).toEqual(initialState.lastQuestion); // No change
  });

  it('should navigate to a previous page and update the answer', () => {
    const generateQuestionSpy = vi.spyOn(questionUtils, 'generateQuestion');
    const answers = mockAnswers(3); // All answers are 'mage'
    const initialState = mockStore({ answers, page: 2 });

    // Change the answer and then navigate to page 1.
    const navigate = navigateQuestionFactory(1, 'rogue');
    const newState = navigate(initialState);

    expect(newState.page).toBe(1);
    // Answer for page 1 should be the initial value.
    expect(newState.answers[1].answer).toBe('mage');
    // Answer for page 2 should be changed to rogue.
    expect(newState.answers[2].answer).toBe('rogue');
    expect(newState.answers.length).toBe(3);
    expect(generateQuestionSpy).not.toHaveBeenCalled();
  });

  it('should navigate to the next (not last) page and update the answer', () => {
    const generateQuestionSpy = vi.spyOn(questionUtils, 'generateQuestion');
    const initialState = mockStore({
      answers: mockAnswers(3), // We are on page 3 of 5
      page: 3,
      questions: [mockQuestion(4), mockQuestion(5)], // More questions available
      lastQuestion: mockQuestion(3),
    });

    // From page 3, answer the question and navigate to page 4
    const navigate = navigateQuestionFactory(4, 'warrior');
    const newState = navigate(initialState);

    expect(newState.page).toBe(4);
    expect(newState.answers[3].answer).toBe('warrior');
    expect(generateQuestionSpy).toHaveBeenCalled();
  });

  it('should navigate to the next (last) page and generate a new question', () => {
    const generateQuestionSpy = vi.spyOn(questionUtils, 'generateQuestion');
    const initialQuestions = [mockQuestion(2), mockQuestion(3)];
    const initialState = mockStore({
      answers: mockAnswers(1),
      page: 1,
      questions: initialQuestions,
      lastQuestion: mockQuestion(1),
    });

    // From page 1, answer the question and navigate to page 2
    const navigate = navigateQuestionFactory(2, 'warrior');
    const newState = navigate(initialState);

    // We are now on the new last page
    expect(newState.page).toBe(2);

    // The answer for the previous page (page 1) should be stored
    expect(newState.answers.length).toBe(2);
    expect(newState.answers[1].answer).toBe('warrior');

    // A new question should have been generated
    expect(generateQuestionSpy).toHaveBeenCalled();
    expect(newState.lastQuestion.name).toBe('q2'); // from initialQuestions
    expect(newState.questions.length).toBe(initialQuestions.length - 1);

    generateQuestionSpy.mockRestore();
  });

  it("should finish the survey when the phase becomes 'done'", () => {
    const generateQuestionSpy = vi.spyOn(questionUtils, 'generateQuestion');

    // Create a state where the survey is almost 'done'
    const answers = Array.from({ length: TOTAL_INITIAL_QUESTIONS }, () => ({
      question: mockQuestion(0),
      answer: 'mage' as ArchetypeKey,
    }));
    // Make scores distinct so the next answer makes it 'done'
    answers[0].answer = 'rogue';

    const initialState = mockStore({
      answers,
      page: TOTAL_INITIAL_QUESTIONS,
      lastQuestion: mockQuestion(99),
    });

    // Navigate to the next page, which should trigger the 'done' state
    const navigate = navigateQuestionFactory(TOTAL_INITIAL_QUESTIONS + 1, 'mage');
    const newState = navigate(initialState);

    expect(newState.page).toBe(TOTAL_INITIAL_QUESTIONS + 1);
    // A new answer should have been added
    expect(newState.answers.length).toBe(TOTAL_INITIAL_QUESTIONS + 1);

    // No new question should be generated because the phase is 'done'
    expect(generateQuestionSpy).not.toHaveBeenCalled();
    // The last question should not have changed
    expect(newState.lastQuestion).toEqual(initialState.lastQuestion);

    generateQuestionSpy.mockRestore();
  });

  it('should update answers when navigating to the current page with a new answer', () => {
    const initialState = mockStore({ answers: mockAnswers(2), page: 1 });
    const navigate = navigateQuestionFactory(1, 'warrior');
    const newState = navigate(initialState);

    expect(newState.page).toBe(1);
    expect(newState.answers[1].answer).toBe('warrior');
    expect(newState.answers[0].answer).toBe('mage'); // Should be unchanged
  });
});
