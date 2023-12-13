import React, { useEffect, useState } from "react";
import Sociallogin from "../components/Sociallogin";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formValidation, formValidationSignUp } from "../utils/formValidation";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import {
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
} from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import axios from "axios";

const SignUp = () => {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formValidationSignUp),
    mode: "onChange",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useSendEmailVerification(auth);
  const [createUserWithEmailAndPassword, user, loading, hookerror] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

  const handleEmail = (e) => {
    const emailRegex = /\S+@\S+\.\S+/;
    const validEmail = emailRegex.test(e.target.value);
    if (validEmail) {
      setEmail(e.target.value);
      setError("");
    }
  };
  const handlePass = (e) => {
    const passregex = /.{6,}/;
    const validatepass = passregex.test(e.target.value);
    if (validatepass) {
      setPassword(e.target.value);
      setError("");
    } else {
      toast("please type 6 charecter pass");
      setError("please type 6 charecter pass");
    }
  };
  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleconfirmPass = (e) => {
    if (e.target.value === password) {
      setConfirm(e.target.value);
      setError("");
    } else {
      setError("password's don't match");
      toast("password dont match");
    }
  };
  const onSubmit = async (e) => {
    const { name, email, password, confirmPass } = e;

    await createUserWithEmailAndPassword(email, confirmPass);

    if (name) {
      try {
        await updateProfile({ displayName: name });
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
    try {
      const response = await axios.post(
        "https://role-management-mrnb.onrender.com/api/v1/user/signup",
        {
          name,
          email,
          password,
        }
      );

      // Use the 'response' object if needed
    } catch (error) {
      // Handle the axios post error
      console.error("Error in axios post:", error);
      setError("hookerror", {
        type: "manual",
        message: "Error in axios post",
      });
    }

    await navigate("/table");
    toast("Check your email for verification");
  };

  // useEffect(() => {
  //   if (hookerror) {
  //     toast(hookerror.message);
  //   }
  // }, [hookerror]);
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  if (user) {
    navigate(from);
  }
  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      {" "}
      <section class="flex flex-col md:flex-row h-auto items-center bg-indigo-600">
        <div class=" hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
          <img
            src="https://source.unsplash.com/random"
            alt=""
            class="w-full h-full object-cover"
          />
        </div>

        <div
          class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-auto px-6 lg:px-16 xl:px-12
flex items-center justify-center"
        >
          <div class="w-full h-auto mt-11">
            <h1 class=" text-center text-3xl md:text-3xl font-extrabold leading-tight mt-12 text-primary ">
              SIGN UP
            </h1>

            <form class="mt-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label class="block text-gray-700">Full Name</label>
                <input
                  {...register("name")}
                  type="name"
                  name="name"
                  id=""
                  placeholder="Enter Name"
                  class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white "
                  autofocus
                  autocomplete
                />
                {errors?.name && (
                  <p className="text-left mt-2 text-sm text-[#E85A2D]">
                    {errors?.name.message}
                  </p>
                )}
              </div>
              <div class="mt-4">
                <label class="block text-gray-700">Email Address</label>
                <input
                  {...register("email")}
                  type="email"
                  name="email"
                  id=""
                  placeholder="Enter Email Address"
                  class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white "
                  autofocus
                  autocomplete
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
                  id=""
                  placeholder="Enter Password"
                  minlength="6"
                  class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
        focus:bg-white"
                />
                {errors?.password && (
                  <p className="text-left mt-2 text-sm text-[#E85A2D]">
                    {errors?.password.message}
                  </p>
                )}
              </div>
              <div class="mt-4">
                <label class="block text-gray-700">Confirm Password</label>
                <input
                  {...register("confirmPass")}
                  type="password"
                  name="confirmPass"
                  Confirm
                  Password
                  id=""
                  placeholder="Enter Password Again"
                  minlength="6"
                  class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
        focus:bg-white "
                />
                {errors?.confirmPass && (
                  <p className="text-left mt-2 text-sm text-[#E85A2D]">
                    {errors?.confirmPass.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                class="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
      px-4 py-3 mt-6"
              >
                Sign Up
              </button>
            </form>

            <hr class="my-6 border-gray-300 w-full" />

            <Sociallogin />

            <p class="mt-8">
              Have an account?{" "}
              <a
                href="login"
                class="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
