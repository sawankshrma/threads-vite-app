// Create a style object to apply styles to the div element in PostComponent
import "./PostComponent.css";
import profileImg from "../assets/836.jpg";
import { useState, useEffect, useRef, useContext } from "react";
import { GlobalContext } from "../App";
import Button from "./Checkbox";

const style = {
  backgroundColor: "#0e0e0eff",
  color: "white",
  borderWidth: "1px",
  borderRadius: "20px",
  borderTop: "solid #2b2b2bff ",
  borderBottom: "solid #2b2b2bff",
  paddingBottom: "10px !important",
  margin: "10px 0px",
  display: "flex",
  flexDirection: "row",
};

export function PostComponent({
  id,
  name,
  time,
  image,
  description,
  liked_users,
}) {
  // console.log(timeAgo(time, Date.now()));
  const { username } = useContext(GlobalContext);
  const timed = timeAgo(time);
  const likeRef = useRef(null);
  const [profileUrl, setProfileUrl] = useState({ profileImg });
  const [likeIsOn, setLikeIsOn] = useState(false);
  const [fetchDone, setFetchDone] = useState(false);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch(`/api/user/${name}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", //TODO: remove
        });
        const response_json = await response.json();
        // console.log(response_json);
        const owner = response_json;
        const url = owner.profile_pic_url;
        if (url !== "") setProfileUrl(`${owner.profile_pic_url}`);
        else setProfileUrl(profileImg);
        // console.log(`${name} is = ${owner.profile_pic_url}`);
      } catch (error) {
        console.error(error);
      } finally {
        function like_isOn(arr, username) {
          return arr.includes(String(username));
        }
        setLikeIsOn(like_isOn(liked_users, username));
        setFetchDone(like_isOn(liked_users, username));
      }
    }
    getUser();
  }, []);

  const bodyOfPost = description.map((string, index) => (
    <div key={index} style={{ minHeight: "15px" }}>
      {string}
    </div>
  ));

  async function likeFunction() {
    try {
      if (likeIsOn) {
        setLikeIsOn(false);
        const response = await fetch(`/api/post/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ to_like: false }),
          credentials: "include", // TODO: remove
        });

        if (!response.ok) throw new Error(`HTTP error ${response.status}`);

        console.log("unliked");
      } else {
        setLikeIsOn(true);
        const response = await fetch(`/api/post/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ to_like: true }),
          credentials: "include", // TODO: remove
        });

        if (!response.ok) throw new Error(`HTTP error ${response.status}`);

        console.log("liked");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div style={{ ...style }} className="style" id={id}>
      <div>
        <img src={profileUrl} className="profile-pic" />
      </div>
      <div style={{ marginLeft: 10, marginRight: 10 }}>
        <div
          style={{ display: "flex", width: "100%", alignItems: "flex-start" }}
        >
          <div
            style={{
              fontSize: 16.5,
              fontFamily: "monospace",
              fontWeight: 1000,
            }}
          >
            <b>{name} </b>
            <span className="ago">{timed}</span>
          </div>
        </div>

        <div
          style={{
            fontSize: 15,
            fontFamily: "Segoe UI",
            marginTop: 5,
            marginBottom: 10,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {bodyOfPost}
        </div>
        {image !== "" && image !== undefined ? (
          <img src={image} alt="xyz" className="post-image" />
        ) : null}
        <Button
          style={{ alignSelf: "center" }}
          id={`like-${id}`}
          onToggle={likeFunction}
          likes={liked_users.length}
          likeIsOn={likeIsOn}
          fetchDone={fetchDone}
        />
      </div>
    </div>
  );
}

function timeAgo(past, now = Date.now()) {
  let p;

  if (typeof past === "string") {
    p = new Date(past).getTime(); // still parses as UTC
  } else {
    p = Number(past);
    if (String(p).length === 10) p *= 1000; // seconds → ms
  }

  const n = Number(now);
  if (!p || isNaN(p) || !n || isNaN(n)) return "just now";

  let diff = Math.floor((n - p) / 1000); // seconds

  diff -= 5.5 * 3600;

  if (diff < 0) diff = 0;

  if (diff < 5) return "just now";
  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
  if (diff < 2592000) return `${Math.floor(diff / 604800)}w`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo`;
  return `${Math.floor(diff / 31536000)}y`;
}
