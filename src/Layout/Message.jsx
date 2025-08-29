import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../App";
import "./Message.css";
import { Clapperboard } from "lucide-react";

const divStyle = {
  zIndex: "100",
};

export function Message() {
  const { showMessage, setShowMessage, messageName } =
    useContext(GlobalContext);

  useEffect(() => {
    if (showMessage) {
      console.log("hello");
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  return showMessage ? (
    <div style={divStyle} className="message">
      {messageName}
    </div>
  ) : null;
}
