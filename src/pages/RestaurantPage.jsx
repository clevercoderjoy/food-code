import { useState } from "react";
import { useLocation } from "react-router-dom";
import FoodCard from "../components/FoodCard";

const RestaurantPage = () => {
  const location = useLocation();
  const { restaurantMenu } = location.state;
  const [accordionOpen, setAccordionOpen] = useState(0);

  const handleAccordionToggle = (index) => {
    setAccordionOpen(accordionOpen === index ? null : index);
  };

  return (
    <>
      {restaurantMenu ? (
        <FoodCard
          foodItems={restaurantMenu}
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
