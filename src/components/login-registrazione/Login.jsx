import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error("Login fallito");
      const data = await res.json();
      dispatch(login({ token: data.accessToken, username: data.username }));
      navigate("/");
    } catch (error) {
      console.error("Errore nel login:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div
        className="w-1/2 bg-cover bg-center hidden md:block"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      ></div>
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-3 rounded font-semibold"
            >
              Accedi
            </button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-gray-600">Non hai un account? </span>
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-800 hover:underline transition duration-300"
            >
              Registrati
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
