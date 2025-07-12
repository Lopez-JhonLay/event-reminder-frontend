import { useState, useEffect } from "react";

import api from "@/api/axios";
import { formatFormForBackend, getTimeUntilEvent } from "@/utils/timeUtils";

import useAuthStore from "@/store/auth";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";

function Events() {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [open, setOpen] = useState(false);
	const [form, setForm] = useState({
		title: "",
		description: "",
		event_date: "",
		start_time: "",
		end_time: "",
		location: "",
	});
	const [editingEvent, setEditingEvent] = useState(null);

	const user = useAuthStore((state) => state.user);

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleAddEvent = async (e) => {
		e.preventDefault();
		setLoading(true);

		// Format time fields to match backend validation (H:i format)
		const formattedForm = formatFormForBackend(form);

		console.log("Form data being sent:", formattedForm);
		try {
			if (editingEvent) {
				await api.patch(`/events/${editingEvent.id}`, formattedForm);
				console.log("Event updated:", formattedForm);
			} else {
				await api.post("/events", formattedForm);
				console.log("Event created:", formattedForm);
			}
			setForm({
				title: "",
				description: "",
				event_date: "",
				start_time: "",
				end_time: "",
				location: "",
			});
			setEditingEvent(null);
			setOpen(false);
			fetchEvents();
		} catch (error) {
			console.log(form);
			console.error("Failed to save event:", error);
		} finally {
			setLoading(false);
		}
	};

	const openEditModal = (event) => {
		setEditingEvent(event);
		setForm({
			title: event.title,
			description: event.description,
			event_date: event.event_date,
			start_time: event.start_time,
			end_time: event.end_time,
			location: event.location,
		});
		setOpen(true);
	};

	const handleDelete = async (eventId) => {
		if (!confirm("Are you sure you want to delete this event?")) return;
		setLoading(true);
		try {
			await api.delete(`/events/${eventId}`);
			console.log("Event deleted:", eventId);
			fetchEvents();
		} catch (error) {
			console.error("Failed to delete event:", error);
		} finally {
			setLoading(false);
		}
	};

	const fetchEvents = async () => {
		try {
			setLoading(true);
			const response = await api.get("/events");
			console.log("API Response:", response.data.events);
			// Ensure we always set an array
			const eventsData = response.data.events;

			// Filter for upcoming events only
			const now = new Date();

			const upcomingEvents = eventsData.filter((event) => {
				const eventStartDateTime = new Date(
					`${event.event_date}T${event.start_time}`
				);

				// Include only if event hasn't started yet
				return eventStartDateTime > now;
			});

			// Sort upcoming events by date and time (earliest first)
			upcomingEvents.sort((a, b) => {
				const dateTimeA = new Date(`${a.event_date}T${a.start_time}`);
				const dateTimeB = new Date(`${b.event_date}T${b.start_time}`);
				return dateTimeA - dateTimeB;
			});

			setEvents(upcomingEvents);
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
					<h2 className="text-xl font-semibold">Your Upcoming Events</h2>
					<Dialog
						open={open}
						onOpenChange={(isOpen) => {
							setOpen(isOpen);
							if (!isOpen) {
								setEditingEvent(null);
								setForm({
									title: "",
									description: "",
									event_date: "",
									start_time: "",
									end_time: "",
									location: "",
								});
							}
						}}
					>
						<DialogTrigger asChild>
							<Button size="sm">Add Event</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>
									{editingEvent ? "Edit Event" : "Create New Event"}
								</DialogTitle>
							</DialogHeader>
							<form
								onSubmit={handleAddEvent}
								className="space-y-4 mt-4"
							>
								<Input
									name="title"
									value={form.title}
									onChange={handleChange}
									placeholder="Title"
									required
								/>
								<Textarea
									name="description"
									value={form.description}
									onChange={handleChange}
									required
									placeholder="Description"
								/>
								<Input
									type="date"
									name="event_date"
									value={form.event_date}
									onChange={handleChange}
									required
								/>
								<Input
									type="time"
									name="start_time"
									value={form.start_time}
									onChange={handleChange}
									required
								/>
								<Input
									type="time"
									name="end_time"
									value={form.end_time}
									onChange={handleChange}
									required
								/>
								<Input
									name="location"
									value={form.location}
									onChange={handleChange}
									required
									placeholder="Location"
								/>
								{editingEvent ? (
									<Button
										type="submit"
										className="w-full"
									>
										{loading ? "Updating..." : "Update Event"}
									</Button>
								) : (
									<Button
										type="submit"
										className="w-full"
									>
										{loading ? "Creating..." : "Create Event"}
									</Button>
								)}
							</form>
						</DialogContent>
					</Dialog>
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
								<div className="flex justify-between items-start">
									<div className="flex-1">
										<div className="flex items-center gap-2 mb-1">
											<h3 className="font-semibold text-lg">{event.title}</h3>
											<span className="text-sm text-green-600 font-medium">
												({getTimeUntilEvent(event.event_date, event.start_time)}
												)
											</span>
										</div>
										<p className="text-sm text-gray-600 mt-1">
											{event.description}
										</p>
										<p className="text-sm mt-2">📅 {event.event_date}</p>
										<p className="text-sm mt-1">
											⏰ {event.start_time} - {event.end_time}
										</p>
										<p className="text-sm mt-1">📍 {event.location}</p>
									</div>

									{/* Buttons positioned on the right */}
									<div className="flex gap-2 ml-4">
										<Button
											variant="outline"
											size="sm"
											onClick={() => openEditModal(event)}
										>
											Edit
										</Button>
										<Button
											variant="destructive"
											size="sm"
											onClick={() => handleDelete(event.id)}
										>
											Delete
										</Button>
									</div>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

export default Events;
