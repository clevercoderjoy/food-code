import { FaRegPlusSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddCard = () => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/restaurants/addRestaurant");
  }

  return (
    <div
      onClick={handleAddClick}
      className="w-[240px] h-[375px] mt-4 mx-2 mb-4 rounded-lg border-2 border-black shadow-md transition-transform duration-200 ease-in-out flex items-center justify-center relative hover:scale-105 cursor-pointer"
    >
      <FaRegPlusSquare size={40} />
    </div>
  );
};

export default AddCard;
