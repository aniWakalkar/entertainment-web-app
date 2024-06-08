import React, { useEffect } from "react";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { handle_bookmark, handle_search } from "../store/action/actions";
import "./Myscroll.css";

function SearchBar() {
  const dispatch = useDispatch()
  const notifyBookmark = useSelector((state) => state.notifyBookmark);


  useEffect(() => {
    setTimeout(() => {
      dispatch(handle_bookmark(""));
    }, 2000);
    return () => {
      dispatch(handle_search(""));
    }
  }, [dispatch, notifyBookmark])

  
    return (
        <div className="serachBar outfit_light bg-[#10141E] md:pt-2 sm:pt-2">
          <form className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <div className="inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
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
              <div className="w-[700px]">
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-2 ps-5 text-lg text-white outline-none bg-[#10141E] placeholder:text-gray-600 search cursor-pointer"
                  placeholder="Search Movies, Series..."
                  onChange={(e)=>{dispatch(handle_search(e.target.value))}}
                  required
                />
              </div>
            </div>
            {
              notifyBookmark !== "" &&
            <div className="fixed top-0 right-0 m-4 z-50 p-4 shadow-lg w-[250px] flex items-center justify-around bg-white text-black px-3">
              <IoNotificationsCircleSharp className="w-[20px] h-[25px]"/>
              {notifyBookmark === 1 && <p> Added to bookmark</p>}
              {notifyBookmark === 0 && <p> Removed from bookmark </p>}
            </div> 
            }
          </form>
        </div>
    );
  }
  
  export default SearchBar;
  