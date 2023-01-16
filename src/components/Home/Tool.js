import React from "react";
import { useNavigate } from "react-router-dom";

const Service = ({ tool }) => {
  const navigate = useNavigate();
  const {
    _id,
    name,
    short_description,
    image,
    price,
    quantity,
    minimum_order_quantity,
  } = tool;

  const handleTools = () => {
    navigate(`/purchase/${_id}`);
  };
  return (
    <div>
      <div className="card bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={image} alt={name} className="h-[150px] rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title"> {name} </h2>
          <p>
            {" "}
            <strong>Price</strong> : ${price}{" "}
          </p>
          <p>
            {" "}
            <strong>Quantity</strong> : {quantity}{" "}
          </p>
          <p>
            {" "}
            <strong>Minimum order</strong> : {minimum_order_quantity}{" "}
          </p>
          <p> {short_description} </p>
          <button onClick={handleTools} className="btn btn-primary w-full">
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Service;
