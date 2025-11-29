'use client';
import { FaGraduationCap, FaArrowRight,  FaHome, FaThLarge, FaUserCircle } from 'react-icons/fa';
import { MdUpload } from 'react-icons/md';

export default function HomePage() {
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

      {/* HERO SECTION */}
      <div className="text-center max-w-3xl mx-auto mt-16">
        <h1 className="text-3xl font-bold">
          Showcase Your Research & Innovation
        </h1>

        <p className="text-gray-700 mt-3 px-4">
          A platform for students and researchers to share projects, prototypes, and mini-research work. 
          Build your portfolio, get feedback, and connect with fellow innovators.
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <a 
            href="/upload"
            className="px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 flex items-center gap-2"
          >
            <MdUpload className="text-xl" />
            Upload your projects
          </a>

          <a 
            href="/projects"
            className="px-6 py-3 bg-white border rounded-md shadow hover:bg-gray-100"
          >
            Explore Projects →
          </a>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-5xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
        
        <div className="bg-blue-300 p-6 rounded-md shadow text-center">
          <FaUserCircle className="text-4xl mx-auto mb-3" />
          <h3 className="font-bold text-xl">Build Your Profile</h3>
          <p className="mt-2 text-gray-700">
            Create a professional profile showcasing your academic background and projects.
          </p>
        </div>

        <div className="bg-blue-300 p-6 rounded-md shadow text-center">
          <MdUpload className="text-4xl mx-auto mb-3" />
          <h3 className="font-bold text-xl">Upload Projects</h3>
          <p className="mt-2 text-gray-700">
            Share your research work, prototypes, and innovations with detailed descriptions.
          </p>
        </div>

      </div>

      {/* STATS */}
      <div className="bg-blue-200 py-10 mt-20 text-center text-lg font-semibold">
        <div className="flex justify-center gap-20">
          <div>
            150+ <br /> <span className="font-normal">Active Researchers</span>
          </div>
          <div>
            300+ <br /> <span className="font-normal">Projects Shared</span>
          </div>
          <div>
            50+ <br /> <span className="font-normal">Universities</span>
          </div>
        </div>
      </div>

      {/* FOOTER CTA */}
      <div className="text-center mt-10 mb-16">
        <p className="text-gray-700 mb-3">Ready to Share Your Work?</p>
        <a 
          href="/register"
          className="px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
        >
          Get Started
        </a>
      </div>

    </div>
  );
}
