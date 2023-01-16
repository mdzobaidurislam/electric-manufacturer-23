import React from "react";
import { useSendEmailVerification } from "react-firebase-hooks/auth";
import auth from "../Firebase/Firebase.init";
import { toast } from "react-toastify";
import SpinnerLoading from "./SpinnerLoading";
const EmailVerify = () => {
  const [sendEmailVerification, sending, error] =
    useSendEmailVerification(auth);
  if (error) {
    return (
      <div>
        <p>Error: {error?.message}</p>
      </div>
    );
  }
  if (sending) {
    return <SpinnerLoading />;
  }
  const HandleEmailVerification = async () => {
    await sendEmailVerification();
    toast("Check your email send email verification link!");
  };
  return (
    <div className=" pt-8">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="card w-96 bg-base-100 shadow-xl text-center border-2">
            <div className="card-body">
              <h5 className="text-success">Your are one stape away!!</h5>
              <h2 className=""> Verify your email address!!</h2>
              <p>
                If you verify your email address. You can access Manage
                Inventory page and others option.
              </p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-outline w-full"
                  onClick={() => HandleEmailVerification()}
                >
                  Send Verification Email Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
