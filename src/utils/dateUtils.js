/**
 * Get the current date in local timezone as YYYY-MM-DD format
 * @returns {string} Current date in YYYY-MM-DD format
 */
export const getCurrentLocalDate = () => {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, "0");
	const day = String(now.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};

/**
 * Get the current time in HH:MM format
 * @returns {string} Current time in HH:MM format
 */
export const getCurrentLocalTime = () => {
	const now = new Date();
	return now.toTimeString().split(" ")[0].substring(0, 5);
};

/**
 * Convert time string to minutes for easier comparison
 * @param {string} timeString - Time in HH:MM format
 * @returns {number} Time converted to minutes
 */
export const timeToMinutes = (timeString) => {
	const [hours, minutes] = timeString.split(":").map(Number);
	return hours * 60 + minutes;
};

/**
 * Check if an event is currently happening
 * @param {Object} event - Event object with event_date, start_time, and end_time
 * @returns {boolean} True if event is happening now
 */
export const isEventHappeningNow = (event) => {
	const currentDate = getCurrentLocalDate();
	const currentTime = getCurrentLocalTime();

	if (event.event_date === currentDate) {
		const currentMinutes = timeToMinutes(currentTime);
		const startMinutes = timeToMinutes(event.start_time);
		const endMinutes = timeToMinutes(event.end_time);

		return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
	}

	return false;
};

/**
 * Find the current event that is happening now from a list of events
 * @param {Array} events - Array of event objects
 * @returns {Object|null} Current event or null if none found
 */
export const findCurrentEvent = (events) => {
	return events.find((event) => isEventHappeningNow(event)) || null;
};
