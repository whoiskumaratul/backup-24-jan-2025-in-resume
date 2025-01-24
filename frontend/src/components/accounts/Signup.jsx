import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from  "yup"
import { useFormik } from "formik";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {

  const navigate = useNavigate()




  const validate = Yup.object().shape({
    name: Yup.string()
    .min(6)
    .max(25)
    .trim()
    .required('Please Enter Your Full Name')
    .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
            'Name can only contain letters.'
        ),

    email: Yup.string()
    .email()
    .trim()
    .required("Please enter your email"),
    
    password: Yup.string().min(6).trim().required("Please enter your password"),
  
    
});

 const formik = useFormik({
  initialValues: {
    name: "",
    email: "",
    password: ""
  },

  enableReinitialize: true,

  onSubmit: (values) => {
    axios.post("http://localhost:8000/api/signup", values, {
      headers: {
        "Content-Type": "application/json",
        },
    })
    .then((response) => {
      console.log(response.data)
      navigate('/login');
      toast("Registration Successfull");
       
      });
  },
  validationSchema: validate
 });
   

  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const navigate = useNavigate()

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("http://localhost:8000/api/signup", { name, email, password })
  //     .then((result) => 
  //       {
  //         navigate('/profile')
  //         console.log(result)
          
  //       if(result.status == 200){
  //         console.log("good")
  //       }
     
  //       }) .catch((error) => console.log(error));


      
  // };

  return (
    <div className="flex h-screen items-center justify-center px-4 md:px-20">
      <div className="w-full max-w-lg text-center bg-gray-600 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-white p-4">Signup</h1>
         <form 
          className="bg-white shadow-md rounded-b-lg px-6 py-6"
          // onSubmit={handleSubmit}
          onSubmit={formik.handleSubmit}
          onChange={formik.handleChange}
        >

      
    


          <div className="mb-4">
            <label
              className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2 text-start"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your Name"
              name="name"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"

              { ...formik.getFieldProps("name") }
             onChange={formik.handleBlur}
             onBlur={formik.handleBlur}


              // onChange={(e) => setName(e.target.value)}
            />

            { formik.errors.name && formik.touched.name &&(
              <>
                <p className="text-[red]">{formik.errors.name}</p>
              </>
            )}


          </div>

          <div className="mb-6">
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

              // onChange={(e) => setEmail(e.target.value)}
            />
            
            {formik.errors.email && formik.touched.name && (
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
              // onChange={(e) => setPassword(e.target.value)}

              { ...formik.getFieldProps("password")}
              onChange={formik.handleBlur}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password && (
              <>
                <p className="text-[red]">{formik.errors.password}</p>
              </>
            )  } 
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition duration-200"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
