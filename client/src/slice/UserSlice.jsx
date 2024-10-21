import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
  isUserLoggedIn: JSON.parse(localStorage.getItem('isUserLoggedIn')) || false,
  showModal: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
    },
    setIsUserLoggedIn: (state, action) => {
      state.isUserLoggedIn = action.payload;
      localStorage.setItem('isUserLoggedIn', JSON.stringify(action.payload));
    },
    clearUserDetails: (state) => {
      state.currentUser = null;
      state.isUserLoggedIn = false;
      localStorage.removeItem('currentUser');
      localStorage.removeItem('isUserLoggedIn');
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
});

export const { setCurrentUser, setIsUserLoggedIn, clearUserDetails, setShowModal } = userSlice.actions;
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectIsUserLoggedIn = (state) => state.user.isUserLoggedIn;
export const selectShowModal = (state) => state.user.showModal;

export default userSlice.reducer;
