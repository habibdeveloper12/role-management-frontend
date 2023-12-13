import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { formValidationLogin } from "../utils/formValidation";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  useAuthState,
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import Loading from "../components/Loading";
import axios from "axios";
import { toast } from "react-toastify";
import Sociallogin from "../components/Sociallogin";
import { useNavigate, useNavigation } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [emailr, setEmailr] = useState("");
  const {
    handleSubmit,
    register,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formValidationLogin),
    mode: "onChange",
  });
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

  const [signInWithEmailAndPassword, user2, loading2, error2] =
    useSignInWithEmailAndPassword(auth);
  const onSubmit = (e) => {
    console.log(e);
    const { email, password } = e;

    signInWithEmailAndPassword(email, password);
    // if (!error2) {
    // const { data } = axios.post("https://role-management-mrnb.onrender.com/api/v1/user/login", {
    //   email,
    // });
    // console.log(data);
    // localStorage.setItem("accessToken", data.accessToken);
    // }
  };
  if (error2) {
    toast(error2.message);
  }

  if (user) {
    navigate("/table");
  }
  if (sending) {
    toast("check your email");
  }

  if (loading2) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <section class="flex flex-col md:flex-row h-screen items-center">
        <div class="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
          <img
            src="https://source.unsplash.com/random"
            alt=""
            class="w-full h-full object-cover"
          />
        </div>

        <div
          class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
      flex items-center justify-center"
        >
          <div class="w-full h-auto  mt-10">
            <h1 class=" text-center text-3xl md:text-3xl font-extrabold leading-tight mt-12 text-primary ">
              LOG IN
            </h1>

            <form class="mt-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label class="block text-gray-700">Email Address</label>
                <input
                  {...register("email")}
                  type="email"
                  name="email"
                  onChange={(e) => setEmailr(e.target.value)}
                  placeholder="Enter Email Address"
                  class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white "
                  autofocus
                />
                {errors?.email && (
                  <p className="text-left mt-2 text-sm text-[#E85A2D]">
                    {errors?.email.message}
                  </p>
                )}
              </div>
              <div class="mt-4">
                <label class="block text-gray-700">Password</label>
                <input
                  {...register("password")}
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  minlength="6"
                  class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
              focus:bg-white "
                />
                {errors?.password && (
                  <p className="text-left mt-2 text-sm text-[#E85A2D]">
                    {errors?.password.message}
                  </p>
                )}
              </div>
              <div class="text-right mt-2">
                <a
                  onClick={async () => {
                    await sendPasswordResetEmail(emailr);
                  }}
                  class="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                >
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                class="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
            px-4 py-3 mt-6"
              >
                Log In
              </button>
            </form>

            <hr class="my-6 border-gray-300 w-full" />

            <Sociallogin />

            <p class="mt-8">
              Need an account?{" "}
              <a
                href="signup"
                class="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Create an account
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
