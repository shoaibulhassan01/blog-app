import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';


const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const {login, error, isLoading} = useAuthStore()

  const changeHandler = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
   e.preventDefault()
   try {
    await login(credentials.email, credentials.password)
    toast.success("Login Successful")
    navigate('/dashboard')
   } catch (error) {
     const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
        toast.error(errorMessage)
   }
  };

  return (
    <div className="flex items-center min-h-screen justify-center bg-[#121212]">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-gray-900 shadow-md rounded-lg p-8 w-full max-w-md border border-purple-600">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-500">
          Welcome Back to TechTalks
        </h2>
        <p className="text-center text-gray-400 mb-8">Log in to your account</p>
        <div className="space-y-4">
          {/* Email Field */}
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={credentials.email}
            onChange={changeHandler}
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* Password Field */}
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={credentials.password}
            onChange={changeHandler}
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          onClick={loginHandler}
          className="w-full mt-6 cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Login
        </button>
        <p className="text-center text-gray-500 text-sm mt-4">
          Don't have an account?{' '}
          <a
            href="/register"
            className="text-purple-500 hover:underline font-medium cursor-pointer"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
