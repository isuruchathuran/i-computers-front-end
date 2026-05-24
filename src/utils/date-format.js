export default function getFormattedDate(timestamp) {
    const date = new Date(timestamp);

    const day = date.getDate();
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const month = date.toLocaleDateString("en-US", { month: "long" });

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHour = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");

    const getOrdinal = (n) => {
        if (n > 3 && n < 21) return "th";
        switch (n % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };

    return `${day}${getOrdinal(day)} ${dayName} of ${month} ${formattedHour}.${formattedMinutes} ${ampm}`;
}