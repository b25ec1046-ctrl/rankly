import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

function SearchUsers() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase.from("profiles").select("*");

    if (!error) {
      setUsers(data || []);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding: "20px" }}>
      <h2>🔍 Search Users</h2>

      <input
        type="text"
        placeholder="Search username..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      />

      {filteredUsers.map((user) => (
        <div
          key={user.id}
          style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "12px",
            marginBottom: "10px",
          }}
        >
          <h3>@{user.username}</h3>
          <p>{user.bio}</p>
          <p>⭐ {user.points} Points</p>
        </div>
      ))}
    </div>
  );
}

export default SearchUsers;
