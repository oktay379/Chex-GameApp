import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { userContext } from "../App";
import axios from "axios";
import { IoMdLogIn } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";

const Navbar = () => {

  const {user} = useContext(userContext);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios.post("http://localhost:4000/auth/logout")
    .then(res => {
      if(res.data === "Success") {
        navigate("/login");
        navigate(0);
      }
    })
    .catch(err => console.log(err))
  };

  return (
    <div className="bg-gray-800 shadow-lg h-20 px-5 flex items-center justify-between">

      <Link to={"/"}>
        <div className="text-4xl font-extrabold text-white" to={"/"}>
          Chex
        </div>
      </Link>

      {
        !user.fullName ? 
        <div className="flex gap-5"> 
          <Link to="/login">
            <div className="flex gap-1 text-white hover:text-gray-300 font-semibold">
              <IoMdLogIn className="" size={25} /> 
              <span to="/login" className="text-3md">Login</span>
            </div>
          </Link>
        </div>
        : 
        <div onClick={handleLogout} className="flex cursor-pointer items-center gap-3 p-1 border border-gray-800 rounded-md shadow-md bg-gray-100">
          <span className="font-semibold text-gray-700">{user.fullName}</span>
          <img className="h-10 w-10 rounded-full border border-gray-300" src={user.profilePic} alt="user" />
          <RiLogoutBoxLine
            className="text-gray-600 cursor-pointer hover:text-red-600"
            size={24}
          />
        </div>
      }

    </div>
  )
}

export default Navbar