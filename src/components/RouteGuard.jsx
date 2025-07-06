import { Navigate } from "react-router-dom";
import useAuthStore from "@/store/auth";

// Guard for routes that require authentication (like Dashboard)
export const ProtectedRoute = ({ children }) => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	if (!isAuthenticated()) {
		return (
			<Navigate
				to="/login"
				replace
			/>
		);
	}

	return children;
};

// Guard for routes that should only be accessible when NOT authenticated (like Login, Register)
export const PublicRoute = ({ children }) => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	if (isAuthenticated()) {
		return (
			<Navigate
				to="/dashboard"
				replace
			/>
		);
	}

	return children;
};
