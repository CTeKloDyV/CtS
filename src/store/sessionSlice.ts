import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
  sessionId: string | null;
  messages: any[];
}

const initialState: SessionState = {
  sessionId: null,
  messages: [],
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSessionId(state, action: PayloadAction<string>) {
      state.sessionId = action.payload;
    },
    addMessage(state, action: PayloadAction<any>) {
      state.messages.push(action.payload);
    },
  },
});

export const { setSessionId, addMessage } = sessionSlice.actions;
export default sessionSlice.reducer;