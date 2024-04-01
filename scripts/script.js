console.log("hi");

// Back to top show or hide depending on page height

window.addEventListener("load", function () {
  function checkScroll() {
    var bodyHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );

    var viewportHeight = window.innerHeight;

    // If body height is greater than viewport height, show the back-to-top button
    if (bodyHeight > viewportHeight) {
      document.getElementById("back-to-top").style.display = "flex";
    }
    // Otherwise, hide the back-to-top button and add class to footer
    else {
      document.getElementById("back-to-top").style.display = "none";
      document.getElementById("official-footer").classList.add("bottom");
    }
  }

  // Check on page load
  checkScroll();

  // Check when the window is resized
  window.addEventListener("resize", checkScroll);
});

// window.addEventListener('DOMContentLoaded', function() {
//   // Get the height of the body and the viewport
//   var bodyHeight = Math.max(
//       document.body.scrollHeight,
//       document.body.offsetHeight,
//       document.documentElement.clientHeight,
//       document.documentElement.scrollHeight,
//       document.documentElement.offsetHeight
//   );
//   console.log("bodyheight: " + bodyHeight);
//   var viewportHeight = window.innerHeight;
//   console.log("viewportheight: " + viewportHeight);

//   // If body height is greater than viewport height, show the back-to-top button
//   if (bodyHeight > viewportHeight) {
//       document.getElementById('back-to-top').style.display = 'flex';
//   }

//   // Otherwise, hide the back-to-top button and add class to footer
//   else {
//       document.getElementById('back-to-top').style.display = 'none';
//       document.querySelector('footer').classList.add('bottom');
//   }
// });

// Function to get the current date in the format "February 8, 2024"
function getCurrentDate() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  return `${month} ${day}, ${year}`;
}

// Update the content of the div with id "todays-date"
document.getElementById("todays-date").textContent = getCurrentDate();

// Get the elements
const todaysDateElement = document.getElementById("todays-date");
// const updatedDateElement = document.getElementById("last-updated-date");
const onElement = document.getElementById("on");

// Compare the text content
// if (todaysDateElement.textContent === updatedDateElement.textContent) {
//   updatedDateElement.textContent = "earlier today";
//   onElement.textContent = ""; // Clear content of the "on" element
// }

$(function () {
  // $('#menu-click').click(function(){
  //     $('#menu-itself').toggle();
  // });

  $("#menu-click").click(function () {
    var menuClick = $(this);
    var menuItself = $("#menu-itself");
    var homeLink = $("a#home");
    var regularContent = $("#regular-content");
    var containerEverything = $("#container-everything");

    if (menuClick.text() === "☰") {
      menuClick.text("×");
      //   $("nav#top-right").css("position", "fixed");
      menuItself.show();
      homeLink.hide();
      regularContent.addClass("menu-open");
      containerEverything.addClass("menu-open");
    } else {
      menuClick.text("☰");
      //   $("nav#top-right").css("position", "absolute");
      menuItself.hide();
      homeLink.show();
      regularContent.removeClass("menu-open");
      containerEverything.removeClass("menu-open");
    }
  });
});
