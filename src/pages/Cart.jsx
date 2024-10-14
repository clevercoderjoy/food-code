import { useDispatch, useSelector } from "react-redux";
import Accordion from "../components/Accordion";
import { addToCart, removeFromCart, selectCart, selectCurrResId } from "../slice/CartSlice";
import { fetchRestaurants, selectFilteredRestaurants } from "../slice/RestaurantsSlice";
import { useEffect, useState } from "react";

const Cart = () => {

  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const restaurants = useSelector(selectFilteredRestaurants);
  const currResId = useSelector(selectCurrResId);
  const [accordionOpen, setAccordionOpen] = useState(null);

  const currentRestaurant = restaurants.find((restaurant) => restaurant?.info?.id === currResId);

  const addressManager = <>
    <h1>This is the address manager</h1></>;
  const offerSelector = <>
    <h1>This is the offerSelector</h1></>;
  const paymentSelector = <>
    <h1>This is the payment selector</h1></>;
  const accordionClass = "border-black border-2 my-2 p-[0.3rem] rounded-[3px] text-left";

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch])

  const handleAccordionToggle = (index) => {
    setAccordionOpen(accordionOpen === index ? null : index);
  };


  console.log("currentRestaurant", currentRestaurant?.cta?.data?.[3]?.card?.card?.gridElements?.infoWithStyle?.offers)
  // console.log(cart);

  return (
    <>
      <h2 className="text-4xl font-bold">The Cart Page</h2>
      <div className="cartContainer m-[0.3rem] p-[0.3rem] border-black border-2 rounded-[3px]">
        <div className="cartSummary border-2 border-black my-[0.3rem] p-[0.3rem]  rounded-[3px]">
          <div className="resDetails border-2 border-black rounded-[3px] p-[0.3rem] flex items-center justify-between">
            <div className="resInfo flex flex-col text-left">
              <span className="resName text-[25px] font-bold">
                {currentRestaurant?.info?.name}
              </span>
              <span className="resCuisines text-lg">
                {
                  currentRestaurant?.info?.cuisines.join(", ")
                }
              </span>
              <span className="resArea text-base">
                {currentRestaurant?.info?.areaName}
              </span>
            </div>
            <div className="resRatings flex flex-col m-[0.3rem] border-[1.5px] w-[125px] border-black rounded-[3px] items-center p-[0.3rem] text-sm font-bold">
              <span className="starRatings py-2 px-[0.3rem]">
                {
                  currentRestaurant?.info?.avgRating ? `⭐ ${currentRestaurant?.info?.avgRating}` : ""
                }
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
                  currentRestaurant?.cta?.data?.[3]?.card?.card?.gridElements?.infoWithStyle?.offers?.map((offer, index) => (
                    <div
                      className="offerCarousel border-2 border-black rounded-[3px] m-[0.3rem] mx-auto cursor-pointer  font-bold p-[0.5rem] flex items-center text-nowrap text-center w-auto h-[3rem]"
                      key={index}
                    >
                      {offer?.info?.header}
                    </div>
                  ))
                }
                isOpen={accordionOpen === 0}
                onToggle={() => handleAccordionToggle(0)}
              />
            </div>
          </div>
          {cart.map((item) =>
            <div className="cartItemContainer flex justify-between items-center my-2 border-black border-2 py-[0.3rem] px-2 rounded-[3px] text-lg" key={item?.id}>
              {console.log(item)}
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
          )}
        </div>



        {/* <div className={`${accordionClass} addressManager`}>
            <Accordion title="Select Address" content={addressManager} />
          </div>
          <div className={`${accordionClass} paymentSelector`}>
            <Accordion title="Complete Your Payment" content={paymentSelector} />
          </div> */}
      </div>
    </>
  )
}

export default Cart;