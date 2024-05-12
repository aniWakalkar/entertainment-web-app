import {
  Card,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { MdOutlineBookmark } from "react-icons/md";
import { useSelector } from 'react-redux';
import default_image from "./Default/download.png";
import SearchBar from "./SearchBar";

function Saved() {
  const search_Query_1 = useSelector((state) => state.search_Query);
  const [searchedTVvalue, setsearchedTVvalue] = useState([])
  const [searchedMovievalue, setsearchedMovievalue] = useState([])

  const[localGetBookMarkedTvSeries, setLocalGetBookMarkedTvSeries] = useState( JSON.parse(localStorage.getItem("isBookMarkedTvSeries")) || [])
  
  const[localGetBookMarkedMovies, setLocalGetBookMarkedMovies] = useState( JSON.parse(localStorage.getItem("isBookMarkedMovies")) || [])

  // deletetion variables
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
    if (search_Query_1 !== "") {
      let arrayTv = []
      arrayTv = localGetBookMarkedTvSeries.filter((value, index)=>{
        return value.title.toLowerCase().includes(search_Query_1)
      })
      setsearchedTVvalue(arrayTv)
      let arrayMovie = []
      arrayMovie = localGetBookMarkedMovies.filter((value, index)=>{
        return value.name.toLowerCase().includes(search_Query_1)
      })
      setsearchedMovievalue(arrayMovie)
    }

    if (search_Query_1 === "") {
      setsearchedTVvalue([]);
      setsearchedMovievalue([]);
    }
  }, [localGetBookMarkedTvSeries, localGetBookMarkedMovies, localGetBookMarkedTvSeriesRemoved, localGetBookMarkedMoviesRemoved, search_Query_1])
  
  return (
    <div
    className="w-full text-white lg:p-4"
  > 
    <SearchBar/>
    <div className="movies p-2 my-2">
      {localGetBookMarkedMovies.length > 0 && <div className="list">
      <h4 className="outfit_light" style={{fontSize:"24px"}}>BookMarked Movies</h4>

        <ul className="grid sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-3 lg:grid-cols-5 lg:gap-3 my-2">
          {
          searchedMovievalue.length === 0 &&
          localGetBookMarkedMovies.length > 0 && 
          localGetBookMarkedMovies.map((data, index)=>{
          return <li className="my-3 cursor-pointer p-0 mx-auto" key={index}>
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
            <div className="absolute text-white hover:text-red-400 bg-[#0707078f] p-1 rounded-full" style={{ top:"8px", right:"16px" }} onClick={()=>{handle_BookMarkedMovies(index)}}>
                    <MdOutlineBookmark style={{ width: "20px", height: "21px",}}/>
                  </div>
              
              <p className="ml-2  text-gray-500 outfit_light" style={{fontSize:"18px"}}>{data.releaseDate && data.releaseDate.slice(0, 4)} . type</p>
              <p className="ml-2  text-white outfit_medium" style={{fontSize:"18px"}}>{data.name}</p>
            </Card>
          </li>
          })
          }

          {
          searchedMovievalue.length > 0 && 
          searchedMovievalue.map((data, index)=>{
          return <li className="my-3 cursor-pointer p-0 mx-auto" key={index}>
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

        <ul className="grid sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-3 lg:grid-cols-5 lg:gap-3 my-2">
          {
          searchedTVvalue.length === 0 &&
          localGetBookMarkedTvSeries.length > 0 && 
          localGetBookMarkedTvSeries.map((data, index)=>{
          return <li className="my-3 cursor-pointer p-0 mx-auto" key={index}>
            <Card className="sm:w-[9.9rem] md:w-[13.5rem] w-52 relative bg-[#10141E] shadow-none">
                <div className="relative">
                <img
                  src={data.image ? data.image : default_image}
                  alt="card"
                  className="sm:w-[9.9rem] md:w-[13.5rem] w-52 md:h-[12rem] sm:h-[9.5rem] lg:h-[14rem] rounded-md"
                  onError={(e) => { e.target.src = default_image; }}
                />
                  {/* Inner div with play icon */}
                  <div className="play-icon absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-[#463f3f8f] text-base">
                    <div className="absolute inset-0 flex items-center justify-evenly bg-[#ffffff6a] opacity-100 transition duration-300 rounded-2xl text-white" style={{ width: "100px", height: "35px", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
                      <FaPlayCircle className="text-white w-6 h-6" /> <p className="">Play</p>
                      </div>
                    </div>
                </div>
                <div className="absolute text-white hover:text-red-400 bg-[#0707078f] p-1 rounded-full" style={{ top:"8px", right:"16px" }} onClick={()=>{handle_BookMarkedTvSeries(index)}}>
                  <MdOutlineBookmark style={{ width: "20px", height: "21px",}} />
                </div>
              <p className="ml-2  text-gray-500 outfit_light" style={{fontSize:"18px"}}>{data.year && data.year.slice(0, 4)} . type</p>
              <p className="ml-2  text-white outfit_medium" style={{fontSize:"18px"}}>{data.title}</p>
            </Card>
          </li>
          })
          }

          {
          searchedTVvalue.length > 0 && 
          searchedTVvalue.map((data, index)=>{
          return <li className="my-3 cursor-pointer p-0 mx-auto" key={index}>
            <Card className="sm:w-[9.9rem] md:w-[13.5rem] w-52 relative bg-[#10141E] shadow-none">
                <div className="relative">
                <img
                  src={data.image ? data.image : default_image}
                  alt="card"
                  className="sm:w-[9.9rem] md:w-[13.5rem] w-52 md:h-[12rem] sm:h-[9.5rem] lg:h-[14rem] rounded-md"
                  onError={(e) => { e.target.src = default_image; }}
                />
                  {/* Inner div with play icon */}
                  <div className="play-icon absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-[#463f3f8f] text-base">
                    <div className="absolute inset-0 flex items-center justify-evenly bg-[#ffffff6a] opacity-100 transition duration-300 rounded-2xl text-white" style={{ width: "100px", height: "35px", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
                      <FaPlayCircle className="text-white w-6 h-6" /> <p className="">Play</p>
                      </div>
                    </div>
                </div>
                <div className="absolute text-white hover:text-red-400 bg-[#0707078f] p-1 rounded-full" style={{ top:"8px", right:"16px" }} onClick={()=>{handle_BookMarkedTvSeries(index)}}>
                  <MdOutlineBookmark style={{ width: "20px", height: "21px",}} />
                </div>
              <p className="ml-2  text-gray-500 outfit_light" style={{fontSize:"18px"}}>{data.year && data.year.slice(0, 4)} . type</p>
              <p className="ml-2  text-white outfit_medium" style={{fontSize:"18px"}}>{data.title}</p>
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