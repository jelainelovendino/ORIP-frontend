"use client";

import { FaGraduationCap, FaSearch, FaTrash, FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminPage() {
	const router = useRouter();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [projects, setProjects] = useState([]);
	const [filteredProjects, setFilteredProjects] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [isAuthorized, setIsAuthorized] = useState(false);

	const fetchProjects = useCallback(async () => {
		try {
			setLoading(true);
			const token = localStorage.getItem("token");
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/api/projects`,
				{
					headers: token ? { Authorization: `Bearer ${token}` } : {},
				}
			);
			setProjects(response.data);
			setFilteredProjects(response.data);
			setError("");
		} catch (err) {
			console.error("Error fetching projects:", err);
			setError("Failed to load projects");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		// Check if user is admin
		const userRole = localStorage.getItem("user_role");
		if (userRole !== "admin") {
			router.push("/projects");
			return;
		}
		setIsAuthorized(true);
		fetchProjects();
	}, [router, fetchProjects]);

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = projects.filter(
			(project) =>
				project.title.toLowerCase().includes(term) ||
				(project.user?.name || "").toLowerCase().includes(term)
		);
		setFilteredProjects(filtered);
	};

	const handleDelete = async (projectId) => {
		if (!window.confirm("Are you sure you want to delete this project?")) {
			return;
		}

		try {
			const token = localStorage.getItem("token");
			await axios.delete(
				`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${projectId}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			setProjects(projects.filter((p) => p.id !== projectId));
			setFilteredProjects(filteredProjects.filter((p) => p.id !== projectId));
		} catch (err) {
			console.error("Error deleting project:", err);
			alert("Failed to delete project");
		}
	};

	return (
		<>
			{!isAuthorized ? (
				<div className="flex items-center justify-center min-h-screen bg-gray-100">
					<div className="text-center">
						<p className="text-lg text-gray-600">Checking authorization...</p>
					</div>
				</div>
			) : (
				<div className="min-h-screen bg-gray-100">
					{/* NAVBAR */}
					<nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
						<div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
							{/* Logo */}
							<a href="/" className="flex items-center gap-3 hover:opacity-90 transition">
								<FaGraduationCap className="text-white text-4xl" />
								<div className="flex flex-col leading-tight">
									<span className="text-xl md:text-2xl font-extrabold text-white">ORIP</span>
									<span className="text-xs md:text-sm font-semibold text-blue-100">Admin</span>
								</div>
							</a>

							{/* Desktop Nav Links */}
							<div className="hidden md:flex items-center gap-6">
								<span className="text-white font-semibold">Manage Projects</span>
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
								<div className="px-4 py-2 text-white font-semibold">Manage Projects</div>
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

					{/* MAIN CONTENT */}
					<div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12">
						<h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Manage Projects</h1>

						{/* CARD */}
						<div className="bg-white rounded-xl shadow-lg p-4 md:p-8">
							{/* SEARCH BAR */}
							<div className="mb-6 relative">
								<FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
								<input
									type="text"
									placeholder="Search Projects"
									value={searchTerm}
									onChange={handleSearch}
									className="w-full pl-12 pr-4 py-3 md:py-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm md:text-base"
								/>
							</div>

							{/* TABLE */}
							{loading ? (
								<div className="text-center py-12">
									<div className="inline-block">
										<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
										<p className="text-gray-600 mt-4">Loading projects...</p>
									</div>
								</div>
							) : error ? (
								<div className="text-center py-12">
									<p className="text-red-600 font-semibold">{error}</p>
								</div>
							) : filteredProjects.length === 0 ? (
								<div className="text-center py-12">
									<p className="text-gray-600">No projects found</p>
								</div>
							) : (
								<div className="overflow-x-auto">
									<table className="w-full">
										<thead>
											<tr className="border-b-2 border-gray-200">
												<th className="text-left py-3 md:py-4 px-2 md:px-4 font-semibold text-gray-700 text-xs md:text-sm">
													Project Title
												</th>
												<th className="text-left py-3 md:py-4 px-2 md:px-4 font-semibold text-gray-700 text-xs md:text-sm">
													Uploaded By
												</th>
												<th className="text-right py-3 md:py-4 px-2 md:px-4 font-semibold text-gray-700 text-xs md:text-sm">
													Action
												</th>
											</tr>
										</thead>
										<tbody>
											{filteredProjects.map((project) => (
												<tr
													key={project.id}
													className="border-b border-gray-200 hover:bg-gray-50 transition"
												>
													<td className="py-3 md:py-4 px-2 md:px-4">
														<a
															href={`/projects/${project.id}`}
															className="text-blue-600 hover:text-blue-800 hover:underline font-semibold text-xs md:text-sm line-clamp-1"
														>
															{project.title || "Untitled"}
														</a>
														<p className="text-gray-500 text-xs mt-1">
															{project.category?.name || "Uncategorized"}
														</p>
													</td>
													<td className="py-3 md:py-4 px-2 md:px-4">
														<p className="text-gray-900 text-xs md:text-sm">
															{project.user?.name || "Unknown"}
														</p>
													</td>
													<td className="py-3 md:py-4 px-2 md:px-4">
														<div className="flex items-center justify-end gap-2 md:gap-3">
															<button
																onClick={() => handleDelete(project.id)}
																className="px-3 md:px-4 py-1.5 md:py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-semibold text-xs md:text-sm flex items-center gap-1 md:gap-2"
															>
																<FaTrash className="text-sm" />
																<span className="hidden sm:inline">Delete</span>
															</button>
														</div>
													</td>
												</tr>
											))}
										</tbody>
									</table>
									<div className="mt-4 text-center text-sm text-gray-600">
										Showing {filteredProjects.length} of {projects.length} projects
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
}
