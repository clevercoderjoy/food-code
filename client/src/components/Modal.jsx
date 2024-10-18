import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsUserLoggedIn, selectUsers, setCurrentUser, setIsUserLoggedIn, setShowModal, setUserDetails } from '../slice/UserSlice';
import { toast } from "react-toastify";
import { FaTimes } from 'react-icons/fa';

const Modal = () => {
  const dispatch = useDispatch();

  const isLogin = useSelector(selectIsUserLoggedIn) || true; 

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAdmin: false,
  });
  const [error, setError] = useState('');
  const users = useSelector(selectUsers);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      setError('');
    }

    if (isLogin) {
      const user = users.find((u) => u.username === formData.username && u.password === formData.password);
      if (user) {
        dispatch(setCurrentUser(user));
        dispatch(setIsUserLoggedIn(true));
        toast.success(`${user.username}! You are logged in.`);
        dispatch(setShowModal(false));
      } else {
        toast.error('Invalid username or password.');
      }
    } else {
      const userExists = users.some((u) => u.username === formData.username);
      if (!userExists) {
        const newUser = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          isAdmin: formData.isAdmin,
        };
        dispatch(setUserDetails(newUser));
        dispatch(setCurrentUser(newUser));
        dispatch(setIsUserLoggedIn(true));
        toast.success('Signup successful! You are now logged in.');
        dispatch(setShowModal(false));
      } else {
        toast.error('User already exists. Please login.');
      }
    }
    setFormData({ username: '', email: '', password: '', confirmPassword: '', isAdmin: false });
  };

  const toggleLoginMode = () => {
    dispatch(setIsUserLoggedIn(!isLogin));
  };

  const handleClose = () => {
    dispatch(setShowModal(false));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        <button onClick={handleClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-600 transition duration-200">
          <FaTimes size={20} />
        </button>
        <h2 className="text-xl font-bold text-center mb-4">{isLogin ? 'Login' : 'Signup'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {!isLogin && (
            <>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="isAdmin"
                  name="isAdmin"
                  checked={formData.isAdmin}
                  onChange={handleChange}
                  className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isAdmin" className="text-sm font-medium text-gray-700">I am an admin</label>
              </div>
            </>
          )}
          <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-500 transition duration-200">
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>
        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={toggleLoginMode}
            className="text-blue-600 hover:underline">
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Modal;
