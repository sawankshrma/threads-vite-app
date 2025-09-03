import { useEffect, useState, useContext } from "react";
import logo from "../assets/twitter.png";
import { Plus } from "lucide-react";
import "./Logo.css";
import { Link } from "react-router-dom";
import { GlobalContext } from "../App";

const divStyle = {
  zIndex: "50",
  width: "55px",
  position: "fixed",
  left: "1vw",
  top: "3vh",
};

export function Logo() {
  const [logo1, setLogo1] = useState("");

  useEffect(() => {
    setLogo1(logo);
  }, []);

  return (
    <div style={divStyle} className="logo">
      <Link to="/">
        <img
          id="panchi"
          src={logo1}
          style={{
            width: "100%",
            filter: "drop-shadow(0 0 20px #12465aff)",
          }}
        ></img>
      </Link>
    </div>
  );
}

export function CreateButton() {
  const { createButtonOn, setCreateButtonOn } = useContext(GlobalContext);

  function toggle() {
    setCreateButtonOn(true);
  }

  return (
    <div
      className="plus-bg1 bg-gray-800 p-3 rounded-xl flex items-center justify-center"
      onClick={toggle}
    >
      <Plus
        className="text-white w-100 h-100"
        color="white"
        size={40}
        strokeWidth={3}
      />
    </div>
  );
}
