import clevercoderjoy from "../../../public/images/clevercoderjoy.jpg";

const About = () => {
  return (
    <>
      <div className="aboutContainer my-4 mx-[0.3rem]">
        <div className="imgContainer">
          <img className=" transition-all duration-200 ease-in-out h-[250px] w-[250px] m-auto rounded-[100%] border-black border-4 hover:scale-110" src={clevercoderjoy} alt="clevercoderjoy" />
          <caption className="imgCaption block text-center mx-auto my-2 text-4xl text-[tomato] font-bold">
            <a className="" href="https://clevercoderjoy.bio.link/" target="_blank" rel="noopener noreferrer">clevercoderjoy</a>
          </caption>
        </div>
        <div className="aboutMe border-2 border-black my-6 p-2 rounded-[3px]">
          <h2 className="aboutMeTitle text-3xl font-bold border-b-2 pb-1 border-black">About Me</h2>
          <p className="aboutMeText pt-2 text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti voluptatum commodi ipsa alias inventore magni non, repellendus doloribus optio impedit.
          </p>
        </div>
        <div className="aboutMeProjectContainer border-2 border-black my-6 p-2 rounded-[3px]">
          <h2 className="aboutMeProjectTitle text-3xl font-bold border-b-2 pb-1 border-black">About The Project</h2>
          <p className="aboutMeProjectText pt-2 text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti voluptatum commodi ipsa alias inventore magni non, repellendus doloribus optio impedit.
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
