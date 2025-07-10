import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import api from "@/api/axios";
import useAuthStore from "@/store/auth";

function Header() {
	const navigate = useNavigate();
	const location = useLocation();
	const logout = useAuthStore((state) => state.logout);
	const user = useAuthStore((state) => state.user);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleLogout = async () => {
		try {
			const response = await api.post("/logout");
			console.log("Logout successful:", response.data);
			logout();
			navigate("/login");
		} catch (error) {
			console.error("Logout failed:", error);
			// Still logout locally even if server request fails
			logout();
			navigate("/login");
		}
	};

	return (
		<header className="bg-white shadow-sm border-b">
			<div className="max-w-4xl mx-auto px-4 py-4">
				<div className="flex justify-between items-center">
					{/* Logo and Desktop Navigation */}
					<div className="flex items-center space-x-4">
						<Link
							to="/home"
							className="text-xl font-bold text-gray-800 transition-colors"
						>
							Event Reminder
						</Link>
						{/* Desktop Navigation */}
						<nav className="hidden md:flex space-x-4">
							<Link
								to="/home"
								className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
									location.pathname === "/home"
										? "bg-blue-100 text-blue-700"
										: "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
								}`}
							>
								Home
							</Link>
							<Link
								to="/events"
								className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
									location.pathname === "/events"
										? "bg-blue-100 text-blue-700"
										: "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
								}`}
							>
								Events
							</Link>
						</nav>
					</div>

					{/* Desktop User Info and Logout */}
					<div className="hidden md:flex items-center space-x-4">
						{user && (
							<span className="text-sm text-gray-600">
								Welcome, {user.first_name}!
							</span>
						)}
						<Button
							onClick={handleLogout}
							variant="outline"
							size="sm"
						>
							Logout
						</Button>
					</div>

					{/* Mobile Hamburger Menu */}
					<div className="md:hidden">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="p-2"
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								{isMenuOpen ? (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								) : (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								)}
							</svg>
						</Button>
					</div>
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<div className="md:hidden mt-4 pb-4 border-t pt-4">
						<nav className="flex flex-col space-y-2">
							<Link
								to="/home"
								className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
									location.pathname === "/home"
										? "bg-blue-100 text-blue-700"
										: "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
								}`}
								onClick={() => setIsMenuOpen(false)}
							>
								Home
							</Link>
							<Link
								to="/events"
								className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
									location.pathname === "/events"
										? "bg-blue-100 text-blue-700"
										: "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
								}`}
								onClick={() => setIsMenuOpen(false)}
							>
								Events
							</Link>
						</nav>
						<div className="flex flex-col space-y-2 mt-4">
							{user && (
								<span className="text-sm text-gray-600 px-3">
									Welcome, {user.first_name}!
								</span>
							)}
							<div className="px-3">
								<Button
									onClick={() => {
										handleLogout();
										setIsMenuOpen(false);
									}}
									variant="outline"
									size="sm"
									className="w-full"
								>
									Logout
								</Button>
							</div>
						</div>
					</div>
				)}
			</div>
		</header>
	);
}

export default Header;
