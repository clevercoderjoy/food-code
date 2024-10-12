const Error = () => {
  return (
    <>
      <div className="errorContainer bg-[tomato] text-center my-12 mx-auto rounded-[5px] w-[99%] p-4 text-black transition-all duration-1000 ease-in-out">
        <h1 className="flex flex-col items-center mb-2">
          <span>OOPs!!!</span>
          <span>Something Went Wrong</span>
        </h1>
        <h2>Ask <a className="hover:text-white no-underline text-inherit cursor-pointer" href="https://clevercoderjoy.bio.link/" target="_blank" rel="noopener noreferrer">clevercoderjoy</a> To Fix It</h2>
      </div>
    </>
  );
}

export default Error;
