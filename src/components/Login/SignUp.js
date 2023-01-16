import React, { useRef } from "react";

import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import auth from "../Firebase/Firebase.init";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useToken from "../Hooks/useToken";
import SpinnerLoading from "../Share/SpinnerLoading";

const SignUp = () => {
  const navigate = useNavigate();
  const [createUserWithEmailAndPassword, createUser, loading, createError] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [updateProfile, updating, updatingError] = useUpdateProfile(auth);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({});
  const password = useRef({});
  password.current = watch("password", "");

  const { token } = useToken(createUser);

  if (createError) {
    toast(createError);
  }
  if (updatingError) {
    toast(updatingError);
  }

  if (token) {
    navigate("/dashboard");
  }
  // handleRegister
  const handleRegister = async (data) => {
    console.log(data);
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
    reset();
  };
  if (loading || updating) {
    return <SpinnerLoading />;
  }

  return (
    <div className="py-20">
      <div className="container mx-auto">
        <div className="flex justify-center ">
          <div className="pt-10">
            <div className="card  bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className=" text-4xl text-center font-bold uppercase  my-4">
                  Sign Up &amp; Access Your Account
                </h2>
                <form action="" onSubmit={handleSubmit(handleRegister)}>
                  <div className="form-control w-full  mb-3">
                    <div className="input-group">
                      <input
                        {...register("name", { required: true })}
                        className="input input-bordered w-full "
                        id="name"
                        placeholder="Enter name"
                        type="text"
                      />
                    </div>
                    <p className="text-danger fw-bold">
                      {errors.name?.type === "required" && "Name is required"}
                    </p>
                  </div>
                  <div className="form-control w-full  mb-3">
                    <div className="input-group">
                      <input
                        {...register("email", { required: true })}
                        type="email"
                        placeholder="Enter email"
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
                        type="text"
                        placeholder="Enter password"
                        {...register("password", {
                          required: "You must specify a password",
                          validate: (value) => {
                            return (
                              [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every(
                                (pattern) => pattern.test(value)
                              ) ||
                              "must include lower, upper, number, and special chars"
                            );
                          },
                          minLength: {
                            value: 5,
                            message: "Password must have at least 5 characters",
                          },
                        })}
                        className="input input-bordered w-full "
                      />
                    </div>
                    <p className="text-danger fw-bold">
                      {errors?.password && (
                        <span>{errors?.password?.message}</span>
                      )}
                    </p>
                  </div>
                  <div className="form-control w-full  mb-3">
                    <div className="input-group">
                      <input
                        type="password"
                        placeholder="Re-Type password"
                        {...register("password_repeat", {
                          validate: (value) =>
                            value === password.current ||
                            "The passwords do not match",
                        })}
                        className="input input-bordered w-full "
                      />
                    </div>
                    <p className="text-danger fw-bold">
                      {errors?.password_repeat && (
                        <span>{errors?.password_repeat?.message}</span>
                      )}
                    </p>
                  </div>

                  <div className="card-actions justify-end mb-4">
                    <button className="btn btn-primary w-full">Sign Up</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
