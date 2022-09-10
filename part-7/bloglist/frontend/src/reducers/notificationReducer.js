import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  content: '',
  isError: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateNotification(state, action) {
      return action.payload;
    },
  },
});

export default notificationSlice.reducer;

export const { updateNotification } = notificationSlice.actions;
