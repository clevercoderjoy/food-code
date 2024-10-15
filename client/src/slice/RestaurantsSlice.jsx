import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { restaurantsDataApi } from "../utils/constants";
import axios from "axios";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('restaurantsState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const fetchRestaurants = createAsyncThunk(
  "/restaurants/fetchRestaurants",
  async () => {
    try {
      const response = await axios.get(restaurantsDataApi);
      const restaurantUrls = response?.data || [];

      const restaurantData = await Promise.all(
        restaurantUrls.map(async (restaurantObj) => {
          const restaurantResponse = await axios.get(restaurantObj.url);
          return restaurantResponse?.data || null;
        })
      );
      return restaurantData.filter(Boolean);
    } catch (e) {
      console.error("Failed to fetch restaurants:", e);
      return [];
    }
  }
);

const initialState = loadState() || {
  restaurants: [],
  filteredRestaurants: [],
  restaurantsLoading: true,
  searchText: '',
  starFilter: 0,
};

export const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    resetFilter: (state) => {
      state.filteredRestaurants = state.restaurants;
      state.searchText = "";
      saveState(state);
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
      state.filteredRestaurants = applyFilters(state.restaurants, state.searchText, state.starFilter);
      saveState(state);
    },
    setStarFilter: (state, action) => {
      state.starFilter = action.payload;
      state.filteredRestaurants = applyFilters(state.restaurants, state.searchText, state.starFilter);
      saveState(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.restaurantsLoading = true;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.restaurants = action.payload;
        state.filteredRestaurants = action.payload;
        state.restaurantsLoading = false;
        saveState(state);
      })
  },
});

const applyFilters = (restaurants, searchText, starFilter) => {
  return restaurants.filter((res) => {
    const matchesSearch = res?.info?.name?.toLowerCase().includes(searchText.toLowerCase());
    const matchesStarFilter = starFilter === 0 || (res?.info?.avgRating >= starFilter && res?.info?.avgRating < starFilter + 1);
    return matchesSearch && matchesStarFilter;
  });
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('restaurantsState', serializedState);
  } catch (e) {
    console.log(e);
  }
};

export const { setSearchText, setStarFilter, resetFilter } = restaurantsSlice.actions;

export const selectRestaurantsLoading = (state) => state.restaurants.restaurantsLoading;
export const selectRestaurants = (state) => state.restaurants.restaurants;
export const selectFilteredRestaurants = (state) => state.restaurants.filteredRestaurants;
export const selectSearchText = (state) => state.restaurants.searchText;
export const selectStarFilter = (state) => state.restaurants.starFilter;

export default restaurantsSlice.reducer;