fadeInOffset = {
  viewOffset: {
    bottom: 64,
  },
};

const textMapping = {
  300: "mobile small",
  380: "mobile medium",
  400: "mobile large",
  700: "tablet small",
  800: "tablet medium",
  900: "tablet large",
  950: "desktop small",
  1500: "desktop medium",
  2000: "desktop large",
  2500: "desktop extra-large",
};

function updateTextBasedOnWidth() {
  const pElement = document.getElementById("temp-responsive");
  const width = window.innerWidth;

  let newText = "not in json: " + width + "px";
  for (let key in textMapping) {
    if (width >= key) {
      newText = textMapping[key] + " " + key;
    }
  }
  pElement.textContent = newText;
}

window.addEventListener("resize", updateTextBasedOnWidth);

updateTextBasedOnWidth();

// section 1

ScrollReveal().reveal("#s1Text", fadeInOffset);

// section 2

ScrollReveal().reveal("#s2LiveData", fadeInOffset);

ScrollReveal().reveal("#s2SubLiveData", fadeInOffset);
// document.getElementById("s2SubLiveData").style.backgroundSize = `${window.screen.height}px`;

ScrollReveal().reveal("#s2Summary", fadeInOffset);

/*
const youtubeKey = 'AIzaSyALqIoHfT_TGIAm3cGfblgX2F0PmtqRxuA'
const youtubeUser = 'UCiGIp50poRZRIAuRt604uRg'
*/

let getYTInfo = () => {
  fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCiGIp50poRZRIAuRt604uRg&key=AIzaSyALqIoHfT_TGIAm3cGfblgX2F0PmtqRxuA`)
    .then((response) => {
      return response.json();
    })
    // .then((data) => {
    //   // console.log(data);
    //   document.getElementById("subcount").textContent = data.items[0].statistics.subscriberCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //   document.getElementById("viewcount").textContent = data.items[0].statistics.viewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //   document.getElementById("videocount").textContent = data.items[0].statistics.videoCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // });
    .then((data) => {
      const stats = data.items[0].statistics;
      animateCountUp(document.getElementById("s2SubCount"), parseInt(stats.subscriberCount, 10));
      animateCountUp(document.getElementById("s2ViewCount"), parseInt(stats.viewCount, 10));
      animateCountUp(document.getElementById("s2VideoCount"), parseInt(stats.videoCount, 10));
    })
    .catch((error) => {
      console.error("Error fetching YouTube data:", error);
      document.getElementById("s2SubCount").textContent = "N/A";
      document.getElementById("s2ViewCount").textContent = "N/A";
      document.getElementById("s2VideoCount").textContent = "N/A";
    });
};

document.addEventListener("DOMContentLoaded", () => {
  const target = document.getElementById("s2SubLiveData");

  if (!target) return;

  const observerOptions = {
    root: null, // Use the viewport as the root
    threshold: 0.8, // Trigger when 50% of the element is visible
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        getYTInfo();
        observer.unobserve(entry.target); // Stop observing after triggering
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  observer.observe(target);
});

// add some digit rolling thing

function animateCountUp(element, targetValue, duration = 1000) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuint(progress);
    const currentValue = Math.floor(easedProgress * targetValue);
    element.textContent = currentValue.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function easeOutQuint(t) {
  return 1 - Math.pow(1 - t, 7);
}

// section 3

function section3Height() {
  document.documentElement.style.setProperty("--vertical-offset", `0px`);
  document.documentElement.style.setProperty("--vertical-total-height", `0px`);

  const textboxheight = document.querySelector("#s3Text").offsetHeight;
  const imageHeight = (200 / 300) * window.innerWidth;

  // console.log(textboxheight + " " + imageHeight + " " + window.innerWidth);

  document.documentElement.style.setProperty("--vertical-offset", `${textboxheight + 32}px`);
  document.documentElement.style.setProperty("--vertical-total-height", `${textboxheight + 32 + imageHeight}px`);
}

window.addEventListener("resize", section3Height);
window.addEventListener("DOMContentLoaded", section3Height);

updateTextBasedOnWidth();

ScrollReveal().reveal("#s3Text", fadeInOffset);

ScrollReveal().reveal("#s3Image", fadeInOffset);

// section 4

var flkty = new Flickity("#s4Carousel", {
  cellAlign: "center",
  contain: true,
  prevNextButtons: false,
  pageDots: false,
  wrapAround: true,
  selectedAttraction: 0.01,
  friction: 0.15,
  autoPlay: true,
});

flkty.on("change", function (index) {
  // console.log("Current slide index:", index);
  mcItemTitle = document.getElementById("s4Title");
  mcItemDescription = document.getElementById("s4Description");

  mcItemTitle.classList.add("s4CarouselItemFade");
  mcItemDescription.classList.add("s4CarouselItemFade");

  setTimeout(() => {
    switch (index) {
      case 0:
        mcItemTitle.textContent = "SimplyCubed";
        mcItemDescription.textContent = "A simple texture pack that gets straight to the point.";
        break;
      case 1:
        mcItemTitle.textContent = "SimplySurvival";
        mcItemDescription.textContent = "A minimalist world with a focus on creativity in survival.";
        break;
      case 2:
        mcItemTitle.textContent = "SimplySkin";
        mcItemDescription.textContent = "A clean showcase of all of Minecraft's new official skins.";
        break;
    }

    mcItemTitle.classList.remove("s4CarouselItemFade");
    mcItemDescription.classList.remove("s4CarouselItemFade");
  }, 300); // Match this with the CSS transition duration
});

ScrollReveal().reveal("#s4Title", fadeInOffset);

ScrollReveal().reveal("#s4Description", fadeInOffset);

// section 5

var flkty2 = new Flickity("#s5Carousel", {
  // cellAlign: "center",
  // contain: false,
  // prevNextButtons: false,
  // pageDots: false,
  // wrapAround: true,
  // freeScroll: true,
  // autoPlay: 5000,

  cellAlign: "center",
  prevNextButtons: false,
  pageDots: false,
  wrapAround: true,
  freeScroll: true,
  freeScrollFriction: 0.001,
  autoPlay: true,
  // lazyLoad: true,
  // lazyLoadEager: 2,
});

// mabye make this a general function that attacks .ImgReplace classed images? 6.5.25
document.querySelectorAll(".s5Icon").forEach((icon) => {
  icon.addEventListener("click", () => {
    // console.log("Icon clicked:", icon.src);
    window.open(icon.src.replace("/images/", "/images_raw/").replace(".webp", ".png"), "_self");
  });
});

ScrollReveal().reveal(".s5Description");
