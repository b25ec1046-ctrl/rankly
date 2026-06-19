import { useState, useContext } from "react";

import { PointsContext } from "../context/PointsContext";
import { UploadContext } from "../context/UploadContext";
import { PostContext } from "../context/PostContext";
import { ProfileContext } from "../context/ProfileContext";

import BottomNav from "../components/BottomNav";
import PostCard from "../components/PostCard";
import { supabase } from "../lib/supabase";

function Upload() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("General");
  const [showForm, setShowForm] = useState(false);

  const { uploadCount, MAX_UPLOADS, canUpload, increaseUploadCount } =
    useContext(UploadContext);

  const { posts, addPost } = useContext(PostContext);
  const { addPoints } = useContext(PointsContext);
  const { profile, refreshProfile } = useContext(ProfileContext);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const handlePost = async () => {
    if (!canUpload) {
      alert("Upload limit reached!");
      return;
    }

    if (!selectedFile) {
      alert("Please select image");
      return;
    }

    const fileName = `${Date.now()}-${selectedFile.name}`;

    const { error: uploadError } = await supabase.storage
      .from("posts")
      .upload(fileName, selectedFile);
    console.log("Upload Error:", uploadError);

    if (uploadError) {
      alert(uploadError.message);
      return;
    }

    const { data } = supabase.storage.from("posts").getPublicUrl(fileName);

    const imageUrl = data.publicUrl;
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log("Auth User:", user);
    console.log("Profile ID:", profile.id);

    const { error } = await supabase.from("posts").insert([
      {
        user_id: user.id,
        username: profile.username,
        profile_photo: profile.photo,
        caption,
        image: imageUrl,
        category,
        likes: 0,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }
    await addPost();

    await supabase.rpc("increment_points", {
      profile_id: profile.id,
      points_to_add: 5,
    });

    await refreshProfile();

    increaseUploadCount();

    alert("🎉 Post Uploaded Successfully (+5 Points)");

    setImage(null);
    setSelectedFile(null);
    setCaption("");
    setCategory("General");
    setShowForm(false);
  };

  return (
    <>
      <div
        style={{
          maxWidth: "700px",
          margin: "30px auto",
          padding: "20px",
          paddingBottom: "90px",
        }}
      >
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            width: "100%",
            padding: "15px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          📤 Upload Post{" "}
        </button>

        {showForm && (
          <div
            style={{
              background: "#fff",
              marginTop: "20px",
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "0 2px 15px rgba(0,0,0,0.08)",
            }}
          >
            <h2>Create Post</h2>

            <p>
              Free Uploads Remaining:
              <strong> {MAX_UPLOADS - uploadCount}</strong>
            </p>
            {!canUpload && (
              <p
                style={{
                  color: "#ef4444",
                  fontWeight: "600",
                  marginTop: "10px",
                }}
              >
                Upload limit reached.
                <a
                  href="/login"
                  style={{
                    marginLeft: "6px",
                    color: "#2563eb",
                  }}
                >
                  Login
                </a>
                {" | "}
                <a
                  href="/signup"
                  style={{
                    color: "#2563eb",
                  }}
                >
                  Sign Up
                </a>
              </p>
            )}
            <input type="file" accept="image/*" onChange={handleImage} />

            <br />
            <br />

            <textarea
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows="4"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
              }}
            />

            <br />
            <br />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <option>General</option>
              <option>Nature</option>
              <option>Technology</option>
              <option>Art</option>
              <option>Travel</option>
              <option>Gaming</option>
              <option>Sports</option>
              <option>Education</option>
              <option>Science</option>
              <option>Engineering</option>
              <option>Cars & Bikes</option>
              <option>Food</option>
              <option>Fashion</option>
              <option>Music</option>
              <option>Movies</option>
              <option>Business</option>
              <option>News</option>
              <option>Gaming</option>
              <option>Fitness</option>
              <option>DIY</option>
            </select>

            {image && (
              <img
                src={image}
                alt="preview"
                style={{
                  width: "100%",
                  marginTop: "20px",
                  borderRadius: "12px",
                }}
              />
            )}

            <button
              onClick={handlePost}
              disabled={!canUpload}
              style={{
                marginTop: "20px",
                padding: "12px 25px",
                background: canUpload ? "#2563eb" : "#9ca3af",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: canUpload ? "pointer" : "not-allowed",
              }}
            >
              🚀 Post
            </button>
          </div>
        )}

        <h3
          style={{
            marginTop: "30px",
          }}
        >
          📸 My Uploaded Posts
        </h3>

        {posts.filter(
          (post) =>
            post.username ===
            (profile.username || profile.name || "Guest User"),
        ).length === 0 ? (
          <p>No posts uploaded yet.</p>
        ) : (
          posts
            .filter(
              (post) =>
                post.username ===
                (profile.username || profile.name || "Guest User"),
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
                showDelete={true}
              />
            ))
        )}
      </div>

      <BottomNav />
    </>
  );
}

export default Upload;
