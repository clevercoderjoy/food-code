import { ShimmerButton, ShimmerText, ShimmerThumbnail, ShimmerTitle } from "react-shimmer-effects";

const Shimmer = () => {
  return (
    <>
      <div className="shimmerRestaurantContainer border-[5px] w-[230px] h-[375px] mt-4 mb-2 mx-2 rounded-[10px] transition-all ease-in-out duration-100 border-[#f6f6f6] relative">
        <div className="shimmerRestaurantImgContainer m-auto text-center p-2">
          <ShimmerThumbnail className="shimmerRestaurantImg w-[210px] object-cover h-[150px] rounded-[10px] mb-0" height={150} rounded />
        </div>
        <div className="shimmerRestaurantDetailsContainer px-2">
          <div className="shimmerRestaurantName">
            <ShimmerTitle className="shimmerRestaurantName" line={1} gap={10} />
          </div>
          <ShimmerText line={1} gap={10} />
          <div className="shimmerRestaurantCuisines mt-[-0.5rem]">
            <ShimmerText line={3} gap={10} />
          </div>
        </div>
        <button className="shimmerView block border-0 rounded-[3px] absolute bottom-[-15px] left-[50px]">
          <ShimmerButton size="md" variant="primary" />
        </button>
      </div >
    </>
  );
}

export default Shimmer;
