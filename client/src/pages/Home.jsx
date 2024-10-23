import { useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";


const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="">
        <h2 className="text-5xl font-bold text-gray-800 my-8">
          Craving something delicious?
        </h2>
        <Carousel />
        <h3>
          <p className="text-lg text-gray-600 my-8 font-bold w-1/2 mx-auto border-4 border-black p-6 rounded-md">
            Discover the best dishes from your favorite local restaurants, delivered straight to your door.
            From comforting classics to new culinary experiences, we&apos;ve got something for everyone.
          </p>
          <p className="text-xl text-red-500 font-semibold">
            Order now and enjoy exclusive deals on your favorite meals!
          </p>
        </h3>
        <button
          onClick={() => navigate("/restaurants")}
          className="bg-red-500 text-white px-6 py-3 mt-8 rounded-lg text-lg font-semibold border-4 border-transparent hover:bg-white hover:border-[tomato] hover:text-[tomato] transition-all duration-300"
        >
          Explore Restaurants
        </button>
      </div>
    </>
  )
}

export default Home;