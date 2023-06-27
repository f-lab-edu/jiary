import { combineReducers } from '@reduxjs/toolkit';
import auth from '@/store/slices/authSlice.ts';
import ui from '@/store/slices/uiSlice.ts';

const reducer = combineReducers({
  auth,
  ui,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
