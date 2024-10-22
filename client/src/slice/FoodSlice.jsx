import { createSlice } from '@reduxjs/toolkit';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import app from '../firebase/config';

const db = getFirestore(app);

const foodSlice = createSlice({
  name: 'food',
  initialState: {
    items: [],
  },
  reducers: {
    addFoodItem: (state, action) => {
      state.items.push(action.payload);
    },
  },
});


export const addFood = (foodItem) => async (dispatch) => {
  try {
    const foodItemRef = collection(db, 'foodItems');
    const docRef = await addDoc(foodItemRef, foodItem);
    dispatch(addFoodItem({ id: docRef.id, ...foodItem }));
  } catch (error) {
    console.error('Error adding food item: ', error);
    throw new Error('Error adding food item');
  }
};

export const { addFoodItem } = foodSlice.actions;

export default foodSlice.reducer;
