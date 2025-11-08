import { describe, it, expect } from 'vitest';
import { runReducers } from './store';
import { StoreOp } from '../types';

interface TestState {
  count: number;
}

const add = (amount: number): StoreOp<TestState> => (state) => ({
  ...state,
  count: state.count + amount,
});

const multiply = (factor: number): StoreOp<TestState> => (state) => ({
  ...state,
  count: state.count * factor,
});

describe('runReducers', () => {
  it('should apply a series of reducers to the initial state in order', () => {
    const initialState: TestState = { count: 2 };
    const reducers: StoreOp<TestState>[] = [
      add(3),      // count becomes 5
      multiply(4), // count becomes 20
      add(-5),     // count becomes 15
    ];

    const finalState = runReducers(initialState, reducers);

    expect(finalState.count).toBe(15);
  });

  it('should return the initial state if no reducers are provided', () => {
    const initialState: TestState = { count: 42 };
    const finalState = runReducers(initialState, []);
    expect(finalState).toEqual(initialState);
  });

  it('should correctly apply a single reducer', () => {
    const initialState: TestState = { count: 10 };
    const finalState = runReducers(initialState, [multiply(5)]);
    expect(finalState.count).toBe(50);
  });
});