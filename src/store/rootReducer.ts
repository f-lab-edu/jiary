import { combineReducers } from '@reduxjs/toolkit';
import counter from './slices/counterSlice.ts';

const reducer = combineReducers({
  counter,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
