import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const useRestaurantMenu = () => {

  console.log(menu_urls)
  const [restaurantMenu, setRestaurantMenu] = useState();
  const { resId } = useParams();

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await fetch(menu_urls[resId]);
        const data = await response.json();
        setRestaurantMenu(data);
      }
      catch (error) {
        console.log("Error: ", error);
      }
    }
    fetchFoodData();
  }, [resId])

  return restaurantMenu;

}

export default useRestaurantMenu;