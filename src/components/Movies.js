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
import "./Myscroll.css";
import SearchBar from "./SearchBar";

function Movies() {
  const search_Query_1 = useSelector((state) => state.search_Query);
  const[localGetMovies, setLocalGetMovies] = useState([])
  const [searchResults, setSearchResults] = useState([]);
  const [searchedItem, setSearchedItem] = useState(false);

  const[isBookMarkedMovies, set_isBookMarkedMovies] = useState(JSON.parse(localStorage.getItem("isBookMarkedMovies")) || [])

  const getMovies = async () => {
    const options = {
      method: "GET",
      url: "https://testmongo-bjvb.onrender.com/api/get/all/movies",
      headers: {
        "x-access-token": X_RAPIDAPI_KEY,
      },
    };

    try {
      const response = await axios.request(options);
      setLocalGetMovies(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  
  const handle_Bookmark = async (e)=>{
    let existingArray = JSON.parse(localStorage.getItem("isBookMarkedMovies")) || [];
    if (!existingArray.some(item => JSON.stringify(item) === JSON.stringify(e.id))) {
      existingArray.push(e.id);
      set_isBookMarkedMovies(existingArray)
      
      try {
        const response = await axios.post('https://testmongo-bjvb.onrender.com/api/bookmark/set/movie', { "search_query" : e}, 
        {
          headers: {
              'Content-Type': 'application/json',
              'x-access-token': X_RAPIDAPI_KEY
          }
        });

        console.log('Data sent successfully:', response.data);
        localStorage.setItem("isBookMarkedMovies", JSON.stringify(existingArray))
      } catch (error) {
          console.error('Failed to send data:', error);
      }
    }else{
      existingArray = existingArray.filter((id, i)=>{
        return e.id !== id
      });
      set_isBookMarkedMovies(existingArray)
      
      try {
        const response = await axios.delete(`https://testmongo-bjvb.onrender.com/api/bookmark/delete/movie/${e.id}`, 
        {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': X_RAPIDAPI_KEY
            }
        });

        console.log('Data sent successfully:', response.data);
        localStorage.setItem("isBookMarkedMovies", JSON.stringify(existingArray))
      } catch (error) {
        console.error('Failed to send data:', error);
      }
    }
    
  }

  useEffect(() => {
    getMovies();
    if (search_Query_1 !== "") {
      setSearchResults(() => {
        const searchArray = localGetMovies.filter(movies =>
          movies.title?.toLowerCase().includes(search_Query_1.toLowerCase())
        );
  
        if (searchArray.length === 0) {
          setSearchedItem(true);
        } else {
          setSearchedItem(false);
        }
        return searchArray;
      });
    } else {
      setSearchResults([]);
      setSearchedItem(false);
    }
  }, [search_Query_1, isBookMarkedMovies]);

  return (
    <div
      className="w-full text-white lg:p-4"
    > 
      <SearchBar/>
      <div className="movies p-2 my-2">
        <h4 className="outfit_light" style={{fontSize:"24px"}}>Movies</h4>
        <div className="list">

        { search_Query_1 !== "" &&        
          <ul className="grid sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-3 lg:grid-cols-5 lg:gap-3 my-2">
            {
              searchResults.map((data, index)=>{
                // const isBookmarked = isBookMarkedMovies.some(item => item.id === data.id);
                  return (
                  index <= 30 && 
                  <li key={index} className="my-3 cursor-pointer p-0 mx-auto">
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
              <div className="absolute text-white hover:text-red-400 bg-[#0707078f] p-1 rounded-full" style={{ top: "8px", right: "16px" }} onClick={() => { handle_Bookmark(data) }}>
              {isBookMarkedMovies.includes(data.id) ? 
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


        { search_Query_1 === "" && localGetMovies.length > 0 &&        
          <ul className="grid sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-3 lg:grid-cols-5 lg:gap-3 my-2">
            {
              localGetMovies.map((data, index)=>{
                // const isBookmarked = isBookMarkedMovies.some(item => item.id === data.id);
                  return (
                  index <= 30 && 
                  <li key={index} className="my-3 cursor-pointer p-0 mx-auto">
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
              <div className="absolute text-white hover:text-red-400 bg-[#0707078f] p-1 rounded-full" style={{ top: "8px", right: "16px" }} onClick={() => { handle_Bookmark(data) }}>
              {isBookMarkedMovies.includes(data.id) ? 
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
          searchedItem && localGetMovies.length === 0 &&
          <div className="outfit_medium" style={{textAlign:"center", fontSize: "xxx-large", display: "flex", alignItems: "center",justifyContent: "center" , height: "50vh"}}>
            <p> Movie Not Found </p>
          </div>
        }
        </div>
      </div>
    </div>
  );
}

export default Movies;

