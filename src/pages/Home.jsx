import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import api from "@/api/axios";
import useAuthStore from "@/store/auth";
import { findCurrentEvent } from "@/utils/dateUtils";

function Home() {
	const [loading, setLoading] = useState(true);
	const [currentEvent, setCurrentEvent] = useState(null);
	const user = useAuthStore((state) => state.user);

	const handleFindCurrentEvent = useCallback((events) => {
		console.log("Finding current event from:", events);
		const currentEvent = findCurrentEvent(events);
		console.log("Found current event:", currentEvent);
		setCurrentEvent(currentEvent);
	}, []);

	const fetchEvents = useCallback(async () => {
		try {
			const response = await api.get("/events");
			console.log("API Response:", response.data.events);
			const eventsData = response.data.events || [];
			handleFindCurrentEvent(eventsData);
		} catch (error) {
			console.error("Failed to fetch events:", error);
		} finally {
			setLoading(false);
		}
	}, [handleFindCurrentEvent]);

	useEffect(() => {
		if (user) {
			fetchEvents();
		}
	}, [user, fetchEvents]);

	return (
		<div>
			<Header />
			<div className="max-w-4xl mx-auto mt-10 p-4">
				<h2 className="text-xl font-semibold mb-4">Current Event</h2>

				{loading ? (
					<div className="p-6 border rounded-lg bg-white shadow-sm">
						<p>Loading current event...</p>
					</div>
				) : currentEvent ? (
					<div className="p-6 border rounded-lg bg-white shadow-sm">
						<h3 className="font-semibold text-lg text-blue-600 mb-2">
							{currentEvent.title}
						</h3>
						<p className="text-sm text-gray-600 mb-3">
							{currentEvent.description}
						</p>
						<div className="flex items-center space-x-4 text-sm">
							<p className="flex items-center">
								<span className="mr-1">📅</span>
								{currentEvent.event_date}
							</p>
							<p className="flex items-center">
								<span className="mr-1">⏰</span>
								{currentEvent.start_time} - {currentEvent.end_time}
							</p>
						</div>
						<div className="mt-4 flex items-center">
							<span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
							<span className="text-sm text-green-600 font-medium">
								Happening Now
							</span>
						</div>
					</div>
				) : (
					<div className="p-6 border rounded-lg bg-white shadow-sm">
						<div className="text-center">
							<div className="mb-4">
								<span className="flex w-16 h-16 bg-gray-100 rounded-full items-center justify-center text-2xl mx-auto">
									📅
								</span>
							</div>
							<h3 className="text-lg font-medium text-gray-600 mb-2">
								No Event Happening Right Now
							</h3>
							<p className="text-sm text-gray-500">
								Check back later or view all your upcoming events.
							</p>
							<Link
								to="/events"
								className="inline-block mt-4 bg-black text-white px-4 py-2 rounded-md transition-colors"
							>
								View your upcoming events ➡️
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Home;
