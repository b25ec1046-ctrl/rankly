import Navbar from "../components/Navbar";

function About() {
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
          <h2>ℹ️ About Rankly</h2>

          <p>
            Rankly is a social media platform where users can upload posts, earn
            points, improve rankings, and discover trending content.
          </p>

          <p>Version: 1.0.0</p>

          <p>Developed by Yashpal 🚀</p>
        </div>
      </div>
    </>
  );
}

export default About;
