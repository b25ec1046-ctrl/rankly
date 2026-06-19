// import { Link, useLocation } from "react-router-dom";

// import { FaHome, FaFire, FaTrophy, FaUser, FaPlus } from "react-icons/fa";

// function BottomNav() {
//   const location = useLocation();

//   const navItemStyle = (path) => ({
//     textDecoration: "none",
//     color: location.pathname === path ? "#2563eb" : "#94a3b8",

//     textShadow:
//       location.pathname === path ? "0 0 12px rgba(37,99,235,0.4)" : "none",

//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",

//     gap: "4px",
//     fontSize: "12px",
//     fontWeight: "600",

//     transition: "all 0.3s ease",

//     transform:
//       location.pathname === path ? "translateY(-4px)" : "translateY(0px)",
//   });

//   return (
//     <div
//       style={{
//         position: "fixed",
//         bottom: 0,
//         left: 0,
//         right: 0,
//         overflow: "visible",
//         height: "80px",
//         background: "rgba(255,255,255,0.98)",
//         borderTopLeftRadius: "22px",
//         borderTopRightRadius: "22px",
//         backdropFilter: "blur(15px)",
//         borderTop: "1px solid #e5e7eb",
//         boxShadow: "0 -8px 25px rgba(0,0,0,0.08)",
//         display: "flex",
//         justifyContent: "space-around",
//         alignItems: "center",
//         zIndex: 999,
//       }}
//     >
//       <Link to="/" style={navItemStyle("/")}>
//         {" "}
//         <FaHome size={22} /> <span>Home</span>{" "}
//       </Link>

//       <Link to="/trending" style={navItemStyle("/trending")}>
//         <FaFire size={22} />
//         <span>Trending</span>
//       </Link>

//       <Link
//         to="/upload"
//         style={{
//           textDecoration: "none",

//           position: "absolute",

//           left: "50%",
//           transform: "translateX(-50%)",

//           top: "-22px",

//           width: "68px",
//           height: "68px",

//           borderRadius: "50%",

//           background: "linear-gradient(135deg,#2563eb,#7c3aed)",

//           color: "#fff",

//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",

//           border: "4px solid white",

//           boxShadow: "0 15px 35px rgba(37,99,235,0.45)",

//           zIndex: 1000,
//         }}
//       >
//         <FaPlus size={26} />
//       </Link>

//       <Link to="/leaderboard" style={navItemStyle("/leaderboard")}>
//         <FaTrophy size={22} />
//         <span>Rank</span>
//       </Link>

//       <Link to="/profile" style={navItemStyle("/profile")}>
//         <FaUser size={22} />
//         <span>Profile</span>
//       </Link>
//     </div>
//   );
// }

// export default BottomNav;
import { Link, useLocation } from "react-router-dom";

import { FaHome, FaFire, FaTrophy, FaUser, FaPlus } from "react-icons/fa";

function BottomNav() {
  const location = useLocation();

  const navItemStyle = (path) => ({
    textDecoration: "none",
    color: location.pathname === path ? "#2563eb" : "#94a3b8",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    gap: "4px",

    fontSize: "11px",
    fontWeight: "600",

    transition: "all 0.3s ease",

    transform:
      location.pathname === path ? "translateY(-4px)" : "translateY(0)",

    textShadow:
      location.pathname === path ? "0 0 12px rgba(37,99,235,0.4)" : "none",
  });

  return (
    <>
      {/* Floating Upload Button */}

      <Link
        to="/upload"
        style={{
          position: "fixed",

          left: "50%",
          bottom: "25px",

          transform: "translateX(-50%)",

          width: "50px",
          height: "50px",

          borderRadius: "50%",

          background: "linear-gradient(135deg,#2563eb,#7c3aed)",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          color: "#fff",

          textDecoration: "none",

          border: "5px solid white",

          boxShadow: "0 20px 40px rgba(37,99,235,0.45)",

          zIndex: 1001,
        }}
      >
        <FaPlus size={28} />
      </Link>

      {/* Bottom Bar */}

      <div
        style={{
          position: "fixed",

          bottom: "12px",
          left: "12px",
          right: "12px",

          height: "78px",

          background: "rgba(255,255,255,0.9)",

          backdropFilter: "blur(20px)",

          border: "1px solid rgba(255,255,255,0.4)",

          borderRadius: "24px",

          boxShadow: "0 10px 35px rgba(0,0,0,0.12)",

          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",

          alignItems: "center",

          // padding: "0 12px",

          zIndex: 1000,
        }}
      >
        <Link to="/" style={navItemStyle("/")}>
          <FaHome size={22} />
          <span>Home</span>
        </Link>

        <Link to="/trending" style={navItemStyle("/trending")}>
          <FaFire size={22} />
          <span>Trending</span>
        </Link>

        <Link to="/leaderboard" style={navItemStyle("/leaderboard")}>
          <FaTrophy size={22} />
          <span>Rank</span>
        </Link>

        <Link to="/profile" style={navItemStyle("/profile")}>
          <FaUser size={22} />
          <span>Profile</span>
        </Link>
      </div>
    </>
  );
}

export default BottomNav;
