"use client";

import { FaGraduationCap, FaArrowRight, FaHome, FaThLarge } from 'react-icons/fa';
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const [bio, setBio] = useState("");

  const [course, setCourse] = useState("");
  const [school, setSchool] = useState("");
  const [department, setDepartment] = useState("");

  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== password_confirmation) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/register", {
        name,
        email,
        password,
        password_confirmation,
        course,
        school,
        department,
        bio,
      });

      // After registering, redirect user to login page (do not auto-login)
      window.location.href = "/login";

    } catch (err) {
      setError("Registration failed. Email may already exist.");
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
        <h1 className="text-3xl font-bold text-gray-900">Create Your Account</h1>
        <p className="mt-3 text-gray-700 text-lg leading-relaxed">
          Join the community of innovators and researchers
        </p>
      </div>

      {/* SWITCH TABS */}
      <div className="flex justify-center mt-10">
        <div className="flex bg-gray-200 rounded-full overflow-hidden shadow">
          <a href="/login" className="px-10 py-2 font-semibold text-gray-700 hover:bg-gray-300 transition-colors">
            Log in
          </a>
          <a href="/register" className="px-10 py-2 bg-blue-500 text-white font-semibold rounded-full">
            Register
          </a>
        </div>
      </div>

      {/* REGISTER FORM */}
      <div className="max-w-md mx-auto bg-blue-300 p-8 rounded-lg shadow mt-10">
        <form onSubmit={handleRegister}>
          {/* Name */}
          <label className="font-semibold text-gray-900">Name</label>
          <input
            className="w-full p-3 bg-white rounded-md mt-2 mb-5 outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Email */}
          <label className="font-semibold text-gray-900">Email</label>
          <input
            type="email"
            className="w-full p-3 bg-white rounded-md mt-2 mb-5 outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="your.email@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <label className="font-semibold text-gray-900">Password</label>
          <input
            type="password"
            className="w-full p-3 bg-white rounded-md mt-2 mb-5 outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Confirm Password */}
          <label className="font-semibold text-gray-900">Confirm Password</label>
          <input
            type="password"
            className="w-full p-3 bg-white rounded-md mt-2 mb-5 outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="••••••••"
            value={password_confirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />

          {/* Bio */}
          <label className="font-semibold text-gray-900">Bio <span className="text-sm text-gray-600">(optional)</span></label>
          <textarea
            rows={3}
            maxLength={500}
            className="w-full p-3 bg-white rounded-md mt-2 mb-2 outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Short bio about you — education, research interests, or a short intro."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <p className="text-xs text-gray-600 mb-5">Max 500 characters</p>

          {/* Course / Program */}
          <label className="font-semibold text-gray-900">Course / Program</label>
          <input
            className="w-full p-3 bg-white rounded-md mt-2 mb-5 outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="BSIT, BSM, BSEd, etc."
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />

          {/* Department */}
          <label className="font-semibold text-gray-900">Department</label>
          <input
            className="w-full p-3 bg-white rounded-md mt-2 mb-5 outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="CICT, CTE, CAS, etc."
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />

          {/* School / University */}
          <label className="font-semibold text-gray-900">School / University</label>
          <input
            className="w-full p-3 bg-white rounded-md mt-2 mb-6 outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Sorsogon State University"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
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
              Register
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
