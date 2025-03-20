const TRANSLIMIT_IN_MINUTES = import.meta.env.VITE_TRANSLIMIT_IN_MINUTES; // Total transcription limit in minutes
const SECONDS_IN_MINUTE = import.meta.env.VITE_SECONDS_IN_MINUTE;

const TRANSLIMIT_IN_SECONDS = TRANSLIMIT_IN_MINUTES * SECONDS_IN_MINUTE;

/**
 * Checks if the transcription limit is exceeded.
 * @param totalUsedSeconds - Total seconds used 
 * @param currentSessionSeconds - Seconds used in the current live transcription session.
 * @returns `true` if the limit is exceeded, `false` otherwise.
 */
function hasExceededLimit(
  totalUsedSeconds: number,
  currentSessionSeconds: number
): boolean {
    const totalUsed = totalUsedSeconds + currentSessionSeconds;    
  return totalUsed >= TRANSLIMIT_IN_SECONDS;
}

/**
 * Checks if the remaining time minus the live transcription time is less than or equal to 5 minutes (300 seconds).
 * 
 * @param remainingSeconds - The remaining transcription time in seconds.
 * @param liveTranscriptionSeconds - The current live transcription duration in seconds.
 * @returns {boolean} - Returns true if the remaining time minus the live transcription time is less than or equal to 5 minutes, false otherwise.
 */
 const isLimitThresholdReached = (
  remainingSeconds: number,
  liveTranscriptionSeconds: number
): boolean => {
  const fiveMinutesInSeconds = 5 * 60;
  const adjustedRemainingSeconds = remainingSeconds - liveTranscriptionSeconds;
  return adjustedRemainingSeconds <= fiveMinutesInSeconds;
};

export { hasExceededLimit,isLimitThresholdReached};
  
  
