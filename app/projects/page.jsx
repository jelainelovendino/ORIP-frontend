"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FaGraduationCap, FaHome, FaThLarge, FaUpload, FaUser, FaSearch, FaBars, FaTimes } from "react-icons/fa";

export default function ExploreProjects() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthed(!!token);
  }, []);
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  // Static categories (balanced layout)
  const categories = [
    { short: "All", full: "All" },
    { short: "Tech", full: "Technology" },
    { short: "Health", full: "Health" },
    { short: "Env", full: "Environment" },
    { short: "Edu", full: "Education" }
  ];

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      console.log("Fetching from:", `${process.env.NEXT_PUBLIC_API_URL}/api/projects`);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log("Projects fetched successfully:", res.data);
      setProjects(res.data);
    } catch (err) {
      console.log("Failed to load projects:", err.message, err.response?.data);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Filter projects
  const filteredProjects = projects.filter((p) => {
    const categoryMatch =
      activeCategory === "All" ||
      p.category?.name === activeCategory;

    const searchLower = (search || "").toLowerCase();
    const searchMatch =
      (p.title || "").toLowerCase().includes(searchLower) ||
      (p.description || "").toLowerCase().includes(searchLower);

    return categoryMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-[#d7dff0]">

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
          <div className="hidden md:flex items-center gap-4 text-sm font-medium">
            <a
              href="/projects"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-cyan-600 font-semibold shadow-sm hover:shadow-md transition-shadow"
            >
              <FaThLarge className="text-sm" />
              <span>Explore</span>
            </a>
            <a
              href="/upload"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-white hover:bg-white/20 transition-colors font-semibold"
            >
              <FaUpload className="text-sm" />
              <span>Upload</span>
            </a>
            <a
              href="/profile"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-white hover:bg-white/20 transition-colors font-semibold"
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
          <div className="md:hidden bg-cyan-700 px-6 py-4 space-y-3 border-t border-cyan-500">
            <a
              href="/projects"
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-cyan-600 transition text-white font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaThLarge /> Explore
            </a>
            <a
              href="/upload"
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-cyan-600 transition text-white font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaUpload /> Upload
            </a>
            <a
              href="/profile"
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-cyan-600 transition text-white font-semibold"
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

      {/* TITLE (CENTERED) */}
      <div className="flex flex-col items-center text-center mt-12 px-4">
        <h1 className="text-2xl md:text-4xl font-bold">Explore Projects</h1>
        <p className="text-gray-700 text-sm md:text-lg mt-2 max-w-2xl">
          Discover innovative research conducted by students and professionals.
        </p>
      </div>

      {/* SEARCH BAR (CENTERED) */}
      <div className="flex justify-center mt-8 px-4">
        <div className="flex items-center w-full max-w-3xl bg-white px-5 py-2 rounded-full shadow">
          <FaSearch className="text-gray-500 text-lg mr-3" />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full bg-transparent outline-none text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      {/* BALANCED CENTERED CATEGORIES */}
      {/* BALANCED CENTERED CATEGORIES */}
      <div className="flex justify-center gap-2 md:gap-8 mt-10 px-4 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.full}
            onClick={() => setActiveCategory(cat.full)}
            className={`px-3 md:px-5 py-1 md:py-1.5 rounded-full text-xs md:text-base font-semibold shadow transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              activeCategory === cat.full
                ? "bg-cyan-600 text-white"
                : "bg-white text-gray-700 hover:shadow-md"
            }`}
          >
            <span className="md:hidden">{cat.short}</span>
            <span className="hidden md:inline">{cat.full}</span>
          </button>
        ))}
      </div>
      {/* PROJECT COUNT */}
      <p className="text-gray-600 text-sm md:text-lg mt-10 px-4 md:px-10">
        Showing {filteredProjects.length} projects
      </p>

      {/* 4-COLUMN RESPONSIVE GRID */}
      <div className="px-4 md:px-10 mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 pb-20">
        {filteredProjects.map((p) => (
          <a
            key={p.id}
            href={`/projects/${p.id}`}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <img
              src={p.thumbnail_url || '/default-thumbnail.svg'}
              className="w-full h-24 md:h-48 object-cover"
              alt={p.title || 'Project thumbnail'}
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/default-thumbnail.svg'; }}
            />

            <div className="p-2 md:p-5">
              <span className="text-xs md:text-sm font-bold text-cyan-600 uppercase tracking-wide">
                {p.category?.name || "Uncategorized"}
              </span>

              <h2 className="font-bold text-xs md:text-base mt-1">{p.title || "Untitled"}</h2>

              <p className="text-gray-600 text-xs mt-1 md:line-clamp-2 line-clamp-1">
                {p.description || "No description provided."}
              </p>

              <div className="flex items-center gap-2 mt-2 md:mt-4">
                <img
                  src={p.user?.profile_picture_url || '/default-avatar.svg'}
                  className="w-6 md:w-8 h-6 md:h-8 rounded-full"
                  alt={p.user?.name || 'Author avatar'}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/default-avatar.svg'; }}
                />
                <span className="text-gray-800 text-xs md:text-sm font-medium">
                  {p.user?.name || "Unknown Author"}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
