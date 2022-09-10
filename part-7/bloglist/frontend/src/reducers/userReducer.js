import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import loginService from '../services/login';
import { updateNotification } from './notificationReducer';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    removeUser() {
      return null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const initializeUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  };
};

export const loggoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedUser');
    dispatch(removeUser());
  };
};

export const login = (userObj) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(userObj);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
    } catch (exception) {
      dispatch(
        updateNotification({
          content: 'Wrong username or password',
          isError: true,
        }),
      );
      setTimeout(() => dispatch(updateNotification({})), 5000);
    }
  };
};

export default userSlice.reducer;
