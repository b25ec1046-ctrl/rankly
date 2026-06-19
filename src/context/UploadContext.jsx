import { createContext, useState } from "react";

export const UploadContext = createContext();

export function UploadProvider({ children }) {
  const [uploadCount, setUploadCount] = useState(0);

  const MAX_UPLOADS = 5;

  const canUpload = uploadCount < MAX_UPLOADS;

  const increaseUploadCount = () => {
    setUploadCount((prev) => prev + 1);
  };

  return (
    <UploadContext.Provider
      value={{
        uploadCount,
        MAX_UPLOADS,
        canUpload,
        increaseUploadCount,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
}
