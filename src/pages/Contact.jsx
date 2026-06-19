import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

function Contact() {
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
        <h2>📞 Contact Us</h2>

        <a href="mailto:officialrankly@gmail.com">officialrankly@gmail.com</a>
        <p>Response Time: 24-48 Hours</p>
      </div>

      <BottomNav />
    </>
  );
}

export default Contact;
