import { combineReducers } from '@reduxjs/toolkit';
import counter from './slice/counterSlice.ts';

const reducer = combineReducers({
  counter,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
