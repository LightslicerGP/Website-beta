

// inject navbar and to-top button 6.4.25
injectElements();


// load animation 12.11.23
window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  loader.classList.add("remove");
  setTimeout(function () {
    loader.remove();
  }, 1000);
});

// nav button, svg as the toggler 12.11.23
const navbar = document.querySelector("nav");
const navbar_button = document.getElementById("nav-toggle");
const nav_portrait = document.getElementById("portrait-nav");
// const nav_landscape = document.getElementById("landscape-nav");

navbar_button.addEventListener("click", () => {
  navbar.classList.toggle("active");

  to_top.style.bottom = nav_portrait.offsetHeight + parseInt(getComputedStyle(document.documentElement).getPropertyValue("--margin")) * 2 + "px";
});

// portrait/landscape toggle, might change to accomodate tablets 12.11.23
// window.matchMedia("(orientation: portrait)").addEventListener("change", function (e) {
//   if (e.matches) {
//     nav_portrait.classList.remove("hidden")
//     nav_landscape.classList.add("hidden")
//   } else {
//     nav_landscape.classList.remove("hidden")
//     nav_portrait.classList.add("hidden")
//   }
// });

// scroll to top button 12.11.23
let to_top = document.getElementById("to-top-btn");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    to_top.style.display = "grid";
    if (getComputedStyle(document.documentElement).getPropertyValue("--columns") === "4") {
      to_top.style.bottom = nav_portrait.offsetHeight + parseInt(getComputedStyle(document.documentElement).getPropertyValue("--margin")) * 2 + "px";
    }
  } else {
    to_top.style.display = "none";
    to_top.style.bottom = "";
  }
}

function toTop() {
  // document.documentElement.classList.remove('lenis-scrolling');
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// smoothscrolling 5.24.24 from https://kontra.agency/smooth-scroll-the-setup-for-beginners/
(function () {
  "use strict";

  const smoothScroll = new Lenis();

  function raf(time) {
    smoothScroll.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  smoothScroll.on("scroll", (event) => {
    // console.log(event);
  });

  const goToTop = document.querySelector("a.go-to-top");
  if (goToTop) {
    goToTop.addEventListener("click", (event) => {
      // console.log(event);
      event.preventDefault();

      // Works
      //window.scrollTo({
      //	top: 0,
      //	behavior: 'smooth'
      //});

      // Lenis
      smoothScroll.scrollTo(0, {
        duration: 1,
      });
    });
  }
})();

// mabye make this a general function that attacks .ImgReplace classed images? 6.5.25
document.querySelectorAll(".iconRaw").forEach((icon) => {
  icon.addEventListener("click", () => {
    // console.log("Icon clicked:", icon.src);
    window.open(icon.src.replace("/images/", "/images_raw/").replace(".webp", ".png"), "_self");
  });
});