/**
 * Formats time from HH:mm:ss to HH:mm format
 * @param {string} timeString - Time string in HH:mm:ss format
 * @returns {string} Time string in HH:mm format
 */
export const formatTimeForBackend = (timeString) => {
	if (!timeString) return "";
	return timeString.slice(0, 5); // Remove seconds (HH:mm:ss -> HH:mm)
};

/**
 * Formats form data for backend submission
 * @param {Object} formData - Form data object
 * @returns {Object} Formatted form data with proper time format
 */
export const formatFormForBackend = (formData) => {
	return {
		...formData,
		start_time: formatTimeForBackend(formData.start_time),
		end_time: formatTimeForBackend(formData.end_time),
	};
};

/**
 * Formats time from HH:mm to HH:mm:ss format (for frontend display)
 * @param {string} timeString - Time string in HH:mm format
 * @returns {string} Time string in HH:mm:ss format
 */
export const formatTimeForFrontend = (timeString) => {
	if (!timeString) return "";
	// If already has seconds, return as is
	if (timeString.length > 5) return timeString;
	// Add :00 seconds if missing
	return `${timeString}:00`;
};

/**
 * Calculates time remaining until event starts
 * @param {string} eventDate - Event date in YYYY-MM-DD format
 * @param {string} startTime - Event start time in HH:mm format
 * @returns {string} Human-readable time remaining string
 */
export const getTimeUntilEvent = (eventDate, startTime) => {
	const now = new Date();
	const eventDateTime = new Date(`${eventDate}T${startTime}`);
	const diffInMs = eventDateTime - now;

	// Convert to different units
	const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
	const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
	const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

	if (diffInDays > 0) {
		return `in ${diffInDays} ${diffInDays === 1 ? "day" : "days"}`;
	} else if (diffInHours > 0) {
		return `in ${diffInHours} ${diffInHours === 1 ? "hour" : "hours"}`;
	} else if (diffInMinutes > 0) {
		return `in ${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"}`;
	} else {
		return "starting soon";
	}
};
