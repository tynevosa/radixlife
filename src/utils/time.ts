export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600); // Get the hours
  const minutes = Math.floor((seconds % 3600) / 60); // Get the minutes
  const remainingSeconds = seconds % 60; // Get the remaining seconds

  // Format the time to always have two digits (e.g., 04 instead of 4)
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}