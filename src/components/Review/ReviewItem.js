import React from "react";
import Rating from "../Rating/Rating";

const ReviewItem = ({ review }) => {
  const { name, rating, comment } = review;

  return (
    <div>
      <div className="card bg-base-100 shadow">
        <div className="card-body items-center text-center">
          <h2 className="card-title"> {name} </h2>
          <p> Rating : {rating} </p>
          <p> Comment : {comment} </p>
          <Rating value={rating} />
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
