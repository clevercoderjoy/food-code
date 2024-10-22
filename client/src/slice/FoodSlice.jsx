import { createSlice } from '@reduxjs/toolkit';
import { collection, query, where, getDocs, addDoc, getFirestore } from 'firebase/firestore';
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

export const addFood = (foodItem) => async (dispatch) => {
  if (!foodItem.restaurantId) {
    dispatch(setError('Restaurant ID is required'));
    throw new Error('Restaurant ID is required');
  }

  try {
    dispatch(setLoading());
    const foodItemRef = collection(db, 'foodItems');
    const docRef = await addDoc(foodItemRef, {
      ...foodItem,
      createdAt: new Date().toISOString(),
    });
    dispatch(addFoodItem({ id: docRef.id, ...foodItem }));
    return docRef.id;
  } catch (error) {
    const errorMessage = error.message || 'Error adding food item';
    dispatch(setError(errorMessage));
    throw new Error(errorMessage);
  }
};

export const { addFoodItem, setFoodItems, setLoading, setError } = foodSlice.actions;
export const selectFoodItems = (state) => state.food.foodItems;

export default foodSlice.reducer;
