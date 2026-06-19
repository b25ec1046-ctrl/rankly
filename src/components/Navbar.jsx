import logo from "../assets/logo.png";

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { PointsContext } from "../context/PointsContext";
import { ProfileContext } from "../context/ProfileContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // const { profile } = useContext(ProfileContext);
  const { profile, logout } = useContext(ProfileContext);
  const { points } = useContext(PointsContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert("Logged Out");
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 25px",
          background: "rgba(15,23,42,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <img
            src={logo}
            alt="Rankly"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              boxShadow: "0 0 25px rgba(59,130,246,0.5)",
            }}
          />

          <div>
            <h2
              style={{
                margin: 0,
                color: "#fff",
                fontWeight: "800",
                fontSize: "20px",
              }}
            >
              Rankly
            </h2>

            <p
              style={{
                margin: 0,
                fontSize: "11px",
                color: "#94a3b8",
              }}
            >
              Social Ranking Platform
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {/* <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "12px",
  }}
> */}
            {profile.isLoggedIn ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "2px solid #2563eb",
                    background: "#2563eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: "bold",
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

                <span
                  style={{
                    fontWeight: "700",
                    color: "#2563eb",
                  }}
                >
                  @{profile.username}
                </span>
              </div>
            ) : null}
          </div>
          {!profile.isLoggedIn && (
            <>
              <Link to="/login">
                <button
                  style={{
                    background: "transparent",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.2)",
                    // padding: "10px 18px",
                    padding: "8px 12px",
                    fontSize: "14px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Login
                </button>
              </Link>

              <Link to="/signup">
                <button
                  style={{
                    background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
                    color: "#fff",
                    border: "none",
                    // padding: "10px 18px",
                    padding: "8px 12px",
                    fontSize: "14px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontWeight: "700",
                    boxShadow: "0 8px 20px rgba(59,130,246,0.35)",
                  }}
                >
                  Sign Up
                </button>
              </Link>
            </>
          )}
          {/* <Link to="/notifications">
            <button
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                border: "none",
                background: "rgba(255,255,255,0.08)",
                color: "#fff",
                fontSize: "22px",
                cursor: "pointer",
                backdropFilter: "blur(10px)",
              }}
            >
              🔔
            </button>
          </Link> */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              border: "none",
              background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
              color: "#fff",
              fontSize: "24px",
              cursor: "pointer",
              boxShadow: "0 10px 25px rgba(59,130,246,0.35)",
            }}
          >
            ☰
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "260px",
            height: "100vh",
            background: "#0f172a",
            boxShadow: "-3px 0 15px rgba(0,0,0,0.15)",
            padding: "25px",
            zIndex: 2000,
            overflowY: "auto",
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              border: "none",
              background: "transparent",
              fontSize: "24px",
              float: "right",
              cursor: "pointer",
            }}
          >
            ✖
          </button>

          <h2 style={{ color: "#2563eb", marginTop: "10px" }}>Rankly</h2>

          <div
            style={{
              background: "rgba(255,255,255,0.08)",
              padding: "15px",
              borderRadius: "12px",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            <h3 style={{ margin: 0 }}>{profile.name}</h3>

            <p style={{ margin: "8px 0", color: "#cbd5e1" }}>
              ⭐ {profile.points || 0} Points
            </p>

            <p
              style={{
                margin: 0,
                color: "#93c5fd",
                fontWeight: "600",
              }}
            >
              🏆{" "}
              {points >= 10000
                ? "Legend"
                : points >= 5000
                  ? "Pro Creator"
                  : points >= 1000
                    ? "Rising Star"
                    : "Starter"}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginTop: "25px",
            }}
          >
            <Link to="/" onClick={() => setMenuOpen(false)} style={linkStyle}>
              🏠 Home
            </Link>

            <Link
              to="/upload"
              onClick={() => setMenuOpen(false)}
              style={linkStyle}
            >
              📤 Upload Post
            </Link>

            <Link
              to="/trending"
              onClick={() => setMenuOpen(false)}
              style={linkStyle}
            >
              🔥 Trending Posts
            </Link>

            <Link
              to="/leaderboard"
              onClick={() => setMenuOpen(false)}
              style={linkStyle}
            >
              🏆 Leaderboard
            </Link>
            <Link
              to="/notifications"
              onClick={() => setMenuOpen(false)}
              style={linkStyle}
            >
              🔔 Notifications
            </Link>
            <Link
              to="/feedback"
              onClick={() => setMenuOpen(false)}
              style={linkStyle}
            >
              💡 Feedback
            </Link>
            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              style={linkStyle}
            >
              👤 My Profile
            </Link>

            <Link
              to="/settings"
              onClick={() => setMenuOpen(false)}
              style={linkStyle}
            >
              ⚙️ Settings
            </Link>

            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              style={linkStyle}
            >
              ℹ️ About Rankly
            </Link>

            {profile.isLoggedIn && (
              <button
                onClick={handleLogout}
                style={{
                  padding: "10px",
                  border: "none",
                  borderRadius: "8px",
                  background: "#ef4444",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                🚪 Logout
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const linkStyle = {
  textDecoration: "none",

  color: "#fff",

  fontSize: "17px",

  fontWeight: "600",

  padding: "12px 14px",

  borderRadius: "12px",

  background: "rgba(255,255,255,0.08)",

  border: "1px solid rgba(255,255,255,0.05)",
};

export default Navbar;
