import { useState, useContext, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { PostContext } from "../context/PostContext";
import { ProfileContext } from "../context/ProfileContext";
import { Link } from "react-router-dom";

function PostCard({
  id,
  username,
  profilePhoto,
  caption,
  image,
  category = "General",
  likes = 0,
  showDelete = false,
}) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const { profile } = useContext(ProfileContext);
  const { deletePost, likePost } = useContext(PostContext);
  const [liked, setLiked] = useState(false);
  const [likedUsers, setLikedUsers] = useState([]);
  const [showLikes, setShowLikes] = useState(false);

  useEffect(() => {
    checkLiked();
    fetchLikes();
  }, []);
  useEffect(() => {
    fetchComments();
  }, []);

  const checkLiked = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("post_likes")
      .select("*")
      .eq("post_id", id)
      .eq("user_id", user.id)
      .maybeSingle();

    setLiked(!!data);
  };
  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", id)
      .order("created_at", { ascending: true });

    if (!error && data) {
      setComments(data);
    }
  };
  const fetchLikes = async () => {
    const { data, error } = await supabase
      .from("post_likes")
      .select("username")
      .eq("post_id", id);

    if (!error) {
      setLikedUsers(data || []);
    }
  };

  const addComment = async () => {
    if (comment.trim() === "") return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      return;
    }

    const { error } = await supabase.from("comments").insert([
      {
        post_id: id,
        user_id: user.id,
        username: profile.username,
        comment: comment,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    setComment("");
    fetchComments();
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this post?");

    if (confirmDelete) {
      await deletePost(id, image);
    }
  };

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",

        border: "1px solid rgba(255,255,255,0.1)",

        boxShadow: "0 8px 30px rgba(0,0,0,.25)",

        color: "#fff",

        borderRadius: "18px",
        padding: window.innerWidth <= 768 ? "12px" : "18px",
        marginTop: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              overflow: "hidden",
              background: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt="profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              username?.[0]
            )}
          </div>

          <div
            style={{
              marginLeft: "10px",
            }}
          >
            <Link
              to={`/user/${username}`}
              style={{
                textDecoration: "none",
                color: "#2563eb",
                fontWeight: "bold",
              }}
            >
              {/* <h3 style={{ margin: 0 }}>{username}</h3> */}
              <h3
                style={{
                  margin: 0,
                  fontSize: window.innerWidth <= 768 ? "16px" : "18px",
                }}
              ></h3>
            </Link>

            <span
              style={{
                background: "#e0e7ff",
                color: "#2563eb",
                padding: "4px 8px",
                borderRadius: "20px",
                fontSize: "12px",
              }}
            >
              {category}
            </span>
          </div>
        </div>

        {showDelete && (
          <button
            onClick={handleDelete}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            🗑️
          </button>
        )}
      </div>

      <p style={{ marginTop: "15px" }}>{caption}</p>

      {/* <img
        src={image}
        alt="post"
        style={{
          width: "100%",
          borderRadius: "12px",
          marginTop: "10px",
        }}
      /> */}
      <img
        src={image}
        alt="post"
        onDoubleClick={async () => {
          if (!liked) {
            await likePost(id);
            setLiked(true);
            fetchLikes();
          }
        }}
        style={{
          width: "100%",
          height: window.innerWidth <= 768 ? "220px" : "350px",
          objectFit: "cover",
          borderRadius: "12px",
          marginTop: "10px",
          cursor: "pointer",
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginTop: "15px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <button
            onClick={async () => {
              await likePost(id);
              setLiked(!liked);
              fetchLikes();
            }}
          >
            {liked ? "❤️" : "🤍"} {likes}
          </button>

          <button onClick={() => setShowLikes(!showLikes)}>👀</button>
        </div>
        <button onClick={() => setShowComments(!showComments)}>
          💬 {comments.length}
        </button>

        {/* <button
          onClick={() =>
            navigator.share({
              title: "Rankly Post",
              text: caption,
              url: window.location.href,
            })
          }
        >
          ↗️ Share
        </button> */}
        <button
          onClick={async () => {
            try {
              if (navigator.share) {
                await navigator.share({
                  title: "Rankly Post",
                  text: caption,
                  url: window.location.href,
                });
              } else {
                await navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard ✅");
              }
            } catch (err) {
              console.log(err);
            }
          }}
        >
          ↗️ Share
        </button>
      </div>
      {showLikes && (
        // <div
        //   style={{
        //     marginTop: "10px",
        //     background: "#f8fafc",
        //     padding: "12px",
        //     borderRadius: "10px",
        //   }}
        // >
        <div
          style={{
            background: "rgba(30,41,59,0.9)",
            backdropFilter: "blur(10px)",
            padding: "15px",
            borderRadius: "12px",
            marginTop: "12px",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#fff",
          }}
        >
          <h4>❤️ Liked By</h4>

          {likedUsers.length === 0 ? (
            <p>No Likes Yet</p>
          ) : (
            likedUsers.map((user, index) => (
              <p key={index}>👤 {user.username}</p>
            ))
          )}
        </div>
      )}
      {showComments && (
        <>
          <div
            style={{
              marginTop: "15px",
            }}
          >
            <input
              type="text"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{
                padding: "10px",
                // width: "70%",
                width: "100%",
                boxSizing: "border-box",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />

            <button
              onClick={addComment}
              style={{
                marginLeft: "10px",
              }}
            >
              Post
            </button>
          </div>

          <div
            style={{
              marginTop: "10px",
            }}
          >
            {comments.map((c) => (
              <p key={c.id}>
                <strong>{c.username}</strong>: {c.comment}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default PostCard;
