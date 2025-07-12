import { useState } from "react";

import { Link } from "react-router-dom";

import api from "@/api/axios";

import useAuthStore from "../store/auth";

import { useNavigate } from "react-router-dom";

import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function Login() {
	// state
	const [form, setForm] = useState({ email: "", password: "" });
	const [errors, setErrors] = useState(null);
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const setToken = useAuthStore((state) => state.setToken);
	const setUser = useAuthStore((state) => state.setUser);

	const navigate = useNavigate();

	// handlers
	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await api.post("/login", form);
			console.log(response.data);
			setToken(response.data.token);
			setUser(response.data.user);
			navigate("/home");
		} catch (err) {
			setErrors(err.response?.data?.message || "Login failed.");
			console.log(`Error: ${JSON.stringify(err.response?.data)}`);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<Card className="w-full max-w-md p-6 shadow-lg rounded-2xl">
				<CardContent>
					<h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

					{errors && <p className="text-red-500 text-sm mb-3">{errors}</p>}

					<form
						onSubmit={handleSubmit}
						className="space-y-4"
					>
						<Input
							type="email"
							name="email"
							placeholder="Email"
							value={form.email}
							onChange={handleChange}
							required
						/>
						<div className="relative">
							<Input
								type={showPassword ? "text" : "password"}
								name="password"
								placeholder="Password"
								value={form.password}
								onChange={handleChange}
								required
							/>
							<button
								type="button"
								className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? (
									<EyeOff className="h-5 w-5" />
								) : (
									<Eye className="h-5 w-5" />
								)}
							</button>
						</div>
						<Button
							type="submit"
							className="w-full"
						>
							{loading ? "Logging in..." : "Login"}
						</Button>
					</form>

					<p className="text-center text-sm mt-4">
						Don't have an account?{" "}
						<Link
							to="/register"
							className="text-blue-500 hover:underline"
						>
							Register
						</Link>
					</p>
				</CardContent>
			</Card>
		</div>
	);
}

export default Login;
