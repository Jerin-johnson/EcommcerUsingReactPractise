import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { registerUser } from '../../services/authServices';
import {  setUser } from '../../slices/authSlice';
import './register.css'; 
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const { register, handleSubmit, formState: { errors },reset } = useForm();
  const dispatch = useDispatch();
  const [serverSideError,setServerSideError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      console.log(response);

      dispatch(setUser({
        email: data.email,
        username: data.username
      }));

      alert("User registered successfully!");
      reset();
      navigate("/");
    } catch (err) {
      console.log(err);
     setServerSideError(err.response?.data?.message || "User login failed");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Create an Account</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="register-form">

        <label>Username</label>
        <input type="text" {...register("username", { required: "Username is required" })} />
        {errors.username && <p className="error-text">{errors.username.message}</p>}

        <label>Email</label>
        <input type="email" {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^@]+@[^@]+\.[^@]+$/,
            message: "Enter a valid email address"
          }
        })} />
        {errors.email && <p className="error-text">{errors.email.message}</p>}

        <label>Password</label>
        <input type="password" {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters"
          }
        })} />
        {errors.password && <p className="error-text">{errors.password.message}</p>}

         {serverSideError && <p className="error-text">{serverSideError}</p>}


        <button type="submit" className="register-btn">Register</button>
      </form>
      <p>Already have account ?<Link to={"/login"}>Login</Link></p>
    </div>
  );
};

export default Register;
