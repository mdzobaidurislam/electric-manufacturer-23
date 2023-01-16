import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../Firebase/Firebase.init";
import SpinnerLoading from "../Share/SpinnerLoading";
import { toast } from "react-toastify";
import { env } from "../../env";

const Purchase = () => {
  const [user, loading] = useAuthState(auth);

  const { id } = useParams();
  const [itemPurchase, setItemPurchase] = useState({});

  const [orderQuantity, setOrderQuantity] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({});

  useEffect(() => {
    const getToolById = async () => {
      const url = `${env.baseUrl}/api/tool/${id}`;
      const { data } = await axios.get(url);
      setItemPurchase(data);
    };
    getToolById();
  }, [id, itemPurchase]);
  const handleBooking = async (inputData) => {
    const addOrder = {
      toolId: id,
      name: itemPurchase.name,
      user_name: inputData.user_name,
      short_description: itemPurchase.short_description,
      image: itemPurchase.image,
      order_quantity: orderQuantity,
      price: itemPurchase.price,
      userEmail: inputData.email,
      address: inputData.address,
      phone: inputData.phone,
    };
    const { data } = await axios.post(`${env.baseUrl}/api/order`, addOrder);
    if (data.success) {
      toast.success(data.msg);
      reset();
    }
  };

  if (loading) {
    return <SpinnerLoading />;
  }

  const handleIncrease = () => {
    let qty = parseInt(orderQuantity);
    if (isNaN(qty)) {
      toast.error("Enter Order quantity!");
    } else {
      if (qty < parseInt(itemPurchase.quantity)) {
        setOrderQuantity(qty + 1);
      } else {
        toast.error(
          "Order quantity can not be higher than the available quantity!"
        );
      }
    }
  };
  const handleDecrease = () => {
    let qty = parseInt(orderQuantity);
    if (qty > 1) {
      setOrderQuantity(qty - 1);
    } else if (isNaN(qty)) {
      toast.error("Enter Order quantity!");
    }
  };

  return (
    <section className="purchase_section py-20">
      <div className="container mx-auto px-4">
        <form action="" onSubmit={handleSubmit(handleBooking)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 auto-cols-auto  gap-5 justify-center">
            <div>
              <div className="card card-side bg-base-100 shadow-xl">
                <figure>
                  <img src={itemPurchase.image} alt="Movie" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{itemPurchase.name}</h2>
                  <p>{itemPurchase.short_description}</p>
                  <h4>Price:{itemPurchase.price}</h4>

                  <h4>Quantity:{itemPurchase.quantity}</h4>
                  <div>
                    <h4 className="card-title">
                      {" "}
                      Minimum order : {itemPurchase.minimum_order_quantity}{" "}
                    </h4>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-bold text-xl">
                          Enter Order Quantity:
                        </span>
                      </label>
                      <label className="input-group">
                        <span
                          className="btn btn-primary"
                          onClick={handleDecrease}
                        >
                          -
                        </span>
                        <input
                          {...register("orderQty", { required: true })}
                          type="text"
                          onChange={(e) => setOrderQuantity(e.target.value)}
                          value={orderQuantity}
                          className="input input-bordered"
                        />
                        <span
                          className="btn btn-primary"
                          onClick={handleIncrease}
                        >
                          +
                        </span>
                      </label>
                    </div>
                    <p className="text-danger fw-bold">
                      {errors.orderQty?.type === "required" &&
                        "Order Qty  is required"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="card  bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className=" text-4xl text-center font-bold uppercase  my-4">
                    Additional Information
                  </h2>
                  <div className="form-control w-full  mb-3">
                    <div className="input-group">
                      <input
                        {...register("user_name", { required: true })}
                        className="input input-bordered w-full "
                        id="user_name"
                        value={user?.displayName}
                        placeholder="Enter user_name"
                        type="text"
                      />
                    </div>
                    <p className="text-danger fw-bold">
                      {errors.user_name?.type === "required" &&
                        "User name is required"}
                    </p>
                  </div>
                  <div className="form-control w-full  mb-3">
                    <div className="input-group">
                      <input
                        {...register("email", { required: true })}
                        type="email"
                        placeholder="Enter email"
                        value={user?.email}
                        className="input input-bordered w-full "
                      />
                    </div>
                    <p className="text-danger fw-bold">
                      {errors.email?.type === "required" && "Email is required"}
                    </p>
                  </div>
                  <div className="form-control w-full  mb-3">
                    <div className="input-group">
                      <input
                        {...register("address", { required: true })}
                        type="text"
                        placeholder="Enter address"
                        className="input input-bordered w-full "
                      />
                    </div>
                    <p className="text-danger fw-bold">
                      {errors.address?.type === "required" &&
                        "Addres is required"}
                    </p>
                  </div>

                  <div className="form-control w-full  mb-3">
                    <div className="input-group">
                      <input
                        {...register("phone", { required: true })}
                        type="text"
                        placeholder="Enter phone"
                        className="input input-bordered w-full "
                      />
                    </div>
                    <p className="text-danger fw-bold">
                      {errors.phone?.type === "required" && "Phone is required"}
                    </p>
                  </div>

                  <div className="card-actions justify-end mb-4">
                    <button
                      className="btn btn-primary w-full"
                      disabled={
                        orderQuantity > itemPurchase.quantity ||
                        orderQuantity < 1 ||
                        orderQuantity < itemPurchase.minimum_order_quantity
                      }
                    >
                      Place the order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Purchase;
