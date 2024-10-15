import { useState } from "react";

const Admin = () => {
  const [restaurantDetails, setRestaurantDetails] = useState({
    name: "",
    area: "",
    city: "",
    cuisine: "",
    costForTwo: "",
    avgRating: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurantDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Restaurant Details Submitted: ", restaurantDetails);
    // Here you would typically send restaurantDetails to your API
  };

  return (
    <div className="adminContainer p-4 border-2 border-black rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Restaurant</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="formGroup mb-4">
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
        <div className="formGroup mb-4">
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
        <div className="formGroup mb-4">
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
        <div className="formGroup mb-4">
          <label className="block font-semibold mb-1">Cuisine:</label>
          <input
            type="text"
            name="cuisine"
            value={restaurantDetails.cuisine}
            onChange={handleChange}
            required
            className="border-2 border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="formGroup mb-4">
          <label className="block font-semibold mb-1">Cost for Two:</label>
          <input
            type="text"
            name="costForTwo"
            value={restaurantDetails.costForTwo}
            onChange={handleChange}
            required
            className="border-2 border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="formGroup mb-4">
          <label className="block font-semibold mb-1">Average Rating:</label>
          <input
            type="number"
            name="avgRating"
            value={restaurantDetails.avgRating}
            onChange={handleChange}
            min="0"
            max="5"
            required
            className="border-2 border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="formGroup mb-4">
          <label className="block font-semibold mb-1">Description:</label>
          <textarea
            name="description"
            value={restaurantDetails.description}
            onChange={handleChange}
            required
            className="border-2 border-gray-300 rounded p-2 w-full"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="submitButton bg-black text-white py-2 rounded hover:bg-gray-800 transition duration-200"
        >
          Add Restaurant
        </button>
      </form>
    </div>
  );
};

export default Admin;
