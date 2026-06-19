import { createContext, useState } from "react";

export const PointsContext = createContext();

export function PointsProvider({ children }) {
  const [points, setPoints] = useState(() => {
    const savedPoints = localStorage.getItem("ranklyPoints");

    return savedPoints ? Number(savedPoints) : 0;
  });

  const addPoints = (value) => {
    const newPoints = points + value;

    setPoints(newPoints);

    localStorage.setItem("ranklyPoints", newPoints);
  };

  const removePoints = (value) => {
    const newPoints = Math.max(0, points - value);

    setPoints(newPoints);

    localStorage.setItem("ranklyPoints", newPoints);
  };

  const resetPoints = () => {
    setPoints(0);

    localStorage.setItem("ranklyPoints", 0);
  };

  return (
    <PointsContext.Provider
      value={{
        points,
        addPoints,
        removePoints,
        resetPoints,
      }}
    >
      {children}
    </PointsContext.Provider>
  );
}
