import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addOrUpdateFood } from '../slice/FoodSlice';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const AddFood = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const editMode = location.state?.editMode || false;
  const existingFood = location.state?.foodItem;
  const restaurant = location.state?.restaurant;
  const restaurantId = editMode ? existingFood?.restaurantId : restaurant?.id;

  const [formData, setFormData] = useState({
    foodName: '',
    foodCategory: '',
    foodImage: '',
    foodDescription: '',
    foodType: '',
    foodPrice: '',
  });

  useEffect(() => {
    if (editMode && existingFood) {
      setFormData({
        foodName: existingFood.name || '',
        foodCategory: existingFood.category || '',
        foodImage: existingFood.image || '',
        foodDescription: existingFood.description || '',
        foodType: existingFood.type || '',
        foodPrice: existingFood.price || '',
      });
    }
  }, [editMode, existingFood]);

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
      restaurantId: restaurantId,
      name: formData.foodName,
      category: formData.foodCategory,
      image: formData.foodImage,
      description: formData.foodDescription,
      type: formData.foodType,
      price: formData.foodPrice,
    };

    if (editMode) {
      foodItem.id = existingFood.id;
    }

    try {
      await dispatch(addOrUpdateFood(foodItem));
      toast.success(editMode ? 'Food item updated successfully!' : 'Food item added successfully!');
      setFormData({
        foodName: '',
        foodCategory: '',
        foodImage: '',
        foodDescription: '',
        foodType: '',
        foodPrice: '',
      });
    } catch (error) {
      toast.error(editMode ? 'Error updating food item.' : 'Error adding food item.');
    }
  };



  return (
    <div className="adminContainer p-4 m-8 border-2 border-black rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">
        {editMode ? 'Edit Food Item' : 'Add New Food Item'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1 text-left ">Food Name:</label>
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
          <label className="block font-semibold mb-1 text-left ">Food Category:</label>
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
          <label className="block font-semibold mb-1 text-left ">Food Image URL:</label>
          <input
            type="text"
            name="foodImage"
            placeholder="Enter food image ID"
            value={formData.foodImage}
            onChange={handleChange}
            required
            className="border-2 border-gray-300 rounded p-2 w-full"
          />
        </div>

        <div>
          <label className="block font-semibold text-left mb-1">Food Description:</label>
          <textarea
            name="foodDescription"
            placeholder="Enter food description"
            value={formData.foodDescription}
            onChange={handleChange}
            className="border-2 border-gray-300 rounded p-2 w-full h-32"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-left ">Food Type:</label>
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
          <label className="block font-semibold mb-1 text-left ">Food Price:</label>
          <input
            type="number"
            name="foodPrice"
            placeholder="Enter food price"
            value={formData.foodPrice}
            onChange={handleChange}
            required
            className="border-2 border-gray-300 rounded p-2 w-full"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-200 flex-1"
          >
            {editMode ? 'Update Food' : 'Add Food'}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="border-2 border-black py-2 px-4 rounded hover:bg-gray-100 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFood;