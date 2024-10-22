import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFood } from '../slice/FoodSlice';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const AddFood = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const { restaurant } = location.state;
  const [formData, setFormData] = useState({
    foodName: '',
    foodCategory: '',
    foodImage: '',
    foodDescription: '',
    foodType: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const foodItem = {
      restaurantId: restaurant.id,
      name: formData.foodName,
      category: formData.foodCategory,
      image: formData.foodImage,
      description: formData.foodDescription,
      type: formData.foodType,
    };

    try {
      await dispatch(addFood(foodItem));
      setFormData({
        foodName: '',
        foodCategory: '',
        foodImage: '',
        foodDescription: '',
        foodType: '',
      });
      toast.success('Food item added successfully!');
    } catch (error) {
      toast.error('Error adding food item.');
    }
  };

  return (
    <div className="adminContainer p-4 m-8 border-2 border-black rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Food Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Food Name:</label>
          <input
            type="text"
            name="foodName"
            placeholder="Enter food name"
            value={formData.foodName}
            onChange={handleChange}
            required
            className="border-2 border-gray-300 rounded p-2 w-full"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Food Category:</label>
          <input
            type="text"
            name="foodCategory"
            placeholder="Enter food category"
            value={formData.foodCategory}
            onChange={handleChange}
            required
            className="border-2 border-gray-300 rounded p-2 w-full"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Food Image URL:</label>
          <input
            type="text"
            name="foodImage"
            placeholder="Enter food image URL"
            value={formData.foodImage}
            onChange={handleChange}
            required
            className="border-2 border-gray-300 rounded p-2 w-full"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Food Description:</label>
          <textarea
            name="foodDescription"
            placeholder="Enter food description"
            value={formData.foodDescription}
            onChange={handleChange}
            required
            className="border-2 border-gray-300 rounded p-2 w-full"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Food Type:</label>
          <select
            name="foodType"
            value={formData.foodType}
            onChange={handleChange}
            required
            className="border-2 border-gray-300 rounded p-2 w-full"
          >
            <option value="">Select Food Type</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="bg-black text-white py-2 rounded hover:bg-gray-800 transition duration-200 w-full"
          >
            Add Food
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFood;
