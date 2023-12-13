import React, { useEffect, useState } from 'react';
import { useAuthState, useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../Loading/Loading';
import auth from '../../firebase.init';
import './Login.css'
import axios from 'axios';
import Sociallogin from './Sociallogin';
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation()


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user] = useAuthState(auth)

  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(
    auth
  );



  const [
    signInWithEmailAndPassword,
    user2,
    loading2,
    error2,
  ] = useSignInWithEmailAndPassword(auth);
  const handleSignin = async (event) => {
    event.preventDefault()
    await signInWithEmailAndPassword(email, password)
    const { data } = await axios.post('https://mighty-brushlands-00325.herokuapp.com/login', { email });
    localStorage.setItem('accessToken', data.accessToken)
    console.log(data);


  }

  if (error2) {
    toast(error2.message)
  }


  console.log(email, password);

  if (sending) {
    toast("check your email")
  }

  if (loading2) {
    return <Loading></Loading>
  }





  let from = location.state?.from?.pathname || "/";


  if (user || user2) {


    navigate(from, { replace: true })
  }


  return (
    <div className=''>
      <div className="limiter">
        <div className="container-login100" >
          <div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
            <form onSubmit={handleSignin} className="login100-form validate-form flex-sb flex-w p-5">
              <span className="login100-form-title p-b-53 py-2">
                Sign In With
              </span>

              <Sociallogin></Sociallogin>

              <div className="p-t-31 p-b-9 p-2">
                <span className="txt1">
                  Email
                </span>
              </div>
              <div className="wrap-input100 validate-input" data-validate="Username is required">
                <input onBlur={(e) => setEmail(e.target.value)} className="input100" type="email" name="username" required />
                <span className="focus-input100"></span>
              </div>

              <div className="p-t-13 p-b-9 p-2">
                <span className="txt1 me-4">
                  Password
                </span>

                <a href="#" onClick={async () => {
                  await sendPasswordResetEmail(email);
                }} className="txt2 bo1 m-l-5 ">
                  Forgot pass enter email and click here ?
                </a>
              </div>
              <div className="wrap-input100 validate-input mb-3" data-validate="Password is required">
                <input onBlur={(e) => setPassword(e.target.value)} className="input100" type="password" name="pass" required />
                <span className="focus-input100"></span>
              </div>

              <div className="container-login100-form-btn m-t-17">
                <button type='submit' className="login100-form-btn">
                  Sign In
                </button>
                <ToastContainer></ToastContainer>
              </div>

              <div className="w-full text-center p-t-55">
                <span className="txt2">
                  Not a member?
                </span>

                <Link to={'/signup'} className="txt2 bo1">Sign up Now</Link>
              </div>
            </form>
          </div>
        </div>
      </div>


      <div id="dropDownSelect1"></div>
    </div>
  );
};

export default Login;