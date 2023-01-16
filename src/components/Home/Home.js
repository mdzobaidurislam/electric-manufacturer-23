import React from "react";
import Review from "../Review/Review";
import Banner from "./Banner";
import CallAction from "./CallAction";
import Capabilities from "./Capabilities";
import Counter from "./Counter";
import Tools from "./Tools";
import "./Home.css";
import WhyChooseUs from "./WhyChooseUs";
const Home = () => {
  return (
    <>
      <Banner />
      <Tools />
      <Capabilities />
      <Counter />
      <Review />
      <WhyChooseUs />
      <CallAction />
    </>
  );
};

export default Home;
