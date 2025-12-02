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
          <a href="/projects" className="flex items-center gap-1 hover:underline"><FaThLarge className="text-white" />Explore Projects</a>
          <a href="/login" className="flex items-center gap-1 hover:underline"><FaArrowRight className="text-white" />Log in</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="text-center max-w-3xl mx-auto mt-20 px-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Showcase Your Research & Innovation
        </h1>

        <p className="text-gray-700 mt-4 text-lg leading-relaxed">
          A platform for students and researchers to share projects, prototypes, and mini-research work. 
          Build your portfolio, get feedback, and connect with fellow innovators.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <a 
            href="/login"
            className="px-8 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
          >
            <MdUpload className="text-xl" />
            Upload your projects
          </a>

          <a 
            href="/projects"
            className="px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-md shadow hover:bg-blue-50 transition-colors font-semibold"
          >
            Explore Projects →
          </a>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-5xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
        
        <div className="bg-blue-300 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
          <div className="text-5xl text-blue-600 mx-auto mb-4 flex justify-center">
            <FaUserCircle />
          </div>
          <h3 className="font-bold text-xl text-gray-900">Build Your Profile</h3>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Create a professional profile showcasing your academic background and projects.
          </p>
        </div>

        <div className="bg-blue-300 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
          <div className="text-5xl text-blue-600 mx-auto mb-4 flex justify-center">
            <MdUpload />
          </div>
          <h3 className="font-bold text-xl text-gray-900">Upload Projects</h3>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Share your research work, prototypes, and innovations with detailed descriptions.
          </p>
        </div>

      </div>

      {/* STATS */}
      <div className="bg-blue-200 py-16 mt-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-10">Trusted by the Community</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-12 px-6 sm:gap-20">
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-blue-600">150+</div>
            <div className="text-gray-700 font-medium mt-2">Active Researchers</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-blue-600">300+</div>
            <div className="text-gray-700 font-medium mt-2">Projects Shared</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-blue-600">50+</div>
            <div className="text-gray-700 font-medium mt-2">Universities</div>
          </div>
        </div>
      </div>

      {/* FOOTER CTA */}
      <div className="text-center mt-20 pb-20 px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Share Your Work?</h2>
        <p className="text-gray-700 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
          Join hundreds of researchers and innovators building their portfolios on our platform.
        </p>
        <a 
          href="/login"
          className="px-8 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors font-semibold"
        >
          Get Started Now
        </a>
      </div>

    </div>
  );
}
