import {
  Card,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaPlayCircle } from "react-icons/fa";
import { MdOutlineBookmark } from "react-icons/md";
import { useSelector } from 'react-redux';
import SearchBar from "./SearchBar";

function Movies() {
  const search_Query_1 = useSelector((state) => state.search_Query);
  const[localGetMovies, setLocalGetMovies] = useState([])
  const[MoviesEmsId, setMoviesEmsId] = useState(JSON.parse(localStorage.getItem("MoviesEmsId")) || [])

  const getMovies = async () => {
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
      setLocalGetMovies(response.data.data.opening)
      localStorage.setItem("isMovies", JSON.stringify(response.data.data.opening))
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
    const isMovies = JSON.parse(localStorage.getItem("isMovies"));
    if(isMovies === null){
      getMovies();
      console.log("requested")
    }else{
      setLocalGetMovies(isMovies)
    }

    if (search_Query_1 !== "") {
      setLocalGetMovies(prevTvSeries => {
        let searchArray = [];
        for (let x in prevTvSeries) {
          if (prevTvSeries[x].name.toLowerCase().includes(search_Query_1)) {
            searchArray.push(prevTvSeries[x]);
          }
        }
        return searchArray;
      }); 
    }
  }, [MoviesEmsId, search_Query_1]);

  return (
    <div
      className="border border-black w-full h-full px-4 text-white"
      style={{ fontFamily: "math", fontSize: "23px" }}
    > 
      <SearchBar/>
      <div className="movies p-2 my-2">
        <h4 className="outfit_light" style={{fontSize:"24px"}}>Movies</h4>
        <div className="list">
          <ul className="grid grid-cols-5 gap-4">
            {localGetMovies.length > 0 && localGetMovies.map((data, index)=>{
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
                  <CiBookmark style={{ width: "20px", height: "21px",}} />
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

export default Movies;

