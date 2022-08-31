import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    changeNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return null;
    },
  },
});

export const { changeNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (content, timeToDisplay) => {
  return (dispatch) => {
    dispatch(changeNotification(content));
    return setTimeout(
      () => dispatch(removeNotification()),
      timeToDisplay * 1000,
    );
  };
};

export default notificationSlice.reducer;
