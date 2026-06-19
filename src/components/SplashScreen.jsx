import { useState, useEffect } from "react";
import "./SplashScreen.css";
import logo from "../assets/logo.png";

function SplashScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let value = 0;

    const timer = setInterval(() => {
      value += 1;

      setProgress(value);

      if (value >= 100) {
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);
  return (
    <div className="splash-container">
      <div className="stars"></div>
      <div className="shooting-star star1"></div>
      <div className="shooting-star star2"></div>
      <div className="shooting-star star3"></div>

      <div className="logo-ring">
        <img src={logo} alt="Rankly" className="logo-img" />
      </div>

      <h1 className="brand-name">Rankly</h1>

      <p className="tagline">CONNECT • SHARE • GROW</p>

      <div className="loader">
        <div className="loader-fill"></div>
      </div>

      <p className="loading-text">Loading {progress}%</p>
      <div className="particle p1"></div>
      <div className="particle p2"></div>
      <div className="particle p3"></div>
      <div className="particle p4"></div>
      <div className="particle p5"></div>

      <div className="bottom-wave"></div>
    </div>
  );
}

export default SplashScreen;

// import { useEffect, useState } from "react";
// import "./SplashScreen.css";
// import splashBg from "../assets/splash-bg.png";

// function SplashScreen() {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(timer);
//           return 100;
//         }
//         return prev + 1;
//       });
//     }, 25);

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="splash-container">
//       <img src={splashBg} alt="splash" className="splash-bg" />

//       <div className="energy-ring"></div>

//       <div className="stars"></div>

//       <div className="wave wave1"></div>
//       <div className="wave wave2"></div>

//       <div className="particles">
//         {[...Array(25)].map((_, i) => (
//           <span key={i}></span>
//         ))}
//       </div>

//       <div className="shooting-star star1"></div>
//       <div className="shooting-star star2"></div>
//       <div className="shooting-star star3"></div>

//       <div className="loading-box">
//         <div className="progress-bar">
//           <div
//             className="progress-fill"
//             style={{ width: `${progress}%` }}
//           ></div>
//         </div>

//         <div className="percent">{progress}%</div>

//         <div className="loading-text">Loading amazing things...</div>
//       </div>
//     </div>
//   );
// }

// export default SplashScreen;
