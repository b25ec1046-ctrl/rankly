import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

function PrivacyPolicy() {
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
        <h2>📄 Privacy Policy</h2>

        <p>
          Rankly stores your profile information, posts and points to provide
          social networking features.
        </p>

        <p>We do not sell user data.</p>
      </div>

      <BottomNav />
    </>
  );
}

export default PrivacyPolicy;
