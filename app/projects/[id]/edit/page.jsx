"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaGraduationCap,
  FaThLarge,
  FaUpload,
  FaUser,
  FaArrowLeft,
  FaSpinner,
  FaHome,
  FaBars,
  FaTimes
} from "react-icons/fa";

export default function EditProjectPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: "",
  });

  const [categories, setCategories] = useState([]);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthed(!!token);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    // Fetch project details
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProject(res.data);
        setFormData({
          title: res.data.title || "",
          description: res.data.description || "",
          category_id: res.data.category_id || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching project:", err);
        setError("Failed to load project. Please try again.");
        setLoading(false);
      });

    // Fetch categories
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess("Project updated successfully!");
      setTimeout(() => {
        router.push(`/projects/${id}`);
      }, 1500);
    } catch (err) {
      console.error("Error updating project:", err);
      setError(
        err.response?.data?.message ||
          "Failed to update project. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#d7dff0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700 font-semibold">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#d7dff0] flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <p className="text-red-600 font-semibold mb-4">Error Loading Project</p>
          <a href="/profile" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Back to Profile
          </a>
        </div>
      </div>
    );
  }

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
            {!isAuthed && (
              <a
                href="/"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-white hover:bg-white/20 transition-colors font-semibold"
              >
                <FaHome className="text-sm" />
                <span>Home</span>
              </a>
            )}
            <a
              href="/projects"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-white hover:bg-white/20 transition-colors font-semibold"
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
            {isAuthed && (
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
                className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors"
              >
                Log Out
              </button>
            )}
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
            {!isAuthed && (
              <a
                href="/"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-cyan-600 transition text-white font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaHome /> Home
              </a>
            )}
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
            {isAuthed && (
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
                className="w-full px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors"
              >
                Log Out
              </button>
            )}
          </div>
        )}
      </nav>

      <div className="max-w-2xl mx-auto px-4 md:px-4 py-6 md:py-12">
        <a href="/profile" className="flex items-center gap-2 text-cyan-600 mb-4 md:mb-8 hover:text-cyan-700 transition font-semibold text-xs md:text-base">
          <FaArrowLeft /> Back to Profile
        </a>

        <div className="bg-white rounded-lg shadow-lg p-4 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Edit Project</h1>

          {error && (
            <div className="mb-3 md:mb-4 p-2 md:p-4 bg-red-100 border border-red-400 text-red-700 rounded text-xs md:text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-3 md:mb-4 p-2 md:p-4 bg-green-100 border border-green-400 text-green-700 rounded text-xs md:text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {/* Title */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1 md:mb-2 text-sm md:text-base">
                Project Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-2 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-600 text-xs md:text-base"
                placeholder="Enter project title"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1 md:mb-2 text-sm md:text-base">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-2 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-600 text-xs md:text-base"
                placeholder="Enter project description"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1 md:mb-2 text-sm md:text-base">
                Category
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="w-full px-2 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-600 text-xs md:text-base"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 md:gap-4 pt-4 md:pt-6">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 flex items-center justify-center gap-1 md:gap-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition text-xs md:text-base"
              >
                {submitting && <FaSpinner className="animate-spin" />}
                {submitting ? "Saving..." : "Save Changes"}
              </button>
              <a
                href="/profile"
                className="flex-1 flex items-center justify-center bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 rounded-lg transition text-xs md:text-base"
              >
                Cancel
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
