import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { selectCart } from "../slice/CartSlice";
import {
  clearUserDetails,
  selectIsUserLoggedIn,
  setIsUserLoggedIn,
  setShowModal,
  setCurrentUser
} from "../slice/UserSlice";
import { setCurrentAddressSelected } from "../slice/UserAddressSlice";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import app from "../firebase/config";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const Header = ({ cartItems }) => {
  const [isOptionsVisible, setOptionsVisible] = useState(false);
  const [btnState, setBtnState] = useState({
    class: "bg-[#0f9d58] loginButton",
    btnTxt: "Login"
  });
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
  const showOptions = isOptionsVisible ? "visible" : "hidden";
  const navigate = useNavigate();

  const authButtonClass = "text-center block border-black border-2 text-white font-bold py-[0.1rem] pl-[0.3rem] pr-[0.3rem] mr-1 transition-all duration-500 ease-in-out rounded-[3px] tracking-widest w-28 h-9";

  const listStyle = "inline-block text-xl p-2 cursor-pointer transition-all duration-110 ease-in-out hover:font-bold hover:scale-[1.1] m-auto";

  const autOptionClass = `flex hover:uppercase font-bold inline-block py-[0.5rem] border-black px-1 cursor-pointer transition-all duration-100 ease-in-out text-left group-hover:block`;

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const db = getFirestore(app);
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          dispatch(setCurrentUser({
            email: user.email,
            uid: user.uid,
            role: userData.role,
          }));
        }

        dispatch(setIsUserLoggedIn(true));
        setBtnState({
          class: `bg-[tomato] ${authButtonClass}`,
          btnTxt: "Logout"
        });
      } else {
        dispatch(clearUserDetails());
        dispatch(setIsUserLoggedIn(false));
        setBtnState({
          class: `bg-[#0f9d58] ${authButtonClass}`,
          btnTxt: "Login"
        });
      }
    });

    return () => unsubscribe();
  }, [dispatch, authButtonClass]);

  const handleAuthHover = () => {
    if (isUserLoggedIn) {
      setOptionsVisible(true);
    }
  };

  const handleAuthLeave = () => {
    setOptionsVisible(false);
  };

  const getTotalCartItems = () => {
    let totalCartItems = 0;
    cart.forEach((item) => totalCartItems += item.quantity);
    return totalCartItems;
  };

  const handleAuth = () => {
    if (!isUserLoggedIn) {
      dispatch(setShowModal(true));
    } else if (isOptionsVisible) {
      logout();
    }
  };

  const logout = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      dispatch(clearUserDetails());
      dispatch(setIsUserLoggedIn(false));
      setOptionsVisible(false);
      dispatch(setCurrentAddressSelected([]));
      setCurrentUser({});
      toast.warn("User logged out successfully.");
    } catch (error) {
      toast.error("Error logging out:", error);
    }
  };

  return (
    <header className="headerContainer relative flex items-center justify-between m-[0.3rem] border-2 border-black rounded-[3px]">
      <Link className="logo text-3xl font-bold my-0 mx-[0.2rem] no-underline cursor-pointer text-black" to="/">
        FoOd CoDe
      </Link>
      <div className="navbar flex justify-between items-center">
        <nav>
          <ul className="list-none">
            <li className={listStyle}>
              <Link to="/">Home</Link>
            </li>
            <li className={listStyle}>
              <Link to="/restaurants">Restaurants</Link>
            </li>
            <li className={listStyle}>
              <Link to="/about">About</Link>
            </li>
            <li className={`${listStyle} ${getTotalCartItems() > 0 ? "font-bold" : ""}`}>
              <Link to="/cart">
                Cart({getTotalCartItems() || 0})
                {cartItems.length > 0 && <span className="font-bold ml-1">({cartItems.length})</span>}
              </Link>
            </li>
          </ul>
        </nav>
        <div className="auth group relative" onMouseOver={handleAuthHover}>
          <div className="authButton">
            <button className={`${btnState.class}`} onClick={() => !isUserLoggedIn && handleAuth()}>
              {btnState.btnTxt}
            </button>
          </div>
          {isUserLoggedIn && (
            <div
              className={`${showOptions} authOptions border-t-0 h-auto py-1 pl-1 absolute top-[40px] w-52 right-[-2px] bg-white border-black border-2 shadow-lg transition-all duration-200 ease-in-out`}
              onMouseLeave={handleAuthLeave}
            >
              <span className={`autoOption ${autOptionClass}`} onClick={() => navigate("/myAccount")}>My Account</span>
              <span className={`autoOption ${autOptionClass}`} onClick={handleAuth}>Log Out</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
