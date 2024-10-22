import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import { useSelector } from "react-redux";
import { selectShowModal } from "./slice/UserSlice";


function App() {
  const showModal = useSelector(selectShowModal);
  return (
    <div className="flex flex-col min-h-screen">
      <Header cartItems={""} />
      <div className="flex-grow">
        <Outlet />
        {showModal && (
          <Modal />
        )}
      </div>
      <Footer cartItems={""} />
    </div>
  );
}

export default App;
