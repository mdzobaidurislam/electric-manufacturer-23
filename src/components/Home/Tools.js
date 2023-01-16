import React from "react";
import Tool from "./Tool";
import { useQuery } from "react-query";
import SpinnerLoading from "../Share/SpinnerLoading";
import { env } from "../../env";

const Tools = () => {
  const { data: services, isLoading } = useQuery("users", () =>
    fetch(`${env.baseUrl}/api/tool`, {
      method: "GET",
    }).then((res) => res.json())
  );
  // console.log(services);

  if (isLoading) {
    return <SpinnerLoading />;
  }
  return (
    <section className="services_section py-20">
      <div className="container mx-auto px-4">
        <div className="text-center pb-5">
          <h3 className=" lg:text-[36px] text-[25px] text-secondary font-bold">
            OUR LATES PRODUCT
          </h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 auto-cols-auto  gap-5 justify-center">
          {services.reverse().map((item) => (
            <Tool key={item._id} tool={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;
