import { supabase } from "../lib/supabase";

import PostCard from "../components/PostCard";
import { useContext, useState } from "react";

import { PostContext } from "../context/PostContext";
import { ProfileContext } from "../context/ProfileContext";

import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

function Profile() {
  const { profile, updateProfile } = useContext(ProfileContext);

  const { posts } = useContext(PostContext);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const profileCompletion =
    (profile.name ? 25 : 0) +
    (profile.username ? 25 : 0) +
    (profile.bio ? 25 : 0) +
    (profile.photo ? 25 : 0);
  const getRank = () => {
    if (profile.points >= 10000) return "👑 Legend";
    if (profile.points >= 5000) return "🥇 Pro Creator";
    if (profile.points >= 1000) return "🥈 Rising Star";
    return "🥉 Starter";
  };

  const rank = getRank();
  const uploadProfilePhoto = async (file) => {
    const fileExt = file.name.split(".").pop();

    const fileName = `${profile.id}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, file);

    if (uploadError) {
      alert(uploadError.message);
      return null;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleSave = async () => {
    let photoUrl = profile.photo;
    if (selectedFile) {
      const uploadedUrl = await uploadProfilePhoto(selectedFile);

      if (!uploadedUrl) return;

      photoUrl = uploadedUrl;
    }
    const { error } = await supabase
      .from("profiles")

      .update({
        name: profile.name,
        username: profile.username,
        bio: profile.bio,
        photo: photoUrl,
      })
      .eq("id", profile.id);

    if (error) {
      alert(error.message);
      return;
    }
    await supabase
      .from("posts")
      .update({
        profile_photo: photoUrl,
      })
      .eq("user_id", profile.id);

    if (profileCompletion === 100 && !profile.rewardClaimed) {
      // addPoints(50);

      updateProfile({
        rewardClaimed: true,
      });
    }
    updateProfile({
      photo: photoUrl,
    });

    setIsEditing(false);

    alert("✅ Profile Updated Successfully");
  };

  return (
    <>
      {" "}
      <Navbar />
      <div
        style={{
          maxWidth: "700px",
          margin: "30px auto",
          padding: "20px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            background: "#fff",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            border: "1px solid #e5e7eb",
          }}
        >
          <div
            style={{
              // width: "100px",
              // height: "100px",
              width: "120px",
              height: "120px",
              border: "4px solid #2563eb",
              boxShadow: "0 5px 20px rgba(37,99,235,0.3)",
              borderRadius: "50%",
              background: "#2563eb",
              color: "#fff",
              fontSize: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "auto",
              overflow: "hidden",
            }}
          >
            {profile.photo ? (
              <img
                src={profile.photo}
                alt="profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              profile.name?.[0] || "U"
            )}
          </div>

          <h2
            style={{
              marginTop: "15px",
              marginBottom: "5px",
              fontSize: "30px",
              fontWeight: "700",
              color: "#64748b",
            }}
          >
            {profile.name} ✅
          </h2>

          <p
            style={{
              color: "#2563eb",
              fontWeight: "600",
              marginTop: "-5px",
              background: "#e0e7ff",
              display: "inline-block",
              padding: "6px 12px",
              borderRadius: "20px",
            }}
          >
            @{profile.username || "username"}
          </p>

          <p>{profile.bio || "Add your bio"}</p>

          <div
            style={{
              background: "#f3f4f6",
              borderRadius: "10px",
              overflow: "hidden",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                width: `${profileCompletion}%`,
                background: "#2563eb",
                color: "#fff",
                padding: "8px",
              }}
            >
              Profile {profileCompletion}% Complete
            </div>
          </div>

          <div
            style={{
              marginTop: "15px",
              background: "linear-gradient(135deg,#2563eb,#7c3aed)",
              color: "#fff",
              padding: "15px",
              borderRadius: "15px",
              fontWeight: "600",
            }}
          >
            🏆 Current Rank: {rank}
          </div>

          <div
            style={{
              marginTop: "20px",
            }}
          >
            <input
              disabled={!isEditing}
              type="text"
              placeholder="Your Name"
              value={profile.name}
              onChange={(e) =>
                updateProfile({
                  name: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
              }}
            />

            <input
              disabled={!isEditing}
              type="text"
              placeholder="Username"
              value={profile.username}
              onChange={(e) =>
                updateProfile({
                  username: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
              }}
            />

            <textarea
              disabled={!isEditing}
              placeholder="Your Bio"
              value={profile.bio}
              onChange={(e) =>
                updateProfile({
                  bio: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
              }}
            />

            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (file) {
                    setSelectedFile(file);

                    updateProfile({
                      photo: URL.createObjectURL(file),
                    });
                  }
                }}
              />
            )}
            {isEditing && (
              <button
                onClick={() => {
                  setSelectedFile(null);

                  updateProfile({
                    photo: "",
                  });
                }}
                style={{
                  marginTop: "10px",
                  padding: "10px 15px",
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                🗑️ Remove Profile Photo
              </button>
            )}

            <br />
            <br />

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  style={{
                    padding: "12px 25px",
                    background: "#2563eb",
                    color: "#fff",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                >
                  ✏️ Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    style={{
                      padding: "12px 25px",
                      background: "#10b981",
                      color: "#fff",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                  >
                    💾 Save Changes
                  </button>

                  <button
                    onClick={() => setIsEditing(false)}
                    style={{
                      padding: "12px 25px",
                      background: "#ef4444",
                      color: "#fff",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  >
                    ❌ Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              gap: "15px",
              marginTop: "25px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                background: "#f8fafc",
                padding: "15px",
                borderRadius: "12px",
                minWidth: "90px",
              }}
            >
              <h3>
                {posts.filter((post) => post.user_id === profile.id).length}
              </h3>
              <p>Posts</p>
            </div>

            <div
              style={{
                background: "#f8fafc",
                padding: "15px",
                borderRadius: "12px",
                minWidth: "90px",
              }}
            >
              <h3>⭐ {profile.points || 0}</h3>
              <p>Points</p>
            </div>

            <div
              style={{
                background: "#f8fafc",
                padding: "15px",
                borderRadius: "12px",
                minWidth: "90px",
              }}
            >
              <h3>{rank.split(" ")[0]}</h3>
              <p>{rank.split(" ").slice(1).join(" ")}</p>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
}

export default Profile;
