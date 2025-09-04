import { useState, useEffect, useContext } from "react";
import { Home, Search, Plus, Heart, User } from "lucide-react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { GlobalContext } from "../App";

export function Sidebar() {
  const { createButtonOn, setCreateButtonOn, userName } =
    useContext(GlobalContext);

  function toggle() {
    setCreateButtonOn(true);
  }

  return (
    <div className=" side-bar flex flex-col items-center space-y-6 bg-black h-screen py-6 ">
      {/* Home (active) */}
      <Link to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-house text-white w-6 h-6 options"
          aria-hidden="true"
        >
          <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
          <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        </svg>
      </Link>

      {/* Search */}
      <Search
        className="text-gray-500 w-6 h-6 options"
        color="white"
        size={32}
        strokeWidth={1.5}
      />

      {/* Plus Button */}
      <div
        className="plus-bg bg-gray-800 p-3 rounded-xl flex items-center justify-center"
        onClick={toggle}
      >
        <Plus
          className="text-white w-100 h-100 options"
          color="white"
          size={45}
          strokeWidth={2}
        />
      </div>

      {/* Heart */}
      <Link to={"/liked"}>
        <Heart
          className="text-gray-500 w-6 h-6 options"
          color="white"
          size={32}
          strokeWidth={1.5}
        />
      </Link>

      {/* User */}
      <Link to={`/u/${userName}`}>
        <User
          className="text-gray-500 w-6 h-6 options"
          color="white"
          size={32}
          strokeWidth={1.5}
        />
      </Link>
    </div>
  );
}
