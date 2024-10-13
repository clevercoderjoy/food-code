import { useLocation } from "react-router-dom";

const RestaurantPage = () => {

  const location = useLocation();
  const { restaurantMenu } = location.state;
  console.log(restaurantMenu);

  return (
    <></>
  );
}

export default RestaurantPage;
