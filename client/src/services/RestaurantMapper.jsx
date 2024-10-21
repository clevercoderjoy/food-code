import { useSelector } from "react-redux";
import RestaurantCard from "../components/RestaurantCard";
import ShimmerHome from "../components/shimmerHome";
import { selectRestaurantsLoading } from "../slice/RestaurantsSlice";
import Modal from "../components/Modal";
import { selectCurrentUser, selectShowModal } from "../slice/UserSlice";
import AddCard from "../components/AddCard";

const RestaurantMapper = ({ restaurants }) => {
  const showModal = useSelector(selectShowModal);
  const shimmerCardCount = Array.from({ length: 12 }, () => "");
  const restaurantsLoading = useSelector(selectRestaurantsLoading);
  const currentUser = useSelector(selectCurrentUser);

  console.log("🚀 ~ file: RestaurantMapper.jsx:15 ~ RestaurantMapper ~ currentUser:", currentUser);

  return (
    <div className="container mx-auto py-8">
      <div className="restaurantCards flex flex-grow flex-wrap items-center justify-center">
        {restaurantsLoading ? (
          <ShimmerHome />
        ) : (
          <>
            {currentUser?.role === 'admin' && <AddCard />}
            {restaurants?.length > 0 ? (
              restaurants.map((restaurant, index) => (
                <RestaurantCard key={index} restaurant={restaurant} />
              ))
            ) : (
              !restaurantsLoading && (
                <div className="w-full text-center py-16">
                  <div className="text-5xl font-bold">
                    No Restaurants found for this filter! :/
                  </div>
                </div>
              )
            )}
          </>
        )}
        {restaurantsLoading && restaurants?.length === 0 &&
          shimmerCardCount.map((_, index) => <ShimmerHome key={index} />)}
      </div>
      {showModal && <Modal />}
    </div>
  );
};

export default RestaurantMapper;
