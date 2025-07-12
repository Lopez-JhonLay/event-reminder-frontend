import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import api from "@/api/axios";

import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function Register() {
	//state
	const [form, setForm] = useState({
		first_name: "",
		last_name: "",
		username: "",
		email: "",
		password: "",
		password_confirmation: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const navigate = useNavigate();

	//handlers
	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await api.post("/register", form);

			console.log(response.data);
			navigate("/login");
		} catch (err) {
			console.error(err);
			if (err.response && err.response.data) {
				setError(err.response.data.message || "An error occurred");
			} else {
				setError("An error occurred");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<Card className="w-full max-w-md p-6 shadow-lg rounded-2xl">
				<CardContent>
					<h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

					{error && <p className="text-red-500 text-sm mb-3">{error}</p>}

					<form
						onSubmit={handleSubmit}
						className="space-y-4"
					>
						<Input
							type="text"
							name="first_name"
							placeholder="First Name"
							value={form.first_name}
							onChange={handleChange}
							required
						/>
						<Input
							type="text"
							name="last_name"
							placeholder="Last Name"
							value={form.last_name}
							onChange={handleChange}
							required
						/>
						<Input
							type="text"
							name="username"
							placeholder="Username"
							value={form.username}
							onChange={handleChange}
							required
						/>
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
						<div className="relative">
							<Input
								type={showConfirmPassword ? "text" : "password"}
								name="password_confirmation"
								placeholder="Confirm Password"
								value={form.password_confirmation}
								onChange={handleChange}
								required
							/>
							<button
								type="button"
								className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
							>
								{showConfirmPassword ? (
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
							{loading ? "Loading..." : "Create Account"}
						</Button>
					</form>

					<p className="text-center text-sm mt-4">
						Already have an account?{" "}
						<Link
							to="/login"
							className="text-blue-500 hover:underline"
						>
							Login
						</Link>
					</p>
				</CardContent>
			</Card>
		</div>
	);
}

export default Register;
