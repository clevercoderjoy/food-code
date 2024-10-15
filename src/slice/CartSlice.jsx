import { createSlice } from "@reduxjs/toolkit"

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cartState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const initialState = loadState() || {
  cart: [],
  currResId: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const foodItem = action.payload.foodItem;
      const resId = action.payload.resId;
      if (state.currResId !== null && state.currResId !== resId) {
        state.cart = [];
      }
      state.currResId = resId;
      const doesItemExistInCart = state.cart.find((item) => item.id === foodItem.id);
      if (doesItemExistInCart) {
        if (doesItemExistInCart.quantity < 3) {
          doesItemExistInCart.quantity += 1;
        }
      } else {
        state.cart.push({ ...foodItem, quantity: 1 });
      }
      saveState(state);
    },

    removeFromCart: (state, action) => {
      const foodItem = action.payload;
      const doesItemExistsInCart = state.cart.find((item) => item.id === foodItem.id);
      if (doesItemExistsInCart.quantity > 1) {
        doesItemExistsInCart.quantity -= 1;
      } else {
        state.cart = state.cart.filter((item) => item.id !== foodItem.id);
      }
      saveState(state);
    },

    deleteFromCart: (state, action) => {
      const foodItem = action.payload;
      state.cart = state.cart.filter((item) => item.id !== foodItem.id);
      saveState(state);
    },

    emptyCart: (state) => {
      state.cart = [];
      state.currResId = null;
      saveState(state);
    }
  },
})

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cartState', serializedState);
  } catch (e) {
    console.log(e)
  }
};

export const { emptyCart, removeFromCart, addToCart, deleteFromCart } = cartSlice.actions;

export const selectCart = (state) => state.cart.cart;
export const selectCurrResId = (state) => state.cart.currResId;

export default cartSlice.reducer;