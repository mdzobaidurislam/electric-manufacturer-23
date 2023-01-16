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

const Profile = () => {
  const [user, loading] = useAuthState(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (inputData) => {
    console.log(inputData);
    const updateProfile = {
      education: inputData.education,
      location: inputData.location,
      phone: inputData.phone,
      LinkedInProfile: inputData.LinkedInProfile,
    };
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };
    try {
      const reviewData = await axios.put(
        `${env.baseUrl}/api/update-profile/${inputData.email}`,
        updateProfile,
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
    <div className="flex justify-center pt-5 pb-40">
      <div className=" w-1/2">
        <h2 className="text-2xl">Update Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full  mb-3">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <div className="input-group w-full">
              <input
                {...register("name", { required: false })}
                type="text"
                disabled
                value={user?.displayName}
                placeholder="Enter name"
                className="input input-bordered w-full "
              />
            </div>
            <p className="text-danger fw-bold">
              {errors.name?.type === "required" && "Name is required"}
            </p>
          </div>
          <div className="form-control w-full  mb-3">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <div className="input-group w-full">
              <input
                {...register("email", { required: false })}
                type="text"
                value={user?.email}
                disabled
                placeholder="Enter rating"
                className="input input-bordered w-full "
              />
            </div>
            <p className="text-danger fw-bold">
              {errors.email?.type === "required" && "Email is required"}
            </p>
          </div>
          <div className="form-control w-full  mb-3">
            <label className="label">
              <span className="label-text">Education</span>
            </label>
            <div className="input-group w-full">
              <input
                {...register("education", { required: false })}
                type="text"
                placeholder="Enter education"
                className="input input-bordered w-full "
              ></input>
            </div>
            <p className="text-danger fw-bold">
              {errors.education?.type === "required" && "Education is required"}
            </p>
          </div>
          <div className="form-control w-full  mb-3">
            <label className="label">
              <span className="label-text">location</span>
            </label>
            <div className="input-group w-full">
              <input
                {...register("location", { required: false })}
                type="text"
                placeholder="Enter location"
                className="input input-bordered w-full "
              ></input>
            </div>
            <p className="text-danger fw-bold">
              {errors.location?.type === "required" && "location is required"}
            </p>
          </div>
          <div className="form-control w-full  mb-3">
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <div className="input-group w-full">
              <input
                {...register("phone", { required: false })}
                type="text"
                placeholder="Enter phone"
                className="input input-bordered w-full "
              ></input>
            </div>
            <p className="text-danger fw-bold">
              {errors.phone?.type === "required" && "Phone is required"}
            </p>
          </div>
          <div className="form-control w-full  mb-3">
            <label className="label">
              <span className="label-text">LinkedInProfile</span>
            </label>
            <div className="input-group w-full">
              <input
                {...register("LinkedInProfile", { required: false })}
                type="text"
                placeholder="Enter LinkedInProfile"
                className="input input-bordered w-full "
              ></input>
            </div>
            <p className="text-danger fw-bold">
              {errors.LinkedInProfile?.type === "required" &&
                "LinkedIn Profile link is required"}
            </p>
          </div>
          <input
            className="btn w-full  text-white"
            type="submit"
            value="Update profile"
          />
        </form>
      </div>
    </div>
  );
};

export default Profile;
