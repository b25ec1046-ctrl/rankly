import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

function Leaderboard() {
  const [activeTab, setActiveTab] = useState("Daily");

  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("points", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setUsers(data || []);
  };
  const top1 = users[0];
  const top2 = users[1];
  const top3 = users[2];
  return (
    <>
      {" "}
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
            background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
            color: "#fff",
            padding: "25px",
            borderRadius: "16px",
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              marginBottom: "10px",
            }}
          >
            🏆 Rankly Leaderboard
          </h2>
          <h3>🥇 Top Ranker</h3>
          <p
            style={{
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {users[0]?.username || "No User"}
          </p>

          <p>⭐ {users[0]?.points || 0} Points</p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "25px",
          }}
        >
          {["Daily", "Weekly", "Monthly"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: "12px",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                background: activeTab === tab ? "#2563eb" : "#e5e7eb",
                color: activeTab === tab ? "#fff" : "#000",
                fontWeight: "600",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "end",
            gap: "20px",
            marginBottom: "30px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg,#d1d5db,#9ca3af)",
              color: "#fff",
              boxShadow: "0 5px 20px rgba(156,163,175,0.4)",
              padding: "20px",
              borderRadius: "16px",
              minWidth: "180px",
            }}
          >
            <h1>🥇</h1>
            <h2>{top1?.username || "-"}</h2>
            <p>{top1?.points || 0} Points</p>
          </div>

          <div
            style={{
              background: "linear-gradient(135deg,#d97706,#92400e)",
              color: "#fff",
              boxShadow: "0 5px 20px rgba(146,64,14,0.4)",
              padding: "20px",
              borderRadius: "16px",
              minWidth: "180px",
            }}
          >
            <h1>🥈</h1>
            <h3>{top2?.username || "-"}</h3>
            <p>{top2?.points || 0} Points</p>
          </div>

          <div
            style={{
              background: "linear-gradient(135deg,#facc15,#eab308)",
              color: "#fff",
              boxShadow: "0 5px 20px rgba(234,179,8,0.4)",
              padding: "30px",
              borderRadius: "16px",
              minWidth: "220px",
              transform: "scale(1.1)",
            }}
          >
            <h1>🥉</h1>
            <h3>{top3?.username || "-"}</h3>
            <p>{top3?.points || 0} Points</p>
          </div>
        </div> */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {/* First Place */}
          <div
            style={{
              background: "linear-gradient(135deg,#facc15,#eab308)",
              color: "#fff",
              boxShadow: "0 5px 20px rgba(234,179,8,0.4)",
              padding: "30px",
              borderRadius: "16px",
              minWidth: "220px",
              textAlign: "center",
              transform: "scale(1.1)",
            }}
          >
            <h1>🥇</h1>
            <h2>{top1?.username || "-"}</h2>
            <p>{top1?.points || 0} Points</p>
          </div>

          {/* Second & Third */}
          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg,#d1d5db,#9ca3af)",
                color: "#fff",
                boxShadow: "0 5px 20px rgba(156,163,175,0.4)",
                padding: "20px",
                borderRadius: "16px",
                minWidth: "180px",
                textAlign: "center",
              }}
            >
              <h1>🥈</h1>
              <h3>{top2?.username || "-"}</h3>
              <p>{top2?.points || 0} Points</p>
            </div>

            <div
              style={{
                background: "linear-gradient(135deg,#d97706,#92400e)",
                color: "#fff",
                boxShadow: "0 5px 20px rgba(146,64,14,0.4)",
                padding: "20px",
                borderRadius: "16px",
                minWidth: "180px",
                textAlign: "center",
              }}
            >
              <h1>🥉</h1>
              <h3>{top3?.username || "-"}</h3>
              <p>{top3?.points || 0} Points</p>
            </div>
          </div>
        </div>

        {users.slice(3).map((user, index) => {
          const badge = `#${index + 4}`;

          return (
            <div
              key={user.id}
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                transition: "0.3s",
                padding: "16px",
                marginTop: "12px",
                borderRadius: "12px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontWeight: "600",
                }}
              >
                {badge} {user.username}
              </span>

              <strong>⭐ {user.points}</strong>
            </div>
          );
        })}
      </div>
      <BottomNav />
    </>
  );
}

export default Leaderboard;
