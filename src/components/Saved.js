import {
  Card,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaPlayCircle } from "react-icons/fa";
import { MdOutlineBookmark } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { handle_bookmark } from "../store/action/actions";
import SearchBar from "./SearchBar";

function Saved() {
  const dispatch = useDispatch()
  const search_token = useSelector((state) => state.search_token);
  const search_Query_1 = useSelector((state) => state.search_Query);
  const [searchMoviesResults, setSearchMoviesResults] = useState([]);
  const [searchedMovieItem, setSearchedMovieItem] = useState(false);

  const [searchSeriesResults, setSearchSeriesResults] = useState([]);
  const [searchedSeriesItem, setSearchedSeriesItem] = useState(false);

  const[localGetBookMarkedMovies, setLocalGetBookMarkedMovies] = useState([])
  const[localGetBookMarkedTvSeries, setLocalGetBookMarkedTvSeries] = useState([])
  const[isBookMarkedMovies, set_isBookMarkedMovies] = useState(0)

  const getMovies = async () => {
    const options = {
      method: "GET",
      url: "https://testmongo-bjvb.onrender.com/api/bookmark/get/movies",
      headers: {
        "x-access-token": search_token,
      },
    };

    try {
      const response = await axios.request(options);
      setLocalGetBookMarkedMovies(response.data)
    } catch (error) {
      console.error(error);
    }
  };
  const getTv_series = async () => {
    const options = {
      method: "GET",
      url: "https://testmongo-bjvb.onrender.com/api/bookmark/get/tvseries",
      headers: {
        "x-access-token": search_token,
      },
    };

    try {
      const response = await axios.request(options);
      setLocalGetBookMarkedTvSeries(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  const handle_Save_Movies_Bookmark = async (e)=>{
    try {
      dispatch(handle_bookmark(1));
      const response = await axios.post('https://testmongo-bjvb.onrender.com/api/bookmark/set/movie', { "id" : e.id}, 
      {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': search_token
        }
      });
    } catch (error) {
        console.error('Failed to send data:', error);
    }
  set_isBookMarkedMovies(1)
  }
  const handle_Remove_Movies_Bookmark = async (e)=>{
    try {
      dispatch(handle_bookmark(0));
      const response = await axios.delete(`https://testmongo-bjvb.onrender.com/api/bookmark/delete/movie/${e.id}`, 
      {
          headers: {
              'Content-Type': 'application/json',
              'x-access-token': search_token
          }
      });

    } catch (error) {
      console.error('Failed to send data:', error);
    }
    set_isBookMarkedMovies(1)
  }
  
  const handle_Save_Series_Bookmark = async (e)=>{
    try {
      dispatch(handle_bookmark(1));
      const response = await axios.post('https://testmongo-bjvb.onrender.com/api/bookmark/set/tvseries', { "id" : e.id}, 
      {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': search_token
        }
      });
    } catch (error) {
        console.error('Failed to send data:', error);
    }
  set_isBookMarkedMovies(1)
  }
  const handle_Remove_Series_Bookmark = async (e)=>{
    try {
      dispatch(handle_bookmark(0));
      const response = await axios.delete(`https://testmongo-bjvb.onrender.com/api/bookmark/delete/tvseries/${e.id}`, 
      {
          headers: {
              'Content-Type': 'application/json',
              'x-access-token': search_token
          }
      });

    } catch (error) {
      console.error('Failed to send data:', error);
    }
    set_isBookMarkedMovies(1)
  }


  useEffect(() => {
    getMovies()
    getTv_series()
    
    if (search_Query_1 !== "") {
      setSearchMoviesResults(() => {
        const searchArray = localGetBookMarkedMovies.filter(movies =>
          movies.title?.toLowerCase().includes(search_Query_1.toLowerCase())
        );
  
        if (searchArray.length === 0) {
          setSearchedMovieItem(true);
        } else {
          setSearchedMovieItem(false);
        }
        return searchArray;
      });
      setSearchSeriesResults(() => {
        const searchArray = localGetBookMarkedTvSeries.filter(series =>
          series.title?.toLowerCase().includes(search_Query_1.toLowerCase())
        );
  
        if (searchArray.length === 0) {
          setSearchedSeriesItem(true);
        } else {
          setSearchedSeriesItem(false);
        }
        return searchArray;
      });
    } else {
      setSearchMoviesResults([]);
      setSearchedMovieItem(false);
      setSearchSeriesResults([]);
      setSearchedSeriesItem(false);
    }
    set_isBookMarkedMovies(0)
  }, [search_Query_1, isBookMarkedMovies]);
  
  return (
    <div
    className="w-full text-white lg:p-4"
  > 
    <SearchBar/>
    <div className="movies p-2 my-2">

      { 
        searchedMovieItem && searchedSeriesItem &&
        <div className="outfit_medium" style={{textAlign:"center", fontSize: "xxx-large", display: "flex", alignItems: "center",justifyContent: "center" , height: "50vh"}}>
        <p> Searched Item Not Found </p>
        </div>
      }


      {localGetBookMarkedMovies.length > 0 && !searchedMovieItem && <div className="list">
      <h4 className="outfit_light" style={{fontSize:"24px"}}>BookMarked Movies</h4>

        <ul className="grid sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-3 lg:grid-cols-5 lg:gap-3 my-2">
          {
          search_Query_1 === "" && !searchedMovieItem &&
          localGetBookMarkedMovies.length > 0 && 
          localGetBookMarkedMovies.map((data, index)=>{
          return <li className="my-3 cursor-pointer p-0 mx-auto" key={index}>
                    <Card className="sm:w-[9.9rem] md:w-[13.5rem] w-52 relative bg-[#10141E] shadow-none">
                    <div className="relative">
                    <img
                      src={data.image}
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
              <div className="absolute text-white hover:text-red-400 bg-[#0707078f] p-1 rounded-full" style={{ top: "8px", right: "16px" }} onClick={() => { data.bookmarked  ? handle_Remove_Movies_Bookmark(data): handle_Save_Movies_Bookmark(data) }}>
              {data.bookmarked? 
                <MdOutlineBookmark style={{ width: "20px", height: "21px" }} /> 
                : 
                <CiBookmark style={{ width: "20px", height: "21px" }} />
              }
            </div>
                  }
                      <p className="ml-2 mt-2 text-gray-500 outfit_light" style={{fontSize:"18px"}}>{data.year && data.year}{data.genre && data.genre.map((e, i)=>{ return (i < 2 && ` ${e}, `)})}</p>
                      <p className="ml-2  text-white outfit_medium" style={{fontSize:"18px"}}>{data.title && data.title}</p>
                    </Card>
          </li>
          })
          }

          {
          search_Query_1 !== "" && !searchedMovieItem &&
          searchMoviesResults.map((data, index)=>{
          return <li className="my-3 cursor-pointer p-0 mx-auto" key={index}>
                    <Card className="sm:w-[9.9rem] md:w-[13.5rem] w-52 relative bg-[#10141E] shadow-none">
                    <div className="relative">
                    <img
                      src={data.image}
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
              <div className="absolute text-white hover:text-red-400 bg-[#0707078f] p-1 rounded-full" style={{ top: "8px", right: "16px" }} onClick={() => { data.bookmarked  ? handle_Remove_Movies_Bookmark(data): handle_Save_Movies_Bookmark(data) }}>
              {data.bookmarked? 
                <MdOutlineBookmark style={{ width: "20px", height: "21px" }} /> 
                : 
                <CiBookmark style={{ width: "20px", height: "21px" }} />
              }
            </div>
                  }
                      <p className="ml-2 mt-2 text-gray-500 outfit_light" style={{fontSize:"18px"}}>{data.year && data.year}{data.genre && data.genre.map((e, i)=>{ return (i < 2 && ` ${e}, `)})}</p>
                      <p className="ml-2  text-white outfit_medium" style={{fontSize:"18px"}}>{data.title && data.title}</p>
                    </Card>
          </li>
          })
          }

        </ul>
      </div>}
      
      
      {localGetBookMarkedTvSeries.length > 0 && !searchedSeriesItem && <div className={`list ${localGetBookMarkedMovies.length > 0 && `mt-4`}`}>
      <h4 className="outfit_light" style={{fontSize:"24px"}}>BookMarked TV Series</h4>
        <ul className="grid sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-3 lg:grid-cols-5 lg:gap-3 my-2">
            {
            search_Query_1 === "" && !searchedSeriesItem &&
            localGetBookMarkedTvSeries.length > 0 && 
            localGetBookMarkedTvSeries.map((data, index)=>{
            return <li className="my-3 cursor-pointer p-0 mx-auto" key={index}>
                      <Card className="sm:w-[9.9rem] md:w-[13.5rem] w-52 relative bg-[#10141E] shadow-none">
                      <div className="relative">
                      <img
                        src={data.image}
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
                <div className="absolute text-white hover:text-red-400 bg-[#0707078f] p-1 rounded-full" style={{ top: "8px", right: "16px" }} onClick={() => { data.bookmarked  ? handle_Remove_Series_Bookmark(data): handle_Save_Series_Bookmark(data) }}>
                {data.bookmarked? 
                  <MdOutlineBookmark style={{ width: "20px", height: "21px" }} /> 
                  : 
                  <CiBookmark style={{ width: "20px", height: "21px" }} />
                }
              </div>
                    }
                        <p className="ml-2 mt-2 text-gray-500 outfit_light" style={{fontSize:"18px"}}>{data.year && data.year}{data.genre && data.genre.map((e, i)=>{ return (i < 2 && ` ${e}, `)})}</p>
                        <p className="ml-2  text-white outfit_medium" style={{fontSize:"18px"}}>{data.title && data.title}</p>
                      </Card>
            </li>
            })
            }

            {
            search_Query_1 !== "" && !searchedSeriesItem &&
            searchSeriesResults.map((data, index)=>{
            return <li className="my-3 cursor-pointer p-0 mx-auto" key={index}>
                      <Card className="sm:w-[9.9rem] md:w-[13.5rem] w-52 relative bg-[#10141E] shadow-none">
                      <div className="relative">
                      <img
                        src={data.image}
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
                <div className="absolute text-white hover:text-red-400 bg-[#0707078f] p-1 rounded-full" style={{ top: "8px", right: "16px" }} onClick={() => { data.bookmarked  ? handle_Remove_Series_Bookmark(data): handle_Save_Series_Bookmark(data) }}>
                {data.bookmarked? 
                  <MdOutlineBookmark style={{ width: "20px", height: "21px" }} /> 
                  : 
                  <CiBookmark style={{ width: "20px", height: "21px" }} />
                }
              </div>
                    }
                        <p className="ml-2 mt-2 text-gray-500 outfit_light" style={{fontSize:"18px"}}>{data.year && data.year}{data.genre && data.genre.map((e, i)=>{ return (i < 2 && ` ${e}, `)})}</p>
                        <p className="ml-2  text-white outfit_medium" style={{fontSize:"18px"}}>{data.title && data.title}</p>
                      </Card>
            </li>
            })
            }

        </ul>
      </div>}
    
      {
        localGetBookMarkedMovies.length === 0 && localGetBookMarkedTvSeries.length === 0 &&
        <div className="outfit_medium" style={{textAlign:"center", fontSize: "x-large", display: "flex", alignItems: "center",justifyContent: "center" , height: "30vh"}}>
          <p> Bookmarked Item Not Found </p>
        </div>
      }
    
    </div>
    </div>
  )
}

export default Saved