import { useState, useEffect } from 'react';

const Carousel = () => {
  const banners = [
    {
      image: 'https://png.pngtree.com/png-clipart/20210620/original/pngtree-personalized-simple-american-burger-promotion-banner-png-image_6445554.jpg',
    },
    {
      image: 'https://png.pngtree.com/png-clipart/20210620/original/pngtree-trendy-color-gradient-hot-dog-food-web-banner-png-image_6445514.jpg',
    },
    {
      image: 'https://png.pngtree.com/png-clipart/20210620/original/pngtree-simple-and-stylish-color-block-salad-gourmet-web-banner-png-image_6445532.jpg',
    },
    {
      image: 'https://png.pngtree.com/png-clipart/20210620/original/pngtree-simple-and-stylish-color-block-salad-gourmet-web-banner-png-image_6445532.jpg',
    },
    {
      image: 'https://png.pngtree.com/png-clipart/20210620/original/pngtree-simple-and-stylish-color-block-salad-gourmet-web-banner-png-image_6445532.jpg',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const handlePrev = () => {
    setCurrentIndex(currentIndex === 0 ? banners.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % banners.length);
  };

  return (
    <div className="relative px-8 w-4xl mx-auto">
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img
                src={banner.image}
                loading='lazy'
                alt={`Offer ${index + 1}`}
                className="w-full h-[500px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handlePrev}
        className="absolute top-1/2 px-4 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 focus:outline-none"
      >
        &#10094;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 px-4 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 focus:outline-none"
      >
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
