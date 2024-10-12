import { Link } from "react-router-dom";

const Footer = ({ cartItems }) => {
  const listStyleClass = "m-[0.3rem] block cursor-pointer transition-all duration-100 ease-in-out hover:scale-[1.1] hover:font-bold text-lg";
  return (
    <>
      <footer className="footerContainer relative flex items-center justify-between mt-6 mx-[0.3rem] mb-[0.3rem] rounded-[3px] border-2 border-black">
        <Link className="footerLogo flex flex-col font-bold tracking-[0.3rem] text-[32px] cursor-pointer my-0 mx-[0.2rem] no-underline text-black" to="/">
          <span className="food ">FoOd</span>
          <span className="code ">CoDe</span>
        </Link>
        <div className="copyright flex flex-col text-center text-lg uppercase">
          <span>built by </span>
          <span className="hover:text-[tomato] hover:scale-[1.3] lowercase transform-all duration-100 ease-in-out font-bold tracking-[0.1rem] inline-block no-underline text-xl">
            <a href="https://clevercoderjoy.bio.link/" target="_blank" rel="noopener noreferrer">clevercoderjoy</a>
          </span>
        </div>
        <div className="footerNavBar">
          <nav>
            <ul className="list-none my-[0.3rem] text-right">
              <li className={listStyleClass}>
                <Link to="/">
                  Home
                </Link>
              </li>
              <li className={listStyleClass}>
                <Link to="/about">
                  About
                </Link>
              </li>
              <li className={listStyleClass}>
                <Link to="/cart">
                  Cart
                  {cartItems.length === 0 ? "" : <span className="font-bold ml-1">({cartItems.length})</span>}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </>
  )
}

export default Footer;