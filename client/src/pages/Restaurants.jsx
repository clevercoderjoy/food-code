import { useEffect, useState } from 'react';
import FilterButtons from '../components/FilterButtons';
import RestaurantMapper from '../services/RestaurantMapper';
import SearchBar from '../components/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants, selectFilteredRestaurants, selectRestaurantsLoading } from '../slice/RestaurantsSlice';
import Pagination from '../components/Pagination';
import { selectCurrentUser } from '../slice/UserSlice';

const Restaurants = () => {

  const dispatch = useDispatch();
  const restaurantsLoading = useSelector(selectRestaurantsLoading);
  const [currentPage, setCurrentPage] = useState(1);
  const filteredRestaurants = useSelector(selectFilteredRestaurants)
  const currentUser = useSelector(selectCurrentUser);
  const itemsPerPage = currentUser && currentUser?.role === "admin" ? 11 : 12;

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch])

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalItems = Math.ceil(filteredRestaurants.length / itemsPerPage);
  const currentPageRestaurants = filteredRestaurants.slice(indexOfFirstItem, indexOfLastItem);
  const disablePagination = filteredRestaurants.length === 0 || restaurantsLoading;

  return (
    <>
      <SearchBar />
      <FilterButtons />
      <RestaurantMapper restaurants={currentPageRestaurants} currentPage={currentPage} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={totalItems}
        disableButtons={disablePagination}
      />
    </>
  )
}

export default Restaurants
