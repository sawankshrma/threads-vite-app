import { useState, useEffect, useContext } from "react";
import { PostComponent } from "./PostComponent";
import "./MiddlePart.css";
// import { CreateFollowingContext } from "../App";

export function MiddlePart() {
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [following]);

  return (
    <div
      style={{
        // transform: "translateX(25vw)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        maxWidth: "650px",
      }}
    >
      {" "}
      <Buttons following={following} setFollowing={setFollowing} />
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
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
}

function Posts({ following, loading, setLoading }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setLoading(true);
    async function getPosts() {
      try {
        const response = await fetch("http://localhost:5173/api/posts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            type: following ? "follows" : "all",
          },
          credentials: "include", //TODO: remove
        });
        const response_json = await response.json();
        // setPosts(response.data);

        const mappedPosts = response_json.map((post) => ({
          id: String(post.id),
          name: String(post.owner),
          time: String(post.created_at),
          description: String(post.body),
          image: post.image_url,
        }));

        setPosts(mappedPosts);
      } catch (error) {
        console.error(error);
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
    />
  ));

  return loading ? (
    <div style={{ color: "white", marginLeft: "50%" }}>loading...</div>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        // postition: "absolute",
      }}
    >
      <div>{postComponents}</div>
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
        class={"top-btn"}
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
        class={"top-btn"}
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
