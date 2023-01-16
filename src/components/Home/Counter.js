import React from "react";
const Counter = () => {
  return (
    <section className="counter-section bg-gradient py-20">
      <div className="container mx-auto lg:px-16 px-4">
        <div className="text-center pb-5">
          <h3 className=" lg:text-[36px] text-[25px] text-primary font-bold">
            OUR BUSINESS TRUST US
          </h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 auto-cols-auto  gap-5 justify-center mb-10 pt-5 lg:w-[70%] mx-auto">
          <div>
            <div className="counter-block mb-4">
              <div className="counter-icon">
                <img
                  src="https://buildcompany.netlify.app/images/icons/startup.svg"
                  alt="years"
                  className="img-fluid"
                />
              </div>
              <div className="counter-number-b">
                <span className="counter">15</span>
                <span>+</span>
                <p>Year In Business</p>
              </div>
            </div>
          </div>
          <div>
            <div className="counter-block mb-4">
              <div className="counter-icon">
                <img
                  src="https://buildcompany.netlify.app/images/icons/team.svg"
                  alt="team"
                  className="img-fluid"
                />
              </div>
              <div className="counter-number-b">
                <span className="counter">80</span>
                <span>+</span>
                <p>Team Members</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 auto-cols-auto  gap-5 justify-center">
          <div>
            <div className="counter-block mb-4">
              <div className="counter-icon">
                <img
                  src="https://buildcompany.netlify.app/images/icons/deal.svg"
                  alt="years"
                  className="img-fluid"
                />
              </div>
              <div className="counter-number-b">
                <span className="counter">480</span>
                <span>+</span>
                <p>Happy Clients</p>
              </div>
            </div>
          </div>
          <div>
            <div className="counter-block mb-4">
              <div className="counter-icon">
                <img
                  src="https://buildcompany.netlify.app/images/icons/computers.svg"
                  alt="team"
                  className="img-fluid"
                />
              </div>
              <div className="counter-number-b">
                <span className="counter">60</span>
                <span>K</span>
                <p>Projects Done</p>
              </div>
            </div>
          </div>
          <div>
            <div className="counter-block mb-4">
              <div className="counter-icon">
                <img
                  src="https://buildcompany.netlify.app/images/icons/worker.svg"
                  alt="team"
                  className="img-fluid"
                />
              </div>
              <div className="counter-number-b">
                <span className="counter">120</span>
                <span>k</span>
                <p>Hours Worked</p>
              </div>
            </div>
          </div>
          <div>
            <div className="counter-block mb-4 ">
              <div className="counter-icon">
                <img
                  src="https://buildcompany.netlify.app/images/icons/customer-service.svg"
                  alt="team"
                  className="img-fluid"
                />
              </div>
              <div className="counter-number-b">
                <span className="counter">24/7</span>
                <span></span>
                <p>Support Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Counter;
