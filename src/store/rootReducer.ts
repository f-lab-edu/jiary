import { combineReducers } from '@reduxjs/toolkit';
import counter from './slices/counterSlice.ts';
import auth from './slices/authSlice.ts';

const reducer = combineReducers({
  counter,
  auth,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
