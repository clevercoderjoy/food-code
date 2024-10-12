import { Link } from "react-router-dom";
import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ restaurant }) => {
  // console.log("object", restaurant);

  const {
    cloudinaryImageId,
    cuisines,
    name,
    avgRating,
    promoted,
    sla: { deliveryTime },
    costForTwo,
    aggregatedDiscountInfoV3,
  } = restaurant.info;

  const cuisinesWithDots = () => {
    let cuisine = "";
    for (let i = 0; i < 2; i++) {
      cuisine += " " + cuisines[i];
    }
    return cuisine + "...";
  };

  const cuisine =
    cuisines.length < 2
      ? cuisines.map((cuisine) => `${cuisine} `)
      : cuisinesWithDots();

  return (
    <div className="restaurantContainer w-[240px] h-[375px] mt-4 mx-2 mb-4 rounded-lg border-2 border-black shadow-md transition-transform duration-200 ease-in-out relative hover:scale-105 cursor-pointer">
      {promoted && (
        <label className="absolute z-10 font-bold top-2 left-2 border-black rounded-tl-lg bg-black text-white py-1 px-2 text-xs">
          Promoted
        </label>
      )}
      <div className="restaurantImgContainer m-auto text-center p-2">
        <img
          src={CDN_URL + cloudinaryImageId}
          alt="food-image"
          className="restaurantImg w-full object-cover h-[160px] rounded-lg"
        />
      </div>
      <div className="restaurantDetailsContainer my-2 mx-2 border-t-2 border-black pt-2">
        <div className="restaurantName text-lg font-bold truncate">
          {name.length > 15 ? `${name.substring(0, 15)}...` : name}
        </div>
        <div className="restaurantFoodDetails flex justify-between items-center text-xs my-1">
          <span className="ratings">{avgRating}⭐</span>
          <span className="separator font-bold">|</span>
          <span className="time">{deliveryTime} mins</span>
          <span className="separator font-bold">|</span>
          <span className="avgPrice">{costForTwo}</span>
        </div>
        <div className="restaurantCuisines text-left px-1 text-sm">
          <span>{cuisine}</span>
        </div>
        <div className="offers my-2 mx-0 rounded-md font-bold text-sm flex items-center justify-center text-center">
          {aggregatedDiscountInfoV3?.header === undefined &&
            aggregatedDiscountInfoV3?.subHeader === undefined
            ? "Offers Coming Soon"
            : `${aggregatedDiscountInfoV3?.header || ""} ${aggregatedDiscountInfoV3?.subHeader || ""}`}
        </div>
      </div>
      <button className="view text-center block cursor-pointer font-bold p-2 text-sm rounded-md tracking-wide border-black border-2 transition-all duration-100 ease-in-out absolute bottom-2 left-1/2 transform -translate-x-1/2 hover:uppercase">
        <Link to={`/restaurants/${restaurant?.info?.id}`}>
          Quick View
        </Link>
      </button>
    </div>
  );
};

export default RestaurantCard;
