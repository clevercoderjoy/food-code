import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import app from "../firebase/config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';

const db = getFirestore(app);

const initialState = {
  currentUser: null,
  isUserLoggedIn: false,
  showModal: false,
  users: [],
};

const getUserFromFirestore = async (uid) => {
  const userDoc = await getDoc(doc(db, 'users', uid));
  if (userDoc.exists()) {
    return userDoc.data();
  }
  return null;
};

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (uid) => {
    const userRef = doc(db, 'users', uid);
    await deleteDoc(userRef);
    return uid;
  }
);

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

    return user;
  }
);

export const updateUserRole = createAsyncThunk(
  'user/updateUserRole',
  async ({ userId, role }) => {
    try {
      const userDoc = doc(db, 'users', userId);
      await updateDoc(userDoc, { role });
      return { userId, role };
    } catch (error) {
      console.log(error.message);
    }
  }
);


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
  extraReducers: (builder) => {
    builder
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const { userId, role } = action.payload;
        if (state.users) {
          const user = state.users.find((u) => u.id === userId);
          if (user) {
            user.role = role;
          }
        }
      })
  }
});

export const { setCurrentUser, setIsUserLoggedIn, clearUserDetails, setShowModal } = userSlice.actions;
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectIsUserLoggedIn = (state) => state.user.isUserLoggedIn;
export const selectShowModal = (state) => state.user.showModal;
export const selectIsAdmin = (state) => state.user.currentUser?.role === 'admin';

export default userSlice.reducer;