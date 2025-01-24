import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import * as Yup from 'yup';
import { useFormik } from "formik";
import axios from "axios";

import { useAuth } from  '../accounts/AuthContext';
import  { ToastContainer, toast } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";

function Login() {

  // const options1 = ['User', 'Admin'];

  // const onOptionChangeHandler = (event) => {
  //   console.log("Use Selected Value", event.target.value);
  // }


const { login } = useAuth();

  const navigate = useNavigate();

  const validate = Yup.object().shape({
      email: Yup.string()
      .trim()
      .email()
      .required("please enter your email"),

      password: Yup.string()
      .min(6)
      .trim()
      .required("Please enter your password")


      // password: Yup.string()
      // .min(6, "Password must be at least 6 characters")
      // .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      // .matches(/[0-9]/, "Password must contain at least one number")
      // .required("Please enter your password"),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    enableReinitialize:true,

    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/login",
          
          values, // Request body directly passed here
          {
            headers: {
              'Content-Type': 'application/json', // Specify content type
            },
            withCredentials: true, // Include cookies for authentication
           
          }
          
          
        );
       //jwt data yahi se save nahi ho rha hai localstorage me
       // Destructure user and token from response.data
       const { user, token } = response.data;
       if (!token) {
         alert("Login failed. No token received from the server.");
         return;
       }

       localStorage.setItem("jwt", token);
       console.log("User from login page:", user);
       console.log("Token from login page:", token);

       login(user, token); // Pass user and token to AuthContext
       navigate("/profile"); // Redirect to profile
       toast("Login Successfull");
     } catch (error) {
       console.error("Login Error:", error);
       alert(error.response?.data?.message || "Login failed! Please try again.");
     }
   },
   validationSchema: validate,
 });
  return (

    <div>
  
    <div className="flex h-screen items-center justify-center px-4 md:px-20">
  <div className="w-full max-w-lg text-center bg-gray-600 rounded-lg shadow-lg">
    <h1 className="text-2xl font-bold text-white p-4">Login</h1>
    
    <form className="bg-white shadow-md rounded-b-lg px-6 py-6"
    onSubmit={formik.handleSubmit}
    onChange={formik.handleChange}
    >
{/* 
<div className="mb-4 ">
      <div className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2 text-start ' > <select onChange={onOptionChangeHandler} className="dropdown-button  w-full bg-white p-2 border text-xs/[12px] ">
            
            <option> Please Select User Type</option>
                          {options1?.map((option, index) => {
                              return <option key={index}  >
                             
                                  {option}
                              </option>
                          })}
                          
                      </select></div>
      </div> */}
       
      <div className="mb-4">
        <label
          className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2 text-start"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your Email"
          name="email"
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"

        { ...formik.getFieldProps("email") }
        onChange={formik.handleBlur}
        onBlur={formik.handleBlur}

        />
        {formik.errors.email && formik.touched.email && (
          <>
            <p className="text-[red]">{formik.errors.email}</p>
          </>
        ) }
      </div>

      <div className="mb-6">
        <label
          className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2 text-start"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          placeholder="Enter your Password"
          name="password"
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
           
           { ...formik.getFieldProps("password") }
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}

        />
        {formik.errors.password && formik.touched.password && (
          <>
          <p className="text-[red]">{formik.errors.password}</p>
          </>
        ) }
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition duration-200">
        Login
      </button>
    </form>
  </div>
</div>

    </div>
  );
}

export default Login;