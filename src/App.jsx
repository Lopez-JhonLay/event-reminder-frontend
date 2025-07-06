import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import { ProtectedRoute, PublicRoute } from "./components/RouteGuard";

import useAuthStore from "./store/auth";

function App() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/register"
					element={
						<PublicRoute>
							<Register />
						</PublicRoute>
					}
				/>
				<Route
					path="/login"
					element={
						<PublicRoute>
							<Login />
						</PublicRoute>
					}
				/>
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				{/* Default route - redirect based on authentication status */}
				<Route
					path="/"
					element={
						<Navigate
							to={isAuthenticated() ? "/dashboard" : "/login"}
							replace
						/>
					}
				/>
				{/* Catch all route - redirect to home */}
				<Route
					path="*"
					element={
						<Navigate
							to={isAuthenticated() ? "/dashboard" : "/login"}
							replace
						/>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
