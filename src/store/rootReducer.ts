import { combineReducers } from '@reduxjs/toolkit';

import auth from '@/store/slices/authSlice.ts';

const reducer = combineReducers({
  auth,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
