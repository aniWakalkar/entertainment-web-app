import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { CiBookmark } from "react-icons/ci";
import { MdLocalMovies, MdOutlineMovie } from "react-icons/md";
import { PiFilmReelFill, PiTelevision } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";

const List = [
  {

    tabName: <MdLocalMovies className="w-[25px] h-[30px]"/>,
    path: "/entertainment-web-app/",
  },
  {
    tabName: <PiFilmReelFill className="w-[25px] h-[30px]"/>,
    path: "/entertainment-web-app/Movies",
  },
  {
    tabName: <PiTelevision className="w-[25px] h-[30px]"/>,
    path: "/entertainment-web-app/Tv_series",
  },
  {
    tabName: <CiBookmark className="w-[25px] h-[30px]"/>,
    path: "/entertainment-web-app/Saved",
  },
];


export default function NavbarSimple() {
  const navigate = useNavigate()
  
  const handleLogOut = () => {
    // auth.logged = false;
    // localStorage.setItem("user", JSON.stringify(auth));
    // // Navigate to the logout page
    // navigate("/entertainment-web-app/signUp");
    // localStorage.setItem("isActive", JSON.stringify(0));
    console.log("false")
  };

  const [isActive, setIsActive] = useState(() => {
    const storedActiveTab = localStorage.getItem("isActive");
    return storedActiveTab !== null ? parseInt(storedActiveTab) : 0;
  });

  useEffect(() => {
    localStorage.setItem("isActive", isActive.toString());
  }, [isActive, ]);
  
  return (
    <>
      <nav className="lg:w-[60px] bg-[#161D2F] lg:rounded-xl flex items-center justify-around lg:justify-start lg:h-fit lg:flex-col p-3 lg:py-5">

          <Link
            to="/entertainment-web-app/"
            className="text-[#FC4747]"
            onClick={() => setIsActive(0)}
          >
            <MdOutlineMovie className="w-[25px] h-[30px] lg:mt-5" />
          </Link>

          <div className="sm:block md:block lg:block sm:my-auto lg:my-0">
          <ul className="flex items-center justify-evenly lg:flex-col sm:mx-2 lg:mt-10">
      {List.map((value, index) => {
        return (
          <Typography
            key={index}
            as="li"
            className="hover:text-[#FC4747] lg:my-2 mx-2"
            variant="small"
            color="blue-gray"
          >
            <Link
              to={value.path}
              className={`${
                isActive === index ? `text-white` :  `text-[#5A6985] hover:text-[#FC4747]`
              }`}
              onClick={() => setIsActive(index)}
            >
              {value.tabName}
            </Link>
          </Typography>
        );
      })}
    </ul>
          </div>

          <Link
            to="/entertainment-web-app/logIn"
            className="hover:text-[#FC4747] text-white lg:mt-40"
            onClick={handleLogOut}
          >
            <CgProfile className="w-[25px] h-[30px]" />
          </Link>
      </nav>
    </>
  );
}
