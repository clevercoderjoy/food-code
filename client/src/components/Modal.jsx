import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsUserLoggedIn, setCurrentUser, setIsUserLoggedIn, setShowModal } from '../slice/UserSlice';
import { toast } from "react-toastify";
import { FaTimes } from 'react-icons/fa';
import app from "../firebase/config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    const db = getFirestore(app);

    try {
      if (!isLogin) {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

        const userDocRef = doc(db, 'users', userCredential.user.uid);
        await setDoc(userDocRef, {
          email: userCredential.user.email,
          role: formData.isAdmin ? 'admin' : 'user',
          createdAt: new Date().toISOString()
        });

        dispatch(setCurrentUser({
          email: userCredential.user.email,
          uid: userCredential.user.uid,
          role: formData.isAdmin ? 'admin' : 'user'
        }));
        toast.success('Signup successful! You are now logged in.');
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);

        const userDocRef = doc(db, 'users', userCredential.user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          dispatch(setCurrentUser({
            email: userCredential.user.email,
            uid: userCredential.user.uid,
            role: userData.role
          }));
        }

        toast.success('Login successful!');
      }
      dispatch(setIsUserLoggedIn(true));
      dispatch(setShowModal(false));
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    }

    setFormData({ email: '', password: '', confirmPassword: '', isAdmin: false });
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
