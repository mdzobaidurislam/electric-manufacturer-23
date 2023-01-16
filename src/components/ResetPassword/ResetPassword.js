import React from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import auth from "../Firebase/Firebase.init";
import SpinnerLoading from "../Share/SpinnerLoading";

const ResetPassword = () => {
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({});
  const handleResetPassword = async (data) => {
    await sendPasswordResetEmail(data.reset_email);

    toast("Check your email send rest password link! ");

    reset();
  };
  let errorElement;
  if (error) {
    errorElement = (
      <div className="alert alert-warning shadow-lg">
        <span>Error: {error?.message}</span>
      </div>
    );
  }

  if (sending) {
    toast("Check your email send rest password link! ");
    return <SpinnerLoading />;
  }
  return (
    <div className=" py-20">
      <div className="container mx-auto">
        <div className="card lg:w-[50%] w-full bg-base-100 shadow-xl mx-auto">
          <div className="card-body items-center text-center">
            {errorElement && errorElement}
            <h2 className="card-title">Rest Password</h2>
            <form
              className="login_form mt-4"
              onSubmit={handleSubmit(handleResetPassword)}
            >
              <div className="lg:flex ">
                <div className="form-control w-full max-w-xs mb-3">
                  <div className="input-group">
                    <input
                      {...register("reset_email", { required: true })}
                      type="text"
                      placeholder="Enter Email"
                      className="input input-bordered w-full "
                    />
                  </div>
                  <p className="text-danger fw-bold">
                    {errors.reset_email?.type === "required" &&
                      "Email is required"}
                  </p>
                </div>

                <div className="btn-group d-flex">
                  <button type="submit" className="btn btn-primary">
                    Reset Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
