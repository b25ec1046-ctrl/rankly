import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import BottomNav from "../components/BottomNav";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { PostContext } from "../context/PostContext";
import { supabase } from "../lib/supabase";

function Trending() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const { posts } = useContext(PostContext);
  const sortedPosts = [...posts].sort((a, b) => b.likes - a.likes);
  const filteredPosts =
    selectedCategory === "All"
      ? sortedPosts
      : sortedPosts.filter((post) => post.category === selectedCategory);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("id, username, points");

    setUsers(data || []);
  };

  return (
    <>
      {" "}
      <Navbar />
      {/* <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          padding: "20px",
          paddingBottom: "90px",
        }}
      > */}
      <div
        style={{
          maxWidth: "700px",
          width: "100%",
          margin: "0 auto",
          padding: window.innerWidth <= 768 ? "12px" : "20px",
          paddingBottom: "90px",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            color: "#2563eb",
            marginBottom: "15px",
          }}
        >
          🔥 Trending Posts
        </h2>
        <input
          type="text"
          placeholder="🔍 Search posts, users, categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            marginBottom: "15px",
            boxSizing: "border-box",
          }}
        />
        {search &&
          users
            .filter((u) =>
              u.username?.toLowerCase().includes(search.toLowerCase()),
            )
            .slice(0, 5)
            .map((user) => (
              <div
                key={user.id}
                style={{
                  background: "#fff",
                  padding: "12px",
                  marginBottom: "8px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  boxSizing: "border-box",
                }}
              >
                @{user.username}
              </div>
            ))}
        {/* {search &&
          posts
            .filter(
              (post) =>
                post.caption?.toLowerCase().includes(search.toLowerCase()) ||
                post.category?.toLowerCase().includes(search.toLowerCase()) ||
                post.username?.toLowerCase().includes(search.toLowerCase()),
            )
            .map((post) => (
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

        <div
          style={{
            display: "flex",
            gap: "10px",
            overflowX: "auto",
            marginBottom: "20px",
          }}
        >
          <button onClick={() => setSelectedCategory("All")}>🔥 All</button>

          <button onClick={() => setSelectedCategory("Nature")}>
            🌿 Nature
          </button>

          <button onClick={() => setSelectedCategory("Technology")}>
            💻 Tech
          </button>

          <button onClick={() => setSelectedCategory("Travel")}>
            ✈️ Travel
          </button>

          <button onClick={() => setSelectedCategory("Gaming")}>
            🎮 Gaming
          </button>
        </div>
        {(search
          ? posts.filter(
              (post) =>
                post.caption?.toLowerCase().includes(search.toLowerCase()) ||
                post.category?.toLowerCase().includes(search.toLowerCase()) ||
                post.username?.toLowerCase().includes(search.toLowerCase()),
            )
          : filteredPosts
        ).map((post) => (
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
        ))}
      </div>
      <BottomNav />
    </>
  );
}

export default Trending;
