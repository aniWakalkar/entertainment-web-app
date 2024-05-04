import {
  Card,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { MdOutlineBookmark } from "react-icons/md";
import SearchBar from "./SearchBar";

function Saved() {
  const[localGetBookMarkedTvSeries, setLocalGetBookMarkedTvSeries] = useState( JSON.parse(localStorage.getItem("isBookMarkedTvSeries")) || [])
  
  const[localGetBookMarkedMovies, setLocalGetBookMarkedMovies] = useState( JSON.parse(localStorage.getItem("isBookMarkedMovies")) || [])

  const[localGetBookMarkedTvSeriesRemoved, setLocalGetBookMarkedTvSeriesRemoved] = useState(JSON.parse(localStorage.getItem("Tv_SeriesEmsId")) || [])

  const[localGetBookMarkedMoviesRemoved, setLocalGetBookMarkedMoviesRemoved] = useState(JSON.parse(localStorage.getItem("MoviesEmsId")) || [])


  const handle_BookMarkedTvSeries = (index)=>{
    let data = localGetBookMarkedTvSeriesRemoved.filter((_, i)=>{
      return i !== index
    })
    localStorage.setItem("Tv_SeriesEmsId", JSON.stringify(data))
    setLocalGetBookMarkedTvSeriesRemoved(data);

    let newData = localGetBookMarkedTvSeries.filter((_, i)=>{
      return index !== i
    })
    localStorage.setItem("isBookMarkedTvSeries", JSON.stringify(newData))
    setLocalGetBookMarkedTvSeries(newData)
  }

  const handle_BookMarkedMovies = (index)=>{
    let data = localGetBookMarkedMoviesRemoved.filter((_, i)=>{
      return i !== index
    })
    localStorage.setItem("MoviesEmsId", JSON.stringify(data))
    setLocalGetBookMarkedMoviesRemoved(data);

    let newData = localGetBookMarkedMovies.filter((_, i)=>{
      return index !== i
    })
    localStorage.setItem("isBookMarkedMovies", JSON.stringify(newData))
    setLocalGetBookMarkedMovies(newData)
  }

  useEffect(() => {
  }, [localGetBookMarkedTvSeries, localGetBookMarkedMovies, localGetBookMarkedTvSeriesRemoved, localGetBookMarkedMoviesRemoved])
  
  return (
    <div
    className="border border-black w-full h-full px-4 text-white"
  > 
    <SearchBar/>
    <div className="movies p-2 my-2">
      {localGetBookMarkedMovies.length > 0 && <div className="list">
      <h4 className="outfit_light" style={{fontSize:"24px"}}>BookMarked Movies</h4>
      <ul className="grid grid-cols-5 gap-4">
        {
        localGetBookMarkedMovies.length > 0 && 
        localGetBookMarkedMovies.map((data, index)=>{
        return <li className="my-3 cursor-pointer" key={index}>
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
          <div className="absolute text-white hover:text-red-400 bg-[#0707078f] p-1 rounded-full" style={{ top:"8px", right:"16px" }} onClick={()=>{handle_BookMarkedMovies(index)}}>
                  <MdOutlineBookmark style={{ width: "20px", height: "21px",}}/>
                </div>
            
            <p className="ml-2  text-gray-500 outfit_light" style={{fontSize:"18px"}}>{data.releaseDate && data.releaseDate.slice(0, 4)} . type</p>
            <p className="ml-2  text-white outfit_medium" style={{fontSize:"18px"}}>{data.name}</p>
          </Card>
        </li>
        })
        }
      </ul>
      </div>}

      
      {localGetBookMarkedTvSeries.length > 0 && <div className={`list ${localGetBookMarkedMovies.length > 0 && `mt-4`}`}>
      <h4 className="outfit_light" style={{fontSize:"24px"}}>BookMarked TV Series</h4>
      <ul className="grid grid-cols-5 gap-4">
        {
        localGetBookMarkedTvSeries.length > 0 && 
        localGetBookMarkedTvSeries.map((data, index)=>{
        return <li className="my-3 cursor-pointer" key={index}>
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
              <div className="absolute text-white hover:text-red-400 bg-[#0707078f] p-1 rounded-full" style={{ top:"8px", right:"16px" }} onClick={()=>{handle_BookMarkedTvSeries(index)}}>
                {/* <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  version="1"
                  viewBox="0 0 48 48"
                  enableBackground="new 0 0 48 48"
                  className="absolute"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: "23px", height: "35px", top: "8px", right: "16px", fill: "white" }}
                  onClick={()=>{handle_BookMarkedTvSeries(index)}}
                >
                  <path fill="#F44336" d="M37,43l-13-6l-13,6V9c0-2.2,1.8-4,4-4h18c2.2,0,4,1.8,4,4V43z" style={{fill : "white"}}/>
                </svg> */}
                <MdOutlineBookmark style={{ width: "20px", height: "21px",}} />
              </div>
            <p className="ml-2  text-gray-500 outfit_light" style={{fontSize:"18px"}}>{data.releaseDate && data.releaseDate.slice(0, 4)} . type</p>
            <p className="ml-2  text-white outfit_medium" style={{fontSize:"18px"}}>{data.name}</p>
          </Card>
        </li>
        })
        }
      </ul>
      </div>}
    </div>
    </div>
  )
}

export default Saved