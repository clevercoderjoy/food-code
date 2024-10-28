import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsUserLoggedIn, signUp, logIn, setShowModal, setIsUserLoggedIn } from '../slice/UserSlice';
import { toast } from "react-toastify";
import { FaTimes } from 'react-icons/fa';

const Modal = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector(selectIsUserLoggedIn);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    isAdmin: false,
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const validateEmail = (email) => {
    if (/^[0-9]/.test(email)) {
      return 'Email cannot start with a number';
    }

    const emailRegex = /^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    if (emailError) {
      toast.error(emailError);
      return;
    }

    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      try {
        await dispatch(signUp({
          email: formData.email,
          password: formData.password,
          isAdmin: formData.isAdmin
        })).unwrap();
        toast.success('Signup successful! You are now logged in.');
      } catch (error) {
        toast.error(error.message);
        setError(error.message);
      }
    } else {
      try {
        await dispatch(logIn({
          email: formData.email,
          password: formData.password
        })).unwrap();
        toast.success('Login successful!');
      } catch (error) {
        toast.error(error.message);
        setError(error.message);
      }
    }

    setFormData({ email: '', password: '', confirmPassword: '', isAdmin: false });
    dispatch(setShowModal(false));
  };

  const toggleLoginMode = () => {
    dispatch(setIsUserLoggedIn(!isLogin));
  };

  const handleClose = () => {
    dispatch(setShowModal(false));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-10">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        <button onClick={handleClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-600 transition duration-200">
          <FaTimes size={20} />
        </button>
        <h2 className="text-xl font-bold text-center mb-4">{isLogin ? 'Login' : 'Signup'}</h2>
        <form onSubmit={handleSubmit}>
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
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="isAdmin"
                  name="isAdmin"
                  checked={formData.isAdmin}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="isAdmin" className="text-sm font-medium text-gray-700">Is Admin</label>
              </div>
            </>
          )}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
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
