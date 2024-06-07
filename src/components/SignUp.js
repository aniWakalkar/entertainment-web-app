import axios from "axios";
import React, { useState } from 'react';
import { MdOutlineMovie } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import "./Myscroll.css";

const SignUp = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission, e.g., call an API to log in the user
    try {
      const response = await axios.post('https://testmongo-bjvb.onrender.com/api/signup', formData, 
      {
        headers: {
            'Content-Type': 'application/json',
        }
      });

      navigate("/entertainment-web-app/logIn")
    } catch (error) {
        console.error('Failed to send data:', error);
    }
  };


  return (
    <div className="w-full text-black flex justify-center outfit_light h-full"> 
      <div className="text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border w-full mt-14">
        <MdOutlineMovie className='text-[#FC4747] mx-auto w-[50px] h-[55px]' />
        <form 
          className="max-w-screen-lg mt-14 mb-2 bg-[#161D2F] rounded-xl p-6 w-[18rem] md:w-[21rem] mx-auto"
          onSubmit={handleSubmit}>
          <h6 className="block mb-3 md:mb-6 leading-relaxed tracking-normal text-white md:text-2xl">
            Sign Up
          </h6>
          <div className="flex flex-col gap-5 mb-1">
            <div className="h-11 md:h-14 w-full min-w-[200px]">
              <input
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Email address'
                autoComplete='email'
                style={{ borderBottom: "1px solid gray" }}
                className="peer h-full w-full bg-transparent px-3 py-2 text-gray-400 outline outline-0 transition-all disabled:bg-blue-gray-50 outline-none placeholder:text-gray-400 md:text-[18px]" />
            </div>
            <div className="h-11 w-full min-w-[200px]">
              <input
                name='password'
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder='Password'
                autoComplete='off'
                style={{ borderBottom: "1px solid gray" }}
                className="peer h-full w-full bg-transparent px-3 py-2 text-gray-400 outline outline-0 transition-all disabled:bg-blue-gray-50 outline-none placeholder:text-gray-400 md:text-[18px]" />
            </div>
            <div className="h-11 w-full min-w-[200px]">
              <input
                name='rPassword'
                value={formData.rPassword}
                type="password"
                onChange={handleChange}
                placeholder='Repeat password'
                autoComplete='off'
                style={{ borderBottom: "1px solid gray" }}
                className="peer h-full w-full bg-transparent px-3 py-2 text-gray-400 outline outline-0 transition-all disabled:bg-blue-gray-50 outline-none placeholder:text-gray-400 md:text-[18px]" />
            </div>
            <button
              className="block w-full select-none rounded-md bg-[#FC4747] py-2 px-6 text-center align-middle text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none md:text-[18px]"
              type="submit">
              Create an account
            </button>
          </div>
          <p className="block mt-4 antialiased leading-relaxed text-center text-white">
            Already have an account? 
            <Link to="/entertainment-web-app/logIn" className="text-[#FC4747]">
              &nbsp;Login
            </Link>
          </p>
        </form>
      </div>  
    </div>
  );
};

export default SignUp;
