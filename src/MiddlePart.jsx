import { useState, useEffect } from "react";
import { PostComponent } from "./PostComponent";

export function MiddlePart() {
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [following]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        maxWidth: "690px",
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
        <Posts following={following} />
      </div>
    </div>
  );
}

function Posts({ following }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
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
        console.log(response_json);
        // setPosts(response.data);
        const mappedPosts = response_json.map((post) => ({
          id: String(post.id),
          name: String(post.owner),
          time: String(post.created_at),
          description: String(post.body),
          image: post.image || null,
        }));

        setPosts(mappedPosts);
      } catch (error) {
        console.error(error);
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

  return (
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
    fontWeight: following ? "600" : "500",
    color: following ? "#fff" : "#aaa",
    borderBottom: following ? "3px solid #1DA1F2" : "3px solid transparent",
    background: "transparent", // ✅ no blocky bg
    border: "none",
    paddingBottom: "6px",
  };
  const style1 = {
    fontWeight: following ? "500" : "600", // inactive / active
    color: following ? "#aaa" : "#fff",
    borderBottom: following ? "3px solid transparent" : "3px solid #1DA1F2", // underline
    background: "transparent", // ✅ no blocky bg
    border: "none",
    paddingBottom: "6px",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        zIndex: 10, // higher than posts
        position: "sticky",
        padding: "10px 0",
        background: "rgba(0,0,0, 0.6)",
        backdropFilter: "blur(10px)",
        top: "0px", // stick to the top of parent
      }}
    >
      <button
        style={{
          width: "50%",
          marginRight: "2%",
          marginLeft: "10%",

          ...style1,
        }}
        onClick={() => {
          setFollowing(false);
        }}
      >
        For You
      </button>{" "}
      <button
        style={{
          width: "50%",
          marginRight: "10%",
          marginLeft: "2%",
          ...style2,
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
