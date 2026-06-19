import Navbar from "../components/Navbar";
import { ProfileContext } from "../context/ProfileContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";
function Settings() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { profile } = useContext(ProfileContext);
  const navigate = useNavigate();
  const itemStyle = {
    padding: "15px",
    background: "#f8fafc",
    borderRadius: "12px",
    marginBottom: "10px",
    cursor: "pointer",
    fontWeight: "500",
    border: "1px solid #e5e7eb",
  };
  return (
    <>
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
            background: "#fff",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 2px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h2>⚙️ Settings</h2>
          <p
            style={{
              color: "#64748b",
              marginTop: "-5px",
            }}
          >
            Manage your Rankly account
          </p>
          <div
            style={{
              background: "#f8fafc",
              padding: "15px",
              borderRadius: "12px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <Link
              to="/account-info"
              style={{
                display: "block",
                textDecoration: "none",
                color: "black",
                marginBottom: "10px",
              }}
            >
              👤 Account Information
              {/* 👤 {profile.name || "User"}
              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  fontSize: "14px",
                }}
              >
                @{profile.username}
              </p> */}
            </Link>
          </div>

          <div style={{ marginTop: "20px" }}>
            <div
              onClick={toggleDarkMode}
              style={{
                padding: "12px",
                background: "#f3f4f6",
                borderRadius: "10px",
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              🌙 Dark Mode : {darkMode ? "ON" : "OFF"}
            </div>
            <div style={itemStyle}>🌐 Language</div>

            <div style={itemStyle} onClick={() => navigate("/privacy")}>
              🔒 Privacy Settings
            </div>
            <div style={itemStyle} onClick={() => navigate("/change-password")}>
              🔑 Change Password
            </div>

            <div
              style={{
                ...itemStyle,
                color: "#dc2626",
              }}
              onClick={() => navigate("/delete-account")}
            >
              🗑️ Delete Account
            </div>
            <div style={itemStyle} onClick={() => navigate("/privacy-policy")}>
              📄 Privacy Policy
            </div>

            <div style={itemStyle} onClick={() => navigate("/contact")}>
              📞 Contact Us
            </div>
            <div style={itemStyle} onClick={() => navigate("/about")}>
              ℹ️ About Rankly
            </div>
            <div
              style={{
                marginTop: "20px",
                textAlign: "center",
                color: "#64748b",
                fontSize: "14px",
              }}
            >
              🚀 Rankly Version 1.0
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
