import { useState } from "react";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

function Feedback() {
  const [message, setMessage] = useState("");

  const submitFeedback = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!message.trim()) {
      alert("Please enter feedback");
      return;
    }

    const { error } = await supabase.from("feedbacks").insert([
      {
        user_id: user?.id,
        username: user?.user_metadata?.username || user?.email?.split("@")[0],
        message,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("✅ Thank you for your feedback!");
    setMessage("");
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
        <h2>💡 Feedback</h2>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your feedback..."
          rows="6"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ddd",
          }}
        />

        <button
          onClick={submitFeedback}
          style={{
            marginTop: "15px",
            padding: "12px 20px",
            border: "none",
            borderRadius: "10px",
            background: "#2563eb",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Submit Feedback
        </button>
      </div>

      <BottomNav />
    </>
  );
}

export default Feedback;
