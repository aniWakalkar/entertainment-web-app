import React from 'react';
import { MdOutlineMovie } from "react-icons/md";
import { Link } from 'react-router-dom';
import "../myScroll.css";

const LogIn = () => {
  
  return (
    <div
    className="w-full text-black flex justify-center outfit_light h-full"
    > 
      <div className="text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border w-full mt-14">
        <MdOutlineMovie className='text-[#FC4747] mx-auto w-[50px] h-[55px]'/>
        <form className="max-w-screen-lg mt-14 mb-2 bg-[#161D2F] rounded-xl p-6 w-[18rem] md:w-[21rem] mx-auto">
          <h4
            className="block mb-3 md:mb-6 leading-relaxed tracking-normal text-white md:text-2xl">
            Login
          </h4>
          <div className="flex flex-col gap-5 mb-1">
            <div className="h-11 md:h-14 w-full min-w-[200px]">
              <input
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Email address'
                style={{borderBottom : "1px solid gray"}}
                className="peer h-full w-full bg-transparent px-3 py-2 text-gray-400 outline outline-0 transition-all disabled:bg-blue-gray-50 outline-none placeholder:text-gray-400 md:text-[18px]" />
            </div>
            <div className="h-11 md:h-14 w-full min-w-[200px]">
              <input
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Password'
                style={{borderBottom : "1px solid gray"}}
                className="peer h-full w-full bg-transparent px-3 py-2 text-gray-400 outline outline-0 transition-all disabled:bg-blue-gray-50 outline-none placeholder:text-gray-400 md:text-[18px]" />
            </div>
            <button
              className="block w-full select-none rounded-md bg-[#FC4747] py-2 px-6 text-center align-middle text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none md:text-[18px]"
              type="button"
              onClick={handleSubmit}>
              Login to your account
            </button>
          </div>
          <p className="block mt-4 antialiased leading-relaxed text-center text-white">
            Don't have an account ? 
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
