import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import app from "../firebase/config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const db = getFirestore(app);

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
  isUserLoggedIn: JSON.parse(localStorage.getItem('isUserLoggedIn')) || false,
  showModal: false,
};

const getUserFromFirestore = async (uid) => {
  const userDoc = await getDoc(doc(db, 'users', uid));
  if (userDoc.exists()) {
    return userDoc.data();
  }
  return null;
};

export const signUp = createAsyncThunk(
  'user/signUp',
  async ({ email, password, isAdmin }, { dispatch }) => {
    const auth = getAuth(app);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    const userData = {
      email: userCredential.user.email,
      uid: userCredential.user.uid,
      role: isAdmin ? 'admin' : 'user',
    };

    await setDoc(doc(db, 'users', userCredential.user.uid), userData);

    dispatch(setCurrentUser(userData));
    dispatch(setIsUserLoggedIn(true));

    localStorage.setItem('currentUser', JSON.stringify(userData));
    localStorage.setItem('isUserLoggedIn', JSON.stringify(true));

    return userData;
  }
);

export const logIn = createAsyncThunk(
  'user/logIn',
  async ({ email, password }, { dispatch }) => {
    const auth = getAuth(app);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    const userData = await getUserFromFirestore(userCredential.user.uid);
    
    if (!userData) {
      throw new Error('User data not found');
    }

    const user = {
      email: userCredential.user.email,
      uid: userCredential.user.uid,
      role: userData.role,
    };

    dispatch(setCurrentUser(user));
    dispatch(setIsUserLoggedIn(true));

    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('isUserLoggedIn', JSON.stringify(true));

    return user;
  }
);

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
export const selectIsAdmin = (state) => state.user.currentUser?.role === 'admin';

export default userSlice.reducer;