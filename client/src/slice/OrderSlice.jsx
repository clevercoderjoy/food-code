import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, getFirestore, doc, updateDoc, setDoc } from "firebase/firestore";
import app from "../firebase/config";

const db = getFirestore(app);

export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async () => {
    try {
      const ordersRef = collection(db, "orders");
      const querySnapshot = await getDocs(ordersRef);

      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });

      return orders;
    } catch (error) {
      console.log(error)
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, status }) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status });

      return { orderId, status };
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData) => {
    try {
      const ordersRef = collection(db, "orders");
      const newOrderData = {
        ...orderData,
        status: orderData.status || "placed",
      };

      const newOrderRef = doc(ordersRef);
      await setDoc(newOrderRef, newOrderData);

      return { id: newOrderRef.id, ...newOrderData };
    } catch (error) {
      console.log(error.message);
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
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.ordersList = action.payload.filter(order => order.status !== "delivered");
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { orderId, status } = action.payload;
        if (status === "delivered") {
          state.ordersList = state.ordersList.filter(order => order.id !== orderId);
        } else {
          state.ordersList = state.ordersList.map(order =>
            order.id === orderId ? { ...order, status } : order
          );
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status !== "delivered") {
          state.ordersList.push(action.payload);
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectOrders = (state) => state.orders.ordersList;
export const selectOrdersLoading = (state) => state.orders.loading;
export const selectOrdersError = (state) => state.orders.error;

export default ordersSlice.reducer;