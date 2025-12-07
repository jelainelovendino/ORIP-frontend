"use client";

import { FaGraduationCap, FaArrowRight,  FaHome, FaThLarge, FaUpload, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from "react";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthed(!!token);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        email,
        password,
      });

      console.log("Login response:", response.data); // DEBUG

      // save token
      const token = response.data.access_token || response.data.token || response.data.token_value;
      const tokenType = response.data.token_type || response.data.tokenType || 'Bearer';
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("token_type", tokenType);
      }

      // save user role if available (from backend /api/login response)
      const userRole = response.data.user?.role;
      console.log("User role from response:", userRole); // DEBUG
      if (userRole) {
        localStorage.setItem("user_role", userRole);
        console.log("Saved user_role to localStorage:", userRole); // DEBUG
      }

      // redirect based on role
      const redirectPath = userRole === 'admin' ? "/admin" : "/projects";
      console.log("Redirecting to:", redirectPath); // DEBUG
      window.location.href = redirectPath;
    } catch (err) {
      setError("Invalid credentials. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* NAVBAR */}
      <nav className="bg-cyan-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* Logo + full name */}
          <a href="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <FaGraduationCap className="text-white text-4xl" />
            <div className="flex flex-col leading-tight">
              <span className="text-xl md:text-2xl font-extrabold text-white">ORIP</span>
              <span className="text-xs md:text-sm font-semibold text-cyan-100">
                Open Research and Innovation Portfolio
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-cyan-600 font-semibold shadow-sm hover:shadow-md transition-shadow"
            >
              <FaHome className="text-sm" />
              <span>Home</span>
            </a>
            <a
              href="/login"
              className="px-4 py-2 rounded-full text-white border-2 border-white hover:bg-white/20 transition-colors font-semibold"
            >
              Log In
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-2xl text-white hover:opacity-80 transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-cyan-700 px-6 py-4 space-y-3 border-t border-cyan-500">
            <a
              href="/"
              className="block px-4 py-2 rounded-lg hover:bg-cyan-600 transition text-white font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="/login"
              className="block px-4 py-2 rounded-lg hover:bg-cyan-600 transition text-white font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Log In
            </a>
          </div>
        )}
      </nav>

      {/* HEADER */}
      <div className="text-center mt-16 px-6">
        <h1 className="text-2xl md:text-4xl font-extrabold text-black">Welcome Back</h1>
        <p className="mt-3 text-black text-sm md:text-lg leading-relaxed">
          Share your research and connect with innovators
        </p>
      </div>

      {/* LOGIN CONTAINER */}
      <div className="flex justify-center mt-12 px-6 pb-16">
        <div className="w-full max-w-md">
          {/* TAB SWITCHER */}
          <div className="flex bg-white rounded-t-2xl shadow-lg overflow-hidden mb-0">
            <a href="/login" className="flex-1 px-6 py-3 bg-cyan-600 text-white font-semibold text-center hover:bg-cyan-700 transition-colors">
              Log In
            </a>
            <a href="/register" className="flex-1 px-6 py-3 bg-white text-cyan-600 font-semibold text-center hover:bg-cyan-50 transition-colors border-l border-gray-200">
              Sign Up
            </a>
          </div>

          {/* LOGIN FORM */}
          <div className="bg-white rounded-b-2xl shadow-lg p-8 md:p-10">
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block font-semibold text-cyan-900 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  className="w-full px-4 py-3 bg-cyan-50 border-2 border-cyan-200 rounded-lg focus:outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-300 transition-all"
                  placeholder="your.email@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block font-semibold text-cyan-900 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  className="w-full px-4 py-3 bg-cyan-50 border-2 border-cyan-200 rounded-lg focus:outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-300 transition-all"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-2 border-red-300 text-red-700 px-4 py-3 rounded-lg font-semibold text-center">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-all transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
              >
                Log In
              </button>

              {/* Cancel Button */}
              <a
                href="/"
                className="block w-full py-3 bg-gray-200 text-gray-700 rounded-lg text-center font-semibold hover:bg-gray-300 transition-all transform hover:scale-105 active:scale-95"
              >
                Cancel
              </a>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <a
              href="/register"
              className="block w-full py-3 border-2 border-cyan-600 text-cyan-600 rounded-lg text-center font-semibold hover:bg-cyan-50 transition-colors"
            >
              Create an Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

