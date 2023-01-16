import React from "react";

const Capabilities = () => {
  return (
    <>
      <section className="capabilities_section py-20 bg-[#F5F5FA]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 auto-cols-auto  gap-3 justify-center align-center">
            <div>
              <div>
                <img
                  className="border-4 shadow rounded-[30px] w-full"
                  src="https://i.ibb.co/VDFzrcY/Adobe-Stock-309673995.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="pl-7">
              <h2 className="text-[40px] text-secondary leading-[60px] font-bold ">
                Our Capabilities
              </h2>
              <p className="py-6 text-[24px] font-[400] leading-[32px] text-accent">
                We Are Restocking as Quickly as Possible. Come Back 7/30 to
                Order, more of These Flavors Inspired by the Places You Call
                Home!
              </p>
              <button className="btn  border-primary sm:btn-sm md:btn-md lg:btn-lg pt-[17px] pb-[17px] pl-[34px] pr-[34px] font-[400] text-white bg-primary text-[18px] rounded-[30px]">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Capabilities;
