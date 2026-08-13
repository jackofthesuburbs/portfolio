/* ============================================================
   index.js — homepage-only behaviour:
   - picks one of 11 photos at random on each load
   - floats + drags the photo and audio player (desktop only)
   - runs the little audio player
   ============================================================ */
(function () {
  var img = document.getElementById('float-img');
  var player = document.getElementById('float-player');
  var bio = document.querySelector('.bio');
  var links = document.querySelector('.links');
  var footer = document.querySelector('.site-footer');
  var EDGE_MARGIN = 40;   // never sits snug against the side of the page
  var TEXT_BUFFER = 24;   // never hovers over/right up against text
  var resizeTimer;
 
  // ---- pick one homepage photo at random out of 11 ----
  var HOME_IMAGES = [
    'images/home/gm1.jpg',
    'images/home/gm2.jpg',
    'images/home/gm3.jpg',
    'images/home/gm4.jpg',
    'images/home/gm5.jpg',
    'images/home/gm6.jpg',
    'images/home/gm7.jpg',
    'images/home/gm8.jpg',
    'images/home/gm9.jpg',
    'images/home/gm11.jpg',
  ];
  img.src = HOME_IMAGES[Math.floor(Math.random() * HOME_IMAGES.length)];
 
  function footerHeight() {
    return footer ? footer.offsetHeight : 0;
  }
  function rectsClear(a, b, buffer) {
    return (
      a.right + buffer < b.left ||
      a.left - buffer > b.right ||
      a.bottom + buffer < b.top ||
      a.top - buffer > b.bottom
    );
  }
 
  function findPosition(w, h, exclusions) {
    var maxX = window.innerWidth - w - EDGE_MARGIN;
    var maxY = window.innerHeight - footerHeight() - h - EDGE_MARGIN;
    if (maxX <= EDGE_MARGIN || maxY <= EDGE_MARGIN) return null;
    var x, y, candidate, tries = 0;
    var found = false;
    while (tries < 80 && !found) {
      x = EDGE_MARGIN + Math.random() * (maxX - EDGE_MARGIN);
      y = EDGE_MARGIN + Math.random() * (maxY - EDGE_MARGIN);
      candidate = { left: x, right: x + w, top: y, bottom: y + h };
      found = exclusions.every(function (rect) {
        return rectsClear(candidate, rect, TEXT_BUFFER);
      });
      tries++;
    }
    if (!found) {
      x = maxX;
      y = EDGE_MARGIN;
    }
    return { x: x, y: y };
  }
  function placeFloating() {
    if (window.innerWidth <= 900) {
      [img, player].forEach(function (el) {
        el.style.left = '';
        el.style.top = '';
      });
      return;
    }
    var bioRect = bio.getBoundingClientRect();
    var linksRect = links.getBoundingClientRect();
    if (img.offsetWidth && img.offsetHeight) {
      var imgPos = findPosition(img.offsetWidth, img.offsetHeight, [bioRect, linksRect]);
      if (imgPos) {
        img.style.left = imgPos.x + 'px';
        img.style.top = imgPos.y + 'px';
        img.classList.add('is-positioned');
      }
    }
    var imgRect = img.getBoundingClientRect();
    if (player.offsetWidth && player.offsetHeight) {
      var playerPos = findPosition(player.offsetWidth, player.offsetHeight, [bioRect, linksRect, imgRect]);
      if (playerPos) {
        player.style.left = playerPos.x + 'px';
        player.style.top = playerPos.y + 'px';
        player.classList.add('is-positioned');
      }
    }
  }
  if (img.complete) {
    placeFloating();
  } else {
    img.addEventListener('load', placeFloating);
  }
  window.addEventListener('resize', function () {
    if (document.hidden) return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(placeFloating, 150);
  });
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
      placeFloating();
    }
  });
  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
  function makeDraggable(el, ignoreSelector) {
    var dragging = false;
    var offsetX = 0;
    var offsetY = 0;
    el.addEventListener('pointerdown', function (e) {
      if (window.innerWidth <= 900) return;
      if (ignoreSelector && e.target.closest(ignoreSelector)) return;
      e.preventDefault();
      dragging = true;
      el.classList.add('is-dragging');
      el.setPointerCapture(e.pointerId);
      var rect = el.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
    });
    el.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var w = el.offsetWidth;
      var h = el.offsetHeight;
      var x = clamp(e.clientX - offsetX, 0, window.innerWidth - w);
      var y = clamp(e.clientY - offsetY, 0, window.innerHeight - footerHeight() - h);
      el.style.left = x + 'px';
      el.style.top = y + 'px';
    });
    function stopDragging(e) {
      if (!dragging) return;
      dragging = false;
      el.classList.remove('is-dragging');
      if (el.hasPointerCapture(e.pointerId)) {
        el.releasePointerCapture(e.pointerId);
      }
    }
    el.addEventListener('pointerup', stopDragging);
    el.addEventListener('pointercancel', stopDragging);
  }
  makeDraggable(img);
  makeDraggable(player, 'button, .ap-scrub');
 
  // ---- audio player ----
  var AUDIO_FILES = [
    'audio/18 Kensington Avenue.mp3',
    'audio/33 Clytha Park Road.mp3',
    'audio/A49.mp3',
    'audio/Castle Meadows.mp3',
    'audio/Cheltenham Spa Station.mp3',
    'audio/Dominoo Pizza.mp3',
    'audio/it is all this.mp3',
    'audio/itgoeslikethis.mp3',
    'audio/nr37.mp3',
    'audio/Regent St.mp3',
    'audio/take a break.mp3',
    'audio/Wita Stwosza 2.mp3',
    'audio/Ebenezer Main Road 10.mp3',
  ];
  var audioEl = document.getElementById('ap-audio');
  var playBtn = document.getElementById('ap-play');
  var prevBtn = document.getElementById('ap-prev');
  var nextBtn = document.getElementById('ap-next');
  var scrubBar = document.getElementById('ap-scrub');
  var scrubFill = document.getElementById('ap-scrub-fill');
  var apTimeEl = document.getElementById('ap-time');
  var filenameEl = document.getElementById('ap-filename');
  var currentTrack;
  function formatTime(seconds) {
    if (!isFinite(seconds) || seconds < 0) return '0:00';
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return m + ':' + s;
  }
  function updateApTime() {
    apTimeEl.textContent = formatTime(audioEl.currentTime) + ' / ' + formatTime(audioEl.duration);
  }
  function updateFilenameLabel() {
    filenameEl.textContent = AUDIO_FILES[currentTrack].split('/').pop();
  }
  function loadTrack(index, autoplay) {
    currentTrack = (index + AUDIO_FILES.length) % AUDIO_FILES.length;
    audioEl.src = AUDIO_FILES[currentTrack];
    scrubFill.style.width = '0%';
    updateApTime();
    updateFilenameLabel();
    if (autoplay) audioEl.play();
  }
  playBtn.addEventListener('click', function () {
    if (audioEl.paused) {
      audioEl.play();
    } else {
      audioEl.pause();
    }
  });
  prevBtn.addEventListener('click', function () { loadTrack(currentTrack - 1, true); });
  nextBtn.addEventListener('click', function () { loadTrack(currentTrack + 1, true); });
  audioEl.addEventListener('play', function () { playBtn.textContent = '❚❚'; });
  audioEl.addEventListener('pause', function () { playBtn.textContent = '▶'; });
  audioEl.addEventListener('ended', function () { loadTrack(currentTrack + 1, true); });
  audioEl.addEventListener('loadedmetadata', updateApTime);
  audioEl.addEventListener('timeupdate', function () {
    updateApTime();
    if (audioEl.duration) {
      scrubFill.style.width = (audioEl.currentTime / audioEl.duration) * 100 + '%';
    }
  });
  scrubBar.addEventListener('click', function (e) {
    var rect = scrubBar.getBoundingClientRect();
    var ratio = (e.clientX - rect.left) / rect.width;
    if (audioEl.duration) audioEl.currentTime = ratio * audioEl.duration;
  });
  loadTrack(Math.floor(Math.random() * AUDIO_FILES.length), false);
})();