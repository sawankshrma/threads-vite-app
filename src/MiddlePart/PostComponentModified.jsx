import "./PostComponent.css";
import profileImg from "../assets/836.jpg";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../App";

const style = {
  backgroundColor: "#0e0e0eff",
  color: "white",
  borderWidth: "1px",
  borderRadius: "20px",
  border: "solid #2b2b2bff ",
  padding: 20,
  marginTop: "10px",
  display: "flex",
  flexDirection: "row",
};

export function PostComponentModified({ following }) {
  const [profileUrl, setProfileUrl] = useState({ profileImg });
  const { userProfilePic, setCreateButtonOn } = useContext(GlobalContext);

  useEffect(() => {
    const url = userProfilePic;
    console.log(`profile-pic${userProfilePic}`);
    if (url !== "") setProfileUrl(`${userProfilePic}`);
    else setProfileUrl(profileImg);
  }, []);

  return !following ? (
    <div style={style} id={556467}>
      <div>
        <img src={profileUrl} className="profile-pic" />
      </div>
      <div
        style={{
          marginLeft: 10,
          marginRight: 10,
          width: "100%",
        }}
      >
        <div style={{ display: "flex", width: "100%" }}>
          {/* <div style={{ fontSize: 15, fontFamily: "monospace" }}>
            <b>{username} </b>
          </div> */}
        </div>

        <div
          style={{
            fontSize: 14,
            fontFamily: "Segoe UI",
            marginTop: 5,
            marginBottom: 5,
            display: "flex",
            flexDirection: "row",
            // backgroundColor: "green",
            width: "100%",
            height: "34px",
          }}
        >
          <div
            style={{
              width: "100%",
              color: "grey",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              fontSize: "16px",
              cursor: "text",
              userSelect: "none",
            }}
            onClick={() => {
              setCreateButtonOn(true);
            }}
          >
            What's New?
          </div>
          <button
            style={{
              backgroundColor: "#1a1a1a",
              color: "white",
              border: "1px solid #333",
              borderRadius: "7px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              userSelect: "none",
              outline: "none",
              padding: "10px 10px 10px 10px",
              height: "40px",
              width: "80px",
            }}
            onClick={() => {
              setCreateButtonOn(true);
            }}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
