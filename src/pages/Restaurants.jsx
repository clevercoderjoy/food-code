import { useEffect, useState } from 'react';
import FilterButtons from '../components/FilterButtons';
import RestaurantMapper from '../services/RestaurantMapper';
import SearchBar from '../components/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants, selectFilteredRestaurants } from '../slice/RestaurantsSlice';
import Pagination from '../components/Pagination';

const Restaurants = () => {

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const filteredRestaurants = useSelector(selectFilteredRestaurants)
  const itemsPerPage = 12;

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch])

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalItems = Math.ceil(filteredRestaurants.length / itemsPerPage);
  const currentPageRestaurants = filteredRestaurants.slice(indexOfFirstItem, indexOfLastItem);
  console.log(currentPageRestaurants)

  return (
    <>
      <SearchBar />
      <FilterButtons />
      <RestaurantMapper restaurants={currentPageRestaurants} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={totalItems}
      />
    </>
  )
}

export default Restaurants
