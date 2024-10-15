import { useDispatch, useSelector } from "react-redux";
import { resetFilter, selectStarFilter, setStarFilter } from "../slice/RestaurantsSlice";

const FilterButtons = () => {
  const dispatch = useDispatch();
  const starFilter = useSelector(selectStarFilter);

  const btnClass = "btn hover:uppercase hover:scale-110 text-center cursor-pointer font-bold p-2 rounded-[3px] border-black border-2 my-0 mx-4 tracking-widest transition-all duration-100 ease-in-out";
  const activeButton = "bg-black text-white";

  const handleFilter = (starRating) => {
    if (starRating === 0) {
      dispatch(resetFilter());
      dispatch(setStarFilter(0));
    }
    else {
      dispatch(setStarFilter(starRating));
    }
  };

  return (
    <div className="filterButtonContainer text-center mt-8 mx-auto mb-4">
      <button className={`${btnClass} ${starFilter === 5 ? activeButton : ""}`} onClick={() => handleFilter(5)}>5 Stars</button>
      <button className={`${btnClass} ${starFilter === 4 ? activeButton : ""}`} onClick={() => handleFilter(4)}>4+ Stars</button>
      <button className={`${btnClass} ${starFilter === 3 ? activeButton : ""}`} onClick={() => handleFilter(3)}>3+ Stars</button>
      <button className={btnClass} onClick={() => handleFilter(0)}>Reset</button>
    </div>
  );
}

export default FilterButtons;
