import {
  Card,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaPlayCircle } from "react-icons/fa";
import { MdOutlineBookmark } from "react-icons/md";
import { useSelector } from 'react-redux';
import { X_RAPIDAPI_KEY } from "../constants";
import imgMy from "./Default/download.png";
import "./Myscroll.css";
import SearchBar from "./SearchBar";

function TvSeries() {
  const search_Query_1 = useSelector((state) => state.search_Query);
  const[searchedTvSeries, setSearchedTvSeries] = useState(false)
  const[localTv_Series, setLocalGetTv_Series] = useState([])
  const[Tv_SeriesEmsId, setTv_SeriesEmsId] = useState(JSON.parse(localStorage.getItem("Tv_SeriesEmsId")) || [])
  
  const getTv_series = async () => {
    const options = {
      method: "GET",
      url: "https://testmongo-bjvb.onrender.com/api/get/all/tvseries",
      headers: {
        "x-access-token": X_RAPIDAPI_KEY,
      },
    };

    try {
      const response = await axios.request(options);
      setLocalGetTv_Series(response.data)
    } catch (error) {
      console.error(error);
    }
  };


  const handle_saved = (e)=>{
    console.log(e)
  }

  useEffect(() => {
    getTv_series();
  }, []);
    

  return (
    <div
      className="w-full text-white lg:p-4"
    > 
      <SearchBar/>
      <div className="tv_series p-2 my-2">
        <h4 className="outfit_light" style={{fontSize:"24px"}}>TV series</h4>
        <div className="list">
        { localTv_Series.length > 0 &&        
          <ul className="grid sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-3 lg:grid-cols-5 lg:gap-3 my-2">
            {
              localTv_Series.map((data, index)=>{
                // const isBookmarked = isBookMarkedMovies.some(item => item.id === data.id);
                  return (
                  index <= 30 && 
                  <li key={index} className="my-3 cursor-pointer p-0 mx-auto">
                    <Card className="sm:w-[9.9rem] md:w-[13.5rem] w-52 relative bg-[#10141E] shadow-none">
                    <div className="relative">
                    <img
                      src={data.image ? data.image : imgMy}
                      alt="card"
                      className="sm:w-[9.9rem] md:w-[13.5rem] w-52 md:h-[12rem] sm:h-[9.5rem] lg:h-[14rem] rounded-md"
                    />
                    {/* Inner div with play icon */}
                    <div className="play-icon absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-[#463f3f8f] text-base">
                      <div className="absolute inset-0 flex items-center justify-evenly bg-[#ffffff6a] opacity-100 transition duration-300 rounded-2xl text-white" style={{ width: "100px", height: "35px", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
                        <FaPlayCircle className="text-white w-6 h-6" /> <p className="">Play</p>
                        </div>
                      </div>
                    </div>
                    {
              <div className="absolute text-white hover:text-red-400 bg-[#0707078f] p-1 rounded-full" style={{ top: "8px", right: "16px" }} onClick={() => { handle_saved(data) }}>
              {false ? 
                <MdOutlineBookmark style={{ width: "20px", height: "21px" }} /> 
                : 
                <CiBookmark style={{ width: "20px", height: "21px" }} />
              }
            </div>
                  }
                      <p className="ml-2 mt-2 text-gray-500 outfit_light" style={{fontSize:"18px"}}>{data.year && data.year}</p>
                      <p className="ml-2  text-white outfit_medium" style={{fontSize:"18px"}}>{data.title && data.title}</p>
                    </Card>
                  </li>
                    )
              })
            }
          </ul>
        }

          {
            searchedTvSeries &&
            <div className="outfit_medium" style={{textAlign:"center", fontSize: "xxx-large", display: "flex", alignItems: "center",justifyContent: "center" , height: "50vh"}}>
              <p> Series Not Found </p>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default TvSeries;

