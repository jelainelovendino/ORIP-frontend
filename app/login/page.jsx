"use client";

import { FaGraduationCap, FaArrowRight,  FaHome, FaThLarge } from 'react-icons/fa';
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
      const token = response.data.access_token || response.data.token || response.data.token_value;
      const tokenType = response.data.token_type || response.data.tokenType || 'Bearer';
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("token_type", tokenType);
      }

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
        <div className="font-bold text-lg flex items-center gap-2">
          <FaGraduationCap className="text-white text-3xl" />
          Open Research and Innovation Portfolio
        </div>

        <div className="flex items-center gap-6">
          <a href="/" className="flex items-center gap-1 hover:underline"><FaHome />Home</a>
          <a href="/projects" className="flex items-center gap-1 hover:underline"><FaThLarge className="text-white" />Explore Projects</a>
          <a href="/login" className="flex items-center gap-1 hover:underline"><FaArrowRight className="text-white" />Log in</a>
        </div>
      </nav>

      {/* HEADER */}
      <div className="text-center mt-16 px-6">
        <h1 className="text-3xl font-bold text-gray-900">Open Your Research & Innovation Portfolio</h1>
        <p className="mt-3 text-gray-700 text-lg leading-relaxed">
          Join the community of innovators and researchers
        </p>
      </div>

      {/* SWITCH TABS */}
      <div className="flex justify-center mt-10">
        <div className="flex bg-gray-200 rounded-full overflow-hidden shadow">
          <a href="/login" className="px-10 py-2 bg-blue-500 text-white font-semibold rounded-full">
            Log in
          </a>
          <a href="/register" className="px-10 py-2 font-semibold text-gray-700 hover:bg-gray-300 transition-colors">
            Register
          </a>
        </div>
      </div>

      {/* LOGIN FORM */}
      <div className="max-w-md mx-auto bg-blue-300 p-8 rounded-lg shadow mt-10">
        <form onSubmit={handleLogin}>
          {/* Email */}
          <label className="font-semibold text-gray-900">Email</label>
          <input
            type="email"
            value={email}
            className="w-full p-3 bg-white rounded-md mt-2 mb-5 outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="your.email@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <label className="font-semibold text-gray-900">Password</label>
          <input
            type="password"
            value={password}
            className="w-full p-3 bg-white rounded-md mt-2 mb-6 outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-red-600 font-semibold text-center mb-4 bg-red-50 p-3 rounded-md">
              {error}
            </p>
          )}

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors"
            >
              Log in
            </button>

            <a
              href="/"
              className="flex-1 py-3 bg-red-500 text-white rounded-md text-center font-semibold hover:bg-red-600 transition-colors"
            >
              Cancel
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
