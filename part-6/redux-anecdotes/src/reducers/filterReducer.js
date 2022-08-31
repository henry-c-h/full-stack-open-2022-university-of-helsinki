import { createSlice } from '@reduxjs/toolkit';

const filterReducer = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    changeFilter(state, action) {
      return action.payload;
    },
  },
});

export default filterReducer.reducer;
export const { changeFilter } = filterReducer.actions;
