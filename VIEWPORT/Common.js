// load animation 12/11/23
window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  loader.className += "hidden ";
  setTimeout(function () {
    loader.remove();
  }, 1000);
});

// nav button, svg as the toggler 12/11/23
const navbar = document.querySelector("nav");
const navbar_button = document.getElementById("nav-toggle");
const nav_portrait = document.getElementById("portrait-nav")
const nav_landscape = document.getElementById("landscape-nav")

navbar_button.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

// portrait/landscape toggle, might change to accomodate tablets 12/11/23
// window.matchMedia("(orientation: portrait)").addEventListener("change", function (e) {
//   if (e.matches) {
//     nav_portrait.classList.remove("hidden")
//     nav_landscape.classList.add("hidden")
//   } else {
//     nav_landscape.classList.remove("hidden")
//     nav_portrait.classList.add("hidden")
//   }
// });

// scroll to top button 12/11/23
let to_top = document.getElementById("to-top-btn");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    to_top.style.display = "grid";
  } else {
    to_top.style.display = "none";
  }
}

function toTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
