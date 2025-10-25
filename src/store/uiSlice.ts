import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isSchemaBrowserOpen: boolean;
  isLogsViewerOpen: boolean;
}

const initialState: UiState = {
  isSchemaBrowserOpen: false,
  isLogsViewerOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSchemaBrowser(state) {
      state.isSchemaBrowserOpen = !state.isSchemaBrowserOpen;
    },
    toggleLogsViewer(state) {
      state.isLogsViewerOpen = !state.isLogsViewerOpen;
    },
  },
});

export const { toggleSchemaBrowser, toggleLogsViewer } = uiSlice.actions;
export default uiSlice.reducer;