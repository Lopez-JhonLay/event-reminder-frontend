import { Button } from "@/components/ui/button";

import api from "@/api/axios";

import { useNavigate } from "react-router-dom";

import useAuthStore from "@/store/auth";

function Dashboard() {
	const navigate = useNavigate();
	const logout = useAuthStore((state) => state.logout);

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
		<div>
			<Button onClick={handleLogout}>Logout</Button>
		</div>
	);
}

export default Dashboard;
