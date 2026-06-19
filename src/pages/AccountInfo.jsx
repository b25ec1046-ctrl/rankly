import { useContext } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import { ProfileContext } from "../context/ProfileContext";

function AccountInfo() {
  const { profile } = useContext(ProfileContext);

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
        <h2>👤 Account Information</h2>

        <p>
          <strong>Name:</strong> {profile.name}
        </p>

        <p>
          <strong>Username:</strong> @{profile.username}
        </p>

        <p>
          <strong>Bio:</strong> {profile.bio}
        </p>

        <p>
          <strong>Points:</strong> {profile.points}
        </p>

        <p>
          <strong>User ID:</strong> {profile.id}
        </p>
      </div>

      <BottomNav />
    </>
  );
}

export default AccountInfo;
