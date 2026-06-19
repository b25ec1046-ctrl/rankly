import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

function DeleteAccount() {
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure? This action cannot be undone.",
    );

    if (confirmDelete) {
      alert("Account deletion feature coming soon");
    }
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
        <h2 style={{ color: "#dc2626" }}>🗑️ Delete Account</h2>

        <p>Deleting your account will permanently remove:</p>

        <ul>
          <li>Your profile</li>
          <li>Your posts</li>
          <li>Your likes</li>
          <li>Your notifications</li>
          <li>Your points</li>
        </ul>

        <button
          onClick={handleDelete}
          style={{
            background: "#dc2626",
            color: "#fff",
            border: "none",
            padding: "14px 20px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Delete My Account
        </button>
      </div>

      <BottomNav />
    </>
  );
}

export default DeleteAccount;
