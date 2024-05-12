import {
  Card
} from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaPlayCircle } from "react-icons/fa";
import { MdOutlineBookmark } from "react-icons/md";
import { useSelector } from 'react-redux';
import { GET_OPENING_MOVIES, X_RAPIDAPI_HOST, X_RAPIDAPI_KEY } from "../constants";
import SearchBar from "./SearchBar";
import "./myScroll.css";

function Home() {
  const search_Query_1 = useSelector((state) => state.search_Query);
  const[trending, setTrending] = useState([])
  const[searchedItem, setSearchedItem] = useState(false)
  const[recommanded, setRecommanded] = useState([])

  const[MoviesEmsId, setMoviesEmsId] = useState(JSON.parse(localStorage.getItem("MoviesEmsId")) || [])

  const getTrending = async () => {
    const options = {
      method: "GET",
      url: GET_OPENING_MOVIES,
      params: { countryId: "in" },
      headers: {
        "X-RapidAPI-Key": X_RAPIDAPI_KEY,
        "X-RapidAPI-Host": X_RAPIDAPI_HOST,
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
        "X-RapidAPI-Key": X_RAPIDAPI_KEY,
        "X-RapidAPI-Host": X_RAPIDAPI_HOST,
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


    if (search_Query_1 !== "") {
      setRecommanded(prevTvSeries => {
        let searchArray = [];
        for (let x in prevTvSeries) {
          if (prevTvSeries[x].name.toLowerCase().includes(search_Query_1)) {
            searchArray.push(prevTvSeries[x]);
          }
        }
        (searchArray.length === 0 && setSearchedItem(true))
        return searchArray;
      }); 
    }
  }, [MoviesEmsId, search_Query_1]);

  return (
    <div
      className="flex-wrap w-full text-white lg:p-4 overflow-x-hidden" // overflow-x-hidden 
    > 
      <SearchBar/>
      <div className="trending p-2 my-2">
        <h4 className="outfit_light" style={{fontSize:"24px"}}>Trending</h4>
        <div className="Trending">
          <ul className="flex items-center justify-start py-2 scroll-trending overflow-x-auto my-2">
            {trending.length > 0 && trending.map((data, index)=>{
              return (
              index <= 4 && 
              <li key={index} className="cursor-pointer sm:px-2">
                <Card className="sm:w-[18.5rem] md:w-[23rem] lg:w-[23rem] relative text-center">
                <div className="w-[100%] sm:h-[170px] md:h-[180px] relative">
                  <img
                    src={data.posterImage.url}
                    alt="card"
                    className="rounded-md absolute top-0 left-0 w-full h-full object-cover"
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
              <p className="absolute text-white" style={{ bottom:"20px", left:"16px"}}>Name</p>
              <p className="absolute text-red-400" style={{ bottom:"2px", left:"16px"}}>Name</p>

                </Card>
              </li>)
            })}
          </ul>
        </div>
      </div>

      <div className="recommandedForYou mt-6">
        <h4 className="outfit_light" style={{fontSize:"24px"}}>Recommanded For You</h4>
        <div className="list">
        { recommanded.length > 0 &&        
          <ul className="grid sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-3 lg:grid-cols-5 lg:gap-2 my-2">
            {
              recommanded.map((data, index)=>{
                  return (
                  index <= 30 && 
                  <li key={index} className="my-3 cursor-pointer p-0 mx-auto">
                    <Card className="sm:w-[9.9rem] md:w-[13.5rem] w-52 relative bg-[#10141E] shadow-none">
                    <div className="relative">
                    <img
                      src={data.posterImage.url}
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
              })
            }
          </ul>
        }

          {
            searchedItem &&
            <div className="outfit_medium" style={{textAlign:"center", fontSize: "x-large", display: "flex", alignItems: "center",justifyContent: "center" , height: "30vh"}}>
              <p> Searched Item Not Found </p>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Home;

