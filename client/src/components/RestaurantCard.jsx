import { useNavigate } from "react-router-dom";
import { CDN_URL } from "../utils/constants";
import { showEllipsis } from "../utils/helperFunctions";
import { useDispatch, useSelector } from "react-redux";
import { FaPen } from 'react-icons/fa';
import { IoFastFood } from "react-icons/io5";
import { selectCurrentUser } from "../slice/UserSlice";
import { TiDelete } from "react-icons/ti";
import { deleteRestaurant } from "../slice/RestaurantsSlice";



const RestaurantCard = ({ restaurant }) => {
  const {
    avgRating,
    cloudinaryImageId,
    costForTwo,
    cuisines,
    deliveryTime,
    discount,
    name,
  } = restaurant.info;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cuisine = cuisines.length < 2
    ? cuisines.map((cuisine) => `${cuisine} `).join(", ")
    : showEllipsis(cuisines.join(", "), 2);

  const openRestaurantMenu = () => {
    navigate(`/restaurants/${restaurant.id}`, {
      state: { restaurant: restaurant }
    })
  }
  const currentUser = useSelector(selectCurrentUser);
  const isAdmin = currentUser?.role === 'admin';
  const handleEditRestaurantClick = () => {
    navigate("/restaurants/addRestaurant", {
      state: { restaurantData: restaurant }
    });
  };

  const handleEditFoodMenuClick = () => {
    navigate("/restaurants/addFood", {
      state: { restaurant: restaurant, editMode: false, }
    });
  }

  const handleDeleteClick = () => {
    const confirmed = window.confirm("Are you sure you want to delete this restaurant?");
    if (confirmed) {
      dispatch(deleteRestaurant(restaurant.id));
    }
  }

  return (
    <div className="restaurantContainer w-[240px] h-[375px] mt-4 mx-2 mb-4 rounded-lg border-2 border-black shadow-md transition-transform duration-200 ease-in-out relative hover:scale-105 cursor-pointer">
      {isAdmin && (
        <>
          <div className="relative" onClick={handleEditRestaurantClick}>
            <div className="absolute top-0 left-0 z-10 bg-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 group">
              <FaPen className="text-gray-700 hover:text-gray-900 cursor-pointer" />
              <span className="absolute left-0 top-[-18px] transform -translate-y-1/2 whitespace-nowrap bg-black text-white text-sm p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Edit Restaurant
              </span>
            </div>
          </div>
          <div className="relative" onClick={handleDeleteClick}>
            <div className="absolute bottom-[-357px] left-[11.5rem] text-2xl z-10 bg-white p-1 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 group">
              <TiDelete className="text-gray-700 hover:text-gray-900 cursor-pointer" />
              <span className="absolute left-0 top-[-18px] transform -translate-y-1/2 whitespace-nowrap bg-black text-white text-sm p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Delete Restaurant
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute top-0 right-0 z-10 bg-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 group" onClick={handleEditFoodMenuClick}>
              <IoFastFood className="text-gray-700 hover:text-gray-900 cursor-pointer" />
              <span className="absolute left-0 top-[-18px] transform -translate-y-1/2 whitespace-nowrap bg-black text-white text-sm p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Edit Food Menu
              </span>
            </div>
          </div>
        </>
      )}
      <div className="restaurantImgContainer m-auto text-center p-2">
        <img
          src={CDN_URL + cloudinaryImageId || "https://www.pngkey.com/png/full/114-1144514_foodlogo-question-mark-food-question-mark-png.png"}
          alt="food-image"
          className="restaurantImg w-full object-cover h-[160px] rounded-lg"
        />
      </div>
      <div className="restaurantDetailsContainer my-2 mx-2 border-t-2 border-black pt-2">
        <div className="restaurantName text-left text-lg font-bold truncate">
          {name.length > 15 ? `${name.substring(0, 15)}...` : name}
        </div>
        <div className="restaurantFoodDetails flex justify-between items-center text-xs my-1">
          {
            avgRating ? (
              <div>
                <span className="ratings">{avgRating}⭐</span>
                <span className="separator font-bold">|</span>
              </div>
            )
              :
              <></>
          }
          <span className="time">{deliveryTime} mins</span>
          <span className="separator font-bold">|</span>
          <span className="avgPrice">₹{costForTwo} for two</span>
        </div>
        <div className="restaurantCuisines text-left px-1 text-sm">
          <span>{cuisine}</span>
        </div>
        <div className="
        s my-2 mx-0 rounded-md font-bold text-sm flex items-center justify-center text-center">
          {discount === undefined
            ? "Offers Coming Soon"
            : discount}
        </div>
      </div>
      <button
        className="view text-center block cursor-pointer font-bold p-2 text-sm rounded-md tracking-wide border-black border-2 transition-all duration-100 ease-in-out absolute bottom-2 bg-white left-1/2 transform -translate-x-1/2 hover:uppercase"
        onClick={openRestaurantMenu}
      >
        Quick View
      </button>
    </div>
  );
};

export default RestaurantCard;
