import "./PostComponent.css";
import "./ProfileComponent.css";
import profileImg from "../assets/836.jpg";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../App";

const style1 = {
  width: "100%",
  maxWidth: "90vw",
  height: "auto",
  color: "white",
  borderWidth: "1px",
  borderRadius: "20px",
  padding: 20,
  marginTop: "4vw",
  marginBottom: "10px",
  display: "flex",
  flexDirection: "row",
  background: "rgba(13, 19, 20, 0.95)",
  backdropFilter: "blur(15px)",
  border: "solid 1px rgba(51, 51, 51, 1)",
};

export function ProfileComponent({ following, setUserInfo, userInfo }) {
  const [profileUrl, setProfileUrl] = useState(profileImg);
  const { setCreateButtonOn } = useContext(GlobalContext);

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
      const url = userInfo.profile_pic_url;
      if (url !== "") setProfileUrl(`${userInfo.profile_pic_url}`);
    }
  }, [userInfo]);

  return !following ? (
    <div style={style1} id="556468new">
      <div className="profile-pic-container-new">
        <img src={profileUrl} className="profile-pic1-new" />
      </div>
      <div
        style={{
          marginLeft: 20,
          marginRight: 10,
          width: "100%",
        }}
      >
        <div style={{ display: "flex", width: "100%", marginTop: "3%" }}>
          {userInfo && (
            <div>
              {" "}
              <div
                id="29368999"
                style={{ fontSize: 28, fontFamily: "monospace" }}
              >
                <b>{userInfo.username}</b>
              </div>
              <div
                id="293999"
                style={{
                  fontSize: 14,
                  fontFamily: "sans-serif",
                  color: "grey",
                }}
              >
                {userInfo.email}
              </div>
            </div>
          )}
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
              fontSize: 14,
              fontFamily: "Segoe UI",
              marginTop: 5,
              marginBottom: 5,
              display: "flex",
              flexDirection: "row",
              width: "120%",
              height: "34px",
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontFamily: "Segoe UI",
                marginTop: -5,
                marginBottom: 5,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                // backgroundColor: "green",

                width: "75%",
                height: "60px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  marginLeft: "-12%",
                  width: "10%",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <div className="style22">{userInfo?.total_posts || 0}</div>
                <div className="style21">Posts</div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <div className="style22">
                  {userInfo?.followers?.length || 0}
                </div>
                <div className="style21">Followers</div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <div className="style22">
                  {userInfo?.following?.length || 0}
                </div>
                <div className="style21">Following</div>
              </div>
            </div>
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
              width: "100px",
              marginTop: "-15px",
            }}
            onClick={() => {
              setCreateButtonOn(true);
            }}
          >
            Follow
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
