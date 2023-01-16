import React from "react";
import { useQuery } from "react-query";
import SpinnerLoading from "../Share/SpinnerLoading";
import ReviewItem from "./ReviewItem";
import { env } from "../../env";

const Review = () => {
  const { data: reviews, isLoading } = useQuery("reviews", () =>
    fetch(`${env.baseUrl}/api/review`, {
      method: "GET",
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <SpinnerLoading />;
  }
  return (
    <section className="services_section py-20">
      <div className="container mx-auto lg:px-16 px-4">
        <div className="text-center pb-5">
          <h3 className=" lg:text-[36px] text-[30px] text-secondary font-bold">
            OUR CLIENT REVIEWS
          </h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 auto-cols-auto  gap-5 justify-center">
          {reviews.reverse().map((item) => (
            <ReviewItem key={item._id} review={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Review;
