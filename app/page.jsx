"use client";
import { FaGraduationCap, FaArrowRight, FaHome, FaThLarge, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { MdUpload } from "react-icons/md";
import { useState } from "react";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#d7dff0] font-sans">
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
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-blue-700 font-semibold shadow-sm hover:shadow-md transition-shadow"
            >
              <FaHome className="text-sm" />
              <span>Home</span>
            </a>
            <a
              href="/login"
              className="px-4 py-2 rounded-full text-white border-2 border-white hover:bg-white/10 transition-colors font-semibold"
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

      {/* HERO SECTION */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-8 md:pb-16 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-blue-900 leading-tight">
          Showcase Your Research & Innovation
        </h1>

        <p className="mt-5 text-sm md:text-lg leading-relaxed text-blue-900/90 max-w-2xl mx-auto">
          A platform for students and researchers to share projects, prototypes, and mini-research work. 
          Build your portfolio, get feedback, and connect with fellow innovators.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="/login"
            className="px-8 py-3 rounded-full bg-blue-700 text-white font-semibold shadow-md hover:shadow-xl hover:bg-blue-800 transition-all flex items-center justify-center gap-2 text-sm md:text-base transform hover:scale-105 active:scale-95"
          >
            <MdUpload className="text-xl" />
            Upload your projects
          </a>

          <a 
            href="/login"
            className="px-8 py-3 rounded-full bg-white border-2 border-blue-700 text-blue-700 font-semibold shadow hover:shadow-md hover:bg-blue-50 transition-all text-sm md:text-base transform hover:scale-105 active:scale-95"
          >
            Explore Projects
          </a>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="max-w-5xl mx-auto px-6 mt-8 md:mt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 mt-6">
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 p-4 md:p-7 text-center border border-blue-100 flex flex-col items-center">
            <div className="mb-3 md:mb-4 inline-flex items-center justify-center rounded-xl border border-blue-300 p-2 md:p-3 bg-blue-50">
              <FaUserCircle className="text-2xl md:text-3xl text-blue-700" />
            </div>
            <h3 className="text-base md:text-xl font-bold text-blue-900 mb-2">Build Your Profile</h3>
            <p className="text-xs md:text-base leading-relaxed text-blue-900/90 max-w-sm mx-auto">
              Create a professional profile showcasing your academic background and projects.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 p-4 md:p-7 text-center border border-blue-100 flex flex-col items-center">
            <div className="mb-3 md:mb-4 inline-flex items-center justify-center rounded-xl border border-blue-300 p-2 md:p-3 bg-blue-50">
              <MdUpload className="text-2xl md:text-3xl text-blue-700" />
            </div>
            <h3 className="text-base md:text-xl font-bold text-blue-900 mb-2">Upload Projects</h3>
            <p className="text-xs md:text-base leading-relaxed text-blue-900/90 max-w-sm mx-auto">
              Share your research work, prototypes, and innovations with detailed descriptions.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-blue-200 mt-12 py-8 text-center">
        <div className="max-w-5xl mx-auto px-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Trusted by the Community</h2>
          <div className="flex flex-wrap justify-center gap-6 md:gap-16">
            <div className="flex flex-col items-center">
              <div className="text-xl md:text-2xl font-extrabold text-blue-900 leading-none">150+</div>
              <div className="mt-1 text-xs md:text-sm font-semibold text-blue-900/90">
                Active Researchers
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-xl md:text-2xl font-extrabold text-blue-900 leading-none">300+</div>
              <div className="mt-1 text-xs md:text-sm font-semibold text-blue-900/90">
                Projects Shared
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-xl md:text-2xl font-extrabold text-blue-900 leading-none">50+</div>
              <div className="mt-1 text-xs md:text-sm font-semibold text-blue-900/90">
                Universities
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="text-center py-16 px-6 border-t border-blue-300 mt-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-blue-900 mb-4">
          Ready to Share Your Work?
        </h2>
        <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-blue-900/90 mb-8">
          Join hundreds of researchers and innovators building their portfolios on our platform.
        </p>
        <a
          href="/login"
          className="px-8 py-3 rounded-full bg-blue-700 text-white font-semibold shadow-md hover:shadow-xl hover:bg-blue-800 transition-all text-sm md:text-base transform hover:scale-105 active:scale-95"
        >
          Get Started Now
        </a>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-900 text-blue-100 py-8 mt-16 text-center">
        <p className="text-sm">&copy; 2025 ORIP. All rights reserved.</p>
      </footer>

    </div>
  );
}
