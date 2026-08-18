(function () {
  var floats = Array.prototype.slice.call(document.querySelectorAll('.float-img'));
  if (!floats.length) return;
 
  var content = document.querySelector('.page-content');
  var backLink = document.querySelector('.back-link');
  var footer = document.querySelector('.site-footer');
  var EDGE_MARGIN = 40;   
  var TEXT_BUFFER = 24;   
  var SAMPLES = 250;   
  var resizeTimer;
 
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
 
  function rectDistance(a, b) {
    var dx = Math.max(a.left - b.right, b.left - a.right, 0);
    var dy = Math.max(a.top - b.bottom, b.top - a.bottom, 0);
    return Math.sqrt(dx * dx + dy * dy);
  }
 
  function findSpreadPosition(w, h, textExclusions, placedRects) {
    var maxX = window.innerWidth - w - EDGE_MARGIN;
    var maxY = window.innerHeight - footerHeight() - h - EDGE_MARGIN;
    maxX = Math.max(maxX, EDGE_MARGIN);
    maxY = Math.max(maxY, EDGE_MARGIN);
    var best = null;
    var bestScore = -Infinity;
    for (var i = 0; i < SAMPLES; i++) {
      var x = EDGE_MARGIN + Math.random() * Math.max(maxX - EDGE_MARGIN, 0);
      var y = EDGE_MARGIN + Math.random() * Math.max(maxY - EDGE_MARGIN, 0);
      var rect = { left: x, top: y, right: x + w, bottom: y + h };
      var clearOfText = textExclusions.every(function (ex) {
        return rectsClear(rect, ex, TEXT_BUFFER);
      });
      if (!clearOfText) continue;
      var score;
      if (placedRects.length === 0) {
        score = 0;
      } else {
        score = Infinity;
        for (var j = 0; j < placedRects.length; j++) {
          var d = rectDistance(rect, placedRects[j]);
          if (d < score) score = d;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        best = rect;
      }
    }
    if (!best) {
      
      best = { left: EDGE_MARGIN, top: EDGE_MARGIN, right: EDGE_MARGIN + w, bottom: EDGE_MARGIN + h };
    }
    return { x: best.left, y: best.top };
  }
 
  function placeFloating() {
    if (window.innerWidth <= 900) {
      
      floats.forEach(function (el) {
        el.style.left = '';
        el.style.top = '';
        el.classList.remove('is-positioned');
      });
      return;
    }
    var textExclusions = [];
    if (content) textExclusions.push(content.getBoundingClientRect());
    if (backLink) textExclusions.push(backLink.getBoundingClientRect());
    var placedRects = [];
    floats.forEach(function (el) {
      if (!(el.offsetWidth && el.offsetHeight)) return;
      var pos = findSpreadPosition(el.offsetWidth, el.offsetHeight, textExclusions, placedRects);
      el.style.left = pos.x + 'px';
      el.style.top = pos.y + 'px';
      el.classList.add('is-positioned');
      placedRects.push({
        left: pos.x,
        top: pos.y,
        right: pos.x + el.offsetWidth,
        bottom: pos.y + el.offsetHeight
      });
    });
  }
 
  var loadedCount = 0;
  floats.forEach(function (el) {
    if (el.complete) {
      loadedCount++;
    } else {
      el.addEventListener('load', function () {
        loadedCount++;
        if (loadedCount === floats.length) placeFloating();
      });
    }
  });
  placeFloating();
 
  window.addEventListener('resize', function () {
    if (document.hidden) return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(placeFloating, 150);
  });
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') placeFloating();
  });
 
  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
 
  
  var topZ = 1;
  floats.forEach(function (el) { el.style.zIndex = topZ; });
 
  function makeDraggable(el) {
    var dragging = false;
    var offsetX = 0;
    var offsetY = 0;
    el.addEventListener('pointerdown', function (e) {
      if (window.innerWidth <= 900) return;
      e.preventDefault();
      dragging = true;
      el.classList.add('is-dragging');
      topZ += 1;
      el.style.zIndex = topZ;
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
 
  floats.forEach(makeDraggable);
})();