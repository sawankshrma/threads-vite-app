import { useEffect, useState } from "react";
import logo from "./assets/twitter.png";
import { Plus } from "lucide-react";
import "./Logo.css";

const divStyle = {
  zIndex: "11",
  width: "70px",
  position: "fixed",
  left: "2vh",
  top: "3vh",
};

export function Logo() {
  const [logo1, setLogo1] = useState("");

  useEffect(() => {
    setLogo1(logo);
  }, []);

  return (
    <div style={divStyle} className="logo">
      <img src={logo1} style={{ width: "100%" }}></img>
    </div>
  );
}

export function CreateButton() {
  return (
    <div className="plus-bg1 bg-gray-800 p-3 rounded-xl flex items-center justify-center">
      <Plus
        className="text-white w-100 h-100"
        color="white"
        size={55}
        strokeWidth={3}
      />
    </div>
  );
}
