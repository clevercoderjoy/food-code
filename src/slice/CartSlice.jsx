import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  cart: [],
  currResId: null,
}

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
    },

    removeFromCart: (state, action) => {
      const foodItem = action.payload;
      const doesItemExistsInCart = state.cart.find((item) => item.id === foodItem.id);
      doesItemExistsInCart.quantity > 1 ? doesItemExistsInCart.quantity -= 1 : state.cart = state.cart.filter((item) => item.id !== foodItem.id);
    },
    deleteFromCart: (state, action) => {
      const foodItem = action.payload;
      state.cart = state.cart.filter((item) => item.id !== foodItem.id);
    },
    emptyCart: (state, action) => {
      state.cart = [];
    }
  },
})

export const { emptyCart, removeFromCart, addToCart, deleteFromCart } = cartSlice.actions;

export const selectCart = (state) => state.cart.cart;
export const selectCurrResId = (state) => state.cart.currResId;

export default cartSlice.reducer;