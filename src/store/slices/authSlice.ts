import { createSelector, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/store/store.ts';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      email: '',
      given_name: '',
      id: '',
      locale: '',
      name: '',
      picture: '',
      verified_email: false,
    },
    accessToken: '',
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    removeUser: state => {
      state.user = {
        email: '',
        given_name: '',
        id: '',
        locale: '',
        name: '',
        picture: '',
        verified_email: false,
      };
    },
    removeAccessToken: state => {
      state.accessToken = '';
    },
  },
});

const tokenSelector = (state: RootState): string => state.auth.accessToken;
const userIdSelector = (state: RootState): string => state.auth.user.id;
export const isLoggedInSelector = createSelector(
  [tokenSelector, userIdSelector],
  (token, userId) => Boolean(token) && Boolean(userId),
);

export const { setUser, setAccessToken, removeUser, removeAccessToken } =
  authSlice.actions;
export default authSlice.reducer;
