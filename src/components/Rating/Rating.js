import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
const Rating = ({ value }) => {
  return (
    <div className="flex align-center" style={{ color: "orange" }}>
      <div>{value >= 1 ? <FaStar /> : <FaStarHalfAlt />}</div>
      <div>
        {value >= 2 ? <FaStar /> : value >= 1.5 ? <FaStarHalfAlt /> : ""}
      </div>
      <div>
        {value >= 3 ? <FaStar /> : value >= 2.5 ? <FaStarHalfAlt /> : ""}
      </div>
      <div>
        {value >= 4 ? <FaStar /> : value >= 3.5 ? <FaStarHalfAlt /> : ""}
      </div>
      <div>
        {value >= 5 ? <FaStar /> : value >= 4.5 ? <FaStarHalfAlt /> : ""}
      </div>
    </div>
  );
};

export default Rating;
