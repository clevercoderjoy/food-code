import nonVegIcon from "../../public/images/nonVegIcon.svg";
import vegIcon from "../../public/images/vegIcon.svg";
import { food_img_url } from "../utils/constants";
import Accordion from "./Accordion";


const FoodCard = ({ foodItems, accordionOpen, onAccordionToggle }) => {

  console.log("foodItems", foodItems?.data[2]);

  const { areaName, avgRating, costForTwoMessage, city, cuisines, totalRatingsString, labels, name, } = foodItems?.data[2]?.card?.card?.info;
  const { offers } = foodItems?.data[3]?.cards?.cards?.gridElements?.infoWithStyle;

  const menuItems = foodItems?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((food) => food?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");

  const handleAccordionToggle = (index) => {
    onAccordionToggle(index);
  }

  return (
    <>
      <div className="menuContainer my-2 mx-[0.3rem] p-[0.3rem] border-2 border-black rounded-[3px]">
        <div className="resDetails border-2 border-black rounded-[3px] p-[0.3rem] flex items-center justify-between">
          <div className="resInfo flex flex-col text-left">
            <span className="resName text-[25px] font-bold">
              {name}
            </span>
            <span className="resCuisines text-lg">
              {foodItems?.data?.cards[0]?.card?.card?.info?.cuisines.join(", ")}
            </span>
            <span className="resArea text-base">
              {areaName}
            </span>
          </div>
          <div className="resRatings flex flex-col m-[0.3rem] border-[1.5px] border-black rounded-[3px] items-center p-[0.3rem] text-sm">
            <span className="starRatings py-2 px-[0.3rem]">
              ⭐{avgRating}
            </span>
            <span className="totalRatings py-2 px-[0.3rem] border-t-[1.5px] border-black">
              {totalRatingsString}
            </span>
          </div>
        </div>

        <div className="resDelivery border-2 rounded-[3px] text-center my-[0.7rem] border-black mx-auto p-[0.3rem] text-base">
          {foodItems?.data?.cards[0]?.card?.card?.info?.feeDetails?.message}
        </div>

        <div className="resOffers border-2 border-black rounded-[3px] p-[0.3rem]">
          <div className="offerHeader m-2 pb-1 text-xl font-bold border-b-2 border-black ">Special Offers Available For You</div>
          <div className="offerCarousels my-[0.3rem] mx-0 flex items-center overflow-x-scroll no-scrollbar">
            {
              foodItems?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.offers?.map((offer, index) => <div className="offerCarousel border-2 border-black rounded-[3px] m-[0.3rem] p-[0.3rem] flex items-center text-nowrap text-center w-auto h-[3rem]" key={index}>{offer?.info?.header}</div>)
            }
          </div>
        </div>
        <div className="menuItems border-2 border-black rounded-[3px] mt-[0.7rem] mx-auto mb-[0.1rem] p-[0.3rem]">
          {
            menuItems?.map((items, index) =>
            (
              <div className="categorizedItems mx-auto mb-0 py-[0.3rem]" key={index}>
                <div className="categoryTitle flex justify-center flex-col border-2 border-black rounded-[3px] text-center text-[25px] font-bold mx-auto px-[0.3rem]">

                  <Accordion title={`${items?.card?.card?.title} (${items?.card?.card?.itemCards?.length})`} content={
                    <div className="categoryItems">
                      {
                        items?.card?.card?.itemCards?.map((item) => {
                          const { name, description, imageId, isVeg, price, id, defaultPrice } = item.card.info;
                          const itemInCart = isItemInCart(id);
                          console.log(defaultPrice)
                          return (
                            <div className="foodItem border-2 border-black rounded-[3px] mt-2 mx-auto p-[0.3rem] flex items-start justify-between" key={id}>
                              <div className="foodDetails w-[83.5%] p-[0.1rem] my-2 mx-0">
                                <div className="foodName font-bold text-lg">{name}</div>
                                <div className="isVeg_price flex justify-between items-center">
                                  <div className="foodPrice text-xl text-center"><span className="currency">₹</span>{
                                    price ? (price?.toString().substring(0, price?.toString().length - 2)) : (defaultPrice.toString().substring(0, defaultPrice?.toString().length - 2))
                                  }</div>
                                  <div className="foodIsVeg m-2">
                                    {
                                      isVeg ? <img className="h-[30px] w-[30px]" src={vegIcon} alt="veg" /> : <img className="h-[30px] w-[30px]" src={nonVegIcon} alt="veg" />
                                    }
                                  </div>
                                </div>
                                <div className="foodDescription text-sm text-left">{description?.length > 300 ? (description.substring(0, 150)) : description}</div>
                              </div>
                              <div className="img_add">
                                <div className="foodImgContainer my-2 mx-auto">
                                  <img className="foodImg h-[100px] w-[100px] rounded-[5px] border-2 border-black" src={
                                    imageId ? (food_img_url + imageId) : "https://www.pngkey.com/png/full/114-1144514_foodlogo-question-mark-food-question-mark-png.png"
                                  } alt="food image" />
                                </div>
                                {
                                  itemInCart ? (
                                    <div className="added flex items-center justify-between my-4 mx-auto cursor-pointer font-bold p-[0.3rem] text-base rounded-[3px] border-black border-2 transition-all duration-100 ease-in-out hover:bg-black hover:text-white">
                                      <button className="minus tracking-[0.1rem] bg-transparent py-0 px-1">-</button>
                                      <div className="count">{getItemCount(id)}</div>
                                      <button className="plus tracking-[0.1rem] bg-transparent py-0 px-1" onClick={() => handleAddClick(item, foodItems)}>+</button>
                                    </div>
                                  ) : (
                                    <button className="add text-center block my-4 mx-auto cursor-pointer font-bold py-[0.3rem] px-2 text-sm w-[100%] rounded-[3px] tracking-[0.1rem] transition-all duration-100 ease-in-out border-black border-2 hover:uppercase" onClick={() => handleAddClick(item, foodItems)}>Add</button>
                                  )
                                }
                              </div>
                            </div>
                          );
                        })
                      }
                    </div>
                  } isOpen={index === accordionOpen}
                    onToggle={() => handleAccordionToggle(index)} />
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default FoodCard;