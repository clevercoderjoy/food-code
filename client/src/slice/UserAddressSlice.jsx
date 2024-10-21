import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs, query, where, getFirestore } from 'firebase/firestore';
import app from '../firebase/config';

const db = getFirestore(app);

export const fetchUserAddresses = createAsyncThunk(
  'userAddress/fetchAddresses',
  async (userId) => {
    if (!userId) throw new Error('User ID is required');
    const addressesRef = collection(db, 'userAddressList');
    const q = query(addressesRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
);

export const addUserAddress = createAsyncThunk(
  'userAddress/addAddress',
  async ({ userId, address }, { rejectWithValue }) => {
    if (!userId) return rejectWithValue('User ID is required');
    try {
      const addressesRef = collection(db, 'userAddressList');
      const docRef = await addDoc(addressesRef, {
        ...address,
        userId,
        createdAt: new Date().toISOString(),
      });
      return { id: docRef.id, ...address };
    } catch (error) {
      console.error('Firestore error:', error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  userAddress: {
    firstName: "",
    lastName: "",
    mobile: null,
    email: "",
    address: "",
    city: "",
    state: "",
    pinCode: null,
  },
  userAddressList: [],
  currentAddressSelected: null,
  status: 'idle',
  error: null,
};

const userAddressSlice = createSlice({
  name: 'userAddress',
  initialState,
  reducers: {
    setCurrentAddressSelected(state, action) {
      state.currentAddressSelected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAddresses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserAddresses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userAddressList = action.payload; 
      })
      .addCase(fetchUserAddresses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; 
      })
      .addCase(addUserAddress.fulfilled, (state, action) => {
        state.userAddressList.unshift(action.payload); 
      });
  },
});

export const { setCurrentAddressSelected } = userAddressSlice.actions;
export const selectUserAddress = (state) => state.userAddress.userAddress;
export const selectUserAddressList = (state) => state.userAddress.userAddressList;
export const selectCurrentAddressSelected = (state) => state.userAddress.currentAddressSelected;

export default userAddressSlice.reducer;
