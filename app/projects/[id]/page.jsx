"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaGraduationCap,
  FaHome,
  FaThLarge,
  FaUpload,
  FaUser,
  FaArrowLeft,
  FaDownload,
  FaEye,
  FaCopy,
  FaCheck,
  FaBars,
  FaTimes
} from "react-icons/fa";

export default function ProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [isAuthed, setIsAuthed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [codePreview, setCodePreview] = useState(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  // Helper functions (moved inside component)
  const isTextFile = (filename) => {
    const textExtensions = ['.txt', '.md', '.json', '.xml', '.html', '.css', '.js', '.jsx', '.py', '.java', '.cpp', '.c', '.php', '.rb', '.go', '.ts', '.tsx', '.sql', '.yaml', '.yml', '.env', '.log'];
    return textExtensions.some(ext => filename.toLowerCase().endsWith(ext));
  };

  const isPdfFile = (filename) => filename.toLowerCase().endsWith('.pdf');

  const isWordFile = (filename) => {
    const wordExtensions = ['.doc', '.docx'];
    return wordExtensions.some(ext => filename.toLowerCase().endsWith(ext));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('user_role');
    setIsAuthed(!!token);
    setIsAdmin(userRole === 'admin');
  }, []);

  const fetchProject = async () => {
    try {
      console.log("Fetching project with ID:", id);
      const startTime = performance.now();
      
      // Get token from localStorage if available
      const token = localStorage.getItem("token");
      const headers = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`, {
        headers,
        timeout: 10000
      });
      const endTime = performance.now();
      console.log(`Project loaded in ${(endTime - startTime).toFixed(2)}ms`, res.data);
      setProject(res.data);
    } catch (err) {
      console.log("Error fetching project:", err.message, err.response ? err.response.status : "");
      setProject({ error: err.message || "Failed to load project" });
    }
  };

  const handlePreviewClick = async () => {
    if (!project.file_url) return;
    
    setLoadingPreview(true);
    try {
      const res = await axios.get(project.file_url);
      setCodePreview(res.data);
    } catch (err) {
      console.error("Error loading preview:", err);
      alert("Could not load file preview");
    } finally {
      setLoadingPreview(false);
    }
  };

  const handleCopyCode = () => {
    if (codePreview) {
      navigator.clipboard.writeText(codePreview);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  if (!project) return (
    <div className="min-h-screen bg-[#d7dff0] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-700 font-semibold">Loading project...</p>
      </div>
    </div>
  );

  if (project && project.error) return (
    <div className="min-h-screen bg-[#d7dff0] flex items-center justify-center">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
        <p className="text-red-600 font-semibold mb-4">⚠️ Error Loading Project</p>
        <p className="text-gray-700 mb-4">{project.error}</p>
        <p className="text-sm text-gray-600 mb-6">Check that:</p>
        <ul className="text-sm text-gray-600 text-left mb-6 space-y-2">
          <li>✓ Backend API is running</li>
          <li>✓ Project ID is valid</li>
          <li>✓ Backend URL in .env.local is correct</li>
          <li>✓ You are logged in (if required)</li>
        </ul>
        <a href="/projects" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Back to Projects
        </a>
      </div>
    </div>
  );

  const avatar = (project.user && project.user.profile_picture_url) || '/default-avatar.svg';
  const thumbnail = project.thumbnail_url || '/default-thumbnail.svg';

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
            {isAdmin ? (
              <>
                <a
                  href="/admin"
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-white hover:bg-white/20 transition-colors font-semibold"
                >
                  <FaThLarge className="text-sm" />
                  <span>Admin Dashboard</span>
                </a>
              </>
            ) : (
              <>
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
              </>
            )}
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
            {isAdmin ? (
              <>
                <a
                  href="/admin"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-cyan-600 transition text-white font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaThLarge /> Admin Dashboard
                </a>
              </>
            ) : (
              <>
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
              </>
            )}
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

      {/* MAIN CONTENT */}
      <div className="px-4 md:px-12 py-6 md:py-12 max-w-5xl mx-auto">

        <a href="/projects" className="flex items-center gap-2 text-cyan-600 mb-4 md:mb-8 hover:text-cyan-700 transition font-semibold text-xs md:text-base">
          <FaArrowLeft /> Back to Projects
        </a>

        <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">

          {/* THUMBNAIL */}
          <img
            src={thumbnail}
            className="w-full max-h-64 md:max-h-[500px] object-cover rounded-lg mb-4 md:mb-8"
            alt={project.title || 'Project thumbnail'}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/default-thumbnail.svg';
            }}
          />

          {/* CATEGORY & TITLE */}
          <div className="mb-4 md:mb-8">
            <span className="text-xs md:text-sm font-bold text-cyan-600 uppercase tracking-wide">
              {(project.category && project.category.name) || 'Uncategorized'}
            </span>
            <h1 className="text-2xl md:text-4xl font-bold mt-2 md:mt-3 text-gray-900">
              {project.title}
            </h1>
          </div>

          {/* AUTHOR CARD */}
          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-8 p-3 md:p-4 bg-gray-50 rounded-lg">
            <img
              src={avatar}
              className="w-10 md:w-14 h-10 md:h-14 rounded-full object-cover border-2 border-cyan-200"
              alt={(project.user && project.user.name) || 'Author avatar'}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/default-avatar.svg';
              }}
            />
            <div>
              <p className="text-sm md:text-lg font-semibold text-gray-900">{(project.user && project.user.name) || 'Unknown Author'}</p>
              <p className="text-xs md:text-sm text-gray-600">{(project.user && project.user.course) || '—'} · {(project.user && project.user.school) || '—'}</p>
            </div>
          </div>

          {/* DESCRIPTION SECTION */}
          <div className="mb-4 md:mb-8">
            <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">Project Description</h2>
            <p className="text-gray-700 leading-relaxed text-sm md:text-lg">
              {project.description || 'No description provided.'}
            </p>
          </div>

          {/* FILE DOWNLOAD SECTION */}
          <div>
            <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">Project File</h2>
            {project.file_url ? (
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center justify-between bg-white p-3 md:p-6 rounded-lg border border-gray-200 flex-col md:flex-row gap-3 md:gap-0">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm md:text-base">
                      {project.file_path.split('/').pop()}
                    </p>
                    <p className="text-gray-600 text-xs md:text-sm">
                      {project.file_path.endsWith(".pdf") ? "PDF Document" : "Project File"}
                    </p>
                  </div>
                  <a
                    href={project.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-3 md:px-4 py-2 rounded-lg transition font-semibold text-xs md:text-base"
                  >
                    View File
                  </a>
                </div>

                {/* PREVIEW BUTTON */}
                {isTextFile(project.file_path) && (
                  <button
                    onClick={handlePreviewClick}
                    disabled={loadingPreview}
                    className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-3 md:px-4 py-2 md:py-3 rounded-lg transition font-semibold text-xs md:text-base disabled:bg-gray-400"
                  >
                    <FaEye className="text-base md:text-lg" />
                    {loadingPreview ? "Loading..." : "View Code/Preview"}
                  </button>
                )}

                {/* PDF/WORD PREVIEW INFO */}
                {(isPdfFile(project.file_path) || isWordFile(project.file_path)) && (
                  <div className="bg-cyan-50 border border-cyan-200 p-3 md:p-4 rounded-lg text-center text-xs md:text-sm text-gray-700">
                    <p>Click 'View File' to open the document in your browser.</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-sm md:text-lg">No file uploaded for this project.</p>
            )}
          </div>

          {/* CODE PREVIEW SECTION */}
          {codePreview && (
            <div className="mt-6 md:mt-12 border-t pt-4 md:pt-8">
              <div className="flex items-center justify-between mb-3 md:mb-4 flex-col md:flex-row gap-2">
                <h2 className="text-lg md:text-2xl font-bold text-gray-900">Code Preview</h2>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-3 md:px-4 py-2 rounded-lg transition font-semibold text-xs md:text-base"
                >
                  {copied ? (
                    <>
                      <FaCheck className="text-base md:text-lg" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <FaCopy className="text-base md:text-lg" />
                      Copy Code
                    </>
                  )}
                </button>
              </div>
              <pre className="bg-gray-900 text-gray-100 p-3 md:p-6 rounded-lg overflow-x-auto text-xs md:text-sm leading-relaxed max-h-96 overflow-y-auto font-mono">
                <code>{codePreview}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}