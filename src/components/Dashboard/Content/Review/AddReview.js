import axios from "axios";
import { signOut } from "firebase/auth";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../Firebase/Firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import SpinnerLoading from "../../../Share/SpinnerLoading";
import { env } from "../../../../env";

const AddReview = () => {
  const [user, loading] = useAuthState(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const navigate = useNavigate();

  const updateProfile = async (inputData) => {
    console.log(inputData);
    const addReview = {
      name: inputData.name,
      rating: inputData.rating,
      comment: inputData.comment,
    };
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };
    try {
      const reviewData = await axios.post(
        `${env.baseUrl}/api/review`,
        addReview,
        config
      );
      if (reviewData.data.success) {
        toast.success(reviewData.data.msg);
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
  };

  if (loading) {
    return <SpinnerLoading />;
  }

  return (
    <div className="flex justify-center pt-5">
      <div className=" w-1/2">
        <h2 className="text-2xl">Add a New Review</h2>
        <form onSubmit={handleSubmit(updateProfile)}>
          <div className="form-control w-full  mb-3">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <div className="input-group w-full">
              <input
                {...register("name", { required: true })}
                type="text"
                value={user?.displayName}
                placeholder="Enter name"
                className="input input-bordered w-full "
              />
            </div>
            <p className="text-danger fw-bold">
              {errors.name?.type === "required" && "Email is required"}
            </p>
          </div>
          <div className="form-control w-full  mb-3">
            <label className="label">
              <span className="label-text">Rating</span>
            </label>
            <div className="input-group w-full">
              <input
                {...register("rating", { required: true })}
                type="text"
                placeholder="Enter rating"
                className="input input-bordered w-full "
              />
            </div>
            <p className="text-danger fw-bold">
              {errors.rating?.type === "required" && "Rating is required"}
            </p>
          </div>
          <div className="form-control w-full  mb-3">
            <label className="label">
              <span className="label-text">Comment</span>
            </label>
            <div className="input-group w-full">
              <textarea
                {...register("comment", { required: true })}
                type="text"
                placeholder="Enter comment"
                className="input input-bordered w-full "
              ></textarea>
            </div>
            <p className="text-danger fw-bold">
              {errors.comment?.type === "required" && "Comment is required"}
            </p>
          </div>
          <input
            className="btn w-full  text-white"
            type="submit"
            value="Add rating"
          />
        </form>
      </div>
    </div>
  );
};

export default AddReview;
