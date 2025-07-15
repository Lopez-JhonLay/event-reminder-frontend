import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Settings from "./pages/Settings";

import { ProtectedRoute, PublicRoute } from "./components/RouteGuard";

import useAuthStore from "./store/auth";
import useThemeStore from "./store/theme";

function App() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const initializeTheme = useThemeStore((state) => state.initializeTheme);

	useEffect(() => {
		// Initialize theme on app start
		initializeTheme();
	}, [initializeTheme]);

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
					path="/home"
					element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/events"
					element={
						<ProtectedRoute>
							<Events />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/settings"
					element={
						<ProtectedRoute>
							<Settings />
						</ProtectedRoute>
					}
				/>
				{/* Default route - redirect based on authentication status */}
				<Route
					path="/"
					element={
						<Navigate
							to={isAuthenticated() ? "/home" : "/login"}
							replace
						/>
					}
				/>
				{/* Catch all route - redirect to home */}
				<Route
					path="*"
					element={
						<Navigate
							to={isAuthenticated() ? "/home" : "/login"}
							replace
						/>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
