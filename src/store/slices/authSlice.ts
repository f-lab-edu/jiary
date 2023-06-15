import { createSlice } from '@reduxjs/toolkit';

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
    accessToken: undefined,
  },
  reducers: {
    setUser: (state, action) => {
      const { email, given_name, id, locale, name, picture, verified_email } =
        action.payload;
      if (email) {
        state.user.email = email;
      }
      if (given_name) {
        state.user.given_name = given_name;
      }
      if (id) {
        state.user.id = id;
      }
      if (locale) {
        state.user.locale = locale;
      }
      if (name) {
        state.user.name = name;
      }
      if (picture) {
        state.user.picture = picture;
      }
      if (verified_email) {
        state.user.verified_email = verified_email;
      }
    },
    setAccessToken: (state, action) => {
      const accessToken = action.payload;
      if (accessToken) {
        state.accessToken = accessToken;
      }
    },
  },
});

export const { setUser, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
