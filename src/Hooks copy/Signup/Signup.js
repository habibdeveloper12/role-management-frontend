import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import './signup.css'
import { useCreateUserWithEmailAndPassword, useSendEmailVerification, useSignInWithGithub, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import 'react-toastify/dist/ReactToastify.css';
import { updateProfile } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Loading/Loading';
import Sociallogin from '../Login/Sociallogin';



const Signup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [name, setName] = useState('')
  const navigate = useNavigate()
  const [error, setError] = useState('')

  useSendEmailVerification(auth);
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    hookerror,
  ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });


  // /\S+@\S+\.\S+/
  const handleEmail = (e) => {

    const emailRegex = /\S+@\S+\.\S+/;
    const validEmail = emailRegex.test(e.target.value)
    if (validEmail) {
      setEmail(e.target.value)
      setError('')
    }
    else {
      toast("please type correct email")
      setError("please type correct email")
    }
  }
  const handlePass = (e) => {
    const passregex = /.{6,}/;
    const validatepass = passregex.test(e.target.value)
    if (validatepass) {
      setPassword(e.target.value)
      setError('')
    }
    else {
      toast("please type 6 charecter pass")
      setError("please type 6 charecter pass")
    }


  }
  const handleName = (e) => {
    setName(e.target.value)
  }
  const handleconfirmPass = (e) => {

    if (e.target.value === password) {
      setConfirm(e.target.value)
      setError('')
    }
    else {
      setError("password's don't match")
      toast("password dont match")
    }

    setConfirm(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createUserWithEmailAndPassword(email, confirm)
    await updateProfile({ displayName: name });
    navigate('/')
    toast("check your email for verification")

  }

  useEffect(() => {
    if (hookerror) {
      toast(hookerror.message)
    }
  }, [hookerror])
  const location = useLocation()
  let from = location.state?.from?.pathname || "/";
  if (user) {
    navigate(from)
  }
  if (loading) {
    return <Loading></Loading>
  }
  return (
    <div>
      <div className="main">

        <section className="signup">
          <img src="images/signup-bg.jpg" alt="" />
          <div className="container">
            <div className="signup-content">

              <form onSubmit={handleSubmit} id="signup-form" className="signup-form">
                <h2 className="form-title">Create account</h2>
                <div className="form-group">
                  <input type="text" onChange={handleName} className="form-input" name="name" id="name" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" onChange={handleEmail} className="form-input" name="email" id="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <input type="text" onChange={handlePass} className="form-input" name="password" id="password" placeholder="Password" required />
                  <span toggle="#password" className="zmdi zmdi-eye field-icon toggle-password"></span>
                </div>
                <div className="form-group">
                  <input type="text" onChange={handleconfirmPass} className="form-input" name="password" id="password" placeholder="Confirm Password" required />
                  <span toggle="#password" className="zmdi zmdi-eye field-icon toggle-password"></span>
                </div>
                <div className='text-danger'>{error}</div>

                <div className="form-group">
                  <input type="submit" name="submit" id="submit" className="form-submit" value="Sign up" />
                </div>
              </form>
              <Sociallogin></Sociallogin>
              <p className="loginhere">
                Have already an account ? <Link to={'/login'} className="loginhere-link">Log in Here</Link>
              </p>
              <ToastContainer />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Signup;