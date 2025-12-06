"use client";

import { FaGraduationCap, FaArrowRight, FaHome, FaThLarge, FaUpload, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthed(!!token);
  }, []);
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
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-[#d7dff0] to-blue-100">
      
      {/* NAVBAR */}
      <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* Logo + full name */}
          <a href="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <FaGraduationCap className="text-white text-4xl" />
            <div className="flex flex-col leading-tight">
              <span className="text-xl md:text-2xl font-extrabold text-white">ORIP</span>
              <span className="text-xs md:text-sm font-semibold text-blue-100">
                Open Research and Innovation Portfolio
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-white border-2 border-white hover:bg-white/10 transition-colors font-semibold"
            >
              <FaHome className="text-sm" />
              <span>Home</span>
            </a>
            <a
              href="/login"
              className="px-4 py-2 rounded-full bg-white text-blue-700 font-semibold shadow-sm hover:shadow-md transition-shadow"
            >
              Log In
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-2xl hover:opacity-80 transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-blue-700 px-6 py-4 space-y-3 border-t border-blue-500">
            <a
              href="/"
              className="block px-4 py-2 rounded-lg hover:bg-blue-600 transition text-white font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="/login"
              className="block px-4 py-2 rounded-lg hover:bg-blue-600 transition text-white font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Log In
            </a>
          </div>
        )}
      </nav>

      {/* HEADER */}
      <div className="text-center mt-16 px-6">
        <h1 className="text-2xl md:text-4xl font-extrabold text-blue-900">Create Your Account</h1>
        <p className="mt-3 text-blue-700 text-sm md:text-lg leading-relaxed">
          Join the community of innovators and researchers
        </p>
      </div>

      {/* REGISTER CONTAINER */}
      <div className="flex justify-center mt-12 px-6 pb-16">
        <div className="w-full max-w-md">
          {/* TAB SWITCHER */}
          <div className="flex bg-white rounded-t-2xl shadow-lg overflow-hidden mb-0">
            <a href="/login" className="flex-1 px-6 py-3 bg-white text-blue-600 font-semibold text-center hover:bg-blue-50 transition-colors border-r border-gray-200">
              Log In
            </a>
            <a href="/register" className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold text-center hover:bg-blue-700 transition-colors">
              Sign Up
            </a>
          </div>

          {/* REGISTER FORM */}
          <div className="bg-white rounded-b-2xl shadow-lg p-8 md:p-10 max-h-[80vh] overflow-y-auto">
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block font-semibold text-blue-900 mb-2">Full Name</label>
                <input
                  className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-semibold text-blue-900 mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block font-semibold text-blue-900 mb-2">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block font-semibold text-blue-900 mb-2">Confirm Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
                  placeholder="••••••••"
                  value={password_confirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block font-semibold text-blue-900 mb-2">Bio <span className="text-sm text-gray-600 font-normal">(optional)</span></label>
                <textarea
                  rows={2}
                  maxLength={500}
                  className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all resize-none"
                  placeholder="Tell us about your research interests..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                <p className="text-xs text-gray-600 mt-1">{bio.length}/500 characters</p>
              </div>

              {/* Course / Program */}
              <div>
                <label className="block font-semibold text-blue-900 mb-2">Course / Program</label>
                <input
                  className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
                  placeholder="BSIT, BSM, BSEd, etc."
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                />
              </div>

              {/* Department */}
              <div>
                <label className="block font-semibold text-blue-900 mb-2">Department</label>
                <input
                  className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
                  placeholder="CICT, CTE, CAS, etc."
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>

              {/* School / University */}
              <div>
                <label className="block font-semibold text-blue-900 mb-2">School / University</label>
                <input
                  className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
                  placeholder="Sorsogon State University"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
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
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg mt-6"
              >
                Create Account
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
                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>

            {/* Login Link */}
            <a
              href="/login"
              className="block w-full py-3 border-2 border-blue-600 text-blue-600 rounded-lg text-center font-semibold hover:bg-blue-50 transition-colors"
            >
              Log In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
