import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const username = useSelector((state) => state.auth.username);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  const handleToggleCompleted = async (task) => {
    const updatedTask = {
      title: task.title,
      description: task.description,
      completed: !task.completed,
    };
    try {
      const res = await fetch(`http://localhost:3001/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTask),
      });
      if (!res.ok) throw new Error("Errore nell'aggiornamento");
      const updated = await res.json();
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === updated.id ? updated : t))
      );
    } catch (err) {
      console.error("Errore nel toggle completamento:", err);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:3001/tasks/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Errore nel recupero delle task");
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error("Errore nel fetch delle task:", error);
      }
    };
    fetchTasks();
  }, [token, navigate]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">
        To-Do List Tecnico - Mini Progetto
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Benvenuto: <span className="font-semibold">{username}</span>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white p-4 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{task.title}</h2>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleCompleted(task)}
                  className="w-5 h-5 text-green-500"
                />
              </label>
            </div>
            <p className="text-gray-700 mt-2">{task.description}</p>
            <p className="text-sm text-gray-400 mt-2">
              Creato il: {new Date(task.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
