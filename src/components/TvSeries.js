import {
  Card,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaPlayCircle } from "react-icons/fa";
import { MdOutlineBookmark } from "react-icons/md";
import { useSelector } from 'react-redux';
import default_image from "./Default/download.png";
import "./Myscroll.css";
import SearchBar from "./SearchBar";

function TvSeries() {
  const search_Query_1 = useSelector((state) => state.search_Query);
  const[localTv_Series, setLocalGetTv_Series] = useState([])
  const[Tv_SeriesEmsId, setTv_SeriesEmsId] = useState(JSON.parse(localStorage.getItem("Tv_SeriesEmsId")) || [])
  
  const getTv_series = async () => {
    const options = {
      method: "GET",
      url: "https://imdb-top-100-movies.p.rapidapi.com/series/",
      // params: { countryId: "in" },
      headers: {
        "X-RapidAPI-Key": "17254d68demshf2ef18c5d58bde6p175af3jsn5135efde141c",
        "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response)
      setLocalGetTv_Series(response.data)
      localStorage.setItem("isTv_Series", JSON.stringify(response.data))
    } catch (error) {
      console.error(error);
    }
  };

  const handle_saved = (e)=>{
    let existingArray = JSON.parse(localStorage.getItem("isBookMarkedTvSeries")) || [];
    let isEmsId = JSON.parse(localStorage.getItem("Tv_SeriesEmsId")) || [];
    if (!existingArray.some(item => JSON.stringify(item) === JSON.stringify(e))) {
      existingArray.push(e);
      isEmsId.push(e.imdbid);
      setTv_SeriesEmsId(prev => [...prev, e.imdbid])
    }else{
      existingArray = existingArray.filter((_, i)=>{
        return e.imdbid !== _.imdbid
      });
      isEmsId = isEmsId.filter((_, i)=>{
        return e.imdbid !== _
      })
      setTv_SeriesEmsId(isEmsId)
    }
    localStorage.setItem("Tv_SeriesEmsId", JSON.stringify(isEmsId))
    localStorage.setItem("isBookMarkedTvSeries", JSON.stringify(existingArray))
  }
  
  useEffect(() => {
    const isTv_Series = JSON.parse(localStorage.getItem("isTv_Series"));
    if (isTv_Series === null){
      getTv_series();
      console.log("requested");
    } else {
      setLocalGetTv_Series(isTv_Series);
    }
    
    if (search_Query_1 !== "") {
      setLocalGetTv_Series(prevTvSeries => {
        let searchArray = [];
        for (let x in prevTvSeries) {
          if (prevTvSeries[x].title.toLowerCase().includes(search_Query_1)) {
            searchArray.push(prevTvSeries[x]);
          }
        }
        return searchArray;
      });
    }
  }, [Tv_SeriesEmsId, search_Query_1]);
  

  return (
    <div
      className="border border-black w-full h-full px-4 text-white"
      style={{ fontFamily: "math", fontSize: "23px" }}
    > 
      <SearchBar/>
      <div className="tv_series p-2 my-2">
        <h4 className="outfit_light" style={{fontSize:"24px"}}>TV series</h4>
        <div className="list">
        <ul className="grid grid-cols-5 gap-4">
          {localTv_Series.length > 0 && localTv_Series.map((data, index)=>{
            return (
            index <= 20 && <li key={index} className="my-3 cursor-pointer">
              <Card className="w-52 relative bg-[#10141E] shadow-none">
              <div className="relative">
              <img
                src={data.image ? data.image : default_image}
                alt="card"
                className="w-52 h-52 rounded-md"
                onError={(e) => { e.target.src = default_image; }}
              />
              {/* Inner div with play icon */}
              <div className="play-icon absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-[#463f3f8f] text-base">
                <div className="absolute inset-0 flex items-center justify-evenly bg-[#ffffff6a] opacity-100 transition duration-300 rounded-2xl text-white" style={{ width: "100px", height: "35px", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
                  <FaPlayCircle className="text-white w-6 h-6" /> <p className="">Play</p>
                  </div>
                </div>
              </div>
              {
              Tv_SeriesEmsId.length > 0 && Tv_SeriesEmsId.includes(data.imdbid) ?
                <div className="absolute text-white hover:text-red-400 bg-[#0707078f] p-1 rounded-full" style={{ top:"8px", right:"16px" }} onClick={()=>{handle_saved(data)}}>
                  <MdOutlineBookmark style={{ width: "20px", height: "21px",}}/>
                </div>
                :
                <div className="absolute text-white hover:text-red-400 bg-[#0707078f] p-1 rounded-full" style={{ top:"8px", right:"16px" }} onClick={()=>{handle_saved(data)}}>
                  <CiBookmark style={{ width: "20px", height: "21px",}}/>
                </div>
              }
                <p className="ml-2  text-gray-500 outfit_light" style={{fontSize:"18px"}}>{data.year && data.year.slice(0, 4)} . type</p>
                  <p className="ml-2  text-white outfit_medium" style={{fontSize:"18px"}}>{data.title}</p>
              </Card>
            </li>
              )
          })}
        </ul>
        </div>
      </div>
    </div>
  );
}

export default TvSeries;

