import React from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
  const username = useSelector((state) => state.auth.username);
  const token = useSelector((state) => state.auth.token);
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Benvenuto {username || "ospite"}</h1>
      <p>Token: {token}</p>
    </div>
  );
};

export default HomePage;
