import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "@/api/axios";
import useAuthStore from "@/store/auth";

function Header() {
	const navigate = useNavigate();
	const location = useLocation();
	const logout = useAuthStore((state) => state.logout);
	const user = useAuthStore((state) => state.user);

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
					<div className="flex items-center space-x-4">
						<h1 className="text-xl font-bold text-gray-800">Event Reminder</h1>
						<nav className="flex space-x-4">
							<Link
								to="/dashboard"
								className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
									location.pathname === "/dashboard"
										? "bg-blue-100 text-blue-700"
										: "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
								}`}
							>
								Dashboard
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
					<div className="flex items-center space-x-4">
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
				</div>
			</div>
		</header>
	);
}

export default Header;
