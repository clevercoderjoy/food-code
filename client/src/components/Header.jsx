import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCart } from "../slice/CartSlice";
import {
  clearUserDetails,
  selectCurrentUser,
  selectIsUserLoggedIn,
  setIsUserLoggedIn,
  setShowModal
} from "../slice/UserSlice";
import { setCurrentAddressSelected } from "../slice/UserAddressSlice";

const Header = ({ cartItems }) => {
  const [isOptionsVisible, setOptionsVisible] = useState(false);
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
  const showOptions = isOptionsVisible ? "visible" : "hidden";

  const authButtonClass = "loginButton text-center block border-black border-2 text-white font-bold py-[0.1rem] pl-[0.3rem] pr-[0.3rem] mr-1 transition-all duration-500 ease-in-out rounded-[3px] tracking-widest w-28 h-9";

  const listStyle = "inline-block text-xl p-2 cursor-pointer transition-all duration-110 ease-in-out hover:font-bold hover:scale-[1.1] m-auto";

  const autOptionClass = `flex hover:uppercase font-bold inline-block py-[0.5rem] border-black px-1 cursor-pointer transition-all duration-100 ease-in-out text-left group-hover:block`;

  const [btnState, setBtnState] = useState({
    class: `bg-[tomato] ${authButtonClass}`,
    btnTxt: "Login"
  });

  useEffect(() => {
    if (isUserLoggedIn && currentUser) {
      setBtnState({
        class: `bg-[tomato] ${authButtonClass}`,
        btnTxt: "Logout"
      });
    } else {
      setBtnState({
        class: `bg-[#0f9d58] ${authButtonClass}`,
        btnTxt: "Login"
      });
    }
  }, [isUserLoggedIn, currentUser]);

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
  }

  const handleAuth = () => {
    if (!isUserLoggedIn) {
      dispatch(setShowModal(true));
    } else if (isOptionsVisible) {
      // Only log out when the submenu is visible
      dispatch(clearUserDetails());
      dispatch(setIsUserLoggedIn(false));
      setOptionsVisible(false);
      dispatch(setCurrentAddressSelected([]));
    }
  };

  return (
    <>
      <header className="headerContainer relative flex items-center justify-between m-[0.3rem] border-2 border-black rounded-[3px]">
        <Link className="logo text-3xl font-bold my-0 mx-[0.2rem] no-underline cursor-pointer text-black" to="/">
          FoOd CoDe
        </Link>
        <div className="navbar flex justify-between items-center">
          <nav className="">
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
                <span className={`autoOption ${autOptionClass}`}>{currentUser?.username}</span>
                <span className={`autoOption ${autOptionClass}`}>My Account</span>
                <span className={`autoOption ${autOptionClass}`} onClick={handleAuth}>Log Out</span>
              </div>
            )}
          </div>
        </div>
      </header>
      {/* some change */}
    </>
  );
};

export default Header;
