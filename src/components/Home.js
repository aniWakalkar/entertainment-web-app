import {
  Card
} from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaPlayCircle } from "react-icons/fa";
import { MdOutlineBookmark } from "react-icons/md";
import { useSelector } from 'react-redux';
import "./Myscroll.css";
import SearchBar from "./SearchBar";
import { SERVER } from "./constants";

function Home() {
  const search_token = useSelector((state) => state.search_token);
  const search_Query_1 = useSelector((state) => state.search_Query);
  const [trending, setTrending] = useState([])
  const [recommanded, setRecommanded] = useState([])
  const [searchResults, setSearchResults] = useState([]);
  const [searchedItem, setSearchedItem] = useState(false);

  const[isBookMarkedMovies, set_isBookMarkedMovies] = useState(0)

  // const getTrending = async () => {
  //   const options = {
  //     method: "GET",
  //     url: "https://testmongo-bjvb.onrender.com/api/get/all/movies",
  //     headers: {
  //       "x-access-token": search_token,
  //     },
  //   };

  //   try {
  //     const response = await axios.request(options);
  //     setTrending(response.data)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const getRecommanded = async () => {
    const options = {
      method: "GET",
      url: `${SERVER}/get/all/movies`,
      headers: {
        "x-access-token": search_token,
      },
    };

    try {
      const response = await axios.request(options);
      setRecommanded(response.data)
      setTrending(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  const handle_Bookmark = async (e)=>{
      try {
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

  const handle_Bookmark_Remove = async (e)=>{
    try {
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




useEffect(() => {
  getRecommanded()
  if (search_Query_1 !== "") {
    setSearchResults(() => {
      const searchArray = recommanded.filter(movies =>
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
      className="flex-wrap w-full text-white lg:p-4 overflow-x-hidden" // overflow-x-hidden 
    > 
      <SearchBar/>
      <div className="trending p-2 my-2">
        <h4 className="outfit_light" style={{fontSize:"24px"}}>Trending</h4>
        <div className="Trending">
          <ul className="flex items-center justify-start pb-4 scroll-trending overflow-x-auto my-2">
            {trending.length > 0 && trending.map((data, index)=>{
              // const isBookmarked = isBookMarkedMovies.some(item => item.id === data.id);
              return (
              index <= 4 && 
              <li key={index} className="cursor-pointer sm:px-2">
                <Card className="sm:w-[16.5rem] md:w-[18rem] lg:w-[20rem] relative text-center bg-white">
                <div className="w-[100%] sm:h-[170px] md:h-[180px] relative">
                  <img
                    src={data.image}
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
              <div className="absolute text-white hover:text-red-400 bg-[#0707078f] p-1 rounded-full" style={{ top: "8px", right: "16px" }} onClick={() => { data.bookmarked  ? handle_Bookmark_Remove(data): handle_Bookmark(data) }}>
              {data.bookmarked  ? 
                <MdOutlineBookmark style={{ width: "20px", height: "21px" }} /> 
                : 
                <CiBookmark style={{ width: "20px", height: "21px" }} />
              }
            </div>
              }
              <p className="my-auto text-[#10141E] outfit_medium" style={{fontSize:"18px"}}>{data.title}</p>

                </Card>
              </li>)
            })}
          </ul>
        </div>
      </div>

      <div className="recommandedForYou p-2 mt-2">
        <h4 className="outfit_light" style={{fontSize:"24px"}}>Recommanded For You</h4>
        <div className="list">

        { search_Query_1 !== "" &&        
          <ul className="grid sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-3 lg:grid-cols-5 lg:gap-3 my-2">
            {
              searchResults.map((data, index)=>{
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
              <div className="absolute text-white hover:text-red-400 bg-[#0707078f] p-1 rounded-full" style={{ top: "8px", right: "16px" }} onClick={() => { data.bookmarked  ? handle_Bookmark_Remove(data): handle_Bookmark(data) }}>
              {data.bookmarked ? 
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


        { search_Query_1 === "" && recommanded.length > 0 &&        
          <ul className="grid sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-3 lg:grid-cols-5 lg:gap-3 my-2">
            {
              recommanded.map((data, index)=>{
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
              <div className="absolute text-white hover:text-red-400 bg-[#0707078f] p-1 rounded-full" style={{ top: "8px", right: "16px" }} onClick={() => { data.bookmarked  ? handle_Bookmark_Remove(data): handle_Bookmark(data) }}>
              {data.bookmarked ? 
                <MdOutlineBookmark style={{width:"20px",height:"21px"}}/> 
                : 
                <CiBookmark style={{ width: "20px", height: "21px" }}/>
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
          searchedItem && recommanded.length === 0 &&
          <div className="outfit_medium" style={{textAlign:"center", fontSize: "x-large", display: "flex", alignItems: "center",justifyContent: "center" , height: "30vh"}}>
            <p> Movies Not Found </p>
          </div>
        }
        </div>
      </div>
    </div>
  );
}

export default Home;

