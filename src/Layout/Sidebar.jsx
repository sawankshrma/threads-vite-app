import { useState, useEffect, useContext } from "react";
import { Home, Search, Plus, Heart, User } from "lucide-react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { CreateButtonContext } from "../App";

export function Sidebar() {
  const { createButtonOn, setCreateButtonOn } = useContext(CreateButtonContext);

  function toggle() {
    setCreateButtonOn(true);
  }

  return (
    <div className=" side-bar flex flex-col items-center space-y-6 bg-black h-screen py-6 ">
      {/* Home (active) */}
      <Link to="/">
        <Home
          className="text-white w-6 h-6 options"
          color="white"
          size={32}
          strokeWidth={1.5}
        />
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
      <Heart
        className="text-gray-500 w-6 h-6 options"
        color="white"
        size={32}
        strokeWidth={1.5}
      />

      {/* User */}
      <User
        className="text-gray-500 w-6 h-6 options"
        color="white"
        size={32}
        strokeWidth={1.5}
      />
    </div>
  );
}
