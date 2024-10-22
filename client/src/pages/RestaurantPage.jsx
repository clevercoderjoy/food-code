import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FoodCard from "../components/FoodCard";
import { useDispatch } from "react-redux";
import { fetchFoodItemsByRestaurant } from "../slice/FoodSlice";

const RestaurantPage = () => {
  const location = useLocation();
  const { restaurantId } = location.state;
  const [accordionOpen, setAccordionOpen] = useState(0);
  const dispatch = useDispatch();
  const [data, setData] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(fetchFoodItemsByRestaurant(restaurantId));
        setData(result.payload);
      } catch (error) {
        console.error("Failed to fetch food items:", error);
      }
    };

    fetchData();
  }, [dispatch, restaurantId]);

  console.log("🚀 ~ file: RestaurantPage.jsx:14 ~ RestaurantPage ~ data:", data);

  const handleAccordionToggle = (index) => {
    setAccordionOpen(accordionOpen === index ? null : index);
  };

  return (
    <>
      {/* {restaurantMenu ? (
        <FoodCard
          foodItems={restaurantMenu}
          accordionOpen={accordionOpen}
          onAccordionToggle={handleAccordionToggle}
        />
      ) : (
        <div>Loading menu...</div>
      )} */}
    </>
  );
};

export default RestaurantPage;
