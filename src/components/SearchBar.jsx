import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input"
import { selectSearchText, setSearchText } from "../slice/RestaurantsSlice";

const SearchBar = () => {

  const dispatch = useDispatch();
  const searchText = useSelector(selectSearchText)

  const handleSearch = (e) => {
    const searchText = e.target.value.toUpperCase();
    dispatch(setSearchText(searchText));
  };

  return (
    <>
      <div className="searchBarContainer mt-6 mx-auto mb-2 text-center font-bold">
        <Input placeholderText="Search...🔍" onChange={(e) => handleSearch(e)} value={searchText} />
      </div>
    </>
  )
}

export default SearchBar;