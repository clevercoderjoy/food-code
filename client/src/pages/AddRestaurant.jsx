import { useState } from "react";
import axios from "axios";

const AddRestaurant = () => {
  const [restaurantDetails, setRestaurantDetails] = useState({
    name: "",
    ratings: "",
    totalRatings: "",
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
      const response = await axios.post("/api/restaurants", restaurantDetails);
      console.log("Restaurant added successfully:", response.data);
    } catch (error) {
      console.error("Error adding restaurant:", error);
    }
  };

  console.log(restaurantDetails);

  return (
    <div className="adminContainer p-4 m-8 border-2 border-black rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Restaurant Name:</label>
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
            <label className="block font-semibold mb-1">Image URL:</label>
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
            <label className="block font-semibold mb-1">Ratings:</label>
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
            <label className="block font-semibold mb-1">Total Ratings:</label>
            <input
              type="number"
              name="totalRatings"
              value={restaurantDetails.totalRatings}
              onChange={handleChange}
              required
              className="border-2 border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1">Delivery Time (in minutes):</label>
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
            <label className="block font-semibold mb-1">Cost for Two:</label>
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
          <label className="block font-semibold mb-1">Address:</label>
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
            <label className="block font-semibold mb-1">Area:</label>
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
            <label className="block font-semibold mb-1">City:</label>
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
            <label className="block font-semibold mb-1">Cuisines (comma separated):</label>
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
            <label className="block font-semibold mb-1">Discount:</label>
            <input
              type="text"
              name="discount"
              value={restaurantDetails.discount}
              onChange={handleChange}
              required
              className="border-2 border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1">Offers (comma separated):</label>
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
            Add Restaurant
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
