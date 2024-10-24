import { createSlice } from '@reduxjs/toolkit';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  getFirestore,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import app from '../firebase/config';

const db = getFirestore(app);

const foodSlice = createSlice({
  name: 'food',
  initialState: {
    foodItems: [],
    loading: false,
    error: null,
  },
  reducers: {
    addFoodItem: (state, action) => {
      state.foodItems.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    updateFoodItem: (state, action) => {
      const index = state.foodItems.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.foodItems[index] = { ...state.foodItems[index], ...action.payload };
      } else {
        state.foodItems.push(action.payload);
      }
      state.loading = false;
      state.error = null;
    },
    setFoodItems: (state, action) => {
      state.foodItems = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteFoodItem: (state, action) => {
      state.foodItems = state.foodItems.filter(item => item.id !== action.payload);
      state.loading = false;
      state.error = null;
    },
  },
});

export const fetchFoodItemsByRestaurantId = (restaurantId) => async (dispatch) => {
  if (!restaurantId) {
    dispatch(setError('Restaurant ID is required'));
    throw new Error('Restaurant ID is required');
  }

  try {
    dispatch(setLoading());
    const foodItemRef = collection(db, 'foodItems');
    const q = query(foodItemRef, where('restaurantId', '==', restaurantId));
    const querySnapshot = await getDocs(q);
    const foodItems = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    dispatch(setFoodItems(foodItems));
  } catch (error) {
    const errorMessage = error.message || 'Error fetching food items';
    dispatch(setError(errorMessage));
    throw new Error(errorMessage);
  }
};

export const addOrUpdateFood = (foodItem) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const foodItemRef = collection(db, 'foodItems');

    if (foodItem.id) {
      const foodDocRef = doc(db, 'foodItems', foodItem.id);
      await updateDoc(foodDocRef, {
        ...foodItem,
      });
      dispatch(updateFoodItem(foodItem));
    } else {
      const docRef = await addDoc(foodItemRef, {
        ...foodItem,
      });
      dispatch(addFoodItem({ id: docRef.id, ...foodItem }));
    }
  } catch (error) {
    console.error('Error in addOrUpdateFood:', error);
    const errorMessage = error.message || 'Error adding/updating food item';
    dispatch(setError(errorMessage));

    throw new Error(errorMessage);
  }
};

export const deleteFoodItemById = (foodItemId) => async (dispatch) => {
  if (!foodItemId) {
    dispatch(setError('Food Item ID is required'));
    throw new Error('Food Item ID is required');
  }

  try {
    dispatch(setLoading());
    const foodItemRef = doc(db, 'foodItems', foodItemId);
    await deleteDoc(foodItemRef);
    dispatch(deleteFoodItem(foodItemId));
  } catch (error) {
    const errorMessage = error.message || 'Error deleting food item';
    dispatch(setError(errorMessage));
    throw new Error(errorMessage);
  }
};

export const { addFoodItem, updateFoodItem, setFoodItems, deleteFoodItem, setLoading, setError } = foodSlice.actions;
export const selectFoodItems = (state) => state.food.foodItems;

export default foodSlice.reducer;
