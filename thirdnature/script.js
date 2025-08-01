// Get today's date
const d = new Date();
const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
const day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(d);
const weekday = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(d);

document.querySelector('.time').innerText = `${weekday} ${month} ${day}, ${year}`;
