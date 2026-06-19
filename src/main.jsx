import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";

import { UploadProvider } from "./context/UploadContext.jsx";
import { PostProvider } from "./context/PostContext.jsx";
import { PointsProvider } from "./context/PointsContext.jsx";
import { ProfileProvider } from "./context/ProfileContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <PointsProvider>
        <ProfileProvider>
          <UploadProvider>
            <PostProvider>
              <App />
            </PostProvider>
          </UploadProvider>
        </ProfileProvider>
      </PointsProvider>
    </ThemeProvider>
  </StrictMode>,
);
