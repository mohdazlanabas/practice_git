const locationEl = document.getElementById('footer-location');
const dateTimeEl = document.getElementById('footer-datetime');

function formatDateTime(date) {
  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return date.toLocaleString(undefined, options);
}

function updateClock() {
  dateTimeEl.textContent = `Time: ${formatDateTime(new Date())}`;
}

function setLocationText(text) {
  locationEl.textContent = `Location: ${text}`;
}

function fetchLocation() {
  if (!navigator.geolocation) {
    setLocationText('Not supported by this browser');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const { latitude, longitude } = coords;
      const lat = latitude.toFixed(3);
      const lng = longitude.toFixed(3);
      setLocationText(`Lat ${lat}, Lng ${lng}`);
    },
    (error) => {
      if (error.code === error.PERMISSION_DENIED) {
        setLocationText('Permission denied');
      } else {
        setLocationText('Unavailable');
      }
    }
  );
}

updateClock();
setInterval(updateClock, 1000 * 30);
fetchLocation();
