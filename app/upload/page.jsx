"use client";

import { useState, useEffect } from "react";
import { FaGraduationCap, FaThLarge, FaCloudUploadAlt, FaFileUpload, FaArrowLeft, FaHome, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import axios from "axios";

export default function UploadProject() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthed(!!token);
  }, []);

  const handleUpload = async () => {
    setMsg("");
    setMsgType("");
    setIsLoading(true);

    if (!title || !description || !category || !file) {
      setMsg("All fields are required.");
      setMsgType("error");
      setIsLoading(false);
      return;
    }

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category_id", category);
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Upload success:", response.data);
      setMsg("Project uploaded successfully! Redirecting...");
      setMsgType("success");
      
      setTimeout(() => {
        window.location.href = "/projects";
      }, 1500);

    } catch (error) {
      console.error("Upload error:", error);
      
      let errorMsg = "Upload failed. Please try again.";
      
      if (error.response && error.response.data) {
        if (error.response.data.message) {
          errorMsg = error.response.data.message;
        } else if (error.response.data.errors) {
          errorMsg = JSON.stringify(error.response.data.errors);
        }
      } else if (error.message) {
        errorMsg = error.message;
      }
      
      setMsg(errorMsg);
      setMsgType("error");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#d7dff0] pb-20">
      
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
          <div className="hidden md:flex items-center gap-4 text-sm font-medium">
            <a
              href="/projects"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-white hover:bg-white/10 transition-colors font-semibold"
            >
              <FaThLarge className="text-sm" />
              <span>Explore</span>
            </a>
            <a
              href="/upload"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-blue-700 font-semibold shadow-sm hover:shadow-md transition-shadow"
            >
              <FaCloudUploadAlt className="text-sm" />
              <span>Upload</span>
            </a>
            <a
              href="/profile"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-white hover:bg-white/10 transition-colors font-semibold"
            >
              <FaUser className="text-sm" />
              <span>Profile</span>
            </a>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors"
            >
              Log Out
            </button>
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
              href="/projects"
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-600 transition text-white font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaThLarge /> Explore
            </a>
            <a
              href="/upload"
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-600 transition text-white font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaCloudUploadAlt /> Upload
            </a>
            <a
              href="/profile"
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-600 transition text-white font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaUser /> Profile
            </a>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="w-full px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors"
            >
              Log Out
            </button>
          </div>
        )}
      </nav>

      {/* UPLOAD SECTION */}
      {/* HEADER */}
      <div className="text-center mt-8 md:mt-12 px-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Upload Your Project</h1>
        <p className="mt-2 md:mt-3 text-gray-700 text-sm md:text-lg">
          Share your research, innovation, or prototype with the community
        </p>
      </div>

      {/* FORM BOX */}
      <div className="max-w-xs md:max-w-2xl mx-auto mt-6 md:mt-10 bg-blue-300 rounded-lg p-2 md:p-10 shadow-lg mx-4">

        {/* TITLE */}
        <div className="mb-4 md:mb-6">
          <label className="font-semibold text-gray-900 text-sm md:text-base">Project Title</label>
          <input
            className="w-full p-1.5 md:p-3 bg-white rounded-md mt-2 outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs md:text-base"
            placeholder="e.g., Smart Water Management System"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div className="mb-4 md:mb-6">
          <label className="font-semibold text-gray-900 text-sm md:text-base">Description / Abstract</label>
          <textarea
            className="w-full p-1.5 md:p-3 bg-white rounded-md mt-2 outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-16 md:h-28 text-xs md:text-base"
            placeholder="Describe your project, methodology, and key outcomes..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* CATEGORY */}
        <div className="mb-4 md:mb-6">
          <label className="font-semibold text-gray-900 text-sm md:text-base">Category</label>
          <select
            className="w-full p-1.5 md:p-3 bg-white rounded-md mt-2 outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs md:text-base"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">-- Select Category --</option>
            <option value="1">Technology</option>
            <option value="2">Health</option>
            <option value="3">Environment</option>
            <option value="4">Education</option>
          </select>
        </div>

        {/* FILE UPLOAD */}
        <div className="mb-4 md:mb-6">
          <label className="font-semibold text-gray-900 block mb-2 text-sm md:text-base">Project File</label>
          <div className="border-2 border-dashed border-blue-400 bg-white p-4 md:p-8 text-center rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors cursor-pointer">
            <FaFileUpload className="text-2xl md:text-4xl text-blue-500 mx-auto mb-2 md:mb-3" />
            <p className="text-sm md:text-lg font-semibold text-gray-700 mb-1">Upload your project files</p>
            <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
              PDF or Word documents (.pdf, .docx, .doc)
            </p>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              id="fileInput"
              className="hidden"
              accept=".pdf,.docx,.doc"
            />
            <label
              htmlFor="fileInput"
              className="inline-block text-blue-600 font-semibold text-xs md:text-sm hover:text-blue-800 transition-colors cursor-pointer mt-4 md:mt-6"
            >
              Choose File
            </label>
            {file && (
              <p className="text-sm text-green-600 font-semibold mt-4">
                ✓ {file.name} selected
              </p>
            )}
          </div>
        </div>

        {/* MESSAGE */}
        {msg && (
          <p className={`text-center mt-8 md:mt-4 p-3 rounded-md font-semibold ${
            msgType === "success" 
              ? "bg-green-100 text-green-700" 
              : "bg-red-100 text-red-700"
          }`}>
            {msg}
          </p>
        )}

        {/* BUTTONS */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleUpload}
            disabled={isLoading}
            className="flex-1 py-3 text-xs md:text-base bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaCloudUploadAlt className="text-lg" />
            {isLoading ? "Uploading..." : "Publish Project"}
          </button>

          <a
            href="/projects"
            className="flex-1 py-3 text-xs md:text-base bg-gray-500 text-white rounded-md text-center font-semibold hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
          >
            <FaArrowLeft className="text-lg" />
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
}