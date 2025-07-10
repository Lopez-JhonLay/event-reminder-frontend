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
