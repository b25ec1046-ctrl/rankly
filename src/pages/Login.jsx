import logo from "../assets/logo.png";

import { useState, useContext, useEffect } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { ProfileContext } from "../context/ProfileContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useContext(ProfileContext);
  const { login } = useContext(ProfileContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (profile.isLoggedIn) {
      navigate("/");
    }
  }, [profile, navigate]);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single();

    if (profileError || !profileData) {
      alert("Profile not found");
      setLoading(false);
      return;
    }

    login(profileData);
    console.log("Profile after login:", profileData);

    alert("Login Successful 🚀");

    navigate(location.state?.from?.pathname || "/");

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#0f172a 0%, #1e3a8a 50%, #7c3aed 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.2)",
          padding: "35px",
          borderRadius: "28px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
          color: "#fff",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "fit-content",
              margin: "0 auto 15px auto",
              padding: "8px 16px",
              background: "rgba(255,255,255,0.15)",
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: "600",
              color: "#fff",
            }}
          >
            🚀 Welcome Back
          </div>

          <img
            src={logo}
            alt="Rankly"
            style={{
              display: "block",
              margin: "0 auto 15px auto",
              width: "130px",
              height: "130px",
              borderRadius: "24px",
              boxShadow: "0 12px 30px rgba(255,255,255,0.25)",
            }}
          />

          <h1
            style={{
              color: "#fff",
              margin: "0",
              fontSize: "52px",
              fontWeight: "800",
            }}
          >
            Rankly
          </h1>

          <p
            style={{
              color: "#cbd5e1",
              marginTop: "8px",
              marginBottom: "0",
              fontSize: "15px",
            }}
          >
            India's Next Social Ranking Platform
          </p>
        </div>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleLogin} disabled={loading} style={buttonStyle}>
          {loading ? "Logging In..." : "🚀 Login"}
        </button>

        <p
          style={{
            textAlign: "center",
            color: "#e2e8f0",
            marginTop: "20px",
          }}
        >
          Don't have an account?
          <Link
            to="/signup"
            style={{
              color: "#93c5fd",
              fontWeight: "700",
            }}
          >
            {" "}
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
const inputStyle = {
  width: "100%",
  padding: "16px",
  marginBottom: "16px",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.15)",
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "16px",
  background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
  color: "#fff",
  border: "none",
  borderRadius: "16px",
  cursor: "pointer",
  fontWeight: "700",
  fontSize: "16px",
  boxShadow: "0 12px 30px rgba(59,130,246,0.35)",
};

export default Login;
