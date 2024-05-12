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

function NavList() {
  const [isActive, setIsActive] = useState(() => {
    const storedActiveTab = localStorage.getItem("isActive");
    return storedActiveTab !== null ? parseInt(storedActiveTab) : 0;
  });

  useEffect(() => {
    localStorage.setItem("isActive", isActive.toString());
  }, [isActive, ]);

  return (
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
  );
}

export default function NavbarSimple() {
  const auth = localStorage.getItem('user')
  const navigate = useNavigate()
  const [openNav, setOpenNav] = useState(false);
  
  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);
  
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
    
  }, []);

  return (
    <>
      {auth && <nav className="lg:w-[60px] bg-[#161D2F] lg:rounded-xl flex items-center justify-around lg:justify-start lg:h-fit lg:flex-col p-3 lg:py-5">

          <Link
            to="/entertainment-web-app/"
            className="text-[#FC4747]"
          >
            <MdOutlineMovie className="w-[25px] h-[30px] lg:mt-5" />
          </Link>


          {/* {!auth && <Link
            to="/entertainment-web-app/signUp"
            className="flex items-center text-[#FC4747] mb-5"
          >
            signUp
          </Link>}

          {!auth && <Link
            to="/entertainment-web-app/logIn"
            className="flex items-center text-[#FC4747] mb-5"
          >
            logIn
          </Link>} */}



          <div className={auth ? `sm:block md:block lg:block sm:my-auto lg:my-0` : `sm:hidden md:hidden lg:hidden`}>
            <NavList />
          </div>

          {auth && <Link
            to="/entertainment-web-app/logIn"
            className="hover:text-[#FC4747] text-white lg:mt-40"
            onClick={()=>{localStorage.removeItem('user'); navigate("/entertainment-web-app/signUp"); localStorage.setItem("isActive", JSON.stringify(0));}}
          >
            <CgProfile className="w-[25px] h-[30px]" />
          </Link>}

          {/* {auth && <Link
            to="/entertainment-web-app/logIn"
            className="hover:text-[#FC4747] text-white"
            onClick={()=>{localStorage.removeItem('user'); navigate("/entertainment-web-app/signUp"); localStorage.setItem("isActive", JSON.stringify(0));}}
          >
            logOut
          </Link>} */}
          {/* <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton> */}
        {/* <Collapse open={openNav}><NavList /></Collapse> */}
      </nav>}
    </>
  );
}
