import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { loginUser } from '../../services/authServices';
import {  setUser } from '../../slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import './login.css'; 
import { toast } from "react-toastify";

const Login = () => {
  const { register, handleSubmit, formState: { errors },reset } = useForm();
  const dispatch = useDispatch();
  const [serverSideError,setServerSideError] = useState(null);
  const navigate = useNavigate();

  

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      console.log(response);

      if(response.success)
      {
        dispatch(setUser({
        email: data.email
      }));

      toast("User login successful");
      reset();
      navigate("/");
      }else{
        serverSideError(response.message);
      }
      
    } catch (err) {
      console.log(err);
      if(err.response?.data?.message ) toast.error(err.response?.data?.message);
      setServerSideError(err.response?.data?.message || "User login failed");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Welcome Back 👋</h2>
      <p className="login-subtitle">Please log in to continue</p>

      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <label>Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^@]+@[^@]+\.[^@]+$/,
              message: "Enter a valid email address",
            },
          })}
        />
        {errors.email && <p className="error-text">{errors.email.message}</p>}

        <label>Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && <p className="error-text">{errors.password.message}</p>}

        {serverSideError && <p className="error-text">{serverSideError}</p>}

        <button type="submit" id='login-btn'  className="login-btn">Login</button>
      </form>

      <p className="login-footer">
        Don’t have an account?{" "}
        <Link to="/register" className="login-link">Register</Link>
      </p>
    </div>
  );
};

export default Login;
