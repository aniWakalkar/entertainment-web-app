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
import "./Myscroll.css";
import SearchBar from "./SearchBar";
import { LOCAL_SERVER } from "./constants";

function TvSeries() {
  const dispatch = useDispatch()
  const [checker, setChecker] = useState('')
  const search_token = useSelector((state) => state.search_token);
  const[localTv_Series, setLocalGetTv_Series] = useState([])
  const search_Query_1 = useSelector((state) => state.search_Query);
  const [searchResults, setSearchResults] = useState([]);
  const [searchedItem, setSearchedItem] = useState(false);

  const[isBookMarkedMovies, set_isBookMarkedMovies] = useState(0)
  
  const getTv_series = async () => {
    const options = {
      method: "GET",
      url: `${LOCAL_SERVER}/get/all/tvseries`,
      headers: {
        "x-access-token": search_token,
      },
    };

    try {
      const response = await axios.request(options);
      setLocalGetTv_Series(response.data.series)
      setChecker(response.data.id)
    } catch (error) {
      console.error(error);
    }
  };


  const handle_Bookmark = async (e)=>{
      try {
        dispatch(handle_bookmark(1));
        await axios.post(`${LOCAL_SERVER}/bookmark/set/tvseries`, { "id" : e._id}, 
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

  const handle_Bookmark_Remove = async (e)=>{
    try {
      dispatch(handle_bookmark(0));
      await axios.delete(`${LOCAL_SERVER}/bookmark/delete/tvseries/${e._id}`, 
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
    getTv_series();
    if (search_Query_1 !== "") {
      setSearchResults(() => {
        const searchArray = localTv_Series.filter(movies =>
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
    set_isBookMarkedMovies(0)
  }, [search_Query_1, isBookMarkedMovies]);
      

  return (
    <div
      className="relative w-full text-white lg:p-4"
    > 
      <SearchBar/>
      <div className="relative tv_series p-2 my-2">
        <h4 className="outfit_light" style={{fontSize:"24px"}}>TV series</h4>
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
              <div className="absolute text-white hover:text-red-400 bg-[#0707078f] p-1 rounded-full" style={{ top: "8px", right: "16px" }} onClick={() => { data.bookmarks.includes(checker)  ? handle_Bookmark_Remove(data): handle_Bookmark(data) }}>
              {data.bookmarks.includes(checker)? 
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
                    )
              })
            }
          </ul>
        }

        { search_Query_1 === "" && localTv_Series.length > 0 &&        
          <ul className="grid sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-3 lg:grid-cols-5 lg:gap-3 my-2">
            {
              localTv_Series.map((data, index)=>{
                // const isBookmarked = isBookMarkedMovies.some(item => item.id === data.id);
                  return (
                  index < 30 && 
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
              <div className="absolute text-white hover:text-red-400 bg-[#0707078f] p-1 rounded-full" style={{ top: "8px", right: "16px" }} onClick={() => { data.bookmarks.includes(checker)  ? handle_Bookmark_Remove(data): handle_Bookmark(data) }}>
              {data.bookmarks.includes(checker)? 
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
                    )
              })
            }
          </ul>
        }

        {
          searchedItem &&
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

