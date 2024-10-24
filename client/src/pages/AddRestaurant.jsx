import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addOrUpdateRestaurant } from "../slice/RestaurantsSlice";
import { toast } from "react-toastify";

const AddRestaurant = () => {
  const location = useLocation();
  const restaurantData = location.state?.restaurantData;

  const [restaurantDetails, setRestaurantDetails] = useState({
    id: restaurantData ? restaurantData.id : "",
    name: "",
    ratings: "",
    img: "",
    deliveryTime: "",
    costForTwo: "",
    address: "",
    area: "",
    city: "",
    cuisines: "",
    discount: "",
    offers: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (restaurantData) {
      setRestaurantDetails({
        id: restaurantData.id,
        name: restaurantData.info.name || "",
        ratings: restaurantData.info.avgRating || "",
        img: restaurantData.info.cloudinaryImageId || "",
        deliveryTime: restaurantData.info.deliveryTime || "",
        costForTwo: restaurantData.info.costForTwo || "",
        address: restaurantData.info.address || "",
        area: restaurantData.info.area || "",
        city: restaurantData.info.city || "",
        cuisines: restaurantData.info.cuisines || "",
        discount: restaurantData.info.discount || "",
        offers: restaurantData.info.offers || "",
      });
    }
  }, [restaurantData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurantDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addOrUpdateRestaurant(restaurantDetails)).unwrap();
      toast.success("Restaurant added/updated successfully!");
      navigate("/restaurants");
    } catch (error) {
      console.error("Error adding/updating restaurant:", error);
      toast.error("Failed to add/update restaurant. Please try again.");
    }
  };

  return (
    <div className="adminContainer p-4 m-8 border-2 border-black rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        {restaurantData ? "Edit Restaurant" : "Add New Restaurant"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1 text-left">Restaurant Name:</label>
            <input
              type="text"
              name="name"
              value={restaurantDetails.name}
              onChange={handleChange}
              required
              className="border-2 border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1 text-left">Image ID:</label>
            <input
              type="text"
              name="img"
              value={restaurantDetails.img}
              onChange={handleChange}
              required
              className="border-2 border-gray-300 rounded p-2 w-full"
            />
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1 text-left">Ratings:</label>
            <input
              type="number"
              name="ratings"
              value={restaurantDetails.ratings}
              onChange={handleChange}
              required
              min="0"
              max="5"
              step="0.1"
              className="border-2 border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1 text-left">Delivery Time (in minutes):</label>
            <input
              type="number"
              name="deliveryTime"
              value={restaurantDetails.deliveryTime}
              onChange={handleChange}
              required
              className="border-2 border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1 text-left">Cost for Two:</label>
            <input
              type="number"
              name="costForTwo"
              value={restaurantDetails.costForTwo}
              onChange={handleChange}
              required
              className="border-2 border-gray-300 rounded p-2 w-full"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1 text-left">Address:</label>
          <input
            type="text"
            name="address"
            value={restaurantDetails.address}
            onChange={handleChange}
            required
            className="border-2 border-gray-300 rounded p-2 w-full"
          />
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1 text-left">Area:</label>
            <input
              type="text"
              name="area"
              value={restaurantDetails.area}
              onChange={handleChange}
              required
              className="border-2 border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1 text-left">City:</label>
            <input
              type="text"
              name="city"
              value={restaurantDetails.city}
              onChange={handleChange}
              required
              className="border-2 border-gray-300 rounded p-2 w-full"
            />
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1 text-left">Cuisines (comma separated):</label>
            <input
              type="text"
              name="cuisines"
              value={restaurantDetails.cuisines}
              onChange={handleChange}
              required
              placeholder="e.g., Italian, Indian, Chinese"
              className="border-2 border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1 text-left">Discount:</label>
            <input
              type="text"
              name="discount"
              value={restaurantDetails.discount}
              onChange={handleChange}
              className="border-2 border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1 text-left">Offers (comma separated):</label>
            <input
              type="text"
              name="offers"
              value={restaurantDetails.offers}
              onChange={handleChange}
              placeholder="e.g., 10% off, Free Delivery"
              className="border-2 border-gray-300 rounded p-2 w-full"
            />
          </div>
        </div>

        <div className="mt-8 mb-2">
          <button
            type="submit"
            className="submitButton bg-black text-white py-2 rounded hover:bg-gray-800 transition duration-200 w-full"
          >
            {restaurantData ? "Update Restaurant" : "Add Restaurant"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
