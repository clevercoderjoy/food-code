import clevercoderjoy from "/images/clevercoderjoy.jpg";

const About = () => {

  return (
    <>
      <div className="aboutContainer my-4 mx-[0.3rem]">
        <div className="imgContainer">
          <img
            className="transition-all duration-200 ease-in-out h-[250px] w-[250px] m-auto rounded-[100%] border-black border-4 hover:scale-110"
            src={clevercoderjoy}
            alt="clevercoderjoy"
          />
          <figcaption className="imgCaption block text-center mx-auto my-2 text-4xl text-[tomato] font-bold">
            <a
              href="https://clevercoderjoy.bio.link/"
              target="_blank"
              rel="noopener noreferrer"
            >
              clevercoderjoy
            </a>
          </figcaption>
        </div>
        <div className="aboutMe border-2 border-black my-6 p-2 rounded-[3px]">
          <h2 className="aboutMeTitle text-3xl font-bold border-b-2 pb-1 border-black">About Me</h2>
          <p className="aboutMeText pt-2 text-left">
            Hi, I am clevercoderjoy, a frontend developer with a passion for building scalable web applications. With 4 years of experience in technologies like JavaScript, React, and Tailwind CSS, I specialize in crafting efficient and cross-browser-compatible functionalities. I enjoy building complex projects from scratch, improving performance, and creating clean, user-friendly interfaces.
          </p>
        </div>
        <div className="aboutMeProjectContainer border-2 border-black my-6 p-2 rounded-[3px]">
          <h2 className="aboutMeProjectTitle text-3xl font-bold border-b-2 pb-1 border-black">About The Project</h2>
          <p className="aboutMeProjectText pt-2 text-left">
            The project, FoodCode, is a food ordering and restaurant listing platform. It provides users with an intuitive interface to browse and order from a wide variety of restaurants. The platform includes advanced filtering options, restaurant details, and an easy-to-use checkout system. My role in this project focuses on building a responsive, seamless UI for both restaurant owners and customers, ensuring smooth performance across devices.
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
