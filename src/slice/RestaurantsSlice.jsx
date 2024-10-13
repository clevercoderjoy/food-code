import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { restaurantsDataApi } from "../utils/constants";
import axios from "axios";

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

const initialState = {
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
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
      state.filteredRestaurants = applyFilters(state.restaurants, state.searchText, state.starFilter);
    },
    setStarFilter: (state, action) => {
      state.starFilter = action.payload;
      state.filteredRestaurants = applyFilters(state.restaurants, state.searchText, state.starFilter);
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


export const { setSearchText, setStarFilter, resetFilter } = restaurantsSlice.actions;

export const selectRestaurantsLoading = (state) => state.restaurants.restaurantsLoading;
export const selectRestaurants = (state) => state.restaurants.restaurants;
export const selectFilteredRestaurants = (state) => state.restaurants.filteredRestaurants;
export const selectSearchText = (state) => state.restaurants.searchText;
export const selectStarFilter = (state) => state.restaurants.starFilter;

export default restaurantsSlice.reducer;
