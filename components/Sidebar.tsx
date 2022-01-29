import { AiFillHome } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { HiOutlineLogout } from "react-icons/hi";
import { signOutUser } from "../functions/auth";
import { useState } from "react";
import classes from "../styles/nav.module.css";
import Backdrop from "../components/Backdrop";

import Link from "next/link";

function Sidebar({ clicked, smid }) {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <>
      {openSidebar ? (
        <Backdrop clicked={() => setOpenSidebar(!openSidebar)} color="dark" />
      ) : null}
      <div
        className={`${classes.nav_mobile} py-1 z-50`}
        onClick={() => {
          setOpenSidebar(!openSidebar);
        }}
      >
        <div className={`${openSidebar ? classes.nav_top : null} my-1`}></div>
        <div className={`${openSidebar ? classes.nav_mid : null} my-1`}></div>
        <div
          className={`${openSidebar ? classes.nav_bottom : null} my-1`}
        ></div>
      </div>
      <div
        className={` ${
          openSidebar ? classes.nav_big_show : classes.nav_big
        } h-screen w-1/4 left-0 transition-all fixed top-0 flex justify-center text-white`}
      >
        <ul className={` mt-24 font-bold ${classes.nav_list}`}>
          <li className="flex items-center my-2 cursor-pointer">
            <Link href={"/"}>
              <a className="flex items-center">
                <AiFillHome className="text-lg mx-1" />
                <p>HOME</p>
              </a>
            </Link>
          </li>
          <li
            className={`flex items-center cursor-pointer my-2 ${classes.createpost_button_big}`}
            onClick={clicked}
          >
            <IoMdAddCircleOutline className="text-lg mx-1" />
            <p>CREATE POST</p>
          </li>
          <li className=" cursor-pointer my-2">
            <Link href={`/profile/${smid}`}>
              <a className="flex items-center">
                <CgProfile className="text-lg mx-1" />
                <p>PROFILE</p>
              </a>
            </Link>
          </li>
          <li
            className="flex items-center cursor-pointer my-2"
            onClick={() => signOutUser()}
          >
            <HiOutlineLogout className="text-lg mx-1" />
            <p>LOGOUT</p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
