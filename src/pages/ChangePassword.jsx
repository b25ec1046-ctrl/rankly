import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react";

function ChangePassword() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
  };
  const resetPassword = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) {
      alert("User email not found");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: window.location.origin,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Password reset email sent");
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
        <h2>🔑 Change Password</h2>

        <p>
          Current Account:
          <strong> {user?.email}</strong>
        </p>

        <p>
          Click the button below and a password reset link will be sent to your
          email.
        </p>

        <button
          onClick={resetPassword}
          style={{
            padding: "12px 20px",
            border: "none",
            borderRadius: "10px",
            background: "#2563eb",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Send Reset Email
        </button>
      </div>

      <BottomNav />
    </>
  );
}

export default ChangePassword;
