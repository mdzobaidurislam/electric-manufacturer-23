import React from "react";

const Banner = () => {
  return (
    <div
      className="hero_section min-h-[500px] flex items-center"
      style={{
        background: `url("https://i.ibb.co/Brb3Z1Z/slide.jpg")`,
        backgroundSize: "cover",
      }}
    >
      <div className="container mx-auto lg:px-16 px-4 ">
        <div className="hero">
          <div className="">
            <div className="lg:w-[70%] w-full ">
              <h1 className="lg:text-[56px] text-[30px] leading-[35px] text-secondary lg:leading-[68px] font-bold ">
                Expert Technical Support High-Performance Machines Profitable
                Solutions
              </h1>
              <p className="py-6 lg:text-[24px] text-[18px] font-[400] leading-[32px] text-accent">
                Electronics play a fundamental role from the entertainment rooms
                of our houses to the mundane environment of our work offices.
              </p>
              <button className="btn  border-primary sm:btn-sm md:btn-md lg:btn-lg pt-[17px] pb-[17px] pl-[34px] pr-[34px] font-[400] text-white bg-primary text-[18px] rounded-[30px]">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
