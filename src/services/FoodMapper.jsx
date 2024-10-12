import { useState } from "react";
// import FoodCard from "../../components/FoodCard";
// import ShimmerMenu from '../../components/ShimmerMenu';

const FoodMapper = ({ menu }) => {
  const [accordionOpen, setAccordionOpen] = useState(0);

  const handleAccordionToggle = (index) => {
    setAccordionOpen(accordionOpen === index ? null : index)
  }

  return (
    <>
      {/* {menu ? (<FoodCard foodItems={menu} accordionOpen={accordionOpen} onAccordionToggle={handleAccordionToggle} />) : (<ShimmerMenu />)} */}
    </>
  );
}

export default FoodMapper;
