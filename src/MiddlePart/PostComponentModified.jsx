import "./PostComponent.css";
import profileImg from "../assets/836.jpg";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../App";

const style = {
  color: "white",
  borderWidth: "1px",
  borderRadius: "20px",
  padding: 20,
  marginTop: "10px",
  display: "flex",
  flexDirection: "row",
  background: "rgba(13, 19, 20, 0.95)",
  backdropFilter: "blur(15px)",
  border: "solid 1px rgba(51, 51, 51, 1)",
};

export function PostComponentModified({ following }) {
  const [profileUrl, setProfileUrl] = useState({ profileImg });
  const { userProfilePic, setCreateButtonOn, loading } =
    useContext(GlobalContext);

  useEffect(() => {
    const url = userProfilePic;
    if (url !== "") setProfileUrl(`${userProfilePic}`);
    else setProfileUrl(profileImg);
  }, [loading]);

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
            What's Happening?
          </div>
          <button
            style={{
              backgroundColor: "#090c0dff",
              color: "white",
              border: "1px solid #333",
              borderRadius: "7px",
              fontSize: "14.5px",
              fontWeight: "bold",
              cursor: "pointer",
              userSelect: "none",
              outline: "none",
              padding: "10px 10px 10px 10px",
              height: "40px",
              width: "60px",
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
