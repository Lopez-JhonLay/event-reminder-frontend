import { create } from "zustand";

const useAuthStore = create((set, get) => ({
	user: JSON.parse(localStorage.getItem("user")) || null,
	token: localStorage.getItem("token") || null,
	isAuthenticated: () => {
		const state = get();
		return !!state.token;
	},
	setToken: (token) => {
		localStorage.setItem("token", token);
		set({ token });
	},
	setUser: (user) => {
		localStorage.setItem("user", JSON.stringify(user));
		set({ user });
	},
	logout: () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		set({ user: null, token: null });
	},
}));

export default useAuthStore;
