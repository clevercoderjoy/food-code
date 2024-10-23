
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, query, where, getFirestore } from "firebase/firestore";
import app from "../firebase/config"

const db = getFirestore(app);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async ({ userId, orderData }, { rejectWithValue }) => {
    try {
      const orderToSave = {
        ...orderData,
        userId,
        orderDate: new Date().toISOString(),
        status: "placed",
      };

      const ordersRef = collection(db, "orders");
      const docRef = await addDoc(ordersRef, orderToSave);

      return {
        id: docRef.id,
        ...orderToSave
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });

      return orders;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    ordersList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.ordersList.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.ordersList = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectOrders = (state) => state.orders.ordersList;
export const selectOrdersLoading = (state) => state.orders.loading;
export const selectOrdersError = (state) => state.orders.error;

export default ordersSlice.reducer;