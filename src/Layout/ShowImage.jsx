import { useState, useEffect, useContext } from "react";
import { X } from "lucide-react";
import "./ShowImage.css";
import twitterLogo from "../assets/twitter.png";
import { GlobalContext } from "../App";

export function ShowImage() {
  const { showImg, setShowImg, imgURL } = useContext(GlobalContext);
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        toggle();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  function toggle() {
    setShowImg(false);
  }

  return showImg ? (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        zIndex: 100,
        position: "fixed",
        top: 0,
        left: 0,
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(7px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          //   background: "black",
          padding: "0", // remove extra padding
          borderRadius: "0", // remove rounded corners
          color: "white",
          width: "100vw", // full width
          height: "100vh", // full height
          overflow: "hidden", // no scrollbars
          position: "relative",
        }}
      >
        <X
          onClick={toggle}
          className="text-white w-6 h-6 options create-div-close"
          color="white"
          size={50}
          strokeWidth={2.5}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            cursor: "pointer",
            zIndex: 200,
          }}
        />
        <img
          src={imgURL}
          style={{
            width: "100%", // cover width
            height: "100%", // cover height
            objectFit: "contain", // keeps aspect ratio
            display: "block",
          }}
        />
      </div>
    </div>
  ) : null;
}
