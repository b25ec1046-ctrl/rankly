import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import PostCard from "../components/PostCard";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

function UserProfile() {
  const { username } = useParams();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username)
      .single();

    setUser(data);
    const { data: userPosts } = await supabase
      .from("posts")
      .select("*")
      .eq("username", username)
      .order("created_at", { ascending: false });

    setPosts(userPosts || []);
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          padding: "20px",
          paddingBottom: "90px",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "15px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              overflow: "hidden",
              margin: "auto",
              background: "#2563eb",
            }}
          >
            {user.photo ? (
              <img
                src={user.photo}
                alt="profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : null}
          </div>

          <h2>{user.name}</h2>

          <p>@{user.username}</p>

          <p>{user.bio}</p>

          <h3>⭐ {user.points || 0} Points</h3>
        </div>

        <h2 style={{ marginTop: "25px" }}>📸 Posts</h2>

        {posts.length === 0 ? (
          <p>No posts yet.</p>
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

export default UserProfile;
