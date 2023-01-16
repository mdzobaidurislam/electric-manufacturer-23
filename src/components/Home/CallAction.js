import React from "react";

const CallAction = () => {
  return (
    <>
      <section className="callAction_sction py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex justify-center align-center">
            <div className="text-center">
              <p className="py-6 text-[24px] font-[400] leading-[32px] text-white">
                Up To 40% Off Our Most Popular Machines!
              </p>
              <button className="btn  border-white hover:bg-transparent hover:border-white hover:border-2 sm:btn-sm md:btn-md lg:btn-lg pt-[17px] pb-[17px] pl-[34px] pr-[34px] font-[400] text-white bg-primary text-[18px] rounded-[30px]">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CallAction;
