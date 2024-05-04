import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { CiBookmark } from "react-icons/ci";
import { MdLocalMovies, MdOutlineMovie } from "react-icons/md";
import { PiFilmReelFill, PiTelevision } from "react-icons/pi";
import { Link } from "react-router-dom";

const List = [
  {
    tabName: <PiFilmReelFill style={{ width: "23px", height: "35px" }} />,
    path: "/entertainment-web-app/",
  },
  {
    tabName: <MdLocalMovies style={{ width: "23px", height: "35px" }} />,
    path: "/entertainment-web-app/Movies",
  },
  {
    tabName: <PiTelevision style={{ width: "23px", height: "35px" }} />,
    path: "/entertainment-web-app/Tv_series",
  },
  {
    tabName: <CiBookmark style={{ width: "23px", height: "35px" }} />,
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
  }, [isActive]);

  return (
    <ul className="">
      {List.map((value, index) => {
        console.log("isActive:", isActive, "index:", index);
        return (
          <Typography
            key={index}
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium"
          >
            <Link
              to={value.path}
              className={`flex items-center hover:text-[#FC4747] transition-colors ${
                isActive === index ? "text-white" : "text-[#8282e7]"
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
    <nav className="py-5 px-2 bg-[#161D2F] rounded-2xl w-[60px] h-fit">
      <div
        className=""
        style={{
          display: "flex",
          alignContent: "center",
          flexWrap: "wrap",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link
          to="/entertainment-web-app/"
          className="flex items-center text-[#FC4747] transition-color mb-5"
        >
          {/* Material Tailwind */}
          <MdOutlineMovie style={{ width: "30px", height: "35px" }} />
        </Link>

        <div className="hidden lg:block">
          <NavList />
        </div>

        <Link
          to="/entertainment-web-app/Profile"
          className="flex items-center hover:text-red-700 text-white transition-color mt-44"
        >
          {/* Material Tailwind */}
          <CgProfile style={{ width: "23px", height: "35px" }} />
        </Link>
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
      </div>
      {/* <Collapse open={openNav}><NavList /></Collapse> */}
    </nav>
  );
}
