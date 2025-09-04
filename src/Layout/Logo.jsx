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
export function Github() {
  return (
    <div
      style={{
        zIndex: "50",
        width: "55px",
        position: "fixed",
        right: "1vw",
        top: "3vh",
      }}
      className="logo"
    >
      <a href="https://github.com/sawankshrma/threads-vite-app" target="_blank">
        <img
          id="pan"
          src="https://i.pinimg.com/1200x/b5/1b/78/b51b78ecc9e5711274931774e433b5e6.jpg"
          style={{
            borderRadius: "45%",
            width: "90%",
            filter: "drop-shadow(0 0 20px #12465aff)",
          }}
        ></img>
      </a>
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
