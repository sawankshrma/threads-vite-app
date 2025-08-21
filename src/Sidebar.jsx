import { useState, useEffect } from "react";
import logo from "./assets/twitter.png";
import search from "./assets/search.png";

export function Sidebar() {
  const [logo1, setLogo1] = useState("");
  const [search1, setSearch1] = useState("");

  useEffect(() => {
    setLogo1(logo);
    setSearch1(search);
  }, []);

  return (
    <div
      style={{
        background: "rgba(0,0,0, 0.6)",
        backdropFilter: "blur(1px)",
        border: "solid 1px #191919ff",
        borderRadius: "10px",
        height: "98vh",
        width: "90px",
        zIndex: 9,
        position: "fixed",
        left: "1vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="logo" style={{}}>
        <img
          src={logo1}
          style={{
            width: "60%",
            marginLeft: "20%",
            marginTop: "10px",
          }}
          alt="Twitter logo"
        />
      </div>
      <div
        className="controls"
        style={{ backgroundColor: "green !important" }}
      ></div>
      <img
        src={search1}
        style={{ width: "50%", marginLeft: "25%" }}
        alt="search"
      />
      <div className="options" style={{}}>
        <img
          src={search1}
          style={{ width: "50%", marginLeft: "25%" }}
          alt="search"
        />
      </div>
    </div>
  );
}
