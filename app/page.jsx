"use client";
import { FaGraduationCap, FaArrowRight, FaHome, FaThLarge, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { MdUpload } from "react-icons/md";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#d7dff0] font-sans">
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

      {/* HERO SECTION */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-8 md:pb-16 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
          Showcase Your Research & Innovation
        </h1>

        <p className="mt-5 text-sm md:text-lg leading-relaxed text-slate-600 max-w-2xl mx-auto">
          A platform for students and researchers to share projects, prototypes, and mini-research work. 
          Build your portfolio, get feedback, and connect with fellow innovators.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="/login"
            className="px-8 py-3 rounded-full bg-cyan-600 text-white font-semibold shadow-md hover:shadow-lg hover:bg-cyan-700 transition-all flex items-center justify-center gap-2 text-sm md:text-base transform hover:scale-105 active:scale-95"
          >
            <MdUpload className="text-xl" />
            Upload your projects
          </a>

          <a 
            href="/login"
            className="px-8 py-3 rounded-full bg-white border-2 border-cyan-600 text-cyan-600 font-semibold shadow-sm hover:shadow-md hover:bg-cyan-50 transition-all text-sm md:text-base transform hover:scale-105 active:scale-95"
          >
            Explore Projects
          </a>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="max-w-5xl mx-auto px-6 mt-8 md:mt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 mt-6">
          <div className="bg-white rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 p-6 md:p-8 text-center border border-slate-200 flex flex-col items-center">
            <div className="mb-4 md:mb-5 inline-flex items-center justify-center rounded-lg border border-cyan-200 p-3 md:p-4 bg-cyan-50">
              <FaUserCircle className="text-2xl md:text-3xl text-cyan-600" />
            </div>
            <h3 className="text-base md:text-xl font-bold text-slate-900 mb-2">Build Your Profile</h3>
            <p className="text-xs md:text-base leading-relaxed text-slate-600 max-w-sm mx-auto">
              Create a professional profile showcasing your academic background and projects.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 p-6 md:p-8 text-center border border-slate-200 flex flex-col items-center">
            <div className="mb-4 md:mb-5 inline-flex items-center justify-center rounded-lg border border-cyan-200 p-3 md:p-4 bg-cyan-50">
              <MdUpload className="text-2xl md:text-3xl text-cyan-600" />
            </div>
            <h3 className="text-base md:text-xl font-bold text-slate-900 mb-2">Upload Projects</h3>
            <p className="text-xs md:text-base leading-relaxed text-slate-600 max-w-sm mx-auto">
              Share your research work, prototypes, and innovations with detailed descriptions.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white mt-12 py-8 text-center">
        <div className="max-w-5xl mx-auto px-8">
          <h2 className="text-lg md:text-2xl font-bold text-slate-900 mb-3 md:mb-6">Trusted by the Community</h2>
          <div className="flex flex-wrap justify-center gap-3 md:gap-16">
            <div className="flex flex-col items-center">
              <div className="text-base md:text-2xl font-extrabold text-slate-900 leading-none">150+</div>
              <div className="mt-0.5 md:mt-1 text-xs md:text-sm font-semibold text-slate-600/90">
                Active Researchers
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-base md:text-2xl font-extrabold text-slate-900 leading-none">500+</div>
              <div className="mt-0.5 md:mt-1 text-xs md:text-sm font-semibold text-slate-600/90">
                Projects Shared
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-base md:text-2xl font-extrabold text-slate-900 leading-none">50+</div>
              <div className="mt-0.5 md:mt-1 text-xs md:text-sm font-semibold text-slate-600/90">
                Universities
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="text-center py-8 md:py-16 px-4 md:px-6 border-t border-slate-200 mt-8">
        <h2 className="text-xl md:text-3xl font-extrabold text-slate-900 mb-2 md:mb-4">
          Ready to Share Your Work?
        </h2>
        <p className="text-xs md:text-lg max-w-2xl mx-auto leading-relaxed text-slate-600 mb-4 md:mb-8">
          Join hundreds of researchers and innovators building their portfolios on our platform.
        </p>
        <a
          href="/login"
          className="px-8 py-3 rounded-full bg-cyan-600 text-white font-semibold shadow-md hover:shadow-lg hover:bg-cyan-700 transition-all text-sm md:text-base transform hover:scale-105 active:scale-95"
        >
          Get Started Now
        </a>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-6 md:py-8 mt-12 md:mt-16 text-center shadow-lg">
        <p className="text-xs md:text-sm">&copy; 2025 ORIP. All rights reserved.</p>
      </footer>

    </div>
  );
}
