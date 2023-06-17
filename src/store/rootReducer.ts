import { combineReducers } from '@reduxjs/toolkit';
import counter from '@/store/slices/counterSlice.ts';
import auth from '@/store/slices/authSlice.ts';
import ui from '@/store/slices/uiSlice.ts';

const reducer = combineReducers({
  counter,
  auth,
  ui,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
