(function () {
  var timeEl = document.getElementById('footer-time');
  if (!timeEl) return;
 
  function updateFooterTime() {
    var now = new Date();
    var datePart = now.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    var timePart = now.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
    timeEl.textContent = datePart.toLowerCase() + ' · ' + timePart;
  }
 
  updateFooterTime();
  setInterval(updateFooterTime, 1000);
})();