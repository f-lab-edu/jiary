import { createSlice } from '@reduxjs/toolkit';

export interface UiState {
  isPageLoading: boolean;
  changeLoading: () => void;
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isPageLoading: false,
  },
  reducers: {
    changeLoading: (state, action) => {
      state.isPageLoading = action.payload;
    },
  },
});

export const { changeLoading } = uiSlice.actions;
export default uiSlice.reducer;
