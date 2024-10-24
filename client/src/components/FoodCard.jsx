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
import { selectCurrentUser } from "../slice/UserSlice";
import { deleteFoodItemById } from "../slice/FoodSlice";


const FoodCard = ({ foodItems, restaurant }) => {

  const [accordionOpen, setAccordionOpen] = useState(0);
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const isAdmin = currentUser?.role === 'admin';

  const groupedFoodItems = foodItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const categoryWiseFoodItems = Object.keys(groupedFoodItems).map(category => ({
    category,
    items: groupedFoodItems[category],
  }));

  const { address, areaName, avgRating, city, costForTwo, cuisines, name, offers } = restaurant.info;

  const handleAccordionToggle = (index) => {
    setAccordionOpen(accordionOpen === index ? null : index);
  };

  const getItemCount = (food) => {
    if (!food?.id) return 0;
    const itemInCart = cart.find((item) => item.id === food.id);
    return itemInCart ? itemInCart.quantity : 0;
  };

  const getTotalCartItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleAddToCart = (foodItem) => {
    const currentCount = getItemCount(foodItem);
    if (currentCount < 3) {
      dispatch(addToCart({
        resId: restaurant.id || restaurant.info.name.toLowerCase(),
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

  const handleDeleteFromCart = (foodItem) => {
    dispatch(deleteFromCart(foodItem));
    toast.error(`${foodItem.name} has been deleted from cart!`);
  };

  const handleDeleteFoodItem = async (foodItemId) => {
    try {
      if (window.confirm('Are you sure you want to delete this food item?')) {
        await dispatch(deleteFoodItemById(foodItemId));
        toast.success('Food item deleted successfully!');
      }
    } catch (error) {
      toast.error('Failed to delete food item: ' + error.message);
    }
  };

  const handleEditFoodItem = (foodItem) => {
    navigate('/restaurants/addFood', {
      state: {
        editMode: true,
        foodItem: {
          ...foodItem,
          restaurantId: restaurant.id || `${restaurant.info.name}`.replace(/\s+/g, '-').toLowerCase()
        }
      }
    });
  };

  return (
    <>
      <div className="menuContainer my-2 mx-[0.3rem] p-[0.3rem] border-2 border-black rounded-[3px]">
        {cart.length > 0 && (
          <button className="viewCartButton fixed bottom-1 bg-white text-black right-[11rem] py-[1rem] font-bold px-4 text-center text-lg z-10 font-bold bg-black border-black border-2 hover:uppercase rounded cursor-pointer"
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
          <div className="resRatings flex flex-col m-[0.3rem] border-2 border-black rounded-[3px] items-center p-[0.3rem] text-sm font-bold bg-white">
            <span className="starRatings py-2 px-[0.3rem]">
              Ratings: ⭐{avgRating}
            </span>
          </div>
        </div>
        <div className="resDelivery border-2 rounded-[3px] text-left my-[0.7rem] border-black mx-auto p-4 text-base flex flex-col">
          <div className="addressInfo">
            <span className="addressTitle font-bold ">Address: </span>
            <span className="addressString">{address}</span>
          </div>
          <div className="cityInfo">
            <span className="city font-bold">City: </span>
            <span className="city">{city}</span>
          </div>
          <div className="costInfo">
            <span className="cost font-bold">Cost for two: </span>
            <span className="costString">₹{costForTwo}</span>
          </div>
        </div>

        <div className="resOffers border-2 border-black rounded-[3px] p-[0.3rem]">
          <div className="offerHeader m-2 pb-4 text-xl font-bold border-b-2 border-black ">Special Offers Available For You</div>
          <div className="offerCarousels my-[0.3rem] mx-0 flex items-center overflow-x-scroll no-scrollbar">
            {
              offers.map((offer, index) => <div className="offerCarousel border-2 border-black rounded-[3px] m-[0.3rem] bg-white mx-auto cursor-pointer hover:bg-black hover:text-white font-bold p-[0.5rem] flex items-center text-nowrap text-center w-auto h-[3rem]" key={index}>{offer}</div>)
            }
          </div>
        </div>
        <div className="menuItems border-2 border-black rounded-[3px] mt-[0.7rem] mx-auto mb-[0.1rem] p-[0.3rem]">
          {categoryWiseFoodItems.map((food, index) => (
            <div className="categorizedItems mx-auto mb-0 py-[0.3rem]" key={index}>
              <div className="categoryTitle flex justify-center flex-col border-2 border-black rounded-[3px] text-center text-[25px] font-bold mx-auto px-[0.3rem]">
                <Accordion
                  title={food.category}
                  content={
                    <div className="categoryItems">
                      {food.items.map((foodItem, index) => {
                        const { description, image, name, type, price } = foodItem;
                        return (
                          <div className="foodItem border-2 rounded-[3px] mt-2 mx-auto p-[0.3rem] flex items-start justify-between relative" key={index}>
                            <div className="foodDetails w-full p-[0.1rem] my-2 mx-0">
                              <div className="foodName font-bold text-lg text-left">{name}</div>
                              <div className="isVeg_price flex justify-between items-center">
                                <div className="foodPrice text-xl text-center">
                                  <span className="currency">₹</span>
                                  {price}
                                </div>
                                <div className="foodIsVeg m-2">
                                  {type.toLowerCase() === "veg" ? (
                                    <img className="h-[30px] w-[30px]" src={vegIcon} alt="veg" />
                                  ) : (
                                    <img className="h-[30px] w-[30px]" src={nonVegIcon} alt="non-veg" />
                                  )}
                                </div>
                              </div>
                              <div className="foodDescription text-[18px] text-left">
                                {description?.length > 300 ? description.substring(0, 500) + "..." : description}
                              </div>
                            </div>
                            <div className="img_add flex flex-col items-center justify-center relative">
                              <div className="foodImgContainer my-2 mx-auto">
                                <img
                                  className="foodImg h-[100px] w-[150px] rounded-[5px] border-2 border-black"
                                  src={
                                    image
                                      ? food_img_url + image
                                      : "https://www.pngkey.com/png/full/114-1144514_foodlogo-question-mark-food-question-mark-png.png"
                                  }
                                  alt="food image"
                                />
                              </div>

                              {getItemCount(foodItem) > 0 ? (
                                <div className="flex items-center justify-between w-full">
                                  <BadgeX
                                    className="h-[35px] w-[35px] rounded-full cursor-pointer mr-2"
                                    onClick={() => handleDeleteFromCart(foodItem)}
                                  />
                                  <div className="added flex items-center justify-between my-4 w-full mx-auto cursor-pointer font-bold p-[0.3rem] text-base rounded-[3px] border-black border-2 transition-all bg-white duration-100 ease-in-out hover:bg-black hover:text-white cursor-pointer">
                                    <button className="minus tracking-[0.1rem] bg-transparent py-0 px-1" onClick={() => handleRemoveFromCart(foodItem)}>-</button>
                                    <div className="count font-bold">{getItemCount(foodItem)}</div>
                                    <button className="plus tracking-[0.1rem] bg-transparent py-0 px-1 cursor-pointer" onClick={() => handleAddToCart(foodItem)}>+</button>
                                  </div>
                                </div>
                              ) : (
                                <button
                                  className="add text-center bg-white block my-4 mx-auto cursor-pointer font-bold py-[0.425rem] px-2 text-sm w-full rounded-[3px] tracking-[0.1rem] transition-all duration-100 ease-in-out border-black border-2 hover:uppercase"
                                  onClick={() => handleAddToCart(foodItem)}
                                >
                                  Add
                                </button>
                              )}

                              {isAdmin && (
                                <div className="adminActions absolute right-[35rem] bottom-3 flex justify-center items-center space-x-4">
                                  <button className="editBtn bg-white transition-all duration-100 ease-in-out border-black border-2 text-black bg-transparent rounded cursor-pointer font-bold py-1 px-3 hover:bg-black hover:text-white"
                                    onClick={() => handleEditFoodItem(foodItem)}>
                                    Edit
                                  </button>
                                  <button className="deleteBtn transition-all bg-white duration-100 ease-in-out border-black border-2 text-black bg-transparent rounded cursor-pointer font-bold py-1 px-3 hover:bg-black hover:text-white" onClick={() => handleDeleteFoodItem(foodItem.id)}>
                                    Delete
                                  </button>
                                </div>
                              )}

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