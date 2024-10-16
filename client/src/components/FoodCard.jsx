import { useState } from "react";
import nonVegIcon from "/images/nonVegIcon.svg";
import vegIcon from "/images/vegIcon.svg";
import { food_img_url } from "../utils/constants";
import Accordion from "./Accordion";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart, removeFromCart, selectCart } from "../slice/CartSlice";
import { useNavigate } from "react-router-dom";
import { BadgeX } from "lucide-react";
import { toast } from "react-toastify";


const FoodCard = ({ foodItems }) => {

  const [accordionOpen, setAccordionOpen] = useState(0);
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const navigate = useNavigate();

  const { areaName, avgRating, costForTwoMessage, city, cuisines, totalRatingsString, labels, name, id } = foodItems?.data[2]?.card?.card?.info;
  const { offers } = foodItems?.data[3]?.card?.card?.gridElements?.infoWithStyle;
  const { cards } = foodItems?.data[4]?.groupedCard?.cardGroupMap?.REGULAR

  const menuItems = cards.slice(2, cards.length - 2);
  const handleAccordionToggle = (index) => {
    setAccordionOpen(accordionOpen === index ? null : index);
  };

  const getItemCount = (food) => {
    const itemInCart = cart.find((item) => item.id === food.id);
    return itemInCart ? itemInCart.quantity : 0;
  }

  const getTotalCartItems = () => {
    let totalCartItems = 0;
    cart.map((item) => totalCartItems += item.quantity)
    return totalCartItems;
  }

  return (
    <>
      <div className="menuContainer my-2 mx-[0.3rem] p-[0.3rem] border-2 border-black rounded-[3px]">
        {cart.length > 0 && (
          <button className="viewCartButton fixed bottom-1 right-[11rem] py-[1rem] font-bold px-4 text-center text-lg font-bold bg-black text-white rounded cursor-pointer"
            onClick={() => navigate("/cart")}>
            View Cart ({getTotalCartItems()})
          </button>
        )}
        <div className="resDetails border-2 border-black rounded-[3px] p-[0.3rem] flex items-center justify-between">
          <div className="resInfo flex flex-col text-left">
            <span className="resName text-[25px] font-bold">
              {name}
            </span>
            <span className="resCuisines text-lg">
              {
                cuisines.join(", ")
              }
            </span>
            <span className="resArea text-base">
              {areaName}
            </span>
          </div>
          <div className="resRatings flex flex-col m-[0.3rem] border-[1.5px] border-black rounded-[3px] items-center p-[0.3rem] text-sm font-bold">
            <span className="starRatings py-2 px-[0.3rem]">
              {
                avgRating ? `⭐${avgRating}` : ""
              }
            </span>
            <span className="totalRatings py-2 px-[0.3rem] border-t-[1.5px] border-black">
              {totalRatingsString}
            </span>
          </div>
        </div>
        <div className="resDelivery border-2 rounded-[3px] text-left my-[0.7rem] border-black mx-auto p-4 text-base flex flex-col">
          <div className="addressInfo">
            <span className="addressTitle font-bold ">Address: </span>
            <span className="addressString">{labels[1]?.message}</span>
          </div>
          <div className="cityInfo">
            <span className="city font-bold">City: </span>
            <span className="city">{city}</span>
          </div>
          <div className="costInfo">
            <span className="cost font-bold">Cost for two: </span>
            <span className="costString">{costForTwoMessage}</span>
          </div>
        </div>

        <div className="resOffers border-2 border-black rounded-[3px] p-[0.3rem]">
          <div className="offerHeader m-2 pb-4 text-xl font-bold border-b-2 border-black ">Special Offers Available For You</div>
          <div className="offerCarousels my-[0.3rem] mx-0 flex items-center overflow-x-scroll no-scrollbar">
            {
              offers.map((offer, index) => <div className="offerCarousel border-2 border-black rounded-[3px] m-[0.3rem] mx-auto cursor-pointer hover:bg-black hover:text-white font-bold p-[0.5rem] flex items-center text-nowrap text-center w-auto h-[3rem]" key={index}>{offer?.info?.header}</div>)
            }
          </div>
        </div>
        <div className="menuItems border-2 border-black rounded-[3px] mt-[0.7rem] mx-auto mb-[0.1rem] p-[0.3rem]">
          {menuItems?.map((items, index) => (
            <div className="categorizedItems mx-auto mb-0 py-[0.3rem]" key={index}>
              <div className="categoryTitle flex justify-center flex-col border-2 border-black rounded-[3px] text-center text-[25px] font-bold mx-auto px-[0.3rem]">
                <Accordion
                  title={`${items?.card?.card?.title} (${items?.card?.card?.itemCards?.length || items?.card?.card?.categories?.length})`}
                  content={
                    <div className="categoryItems">
                      {items?.card?.card?.itemCards?.map((foodItem, index) => {
                        const { name, price, defaultPrice, description, imageId, isVeg } = foodItem?.card?.info;
                        return (
                          <div className="foodItem border-2 rounded-[3px] mt-2 mx-auto p-[0.3rem] flex items-start justify-between" key={index}>
                            <div className="foodDetails w-full p-[0.1rem] my-2 mx-0">
                              <div className="foodName font-bold text-lg">{name}</div>
                              <div className="isVeg_price flex justify-between items-center">
                                <div className="foodPrice text-xl text-center">
                                  <span className="currency">₹</span>
                                  {price ? (price?.toString().substring(0, price?.toString().length - 2)) : (defaultPrice?.toString().substring(0, defaultPrice?.toString().length - 2))}
                                </div>
                                <div className="foodIsVeg m-2">
                                  {isVeg ? <img className="h-[30px] w-[30px]" src={vegIcon} alt="veg" /> : <img className="h-[30px] w-[30px]" src={nonVegIcon} alt="non-veg" />}
                                </div>
                              </div>
                              <div className="foodDescription text-sm text-left">{description?.length > 300 ? (description.substring(0, 150)) : description}</div>
                            </div>
                            <div className="img_add  flex flex-col items-center justify-center">
                              <div className="foodImgContainer my-2 mx-auto">
                                <img className="foodImg h-[100px] w-[150px] rounded-[5px] border-2 border-black" src={
                                  imageId ? (food_img_url + imageId) : "https://www.pngkey.com/png/full/114-1144514_foodlogo-question-mark-food-question-mark-png.png"
                                } alt="food image" />
                              </div>
                              {
                                getItemCount(foodItem?.card?.info) > 0 ? (
                                  <div className="flex items-center justify-between w-full">
                                    <BadgeX
                                      className="h-[35px] w-[35px] rounded-full cursor-pointer mr-2"
                                      onClick={() => {
                                        dispatch(deleteFromCart(foodItem?.card?.info));
                                        toast.error(`${foodItem?.card?.info?.name} has been deleted from cart!`);
                                      }
                                      }
                                    />
                                    <div className="added flex items-center justify-between my-4 w-full mx-auto cursor-pointer font-bold p-[0.3rem] text-base rounded-[3px] border-black border-2 transition-all duration-100 ease-in-out hover:bg-black hover:text-white cursor-pointer">
                                      <button className="minus tracking-[0.1rem] bg-transparent py-0 px-1"
                                        onClick={() => {
                                          dispatch(removeFromCart(foodItem?.card?.info))
                                          toast.error(`${foodItem?.card?.info?.name} removed from cart!`);
                                        }}>-</button>
                                      <div className="count font-bold">{getItemCount(foodItem?.card?.info)}</div>
                                      <button className="plus tracking-[0.1rem] bg-transparent py-0 px-1 cursor-pointer" onClick={() => {
                                        const currentCount = getItemCount(foodItem?.card?.info);
                                        if (currentCount < 3) {
                                          dispatch(addToCart({ resId: id, foodItem: foodItem?.card?.info }));
                                          toast.success(`${foodItem?.card?.info?.name} added to cart!`);
                                        } else {
                                          toast.warn(`Maximum limit reached! You can only add 3 ${foodItem?.card?.info?.name}s to the cart.`);
                                        }
                                      }}>+</button>
                                    </div>
                                  </div>
                                ) : (
                                  <button className="add text-center block my-4 mx-auto cursor-pointer font-bold py-[0.425rem] px-2 text-sm w-full rounded-[3px] tracking-[0.1rem] transition-all duration-100 ease-in-out border-black border-2 hover:uppercase" onClick={() => {
                                    const currentCount = getItemCount(foodItem?.card?.info);
                                    if (currentCount < 3) {
                                      dispatch(addToCart({ resId: id, foodItem: foodItem?.card?.info }));
                                      toast.success(`${foodItem?.card?.info?.name} added to cart!`);
                                    } else {
                                      toast.warn(`Maximum limit reached! You can only add 3 quantity per item to the cart.`);
                                    }
                                  }}>Add</button>
                                )
                              }
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  }
                  isOpen={index === accordionOpen}
                  onToggle={() => handleAccordionToggle(index)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default FoodCard;