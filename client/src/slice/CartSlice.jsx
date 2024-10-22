import { createSlice } from "@reduxjs/toolkit";

const saveCartToLocalStorage = (cartData) => {
  localStorage.setItem('cartItems', JSON.stringify(cartData));
};

const getCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem('cartItems');
  return storedCart ? JSON.parse(storedCart) : { cart: [], currResId: null };
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: getCartFromLocalStorage().cart,
    currResId: getCartFromLocalStorage().currResId,
    isLoading: false,
  },
  reducers: {
    setCartData: (state, action) => {
      state.cart = action.payload.cart;
      state.currResId = action.payload.currResId;
      state.isLoading = false;
    },
    addToCart: (state, action) => {
      const { foodItem, resId } = action.payload;

      if (state.currResId !== null && state.currResId !== resId) {
        state.cart = [];
      }
      state.currResId = resId;

      const existingItem = state.cart.find(item => item.id === foodItem.id);
      if (existingItem) {
        if (existingItem.quantity < 3) {
          existingItem.quantity += 1;
        }
      } else {
        state.cart.push({ ...foodItem, quantity: 1 });
      }

      saveCartToLocalStorage({
        cart: state.cart,
        currResId: state.currResId,
      });
    },
    removeFromCart: (state, action) => {
      const foodItem = action.payload;
      const existingItem = state.cart.find(item => item.id === foodItem.id);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.cart = state.cart.filter(item => item.id !== foodItem.id);
        }
      }

      saveCartToLocalStorage({
        cart: state.cart,
        currResId: state.currResId,
      });
    },
    deleteFromCart: (state, action) => {
      const foodItem = action.payload;
      state.cart = state.cart.filter(item => item.id !== foodItem.id);

      if (state.cart.length === 0) {
        state.currResId = null;
      }

      saveCartToLocalStorage({
        cart: state.cart,
        currResId: state.currResId,
      });
    },
    emptyCart: (state) => {
      state.cart = [];
      state.currResId = null;

      saveCartToLocalStorage({
        cart: [],
        currResId: null,
      });
    }
  }
});

export const initializeCart = () => (dispatch) => {
  const storedCart = getCartFromLocalStorage();
  dispatch(setCartData(storedCart));
};

export const {
  setCartData,
  addToCart,
  removeFromCart,
  deleteFromCart,
  emptyCart
} = cartSlice.actions;

export const selectCart = (state) => state.cart.cart;
export const selectCurrResId = (state) => state.cart.currResId;
export const selectIsLoading = (state) => state.cart.isLoading;

export default cartSlice.reducer;
