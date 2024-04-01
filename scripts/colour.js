document.addEventListener('DOMContentLoaded', () => {
  const colors = ['#fc9403', '#f0b159', '#f0d046', '#8eeb15', '#b7f06c', '#4aab3f', '#28ed53']; // Example colors for state 1
  const blueColors = ['#3d7ff2', '#064ec9', '#77a6f7', '#27d4f2']; // Blue colors for state 3
  const toggleButton = document.getElementById('toggleEffect'); // Access the toggle button

  // Function to randomly select a color from the provided list
  const getRandomColor = (colorList) => colorList[Math.floor(Math.random() * colorList.length)];

  let toggleState = 0; // 0: Off, 1: Random Colors, 2: Blue Shades

  // Function to apply color based on the toggle state
  function applyColor() {
    document.querySelectorAll('.grid-item span > span').forEach(span => {
      const colorList = toggleState === 2 ? blueColors : colors; // Decide which color list to use
      span.style.color = getRandomColor(colorList); // Apply color from the chosen list
    });
  }

  // Toggle button listener to cycle through the three states
  toggleButton.addEventListener('click', () => {
    toggleState = (toggleState + 1) % 3; // Cycle through states 0, 1, 2
    toggleButton.textContent = toggleState === 0 ? '☁️' : toggleState === 1 ? '☀️' : '🌧';

    if (toggleState === 0) {
      document.querySelectorAll('.grid-item span > span').forEach(span => {
        span.style.color = '#FFF8E7'; // Default color
        span.style.transform = 'scale(1)'; // Reset scaling
      });
    } else {
      applyColor();
    }
  });

  document.querySelectorAll('.grid-item').forEach(element => {
    Array.from(element.childNodes).forEach(node => {
      if (node.nodeType === 3 && node.nodeValue.trim().length > 0) {
        let words = node.nodeValue.split(/\s+/);
        let spanWrapper = document.createElement('span');
        words.forEach((word, index) => {
          let colorSpan = document.createElement('span');
          colorSpan.textContent = word + (index < words.length - 1 ? ' ' : '');
          spanWrapper.appendChild(colorSpan);
        });
        node.parentNode.replaceChild(spanWrapper, node);
      }
    });

    // Modify here to also change color of adjacent words
    Array.from(element.querySelectorAll('span > span')).forEach((span, index, spans) => {
      span.style.transition = 'transform 0.3s ease, color 0.3s ease';

      span.addEventListener('mouseenter', () => {
        if (toggleState === 0) return; // Do nothing if the script is off
        const colorList = toggleState === 2 ? blueColors : colors;
        span.style.transform = 'scale(1.2)';
        // Apply color to the hovered word and two words on each side
        [index - 2, index - 1, index, index + 1, index + 2].forEach(i => {
          if (i >= 0 && i < spans.length) {
            spans[i].style.color = getRandomColor(colorList);
          }
        });
      });

      span.addEventListener('mouseleave', () => {
        span.style.transform = 'scale(1)';
      });
    });
  });
});
