import { useSelector } from "react-redux";
import RestaurantCard from "../components/RestaurantCard";
import ShimmerHome from "../components/shimmerHome";
import { selectRestaurantsLoading } from "../slice/RestaurantsSlice";
import { selectCurrentUser } from "../slice/UserSlice";
import AddCard from "../components/AddCard";

const RestaurantMapper = ({ restaurants, currentPage }) => {
  const shimmerCardCount = Array.from({ length: 12 }, () => "");
  const restaurantsLoading = useSelector(selectRestaurantsLoading);
  const currentUser = useSelector(selectCurrentUser);
  return (
    <div className="container mx-auto py-8">
      <div className="restaurantCards flex flex-grow flex-wrap items-center justify-center">
        {restaurantsLoading ? (
          shimmerCardCount.map((_, index) => <ShimmerHome key={index} />)
        ) : (
          <>
            {currentUser?.role === 'admin' && currentPage === 1 && <AddCard />}
            {restaurants?.length > 0 ? (
              restaurants.map((restaurant, index) => (
                <RestaurantCard key={index} restaurant={restaurant} />
              ))
            ) : (
              <div className="w-full text-center py-16">
                <div className="text-5xl font-bold">
                  No Restaurants found for this filter! :/
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RestaurantMapper;
