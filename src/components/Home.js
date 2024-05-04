import {
  Card
} from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaPlayCircle } from "react-icons/fa";
import { MdOutlineBookmark } from "react-icons/md";
import "./Myscroll.css";
import SearchBar from "./SearchBar";

function Home() {
  const[trending, setTrending] = useState([])
  
  const[recommanded, setRecommanded] = useState([])

  const[MoviesEmsId, setMoviesEmsId] = useState(JSON.parse(localStorage.getItem("MoviesEmsId")) || [])

  const getTrending = async () => {
    const options = {
      method: "GET",
      url: "https://flixster.p.rapidapi.com/movies/get-opening",
      params: { countryId: "in" },
      headers: {
        "X-RapidAPI-Key": "17254d68demshf2ef18c5d58bde6p175af3jsn5135efde141c",
        "X-RapidAPI-Host": "flixster.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setTrending(response.data.data.opening)
      localStorage.setItem("isTrending", JSON.stringify(response.data.data.opening))
    } catch (error) {
      console.error(error);
    }
  };

  const getRecommanded = async () => {
    const options = {
      method: "GET",
      url: "https://flixster.p.rapidapi.com/movies/get-upcoming",
      params: { region: 'US', page: '1' },
      headers: {
        "X-RapidAPI-Key": "17254d68demshf2ef18c5d58bde6p175af3jsn5135efde141c",
        "X-RapidAPI-Host": "flixster.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setRecommanded(response.data.data.upcoming)
      localStorage.setItem("isRecommanded", JSON.stringify(response.data.data.upcoming))
    } catch (error) {
      console.error(error);
    }
  };

  const handle_saved = (e)=>{
    let existingArray = JSON.parse(localStorage.getItem("isBookMarkedMovies")) || [];
    let isEmsId = JSON.parse(localStorage.getItem("MoviesEmsId")) || [];
    if (!existingArray.some(item => JSON.stringify(item) === JSON.stringify(e))) {
      existingArray.push(e);
      isEmsId.push(e.emsId);
      setMoviesEmsId(prev => [...prev, e.emsId])
    }else{
      existingArray = existingArray.filter((_, i)=>{
        return e.emsId !== _.emsId
      });
      isEmsId = isEmsId.filter((_, i)=>{
        return e.emsId !== _
      })
      setMoviesEmsId(isEmsId)
    }
    localStorage.setItem("MoviesEmsId", JSON.stringify(isEmsId))
    localStorage.setItem("isBookMarkedMovies", JSON.stringify(existingArray))
  }

  useEffect(() => {
    const isTrending = JSON.parse(localStorage.getItem("isTrending"));
    const isRecommanded = JSON.parse(localStorage.getItem("isRecommanded"));
    if(isTrending === null || isRecommanded === null){
      getTrending();
      console.log("requested getTrending")
      getRecommanded();
      console.log("requested getRecommanded")
    }else{
      setTrending(isTrending)
      setRecommanded(isRecommanded)
    }
  }, [MoviesEmsId]);

  return (
    <div
      className="border border-black w-full h-full px-4 text-white overflow-hidden"
      style={{ fontFamily: "math", fontSize: "23px" }}
    > 
      <SearchBar/>
      <div className="trending p-2 my-2">
        <h4 className="outfit_medium" style={{fontSize:"24px"}}>Trending</h4>
        <div className="Trending w-full">
          <ul className="flex items-center justify-start py-3 scroll-trending overflow-x-auto w-full">
            {trending.length > 0 && trending.map((data, index)=>{
              return (
              index <= 5 && <li key={index} className="mx-3 cursor-pointer">
                <Card className="w-80 relative text-center">
                <div style={{ width: '100%', height: '170px', position: 'relative' }}>
                  <img
                    src={data.posterImage.url}
                    alt="card"
                    className="rounded-md"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="play-icon absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-[#463f3f8f] text-base">
                  <div className="absolute inset-0 flex items-center justify-evenly bg-[#ffffff6a] opacity-100 transition duration-300 rounded-2xl text-white" style={{ width: "100px", height: "35px", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
                    <FaPlayCircle className="text-white w-6 h-6" /> <p className="">Play</p>
                  </div>
                  </div>
                </div>
                {
              MoviesEmsId.length > 0 && MoviesEmsId.includes(data.emsId) ?
                <div className="absolute text-white hover:text-red-400 bg-[#0707078f] p-1 rounded-full" style={{ top:"8px", right:"16px" }} onClick={()=>{handle_saved(data)}}>
                  <MdOutlineBookmark style={{ width: "20px", height: "21px",}}/>
                </div>
                :
                <div className="absolute text-white hover:text-red-400 bg-[#0707078f] p-1 rounded-full" style={{ top:"8px", right:"16px" }} onClick={()=>{handle_saved(data)}}>
                  <CiBookmark style={{ width: "20px", height: "21px",}}/>
                </div>
              }
                  {/* <p className="absolute text-white" style={{ bottom:"20px", left:"16px"}}>Name</p>
                  <p className="absolute text-red-400" style={{ bottom:"2px", left:"16px"}}>Name</p> */}

                </Card>
              </li>)
            })}
          </ul>
        </div>
      </div>
      <div className="recommandedForYou p-2 my-2">
        <h4 className="outfit_medium" style={{fontSize:"24px"}}>Recommanded For You</h4>
        <div className="list">
        <ul className="grid grid-cols-5 gap-4">
          {recommanded.length > 0 && recommanded.map((data, index)=>{
              return (
              index <= 20 && <li key={index} className="my-3 cursor-pointer">
                <Card className="w-52 relative bg-[#10141E] shadow-none">
                <div className="relative">
                <img
                  src={data.posterImage.url}
                  alt="card"
                  className="w-52 h-52 rounded-md"
                />
                {/* Inner div with play icon */}
                <div className="play-icon absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-[#463f3f8f] text-base">
                  <div className="absolute inset-0 flex items-center justify-evenly bg-[#ffffff6a] opacity-100 transition duration-300 rounded-2xl text-white" style={{ width: "100px", height: "35px", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
                    <FaPlayCircle className="text-white w-6 h-6" /> <p className="">Play</p>
                    </div>
                  </div>
                </div>
                {
              MoviesEmsId.length > 0 && MoviesEmsId.includes(data.emsId) ?
                <div className="absolute text-white hover:text-red-400 bg-[#0707078f] p-1 rounded-full" style={{ top:"8px", right:"16px" }} onClick={()=>{handle_saved(data)}}>
                  <MdOutlineBookmark style={{ width: "20px", height: "21px",}}/>
                </div>
                :
                <div className="absolute text-white hover:text-red-400 bg-[#0707078f] p-1 rounded-full" style={{ top:"8px", right:"16px" }} onClick={()=>{handle_saved(data)}}>
                  <CiBookmark style={{ width: "20px", height: "21px",}}/>
                </div>
              }
                  <p className="ml-2  text-gray-500 outfit_light" style={{fontSize:"18px"}}>{data.releaseDate && data.releaseDate.slice(0, 4)} . type</p>
                  <p className="ml-2  text-white outfit_medium" style={{fontSize:"18px"}}>{data.name}</p>
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

export default Home;

