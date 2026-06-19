import { useContext } from "react";

import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";

import { PostContext } from "../context/PostContext";
import BottomNav from "../components/BottomNav";

function Home() {
  const { posts } = useContext(PostContext);

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          width: "100%",
          boxSizing: "border-box",
          // padding: "20px",
          padding: window.innerWidth <= 768 ? "12px" : "20px",
          paddingBottom: "100px",
        }}
      >
        <h2
          style={{
            color: "#2563eb",
            marginBottom: "20px",
            fontSize: window.innerWidth <= 768 ? "22px" : "28px",
          }}
        >
          🏠 Home Feed
        </h2>
        {/* {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            username={post.username}
            profilePhoto={post.profile_photo}
            caption={post.caption}
            image={post.image}
            category={post.category}
            likes={post.likes}
          />
        ))} */}
        {posts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              background: "#fff",
              borderRadius: "15px",
            }}
          >
            <h3>📭 No Posts Yet</h3>
            <p>Be the first to upload a post 🚀</p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              username={post.username}
              profilePhoto={post.profile_photo}
              caption={post.caption}
              image={post.image}
              category={post.category}
              likes={post.likes}
            />
          ))
        )}
      </div>
      <BottomNav />
    </>
  );
}

export default Home;
