import { useState, useEffect } from "react";
import { PostComponent } from "./PostComponent";
function App() {
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

  // Create an array of postComponents by mapping over the posts array and returning a PostComponent for each post
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

  // return JSX that will be rendered
  return (
    <div style={{ background: "#dfe6e9", minHeight: "100vh" }}>
      {/* Display the postComponents */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>{postComponents}</div>
      </div>
    </div>
  );
}

// Export the App component to use it in the other files
export default App;
