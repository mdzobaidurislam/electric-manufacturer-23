import axios from "axios";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../Firebase/Firebase.init";
import SpinnerLoading from "../../../Share/SpinnerLoading";
import { env } from "../../../../env";

const AddProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const navigate = useNavigate();

  const imageStorageKey = process.env.REACT_APP_IMAGE_API_KEY;

  const onSubmit = async (inputData) => {
    setIsLoading(true);
    const image = inputData.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
    const { data } = await axios.post(url, formData);

    if (data.success) {
      const img = data.data.url;
      const addProduct = {
        name: inputData.name,
        short_description: inputData.short_description,
        image: img,
        quantity: inputData.quantity,
        minimum_order_quantity: inputData.minimum_order_quantity,
        price: inputData.price,
      };
      console.log(addProduct);
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      };
      try {
        const productData = await axios.post(
          `${env.baseUrl}/api/admin-product`,
          addProduct,
          config
        );
        if (productData.data.success) {
          setIsLoading(false);
          toast.success(productData.data.msg);
          reset();
        }
      } catch (error) {
        if (error.response.status === 401 || error.response.status === 403) {
          toast(error.response.data.msg);
          signOut(auth);
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    }
  };
  if (isLoading) {
    return <SpinnerLoading />;
  }
  return (
    <div className="flex justify-center pt-5 pb-20">
      <div className=" w-1/2">
        <h2 className="text-2xl">Add a New Product</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Product name</span>
            </label>
            <input
              type="text"
              placeholder="Product Name"
              className="input input-bordered w-full "
              {...register("name", {
                required: {
                  value: true,
                  message: "Product name is Required",
                },
              })}
            />
            <label className="label">
              {errors.name?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.name.message}
                </span>
              )}
            </label>
          </div>

          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Short description</span>
            </label>
            <input
              type="text"
              placeholder="Short description"
              className="input input-bordered w-full "
              {...register("short_description", {
                required: {
                  value: true,
                  message: "Short description is Required",
                },
              })}
            />
            <label className="label">
              {errors.short_description?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.short_description.message}
                </span>
              )}
            </label>
          </div>

          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Quantity</span>
            </label>
            <input
              type="text"
              placeholder="Enter quantity"
              className="input input-bordered w-full "
              {...register("quantity", {
                required: {
                  value: true,
                  message: "Quantity is Required",
                },
              })}
            />
            <label className="label">
              {errors.quantity?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.quantity.message}
                </span>
              )}
            </label>
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Minimum order quantity</span>
            </label>
            <input
              type="text"
              placeholder="Enter minimum order quantity"
              className="input input-bordered w-full "
              {...register("minimum_order_quantity", {
                required: {
                  value: true,
                  message: "Minimum order quantity is Required",
                },
              })}
            />
            <label className="label">
              {errors.minimum_order_quantity?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.minimum_order_quantity.message}
                </span>
              )}
            </label>
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Product price</span>
            </label>
            <input
              type="text"
              placeholder="Product price"
              className="input input-bordered w-full "
              {...register("price", {
                required: {
                  value: true,
                  message: "Product price is Required",
                },
              })}
            />
            <label className="label">
              {errors.price?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.price.message}
                </span>
              )}
            </label>
          </div>

          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Upload product photo</span>
            </label>
            <input
              type="file"
              className="input input-bordered w-full "
              {...register("image", {
                required: {
                  value: true,
                  message: "Image is Required",
                },
              })}
            />
            <label className="label">
              {errors.image?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.image.message}
                </span>
              )}
            </label>
          </div>

          <input className="btn w-full  text-white" type="submit" value="Add" />
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
