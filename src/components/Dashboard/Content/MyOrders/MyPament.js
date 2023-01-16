import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import axios from "axios";
import PaymenForm from "./PaymenForm";
import { env } from "../../../../env";
const stripePromise = loadStripe(
  "pk_test_51KRIZyGc1O5eSd4LphWyoV4YmlLeOK52CF07vMz5KPOTbsg8mk0wPhL4rgbsUY4RGHWAKwbGmLEKle4BZ0XCIM0e00RrlmYPya"
);

const MyPament = () => {
  const { id } = useParams();
  const [orderItem, setOrderItem] = useState({});

  // get the inventory by id
  useEffect(() => {
    const getInventoryById = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      };
      const url = `${env.baseUrl}/api/orderid/${id}`;
      const { data } = await axios.get(url, config);
      setOrderItem(data.result);
    };
    getInventoryById();
  }, [id]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 auto-cols-auto  gap-5 justify-center">
      <div className="card w-50 max-w-md bg-base-100 shadow-xl my-12 ml-4">
        <div className="card-body">
          <h1>Order Id: {id}</h1>
          <p className="text-success font-bold">Hello, {orderItem.user_name}</p>
          <h2 className="card-title">Please Pay for: {orderItem.name}</h2>
          <p className="text-xl">Price: ${orderItem.price}</p>
          <p className="text-xl">Order Item: {orderItem.order_quantity}</p>
          <p className="text-xl">
            Total Price: ${orderItem.order_quantity * orderItem.price}
          </p>
        </div>
      </div>
      <div>
        <div className="card w-50 max-w-lg bg-base-100 shadow-xl my-12 ml-4">
          <div className="card-body">
            <Elements stripe={stripePromise}>
              <PaymenForm orderItem={orderItem} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPament;
