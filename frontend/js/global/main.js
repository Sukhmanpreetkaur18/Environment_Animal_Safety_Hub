// Live Clock Update Function
function updateClock() {
    const now = new Date();

    // Get hours, minutes, and seconds
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Add leading zeros if needed
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // Format time string
    const timeString = `${hours}:${minutes}:${seconds}`;

    // Update the clock element
    const clockElement = document.getElementById('clock-time');
    if (clockElement) {
        clockElement.textContent = timeString;
    }
}

// Update clock immediately on page load
updateClock();

// Update clock every second
setInterval(updateClock, 1000);
