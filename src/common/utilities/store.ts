import { StoreOp } from "../types";

export const runReducers = <T>(
  initialState: T,
  reducers: StoreOp<T>[],
): T => reducers.reduce((state, reducer) => reducer(state), initialState);
