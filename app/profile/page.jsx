"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaGraduationCap, FaThLarge, FaCloudUploadAlt, FaHome, FaUser, FaBars, FaTimes } from 'react-icons/fa';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // No token — go to login
      window.location.href = "/login";
      return;
    }

    // Diagnostic log
    // eslint-disable-next-line no-console
    console.log("Profile: using token ->", token);

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // Diagnostic: log full response to help debug missing projects
        // eslint-disable-next-line no-console
        console.debug("/api/user response:", res.data);

        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log("Profile fetch error:", err?.response || err.message || err);

        // If unauthorized, clear token and redirect to login
        if (err?.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }

        // Other errors: show message and keep user on page
        setError("Failed to load profile. Check console or network.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-32">Loading profile...</p>;
  }

  const avatar = user?.profile_picture_url || '/default-avatar.svg';

  const projectCount = user?.projects?.length || 0;

  const handleDelete = async (projectId) => {
    const confirmed = window.confirm("Are you sure you want to delete this project?");
    if (!confirmed) return;

    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove project from local state
      setUser((prev) => ({
        ...prev,
        projects: (prev.projects || []).filter((p) => p.id !== projectId),
      }));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Delete project error:", err?.response || err.message || err);
      // show a simple alert on failure
      alert("Failed to delete project. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f6fb] pb-16">

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
              className="flex items-center gap-2 px-4 py-2 rounded-full text-white hover:bg-white/10 transition-colors font-semibold"
            >
              <FaCloudUploadAlt className="text-sm" />
              <span>Upload</span>
            </a>
            <a
              href="/profile"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-blue-700 font-semibold shadow-sm hover:shadow-md transition-shadow"
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

      <main className="max-w-5xl mx-auto mt-10 px-4">
        {/* Header Card */}
        <section className="bg-white rounded-xl shadow p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <div className="flex-shrink-0">
            <img
              src={avatar}
              alt="Profile"
              className="w-24 md:w-36 h-24 md:h-36 rounded-full border shadow object-cover"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/default-avatar.svg'; }}
            />
          </div>

          <div className="flex-1 w-full">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl md:text-3xl font-bold">{user?.name || '—'}</h2>
                <p className="text-xs md:text-base text-gray-600 mt-1">{user?.email || '—'}</p>

                <div className="mt-3 md:mt-4 flex flex-wrap gap-2 md:gap-3 text-xs md:text-sm">
                  <span className="px-2 md:px-3 py-1 bg-blue-50 text-blue-700 rounded">{user?.course || 'Course —'}</span>
                  <span className="px-2 md:px-3 py-1 bg-blue-50 text-blue-700 rounded">{user?.school || 'School —'}</span>
                  <span className="px-2 md:px-3 py-1 bg-blue-50 text-blue-700 rounded">{user?.department || 'Department —'}</span>
                </div>
              </div>

              {/* action buttons removed - using navbar links for navigation */}
            </div>

            {user?.bio && (
              <p className="mt-3 md:mt-4 text-xs md:text-base text-gray-700">{user.bio}</p>
            )}

            <div className="mt-4 md:mt-6 flex items-center gap-6 text-xs md:text-sm text-gray-700">
              <div>
                <div className="text-xl md:text-2xl font-semibold">{projectCount}</div>
                <div className="text-xs text-gray-500">Projects</div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="mt-8">
          <h3 className="text-xl font-bold mb-4">My Projects</h3>

          {projectCount === 0 ? (
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <p className="text-gray-700 mb-4">You haven’t uploaded any projects yet.</p>
              <a href="/upload" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Upload your first project</a>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {user.projects.map((project) => (
                <article key={project.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
                  <a href={`/projects/${project.id}`} className="block">
                    <img
                      src={project.thumbnail_url || '/default-thumbnail.svg'}
                      alt={project.title || 'Thumbnail'}
                      className="w-full h-20 md:h-44 object-cover"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/default-thumbnail.svg'; }}
                    />
                  </a>

                  <div className="p-2 md:p-4">
                    <div className="flex items-start justify-between gap-2 md:gap-3">
                      <div>
                        <h4 className="font-semibold text-xs md:text-lg line-clamp-1">{project.title || 'Untitled'}</h4>
                        <p className="text-xs md:text-sm text-gray-500 mt-0.5 md:mt-1">{project.category?.name || 'Uncategorized'}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`/projects/${project.id}/edit`}
                          title="Edit project"
                          className="text-gray-600 hover:text-blue-600 hover:scale-110 transition p-2 rounded transform active:scale-95"
                        >
                          <FaEdit />
                        </a>

                        <button
                          onClick={() => handleDelete(project.id)}
                          title="Delete project"
                          className="text-red-600 hover:text-red-800 hover:scale-110 transition p-2 rounded transform active:scale-95"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
