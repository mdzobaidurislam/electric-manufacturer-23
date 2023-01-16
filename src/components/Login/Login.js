import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../Firebase/Firebase.init";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import SpinnerLoading from "../Share/SpinnerLoading";
import { FcGoogle } from "react-icons/fc";
import useToken from "../Hooks/useToken";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  // sign In With Email And  Password
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  // google
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const { token } = useToken(user || googleUser);
  // use effect
  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);

  let errorElement;
  if (error || googleError) {
    errorElement = (
      <div className="alert alert-warning shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>
            Warning:{error?.message} {googleError?.message}!
          </span>
        </div>
      </div>
    );
  }
  if (loading || googleLoading) {
    return <SpinnerLoading />;
  }

  const handleLogin = async (dataFiled) => {
    const email = dataFiled.email;
    const password = dataFiled.password;
    await signInWithEmailAndPassword(email, password);

    reset();
  };

  return (
    <div className="form_section py-20">
      <div className="flex justify-center">
        <div className="pt-10">
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className=" text-4xl text-center font-bold uppercase  my-4">
                Login
              </h2>
              {errorElement && <h3>{errorElement}</h3>}
              <form action="" onSubmit={handleSubmit(handleLogin)}>
                <div className="form-control w-full max-w-xs mb-3">
                  <div className="input-group">
                    <input
                      {...register("email", { required: true })}
                      type="text"
                      placeholder="Email"
                      className="input input-bordered w-full max-w-xs"
                    />
                  </div>
                  <p className="text-danger fw-bold">
                    {errors.email?.type === "required" && "Email is required"}
                  </p>
                </div>
                <div className="form-control w-full max-w-xs mb-3">
                  <div className="input-group">
                    <input
                      {...register("password", { required: true })}
                      type="text"
                      placeholder="Password"
                      className="input input-bordered w-full max-w-xs"
                    />
                  </div>
                  <p className="text-danger fw-bold">
                    {errors.password?.type === "required" &&
                      "Password is required"}
                  </p>
                </div>
                <div className="card-actions justify-end mb-4">
                  <button className="btn btn-primary w-full">Login Now</button>
                </div>
              </form>

              <p>
                <small>
                  <Link to="/reset-password" className="text-secondary">
                    Reset password?
                  </Link>
                </small>
              </p>
              <p>
                <small>
                  New to Doctors Portal{" "}
                  <Link className="text-primary" to="/signup">
                    Create New Account
                  </Link>
                </small>
              </p>

              <div className="divider">OR</div>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-outline w-full"
                  onClick={() => signInWithGoogle()}
                >
                  <span>
                    <FcGoogle />
                  </span>
                  Sign in with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
