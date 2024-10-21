import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isUserLoggedIn: false,
  showModal: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setIsUserLoggedIn: (state, action) => {
      state.isUserLoggedIn = action.payload;
    },
    clearUserDetails: (state) => {
      state.currentUser = null;
      state.isUserLoggedIn = false;
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