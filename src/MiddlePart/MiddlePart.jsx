import { useState, useEffect, useContext } from "react";
import { PostComponent } from "./PostComponent";
import { PostComponentModified } from "./PostComponentModified";
import { ProfileComponent } from "./ProfileComponent";

import "./MiddlePart.css";
import { GlobalContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";

export function MiddlePart({ type }) {
  const navigate = useNavigate();
  const { profile_userName } = useParams();
  const [userFound, setUserFound] = useState(true);
  const [myProfile, setMyProfile] = useState(false);
  const [following, setFollowing] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const {
    loading,
    setLoading,
    userName,
    setUserName,
    userProfilePic,
    setUserProfilePic,
  } = useContext(GlobalContext);

  async function fetch_user() {
    try {
      const response = await fetch("/api/user_info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", //TODO: remove
      });
      const response_json = await response.json();
      // console.log(response_json.username);
      // setUserName(response_json.username);
      return response_json;
    } catch (error) {
      console.log("user_not_found");
      setTimeout(() => {
        navigate("/login");
      }, 1);
      console.error(error);
    }
  }

  useEffect(() => {
    async function getUser() {
      const data = await fetch_user();
      console.log(data.username);
      setUserName(data.username);
      setUserProfilePic(data.profile_pic);
    }
    getUser();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFollowing(true);
    }, 100);
    setTimeout(() => {
      setFollowing(false);
    }, 120);
  }, []);

  useEffect(() => {
    if (userName) {
      console.log(userName);
      fetch_this_user();
      async function fetch_this_user() {
        try {
          const response = await fetch(
            `/api/user/${String(profile_userName)}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include", //TODO: remove
            }
          );
          if (!response.ok) {
            console.log("userNotFound"); //TODO: show a div
            setUserFound(false);
            return;
          }
          const response_json = await response.json();

          console.log(response_json.username);
          setUserInfo(response_json);
          if (response_json.username === userName) {
            console.log("matched");
            setMyProfile(true);
          }
          return;
        } catch (error) {
          console.error(error);
        }
      }
    }
  }, [userName]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [following]);

  return userFound || type == "normal" ? (
    <div
      style={{
        // transform: "translateX(25vw)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        maxWidth: "650px",
      }}
    >
      {type == "normal" ? (
        <Buttons following={following} setFollowing={setFollowing} />
      ) : null}
      {type == "normal" ? (
        <PostComponentModified following={following} />
      ) : null}

      {type == "profile_page" ? (
        <ProfileComponent following={following} userInfo={userInfo} />
      ) : null}

      <div
        style={{
          //   background: "#181818",
          width: "100%",
          //   height: "110vh".
          minHeight: "100vh", // content decides scroll height
          borderRadius: "30px",
          position: "relative",
          overflowY: "hidden",
          //   position: "absolute",
        }}
      >
        <Posts
          following={following}
          setFollowing={setFollowing}
          loading={loading}
          setLoading={setLoading}
          profile_userName={profile_userName}
          type={type}
        />
      </div>
    </div>
  ) : (
    <div style={{ color: "white" }}> User Not Found </div>
  );
}

function Posts({
  following,
  loading,
  setLoading,
  profile_userName,
  type,
  setFollowing,
}) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setLoading(true);
    async function getPosts() {
      try {
        const response = await fetch("/api/posts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            type: following ? "follows" : "all",
          },
          credentials: "include", //TODO: remove
        });
        const response_json = await response.json();
        // setPosts(response.data);

        function to_arr(s) {
          return s.split("\n");
        }

        const mappedPosts = response_json.map((post) => ({
          id: String(post.id),
          name: String(post.owner),
          time: String(post.created_at),
          description: to_arr(post.body),
          image: post.image_url,
          liked_users: post.liked_users,
        }));

        let finalPosts = mappedPosts;

        if (type === "profile_page") {
          finalPosts = mappedPosts.filter(
            (post) => post.name === profile_userName
          );
        }

        // console.log(mappedPosts);
        setPosts(finalPosts);
      } catch (error) {
        // console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getPosts();
  }, [following]);

  const postComponents = posts.map((post) => (
    <PostComponent
      key={post.id}
      id={post.id}
      name={post.name}
      time={post.time}
      image={post.image}
      description={post.description}
      liked_users={post.liked_users}
    />
  ));
  console.log();

  return loading ? null : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        // postition: "absolute",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            color: "white",
          }}
        ></div>
        <div>{postComponents}</div>
      </div>
    </div>
  );
}

function Buttons({ following, setFollowing }) {
  const style2 = {
    fontWeight: "600",
    color: following ? "#fff" : "#aaa",
    borderBottom: following ? "3px solid #1DA1F2" : "3px solid transparent",
    background: "transparent", // ✅ no blocky bg
    paddingBottom: "10px",
  };
  const style1 = {
    fontWeight: "600",
    color: following ? "#aaa" : "#fff",
    borderBottom: following ? "3px solid transparent" : "3px solid #1DA1F2", // underline
    background: "transparent", // ✅ no blocky bg
    paddingBottom: "10px",
  };

  const uniStyle = {
    cursor: "pointer",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        zIndex: 10, // higher than posts
        position: "sticky",
        padding: "10px 0 0 0",
        background: "rgba(0,0,0, 0.6)",
        backdropFilter: "blur(10px)",
        top: "0px", // stick to the top of parent
      }}
    >
      <button
        className={"top-btn"}
        style={{
          width: "50%",
          marginRight: "2%",
          marginLeft: "10%",
          border: "None",
          ...style1,
          ...uniStyle,
        }}
        onClick={() => {
          setFollowing(false);
        }}
      >
        For You
      </button>{" "}
      <button
        className={"top-btn"}
        style={{
          width: "50%",
          marginRight: "10%",
          marginLeft: "2%",
          border: "None",
          ...style2,
          ...uniStyle,
        }}
        onClick={() => {
          setFollowing(true);
        }}
      >
        Following
      </button>
    </div>
  );
}
