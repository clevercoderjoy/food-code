import { useDispatch, useSelector } from "react-redux";
import Accordion from "../components/Accordion";
import { addToCart, emptyCart, removeFromCart, selectCart, selectCurrResId } from "../slice/CartSlice";
import { fetchRestaurants, selectFilteredRestaurants } from "../slice/RestaurantsSlice";
import { useEffect, useState } from "react";

const Cart = () => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const restaurants = useSelector(selectFilteredRestaurants);
  const currResId = useSelector(selectCurrResId);
  const [accordionOpen, setAccordionOpen] = useState([false, false, false, false]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const currentRestaurant = restaurants.find((restaurant) => restaurant?.info?.id === currResId);
  const accordionClass = "border-black border-2 my-2 p-[0.3rem] rounded-[3px] text-left";

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  const handleAccordionToggle = (index) => {
    const newAccordionState = accordionOpen.map((isOpen, i) => (i === index ? !isOpen : isOpen));
    setAccordionOpen(newAccordionState);
  };

  const getTotalCartAmount = () => {
    const totalAmount = cart.reduce((total, item) => {
      const itemTotal = (item.price || item.defaultPrice) * item.quantity;
      return total + itemTotal;
    }, 0);
    return totalAmount / 100;
  };

  const handlePayment = () => {
    if (cart.length > 0) {
      setPaymentSuccess(true);
      dispatch(emptyCart());
    }
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
      <div className="cartSummary border-2 border-black my-[0.3rem] p-[0.3rem]  rounded-[3px]">
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
          <div className="resRatings flex flex-col m-[0.3rem] border-[1.5px] w-[125px] border-black rounded-[3px] items-center p-[0.3rem] text-sm font-bold">
            <span className="starRatings py-2 px-[0.3rem]">
              {currentRestaurant?.info?.avgRating ? `⭐ ${currentRestaurant?.info?.avgRating}` : ""}
            </span>
            <span className="totalRatings py-2 px-[0.3rem] border-t-[1.5px] w-full border-black">
              {currentRestaurant?.info?.totalRatingsString}
            </span>
          </div>
        </div>
        <div className="resDelivery border-2 rounded-[3px] text-left my-[0.7rem] border-black mx-auto p-4 text-base flex flex-col">
          <div className="addressInfo">
            <span className="addressTitle font-bold ">Address: </span>
            <span className="addressString">{currentRestaurant?.cta?.data[2]?.card.card.info.labels[1].message}</span>
          </div>
          <div className="cityInfo">
            <span className="city font-bold">City: </span>
            <span className="city">{currentRestaurant?.cta?.data[2]?.card.card.info.city}</span>
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
                    {currentRestaurant?.cta?.data?.[3]?.card?.card?.gridElements?.infoWithStyle?.offers?.map((offer, index) => (
                      <div className="offerCarousel border-2 border-black rounded-[3px] m-[0.3rem] mx-auto cursor-pointer hover:bg-black hover:text-white font-bold p-[0.5rem] flex items-center text-nowrap text-center w-auto h-[3rem]" key={index}>
                        {offer?.info?.header}
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
                <form className="addressForm p-4 flex flex-col gap-4">
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
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        className="border-2 border-black p-2 rounded"
                        placeholder="Pin Code"
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
              }
              isOpen={accordionOpen[1]}
              onToggle={() => handleAccordionToggle(1)}
            />
          </div>
        </div>
        <div className="accordionContainer">
          <div className={`${accordionClass} offerSelector font-bold`}>
            <Accordion
              title="Your Order:"
              content={
                <div className="cartItems my-4">
                  {cart.map((item) => (
                    <div className="cartItemContainer flex justify-between items-center my-2 border-black border-2 py-[0.3rem] px-2 rounded-[3px] text-lg" key={item?.id}>
                      <div className="cartItemName w-[300px] font-bold text-left">{item?.name}</div>
                      <div className="flex items-center justify-center gap-8">
                        <div className="cartItemQuantityButtons flex gap-6 font-bold border-black border-2 px-4 py-1 rounded-[3px] my-2">
                          <button className="quantityButtons cursor-pointer" onClick={() => dispatch(removeFromCart(item))}>-</button>
                          <div className="cartItemQuantity">{item?.quantity}</div>
                          <button className="quantityButtons cursor-pointer" onClick={() => dispatch(addToCart({ resId: currentRestaurant?.info?.id, foodItem: item }))}>+</button>
                        </div>
                        <div className="cartItemPrice font-bold text-2xl">₹{item?.price ? (item?.price * item?.quantity) / 100 : (item?.defaultPrice * item?.quantity) / 100}</div>
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
                    <span>{getTotalCartAmount()}</span>
                  </div>
                  <button
                    className="flex items-center justify-center border-black border-2 mx-auto mt-4 px-8 text-xl rounded py-4 hover:bg-black hover:text-white"
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