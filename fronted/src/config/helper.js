export default function timeAgo(timestamp) {
    if (!timestamp) return "Invalid timestamp"; // Handle undefined or null values

    const now = new Date();
    const past = new Date(timestamp);

    // Ensure the timestamp is valid
    if (isNaN(past.getTime())) return "Invalid timestamp";

    const secondsAgo = Math.floor((now - past) / 1000);

    if (secondsAgo < 60) {
        return `${secondsAgo} second${secondsAgo === 1 ? '' : 's'} ago`;
    } else if (secondsAgo < 3600) { // 60 seconds * 60 minutes = 3600 seconds
        const minutes = Math.floor(secondsAgo / 60);
        return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (secondsAgo < 86400) { // 3600 seconds * 24 hours = 86400 seconds
        const hours = Math.floor(secondsAgo / 3600);
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (secondsAgo < 2592000) { // 86400 seconds * 30 days = 2592000 seconds
        const days = Math.floor(secondsAgo / 86400);
        return `${days} day${days === 1 ? '' : 's'} ago`;
    } else {
        const months = Math.floor(secondsAgo / 2592000); // Approximate months
        return `${months} month${months === 1 ? '' : 's'} ago`;
    }
}
