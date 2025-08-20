// Create a style object to apply styles to the div element in PostComponent
import "./PostComponent.css";
import { useState, useEffect } from "react";

const style = {
  backgroundColor: "#181818",
  color: "white",
  borderWidth: "1px",
  borderRadius: "30px",
  borderTop: "solid #3d3d3dff",
  borderBottom: "solid #3d3d3dff",
  padding: 20,
  margin: "10px 0px",
  display: "flex",
  flexDirection: "row",
};

export function PostComponent({ id, name, time, image, description }) {
  // console.log(timeAgo(time, Date.now()));
  console.log(`image is = ${String(image)}`);
  const timed = timeAgo(time);

  const [profileUrl, setProfileUrl] = useState(
    "https://imgs.search.brave.com/ZACv93qZO57A2RrexnAjJi9CTpejuyu2aIGeB9-2beA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvMTk0/OTM2My5qcGc"
  );

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch(`http://localhost:5173/api/user/${name}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", //TODO: remove
        });
        const response_json = await response.json();
        console.log(response_json);
        const owner = response_json;
        setProfileUrl(`${owner.profile_pic_url}`);
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, []);

  return (
    <div style={style} id={id}>
      <div>
        <img src={profileUrl} className="profile-pic" />
      </div>
      <div style={{ marginLeft: 10, marginRight: 10 }}>
        <div style={{ display: "flex", width: "100%" }}>
          <div style={{ fontSize: 15, fontFamily: "monospace" }}>
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
          }}
        >
          {description}
        </div>
        <img src={image} alt="xyz" className="post-image" />
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
