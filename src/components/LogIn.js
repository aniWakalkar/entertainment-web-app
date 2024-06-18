import axios from "axios";
import React, { useEffect, useState } from 'react';
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { MdOutlineMovie } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { handle_token } from "../store/action/actions";
import "./Myscroll.css";
import { LOCAL_SERVER } from "./constants";

const LogIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const search_token = useSelector((state) => state.search_token);
  const [token, setToken] = useState("")
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
      
      const response = await axios.post(`${LOCAL_SERVER}/login`, formData, 
      {
        headers: {
            'Content-Type': 'application/json',
        }
      });

      // localStorage.setItem('user', JSON.stringify(response.data.token));
      console.log("Requesting for token...")
      setToken(1);
      dispatch(handle_token(response.data.token));
    } catch (error) {
      if(error.response.status === 401){
        setToken(0);
      }
      console.error('Failed to send data:', error);
    }
  };

  useEffect(() => {
    search_token && navigate("/entertainment-web-app/")
    setTimeout(() => {
      setToken("");
    }, 2000);
  }, [token, search_token, navigate])


  return (
    <div className="w-full text-black flex justify-center outfit_light h-full"> 
      {
        token !== "" &&
        <div className="fixed top-0 right-0 m-4 z-50 p-4 shadow-lg w-[250px] flex items-center justify-around bg-white text-black px-3">
          <IoNotificationsCircleSharp className="w-[20px] h-[25px]"/>
          {token === 1 && <p> Logging in...</p>}
          {token === 0 && <p> Password does not match...</p>}
        </div> 
      }
      <div className="text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border w-full mt-14">
        <MdOutlineMovie className='text-[#FC4747] mx-auto w-[50px] h-[55px]'/>
        <form 
          className="max-w-screen-lg mt-14 mb-2 bg-[#161D2F] rounded-xl p-6 w-[18rem] md:w-[21rem] mx-auto"
          onSubmit={handleSubmit}>
          <h4 className="block mb-3 md:mb-6 leading-relaxed tracking-normal text-white md:text-2xl">
            Login
          </h4>
          <div className="flex flex-col gap-5 mb-1">
            <div className="h-11 md:h-14 w-full min-w-[200px]">
              <input
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Email address'
                autoComplete='email'
                required
                style={{ borderBottom: "1px solid gray" }}
                className="peer h-full w-full bg-transparent px-3 py-2 text-gray-400 outline outline-0 transition-all disabled:bg-blue-gray-50 outline-none placeholder:text-gray-400 md:text-[18px]" />
            </div>
            <div className="h-11 md:h-14 w-full min-w-[200px]">
              <input
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Password'
                type='password'
                autoComplete='off'
                required
                style={{ borderBottom: "1px solid gray" }}
                className="peer h-full w-full bg-transparent px-3 py-2 text-gray-400 outline outline-0 transition-all disabled:bg-blue-gray-50 outline-none placeholder:text-gray-400 md:text-[18px]" />
            </div>
            <button
              className="block w-full select-none rounded-md bg-[#FC4747] py-2 px-6 text-center align-middle text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none md:text-[18px]"
              type="submit">
              Login to your account
            </button>
          </div>
          <p className="block mt-4 antialiased leading-relaxed text-center text-white">
            Don't have an account? 
            <Link to="/entertainment-web-app/signUp" className="text-[#FC4747]">
              &nbsp;Sign up
            </Link>
          </p>
        </form>
      </div>  
    </div>
  );
};

export default LogIn;
