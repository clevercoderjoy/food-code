import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userAddress: {
    firstName: "",
    lastName: "",
    mobile: null,
    email: "",
    address: "",
    city: "",
    state: "",
    pinCode: null,
  },
  userAddressList: JSON.parse(localStorage.getItem('userAddressList')) || [],
  currentAddressSelected: JSON.parse(localStorage.getItem('userAddressList')) || null,
};

const userAddressSlice = createSlice({
  name: 'userAddress',
  initialState,
  reducers: {
    setUserAddress(state, action) {
      const newAddress = action.payload;
      const addressExists = state.userAddressList.some(
        (address) =>
          address.firstName === newAddress.firstName &&
          address.lastName === newAddress.lastName &&
          address.mobile === newAddress.mobile &&
          address.email === newAddress.email &&
          address.address === newAddress.address &&
          address.city === newAddress.city &&
          address.state === newAddress.state &&
          address.pinCode === newAddress.pinCode
      );

      if (!addressExists) {
        state.userAddress = newAddress;
        state.userAddressList = [newAddress, ...state.userAddressList];
        localStorage.setItem('userAddressList', JSON.stringify(state.userAddressList));
      } else {
        console.log('Address already exists');
      }
    },
    getUserAddressList(state) {
      return state.userAddressList;
    },
    setCurrentAddressSelected(state, action) {
      state.currentAddressSelected = action.payload;
      localStorage.setItem('currentAddressSelected', JSON.stringify(state.currentAddressSelected));
    },
  },
});

export const { setUserAddress, getUserAddressList, setCurrentAddressSelected } = userAddressSlice.actions;

export const selectUserAddress = (state) => state.userAddress.userAddress;
export const selectUserAddressList = (state) => state.userAddress.userAddressList;
export const selectCurrentAddressSelected = (state) => state.userAddress.currentAddressSelected;

export default userAddressSlice.reducer;
