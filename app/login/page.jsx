"use client";

import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      // save token
      localStorage.setItem("token", response.data.token);

      // redirect
      window.location.href = "/projects";
    } catch (err) {
      setError("Invalid credentials. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#d7dff0]">
      
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 py-4 bg-blue-600 text-white shadow">
        <div className="font-bold text-lg">
          Open Research and Innovation Portfolio
        </div>

        <div className="flex items-center gap-6">
          <a href="/" className="hover:underline">Home</a>
          <a href="/projects" className="hover:underline">Explore Projects</a>
          <a href="/login" className="hover:underline">Log in</a>
        </div>
      </nav>

      {/* HEADER */}
      <div className="text-center mt-12">
        <h1 className="text-2xl font-bold">Open Your Research & Innovation Portfolio</h1>
        <p className="mt-2 text-gray-700">
          Join the community of innovators and researchers
        </p>
      </div>

      {/* SWITCH TABS */}
      <div className="flex justify-center mt-8">
        <div className="flex bg-gray-200 rounded-full overflow-hidden">
          <a href="/login" className="px-10 py-2 bg-blue-500 text-white font-semibold">
            Log in
          </a>
          <a href="/register" className="px-10 py-2 font-semibold text-gray-700">
            Register
          </a>
        </div>
      </div>

      {/* LOGIN FORM */}
      <div className="max-w-md mx-auto bg-blue-300 p-8 rounded-lg shadow mt-8">
        
        {/* Email */}
        <label className="font-semibold">Email</label>
        <input
          className="w-full p-3 bg-white rounded-md mt-1 mb-4 outline-none"
          placeholder="your.email@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <label className="font-semibold">Password</label>
        <input
          type="password"
          className="w-full p-3 bg-white rounded-md mt-1 mb-4 outline-none"
          placeholder="••••••••"
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className="text-sm text-gray-700 mb-4">
          Demo Credentials: <br />
          Email: any email <br />
          Password: any password
        </p>

        {error && (
          <p className="text-red-600 font-semibold text-center mb-2">
            {error}
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleLogin}
            className="w-full py-2 bg-blue-600 text-white rounded-md"
          >
            Log in
          </button>

          <a
            href="/"
            className="w-full py-2 bg-red-500 text-white rounded-md text-center"
          >
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
}
