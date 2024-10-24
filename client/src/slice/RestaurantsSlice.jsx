import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, addDoc, updateDoc, doc, getFirestore, deleteDoc } from "firebase/firestore";
import app from "../firebase/config";

const db = getFirestore(app);

const processRestaurantData = (restaurantData) => {
  const processedCuisines = Array.isArray(restaurantData.cuisines)
    ? restaurantData.cuisines
    : typeof restaurantData.cuisines === 'string'
      ? restaurantData.cuisines.split(',').map(cuisine => cuisine.trim())
      : [];

  const processedOffers = restaurantData.offers
    ? (Array.isArray(restaurantData.offers)
      ? restaurantData.offers
      : restaurantData.offers.split(',').map(offer => offer.trim()))
    : [];

  return {
    name: restaurantData.name,
    avgRating: parseFloat(restaurantData.ratings) || 0,
    cloudinaryImageId: restaurantData.img,
    deliveryTime: parseInt(restaurantData.deliveryTime) || 30,
    costForTwo: parseInt(restaurantData.costForTwo) || 0,
    address: restaurantData.address || '',
    area: restaurantData.area || '',
    city: restaurantData.city || '',
    cuisines: processedCuisines,
    discount: restaurantData.discount || '',
    offers: processedOffers,
  };
};

export const fetchRestaurants = createAsyncThunk(
  "/restaurants/fetchRestaurants",
  async () => {
    try {
      const restaurantsRef = collection(db, "restaurants");
      const querySnapshot = await getDocs(restaurantsRef);
      const restaurants = [];
      querySnapshot.forEach((doc) => {
        restaurants.push({ id: doc.id, ...doc.data() });
      });
      return restaurants;
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      console.log(error.message);
    }
  }
);

export const addOrUpdateRestaurant = createAsyncThunk(
  "/restaurants/addOrUpdateRestaurant",
  async (restaurantData) => {
    try {
      const restaurantsRef = collection(db, "restaurants");

      const processedData = processRestaurantData(restaurantData);

      if (restaurantData.id) {
        const restaurantDocRef = doc(restaurantsRef, restaurantData.id);
        await updateDoc(restaurantDocRef, {
          info: processedData,
        });
        return { id: restaurantData.id, info: processedData };
      } else {
        const docRef = await addDoc(restaurantsRef, {
          info: processedData,
        });
        return { id: docRef.id, info: processedData };
      }
    } catch (error) {
      console.error("Error adding/updating restaurant:", error);
      console.log(error.message);
    }
  }
);


export const deleteRestaurant = createAsyncThunk(
  "/restaurants/deleteRestaurant",
  async (id) => {
    console.log(id)
    try {
      const restaurantDocRef = doc(db, "restaurants", id);
      await deleteDoc(restaurantDocRef);
      return id;
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  }
);

const initialState = {
  restaurants: [],
  filteredRestaurants: [],
  restaurantsLoading: true,
  searchText: '',
  starFilter: 0,
  error: null,
};

export const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    resetFilter: (state) => {
      state.filteredRestaurants = state.restaurants;
      state.searchText = "";
      state.starFilter = 0;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
      state.filteredRestaurants = applyFilters(
        state.restaurants,
        state.searchText,
        state.starFilter
      );
    },
    setStarFilter: (state, action) => {
      state.starFilter = action.payload;
      state.filteredRestaurants = applyFilters(
        state.restaurants,
        state.searchText,
        state.starFilter
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.restaurantsLoading = true;
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.restaurants = action.payload;
        state.filteredRestaurants = action.payload;
        state.restaurantsLoading = false;
        state.error = null;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.restaurantsLoading = false;
        state.error = action.payload;
      })
      .addCase(addOrUpdateRestaurant.pending, (state) => {
        state.error = null;
      })
      .addCase(addOrUpdateRestaurant.fulfilled, (state, action) => {
        const index = state.restaurants.findIndex(res => res.id === action.payload.id);
        if (index !== -1) {
          state.restaurants[index] = action.payload;
        } else {
          state.restaurants.push(action.payload);
        }
        state.filteredRestaurants = applyFilters(
          state.restaurants,
          state.searchText,
          state.starFilter
        );
      })
      .addCase(addOrUpdateRestaurant.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteRestaurant.fulfilled, (state, action) => {
        state.restaurants = state.restaurants.filter(res => res.id !== action.payload);
        state.filteredRestaurants = state.filteredRestaurants.filter(res => res.id !== action.payload);
      })
      .addCase(deleteRestaurant.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

const applyFilters = (restaurants, searchText, starFilter) => {
  return restaurants.filter((res) => {
    const matchesSearch = res?.info?.name?.toLowerCase().includes(searchText.toLowerCase());
    const matchesStarFilter = starFilter === 0 || (res?.info?.avgRating >= starFilter && res?.info?.avgRating < starFilter + 1);
    return matchesSearch && matchesStarFilter;
  });
};

export const { setSearchText, setStarFilter, resetFilter } = restaurantsSlice.actions;

export const selectRestaurantsLoading = (state) => state.restaurants.restaurantsLoading;
export const selectRestaurants = (state) => state.restaurants.restaurants;
export const selectFilteredRestaurants = (state) => state.restaurants.filteredRestaurants;
export const selectSearchText = (state) => state.restaurants.searchText;
export const selectStarFilter = (state) => state.restaurants.starFilter;
export const selectError = (state) => state.restaurants.error;

export default restaurantsSlice.reducer;