import { createSlice } from '@reduxjs/toolkit';

const safelyParseJSON = (jsonString, fallback = []) => {
  try {
    const parsed = JSON.parse(jsonString);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    return fallback;
  }
};

const initialState = {
  users: safelyParseJSON(localStorage.getItem('users'), []),
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
  isUserLoggedIn: JSON.parse(localStorage.getItem('isLogin')) || false,
  showModal: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      const userExists = state.users.some(user => user.username === action.payload.username);
      if (!userExists) {
        state.users.push(action.payload);
        localStorage.setItem('users', JSON.stringify(state.users));
      }
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
    },
    setIsUserLoggedIn: (state, action) => {
      state.isUserLoggedIn = action.payload;
      localStorage.setItem('isLogin', JSON.stringify(action.payload));
    },
    clearUserDetails: (state) => {
      state.currentUser = null;
      state.isUserLoggedIn = false;
      localStorage.removeItem('currentUser');
      localStorage.setItem('isLogin', 'false');
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
});

export const { setUserDetails, setCurrentUser, setIsUserLoggedIn, clearUserDetails, setShowModal } = userSlice.actions;

export const selectUsers = (state) => state.user.users;
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectIsUserLoggedIn = (state) => state.user.isUserLoggedIn;
export const selectShowModal = (state) => state.user.showModal;

export default userSlice.reducer;