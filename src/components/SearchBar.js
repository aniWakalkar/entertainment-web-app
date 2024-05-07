import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { handle_search } from "../store/action/actions";
import "./myScroll.css";

function SearchBar() {
  const dispatch = useDispatch()


  useEffect(() => {
    return () => {
      dispatch(handle_search(""));
    }
  }, [dispatch])

  
    return (
        <div className="serachBar outfit_light bg-[#10141E]">
          <form className="flex items-center justify-start">
            <div className=" inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-5 h-4 text-white dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <div className="w-full">
              <input
                type="search"
                id="default-search"
                className="block w-full p-2 ps-5 text-lg text-white outline-none bg-[#10141E] placeholder:text-gray-600 search cursor-pointer"
                placeholder="Search Mockups, Logos..."
                onChange={(e)=>{dispatch(handle_search(e.target.value))}}
                required
              />
              {/* <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button> */}
            </div>
          </form>
        </div>
    );
  }
  
  export default SearchBar;
  