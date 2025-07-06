import { useState, useEffect } from "react";
import api from "@/api/axios";
import useAuthStore from "@/store/auth";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

function Events() {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const user = useAuthStore((state) => state.user);

	const fetchEvents = async () => {
		try {
			const response = await api.get("/events");
			console.log("API Response:", response.data.events);
			// Ensure we always set an array
			const eventsData = response.data.events;
			setEvents(eventsData);
		} catch (error) {
			console.error("Failed to fetch events:", error);
			setEvents([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user) {
			fetchEvents();
		}
	}, [user]);
	return (
		<div>
			<Header />
			<div className="max-w-4xl mx-auto mt-10 p-4">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold">Your Events</h2>
					<Button>Add Event</Button>
				</div>

				{loading ? (
					<p>Loading events...</p>
				) : events.length === 0 ? (
					<p>No events yet.</p>
				) : (
					<ul className="space-y-4">
						{events.map((event) => (
							<li
								key={event.id}
								className="p-4 border rounded-lg"
							>
								<h3 className="font-semibold text-lg">{event.title}</h3>
								<p className="text-sm text-gray-600">{event.description}</p>
								<p className="text-sm mt-1">📅 {event.event_date}</p>
								<p className="text-sm mt-1">
									⏰ {event.start_time} - {event.end_time}
								</p>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

export default Events;
