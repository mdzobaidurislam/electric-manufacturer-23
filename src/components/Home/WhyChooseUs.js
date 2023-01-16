import React from "react";
import { FaEdgeLegacy, FaMendeley, FaBalanceScaleLeft } from "react-icons/fa";
import { GiMicroscopeLens } from "react-icons/gi";
const WhyChooseUs = () => {
  return (
    <section class="why-choose-lg py-20 relative">
      <div class="container mx-auto lg:px-16 px-4">
        <div class="same-hedding text-l ">
          <span>WHY CHOOSE US</span>
          <h3 className=" lg:text-[46px] text-[30px] text-secondary font-bold">
            What to Expect From Electronic Manufacturing Services Companies
          </h3>
          <p className="py-6 lg:text-[20px] text-[17px] font-[400] leading-[34px] text-accent">
            Electronics manufacturing services (EMS) are those offered by
            companies that design, test, build, deliver, or give aftermarket
            help for electronic parts and assemblies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 auto-cols-auto  gap-7 justify-center mb-10 pt-5 mx-auto">
          <div class="mt-3">
            <div class="why-choose-box shadow-lg p-4">
              <div class="flex ">
                <div class="media-icon bdr-radius">
                  <FaEdgeLegacy />
                </div>
                <div class="media-body user-info v-center">
                  <h5 className="">ELECTRONICS ENGINEERING SERVICES</h5>
                  <p className=" py-2 text-secondary">
                    Electronics contract manufacturing services vary by
                    supplier. Any given partner may offer anywhere from one to
                    all of these services.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-3">
            <div class="why-choose-box shadow-lg p-4">
              <div class="media">
                <div class="media-icon bdr-radius">
                  <FaMendeley />
                </div>
                <div class="media-body user-info v-center">
                  <h5>CABLE ASSEMBLY. </h5>
                  <p className="py-2 text-secondary">
                    For cable assemblies, manufacturing is done with hand
                    soldering -- your vendor should be certified in this. Many
                    can also have injection over-molding.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-3">
            <div class="why-choose-box shadow-lg p-4">
              <div class="media">
                <div class="media-icon bdr-radius">
                  <FaBalanceScaleLeft />
                </div>
                <div class="media-body user-info v-center">
                  <h5>ELECTROMECHANICAL ASSEMBLY </h5>
                  <p className="py-2 text-secondary">
                    These services refer to products such as box builds.
                    Depending on the manufacturer, these enclosures come: Steel
                    Aluminum Plastic
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-3">
            <div class="why-choose-box shadow-lg p-4">
              <div class="media">
                <div class="media-icon bdr-radius">
                  <GiMicroscopeLens />
                </div>
                <div class="media-body user-info v-center">
                  <h5>CONTRACT DESIGN </h5>
                  <p className="py-2 text-secondary">
                    Sometimes you need an expert, and that expert does not exist
                    inside your building. That’s OK. Contracting out design lets
                    you take advantage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
