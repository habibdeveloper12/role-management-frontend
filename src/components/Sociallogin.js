import React from "react";
import {
  useAuthState,
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../firebase.init";

import "./social.css";
import Loading from "./Loading";

const Sociallogin = () => {
  const [user] = useAuthState(auth);

  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";
  const [signInWithGoogle, usergoogle, loading, error] =
    useSignInWithGoogle(auth);
  const [signInWithGithub, usergithub, loading1, error1] =
    useSignInWithGithub(auth);

  if (user) {
    navigate("/table");
  }

  // if (user || usergoogle || usergithub) {
  //   navigate(from, { replace: true });
  // }
  if (loading || loading1) {
    return <Loading></Loading>;
  }
  if (error || error1) {
    toast("please sign in or use social login");
  }

  return (
    <div>
      <div className="flex gap-4 justify-center align-center px-4 py-2">
        <button className="btn-face m-b-20" onClick={() => signInWithGithub()}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            width={"20%"}
            alt=""
          />
          <span className="ml-2">Github</span>
        </button>

        <button
          onClick={() => signInWithGoogle()}
          className="btn-google m-b-20"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2702/2702602.png"
            alt="GOOGLE"
          />
          Google
        </button>
      </div>
    </div>
  );
};

export default Sociallogin;
