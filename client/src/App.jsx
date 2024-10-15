import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header cartItems={""} />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer cartItems={""} />
    </div>
  );
}

export default App;
