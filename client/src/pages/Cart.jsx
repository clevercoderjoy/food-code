import { useDispatch, useSelector } from "react-redux";
import Accordion from "../components/Accordion";
import { addToCart, emptyCart, removeFromCart, selectCart, selectCurrResId } from "../slice/CartSlice";
import { fetchRestaurants, selectFilteredRestaurants } from "../slice/RestaurantsSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addUserAddress, fetchUserAddresses, selectCurrentAddressSelected, selectUserAddressList, setCurrentAddressSelected } from "../slice/UserAddressSlice";
import { selectCurrentUser, selectIsUserLoggedIn, setShowModal } from "../slice/UserSlice";
import { createOrder } from "../slice/OrderSlice";

const Cart = () => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const restaurants = useSelector(selectFilteredRestaurants);
  const currResId = useSelector(selectCurrResId);
  const userAddressList = useSelector(selectUserAddressList);
  const currentAddressSelected = useSelector(selectCurrentAddressSelected);
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
  const currentUser = useSelector(selectCurrentUser);

  const [accordionOpen, setAccordionOpen] = useState([false, false, false, false]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const currentRestaurant = restaurants.find((restaurant) => restaurant.id === currResId);

  const accordionClass = "border-black border-2 my-2 p-[0.3rem] rounded-[3px] text-left";

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser?.uid) {
      dispatch(fetchUserAddresses(currentUser.uid));
    }
  }, [currentUser, dispatch]);

  const handleAccordionToggle = (index) => {
    setAccordionOpen(accordionOpen.map((isOpen, i) => i === index ? !isOpen : isOpen));
  };

  const getTotalCartAmount = () => {
    return cart.reduce((total, item) => {
      const itemPrice = item.price;
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!currentUser?.uid) {
      toast.error('Please log in to add an address');
      return;
    }

    const formData = new FormData(event.target);
    const addressData = Object.fromEntries(formData.entries());

    try {
      await dispatch(addUserAddress({
        userId: currentUser.uid,
        address: addressData
      })).unwrap();

      toast.success('Address added successfully');
      event.target.reset();
    } catch (error) {
      console.error('Error details:', error);
      toast.error('Failed to add address: ' + error.message);
    }
  };

  const handlePayment = async () => {
    if (!isUserLoggedIn) {
      dispatch(setShowModal(true));
      toast.error('Please log in to proceed with payment and select a delivery address.');
      return;
    }

    if (!currentAddressSelected || Object.keys(currentAddressSelected).length === 0) {
      toast.error('Please select a delivery address before proceeding with payment.');
      setAccordionOpen(accordionOpen.map((isOpen, i) => (i === 1 ? true : isOpen)));
      return;
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty. Please add items to your cart.');
      return;
    }

    try {
      const orderData = {
        items: cart,
        totalAmount: getTotalCartAmount(),
        deliveryAddress: currentAddressSelected,
        restaurant: {
          id: currentRestaurant.id,
          name: currentRestaurant.info.name,
          address: currentRestaurant.info.address
        },
        orderDate: new Date().toISOString(),
        status: 'placed'
      };

      await dispatch(createOrder({
        userId: currentUser.uid,
        orderData
      })).unwrap();

      setPaymentSuccess(true);
      dispatch(emptyCart());
      dispatch(setCurrentAddressSelected(null));
      toast.success('Payment successful! Thank you for your purchase.');
    } catch (error) {
      toast.error('Failed to process order: ' + error.message);
    }
  };

  const handleAddressSelection = (e) => {
    const selectedIndex = e.target.value;
    if (selectedIndex === "") {
      dispatch(setCurrentAddressSelected([]));
    } else {
      const selectedAddress = userAddressList[selectedIndex];
      dispatch(setCurrentAddressSelected(selectedAddress));
    }
  };

  const getItemCount = (food) => {
    if (!food?.id) return 0;
    const itemInCart = cart.find((item) => item.id === food.id);
    return itemInCart ? itemInCart.quantity : 0;
  };

  const handleAddToCart = (foodItem) => {
    const currentCount = getItemCount(foodItem);
    if (currentCount < 3) {
      dispatch(addToCart({
        resId: currentRestaurant.id || currentRestaurant.info.name.toLowerCase(),
        foodItem
      }));
      toast.success(`${foodItem.name} added to cart!`);
    } else {
      toast.warn(`Maximum limit reached! You can only add 3 quantity per item to the cart.`);
    }
  };

  const handleRemoveFromCart = (foodItem) => {
    dispatch(removeFromCart(foodItem));
    toast.error(`${foodItem.name} removed from cart!`);
  };

  const renderCartContent = () => {
    if (cart.length === 0 && !paymentSuccess) {
      return (
        <div className="text-center text-lg font-bold">
          Your cart is empty. Please add items to your cart.
        </div>
      );
    }

    if (paymentSuccess) {
      return (
        <div className="text-center text-lg font-bold mt-4">
          Thank you for shopping with us!
        </div>
      );
    }

    return (
      <div className="cartSummary border-2 border-black my-[0.3rem] p-[0.3rem] rounded-[3px]">
        <div className="resDetails border-2 border-black rounded-[3px] p-[0.3rem] flex items-center justify-between">
          <div className="resInfo flex flex-col text-left">
            <span className="resName text-[25px] font-bold">
              {currentRestaurant?.info?.name}
            </span>
            <span className="resCuisines text-lg">
              {currentRestaurant?.info?.cuisines.join(", ")}
            </span>
            <span className="resArea text-base">
              {currentRestaurant?.info?.areaName}
            </span>
          </div>
          <div className="resRatings flex flex-col m-[0.3rem] border-2 border-black rounded-[3px] items-center p-[0.3rem] bg-white text-sm font-bold">
            <span className="starRatings py-2 px-[0.3rem]">
              Ratings: ⭐{currentRestaurant?.info?.avgRating}
            </span>
          </div>
        </div>
        <div className="resDelivery border-2 rounded-[3px] text-left my-[0.7rem] border-black mx-auto p-4 text-base flex flex-col">
          <div className="addressInfo">
            <span className="addressTitle font-bold ">Address: </span>
            <span className="addressString">{currentRestaurant?.info?.address}</span>
          </div>
          <div className="cityInfo">
            <span className="city font-bold">City: </span>
            <span className="city">{currentRestaurant?.info?.city}</span>
          </div>
          <div className="costInfo">
            <span className="cost font-bold">Cost for two: </span>
            <span className="costString">{currentRestaurant?.info?.costForTwo}</span>
          </div>
        </div>
        <div className="accordionContainer">
          <div className={`${accordionClass} offerSelector font-bold`}>
            <Accordion
              title="Special Offers Available For You!"
              content={
                <div className="resOffers border-2 border-black rounded-[3px] p-[0.3rem]">
                  <div className="offerCarousels my-[0.3rem] mx-0 flex items-center overflow-x-scroll no-scrollbar">
                    {currentRestaurant?.info?.offers?.map((offer, index) => (
                      <div className="offerCarousel border-2 border-black bg-white rounded-[3px] m-[0.3rem] mx-auto cursor-pointer hover:bg-black hover:text-white font-bold p-[0.5rem] flex items-center text-nowrap text-center w-auto h-[3rem]" key={index}>
                        {offer}
                      </div>
                    ))}
                  </div>
                </div>
              }
              isOpen={accordionOpen[0]}
              onToggle={() => handleAccordionToggle(0)}
            />
          </div>
        </div>
        <div className="accordionContainer">
          <div className={`${accordionClass} offerSelector font-bold`}>
            <Accordion
              title="Select/Input delivery address"
              content={
                <>
                  <form className="addressForm p-4 flex flex-col gap-4" onSubmit={handleFormSubmit}>
                    <div className="nameAndContact flex justify-around items-center">
                      <div className="formField">
                        <label htmlFor="firstName" className="block text-lg font-bold">First Name</label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          className="border-2 border-black p-2 rounded"
                          placeholder="First name"
                          required
                        />
                      </div>
                      <div className="formField">
                        <label htmlFor="lastName" className="block text-lg font-bold">Last Name</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          className="border-2 border-black p-2 rounded"
                          placeholder="Last name"
                          required
                        />
                      </div>
                      <div className="formField">
                        <label htmlFor="contactNumber" className="block text-lg font-bold">Contact Number</label>
                        <input
                          type="tel"
                          id="contactNumber"
                          name="contactNumber"
                          className="border-2 border-black p-2 rounded"
                          placeholder="Mobile"
                          maxLength={10}
                          pattern="[0-9]{10}"
                          required
                        />
                      </div>
                      <div className="formField">
                        <label htmlFor="email" className="block text-lg font-bold">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="border-2 border-black p-2 rounded"
                          placeholder="Email"
                          required
                        />
                      </div>
                    </div>
                    <div className="formField">
                      <label htmlFor="street" className="block text-lg font-bold">Street Address</label>
                      <input
                        type="text"
                        id="street"
                        name="street"
                        className="border-2 border-black p-2 rounded w-full"
                        placeholder="Address"
                        required
                      />
                    </div>
                    <div className="address flex items-center justify-evenly">
                      <div className="formField">
                        <label htmlFor="city" className="block text-lg font-bold">City</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          className="border-2 border-black p-2 rounded"
                          placeholder="City"
                          required
                        />
                      </div>
                      <div className="formField">
                        <label htmlFor="state" className="block text-lg font-bold">State</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          className="border-2 border-black p-2 rounded"
                          placeholder="State"
                          required
                        />
                      </div>
                      <div className="formField">
                        <label htmlFor="postalCode" className="block text-lg font-bold">Postal Code</label>
                        <input
                          type="number"
                          id="postalCode"
                          name="postalCode"
                          className="border-2 border-black p-2 rounded"
                          placeholder="Pin Code"
                          maxLength={6}
                          required
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800"
                    >
                      Submit
                    </button>
                  </form>
                  {userAddressList.length > 0 && (
                    <div className="flex justify-center mt-4">
                      <select
                        name="selectAddress"
                        id="selectAddress"
                        className="w-full p-2 border-2 border-black rounded-[3px] text-lg font-bold bg-white cursor-pointer focus:outline-none"
                        onChange={handleAddressSelection}
                      >
                        <option value="">Select a saved address</option>
                        {
                          userAddressList.map((address, index) => (
                            <option key={index} value={index}>
                              {address.firstName} {address.lastName} - {address.street}, {address.city}
                            </option>
                          ))
                        }
                      </select>
                    </div>
                  )}
                </>
              }
              isOpen={accordionOpen[1]}
              onToggle={() => handleAccordionToggle(1)}
            />
          </div>
        </div>
        <div className="accordionContainer">
          <div className={`${accordionClass} offerSelector font-bold`}>
            <Accordion
              title="Your Order(s):"
              content={
                <div className="cartItems mt-4">
                  {cart.map((item) => (
                    <div className="cartItemContainer flex justify-between items-center py-[0.3rem] px-2 rounded-[3px] mt-3 h-[5rem] text-lg gap-5" key={item?.id}>
                      <div className="cartItemName w-[300px] font-bold text-left text-xl">{item?.name}</div>
                      <div className="flex items-center justify-center gap-8">
                        <div className="cartItemQuantityButtons flex gap-6 font-bold border-black border-2 px-4 py-1 rounded-[3px] my-2 bg-white">
                          <button className="quantityButtons cursor-pointer" onClick={() => handleRemoveFromCart(item)}>-</button>
                          <div className="cartItemQuantity">{item?.quantity}</div>
                          <button className="quantityButtons cursor-pointer" onClick={() => handleAddToCart(item)}>+</button>
                        </div>
                        <div className="cartItemPrice font-bold text-2xl w-[5rem] text-right mr-2">₹{item?.price * item?.quantity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              }
              isOpen={accordionOpen[2]}
              onToggle={() => handleAccordionToggle(2)}
            />
          </div>
        </div>
        <div className="accordionContainer">
          <div className={`${accordionClass} offerSelector font-bold`}>
            <Accordion
              title="Make Payment"
              content={
                <div>
                  <div className="totalAmount flex items-center justify-between text-xl mt-4">
                    <span>Total Payable Amount:</span>
                    <span>₹{getTotalCartAmount()}</span>
                  </div>
                  <button
                    className="flex items-center justify-center border-black border-2 mx-auto mt-4 px-8 bg-white text-xl rounded py-4 hover:bg-black hover:text-white"
                    onClick={handlePayment}
                  >
                    Pay Now
                  </button>
                </div>
              }
              isOpen={accordionOpen[3]}
              onToggle={() => handleAccordionToggle(3)}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <h2 className="text-4xl font-bold">The Cart Page</h2>
      <div className="cartContainer m-[0.3rem] p-[0.3rem] border-black border-2 rounded-[3px]">
        {renderCartContent()}
      </div>
    </>
  );
};

export default Cart;