import React from "react";
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { IoCart } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const baseurl = "http://localhost:3000/api/v1";

import axios from "axios";
const links = [
  { title: "home", link: "/" },
  { title: "about", link: "/about" },
  { title: "contact us", link: "/contacts" },
];

export default function () {
  const navLinkStyle =
    " hover:underline cursor-pointer hover:text-primary font-base";
  const isLoggedIn = true;
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axios.post(
        `${baseurl}/logout`,
        {},
        { withCredentials: true }
      );
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Error logging out");
    }
  };
  return (
    <div className=" h-28 flex justify-around items-center border-b-[1px] border-slate-400 bg-slate-200">
      <div className="w-[100px] h-[100px] font-bold text-xl flex items-center">
        Loan App
      </div>
      <div className="w-60 px-2 h-10 rounded flex justify-center items-center bg-[#F5F5F5]">
        <input
          type="search"
          className="outline-none w-full text-sm bg-transparent"
          placeholder="What are you looking for?"
        />
        <CiSearch className="text-3xl" />
      </div>
      <ul
        className="flex
      gap-3 capitalize  "
      >
        {links.map((items, i) => {
          return (
            <li className={navLinkStyle} key={i}>
              {/* <Link to={items.link}>{items.title}</Link> */}
              {items.title}
            </li>
          );
        })}
        {!isLoggedIn ? (
          <li className={navLinkStyle}>
            {/* <Link to={"/login"}>Login</Link> */}
            Login
          </li>
        ) : null}
      </ul>
      <div className="flex justify-center items-center text-2xl gap-3 "></div>
      <div className="bg-red-500 rounded-full overflow-hidden h-8 w-8 flex justify-center items-center text-base text-white cursor-pointer ">
        {isLoggedIn ? <div className="text-white">A</div> : <FaRegUser />}
      </div>
      <div>
        <button
          className="bg-slate-400 hover:bg-slate-500 active:bg-slate-600 w-30 h-10 rounded text-white textxl
         "
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
