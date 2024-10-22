import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FoodCard from "../components/FoodCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoodItemsByRestaurantId, selectFoodItems } from "../slice/FoodSlice";

const RestaurantPage = () => {
  const location = useLocation();
  const { restaurant } = location.state;
  const [accordionOpen, setAccordionOpen] = useState(0);
  const dispatch = useDispatch();
  const foodItems = useSelector(selectFoodItems);

  useEffect(() => {
    dispatch(fetchFoodItemsByRestaurantId(restaurant.id));
  }, [dispatch, restaurant.id]);


  const handleAccordionToggle = (index) => {
    setAccordionOpen(accordionOpen === index ? null : index);
  };

  return (
    <>
      {foodItems ? (
        <FoodCard
          foodItems={foodItems}
          restaurant={restaurant}
          accordionOpen={accordionOpen}
          onAccordionToggle={handleAccordionToggle}
        />
      ) : (
        <div>Loading menu...</div>
      )}
    </>
  );
};

export default RestaurantPage;
