import { useState, useEffect } from "react";
import { PostComponent } from "./PostComponent";

export function MiddlePart() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "90vw",
        maxWidth: "690px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          zIndex: 10, // higher than posts
          position: "sticky",
          top: "5px", // stick to the top of parent
          background: "transparent",
        }}
      >
        <button style={{ width: "50%", marginLeft: "10%", marginRight: "2%" }}>
          For You
        </button>{" "}
        <button style={{ width: "50%", marginRight: "10%", marginLeft: "2%" }}>
          Following
        </button>
      </div>
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
        <Posts />
      </div>
    </div>
  );
}

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await fetch("http://localhost:5173/api/posts", {
          method: "GET",
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
  }, []);

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
