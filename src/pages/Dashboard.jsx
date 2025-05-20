import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const tasksRef = collection(db, "tasks");

  // Auth check
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        window.location.href = "/login";
      } else {
        setUser(currentUser);
      }
    });

    return () => unsub();
  }, []);

  // Fetch tasks
  useEffect(() => {
    if (!user) return;
    const q = query(tasksRef, where("uid", "==", user.uid));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(data);
    });

    return () => unsub();
  }, [user]);

  // Add task
  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    await addDoc(tasksRef, {
      title: newTask,
      completed: false,
      uid: user.uid,
    });

    setNewTask("");
  };

  // Toggle complete
  const toggleTask = async (id, completed) => {
    const taskDoc = doc(db, "tasks", id);
    await updateDoc(taskDoc, { completed: !completed });
  };

  // Delete task
  const removeTask = async (id) => {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center bg-white shadow-md px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={() => signOut(auth)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Log Out
        </button>
      </header>

      {/* Main content */}
      <main className="flex flex-grow p-6 max-w-7xl mx-auto w-full">
        {/* Sidebar - can add navigation or user info here */}
        <aside className="w-64 mr-6 bg-white rounded-lg shadow-md p-4 hidden md:block">
          <h2 className="font-semibold text-lg mb-4">Navigation</h2>
          <ul className="text-gray-700 space-y-2">
            <li className="hover:text-blue-600 cursor-pointer">Tasks</li>
            {/* Add more links as needed */}
          </ul>
        </aside>

        {/* Task Manager */}
        <section className="flex-grow bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Task Manager
          </h2>

          {/* Add Task Form */}
          <form onSubmit={addTask} className="flex items-center gap-3 mb-6">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add new task..."
              className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-3 rounded-md hover:bg-blue-700 transition"
            >
              Add Task
            </button>
          </form>

          {/* Task List */}
          <ul className="space-y-3 max-h-[400px] overflow-y-auto">
            {tasks.length === 0 && (
              <li className="text-gray-500">No tasks found.</li>
            )}
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between bg-gray-50 rounded-md p-3 shadow-sm hover:shadow-md transition"
              >
                <label className="flex items-center gap-3 cursor-pointer flex-grow">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id, task.completed)}
                    className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span
                    className={`select-none ${
                      task.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {task.title}
                  </span>
                </label>
                <button
                  onClick={() => removeTask(task.id)}
                  className="text-red-600 hover:text-red-800 text-xl font-bold transition"
                  aria-label="Delete task"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
