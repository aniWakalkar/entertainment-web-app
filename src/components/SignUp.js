import axios from "axios";
import React, { useEffect, useState } from 'react';
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { MdOutlineMovie } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import "./Myscroll.css";

const SignUp = () => {
  const navigate = useNavigate()
  const [token, setToken] = useState("")
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

      await axios.post('https://testmongo-bjvb.onrender.com/api/signup', formData, 
      {
        headers: {
            'Content-Type': 'application/json',
        }
      });
      setToken(1);
      console.log("Navigating to login page...")
      navigate("/entertainment-web-app/logIn")
    } catch (error) {
      if(error.response.status === 409){
        setToken(0);
      }
      console.log('Failed to send data:', error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setToken("");
    }, 2000);
  }, [token])

  return (
    <div className="w-full text-black flex justify-center outfit_light h-full"> 
      {
        token !== "" &&
        <div className="fixed top-0 right-0 m-4 z-50 p-4 shadow-lg w-[250px] flex items-center justify-around bg-white text-black px-3">
          <IoNotificationsCircleSharp className="w-[20px] h-[25px]"/>
          {token === 1 && <p> Signing in...</p>}
          {token === 0 && <p> User already exist...</p>}
        </div> 
      }
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
                required
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
                required
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
                required
                className="peer h-full w-full bg-transparent px-3 py-2 text-gray-400 outline outline-0 transition-all disabled:bg-blue-gray-50 outline-none placeholder:text-gray-400 md:text-[18px]" />
            </div>
            <button
              className="block w-full select-none rounded-md bg-[#FC4747] py-2 px-6 text-center align-middle text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 md:text-[18px]"
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
