// Wrap everything in a DOMContentLoaded event to ensure proper loading
document.addEventListener("DOMContentLoaded", function () {
  // CUSTOM CURSOR CLASS
  class CustomCursor {
    constructor() {
      this.delay = 8;
      this._x = 0;
      this._y = 0;
      this.endX = window.innerWidth / 2;
      this.endY = window.innerHeight / 2;
      this.cursorVisible = true;
      this.cursorEnlarged = false;

      this.$dot = document.querySelector(".cursor-dot");
      this.$outline = document.querySelector(".cursor-dot-outline");

      this.dotSize = this.$dot.offsetWidth;
      this.outlineSize = this.$outline.offsetWidth;

      this.init();
    }

    init() {
      this.setupEventListeners();
      this.animateDotOutline();
    }

    setupEventListeners() {
      // Hover on links
      document.querySelectorAll("a").forEach((el) => {
        el.addEventListener("mouseover", () => {
          this.cursorEnlarged = true;
          this.toggleCursorSize();
        });
        el.addEventListener("mouseout", () => {
          this.cursorEnlarged = false;
          this.toggleCursorSize();
        });
      });

      // Mouse click
      document.addEventListener("mousedown", () => {
        this.cursorEnlarged = true;
        this.toggleCursorSize();
      });
      document.addEventListener("mouseup", () => {
        this.cursorEnlarged = false;
        this.toggleCursorSize();
      });

      // Mouse move
      document.addEventListener("mousemove", (e) => {
        this.cursorVisible = true;
        this.toggleCursorVisibility();

        this.endX = e.pageX;
        this.endY = e.pageY;

        this.$dot.style.top = `${this.endY}px`;
        this.$dot.style.left = `${this.endX}px`;
      });

      // Enter/leave viewport
      document.addEventListener("mouseenter", () => {
        this.cursorVisible = true;
        this.toggleCursorVisibility();
        this.$dot.style.opacity = 1;
        this.$outline.style.opacity = 1;
      });

      document.addEventListener("mouseleave", () => {
        this.cursorVisible = false;
        this.toggleCursorVisibility();
        this.$dot.style.opacity = 0;
        this.$outline.style.opacity = 0;
      });
    }

    animateDotOutline() {
      this._x += (this.endX - this._x) / this.delay;
      this._y += (this.endY - this._y) / this.delay;

      this.$outline.style.top = `${this._y}px`;
      this.$outline.style.left = `${this._x}px`;

      requestAnimationFrame(this.animateDotOutline.bind(this));
    }

    toggleCursorSize() {
      if (this.cursorEnlarged) {
        this.$dot.style.transform = "translate(-50%, -50%) scale(0.75)";
        this.$outline.style.transform = "translate(-50%, -50%) scale(1.5)";
      } else {
        this.$dot.style.transform = "translate(-50%, -50%) scale(1)";
        this.$outline.style.transform = "translate(-50%, -50%) scale(1)";
      }
    }

    toggleCursorVisibility() {
      const opacity = this.cursorVisible ? 1 : 0;
      this.$dot.style.opacity = opacity;
      this.$outline.style.opacity = opacity;
    }
  }

  // Initialize the cursor
  new CustomCursor();
});

document.addEventListener("DOMContentLoaded", function () {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Select elements
  const bannerInner = document.querySelector(".banner-inner");
  const bannerVid = document.querySelector(".banner-vid");
  const video = document.querySelector('.banner-vid video');
  const platformTitle = document.querySelector(".platform-title");

  // Set initial styles for video container
  gsap.set(bannerVid, {
    width: "50%",
    height: "auto",
  });

  // Create the animation timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".banner",
      start: "10% top",
      end: "+=2000", // Adjust this value based on how long you want the scroll to take
      scrub: 1, // Makes the animation smooth with scroll
      pin: true, // Pins the banner section while scrolling
      anticipatePin: 1,
      // markers: true // Helpful for debugging, remove in production
    },
  });

  // Animation sequence
  tl.to(bannerInner, {
    y: "-35vh", // Moves the inner content upwards
    ease: "none",
  }).to(
    bannerVid,
    {
      width: "100vw",
      height: "102vh",
      y: -400, // Moves the inner content upwards
      borderRadius: 0,
      borderWidth: 0,
      marginTop: 0,
      ease: "none",
      duration: 1,
    },
    0
  );
  tl.to(bannerInner, {
    y: "0",
  })
    .to(bannerVid, {
      duration: 0.5, // Pins at full width for a short duration
    })
    .to(bannerVid, {
      width: "50%",
      height: "auto",
      borderRadius: "36px",
      borderWidth: "10px",
      marginTop: "60px",
      y: 0,
      ease: "none",
      duration: 1,
    });
  // Platform section animation
    const overlayEls = gsap.utils.toArray(".overlay-element");

  gsap.set(overlayEls, {
    transformOrigin: "right center",
    rotationY: 0,
    opacity: 1,
  });

  overlayEls.forEach((el, i) => {
    ScrollTrigger.create({
      trigger: ".overlay-animation",
      start: "top 80%",
      onEnter: () => {
        gsap.to(el, {
          rotationY: 90,
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          delay: i * 0.1, // Stagger effect (0.1s between each element)
        });
      },
    //   once: true, // Only animate once
    });
  });
//   title 
  gsap.fromTo(
    platformTitle,
    {
      x: "10%",
    },
    {
      x: "-190%", // Adjust this value for how much you want it to move left
      scrollTrigger: {
        trigger: ".platform-section",
        start: "top 60%", // Starts when top of platform section reaches 80% of viewport
        end: "top 10%",
        scrub: 1,
        // markers: true, // Remove in production
      },
    }
  );
const lt = gsap.timeline({
  scrollTrigger: {
    trigger: ".trend-showcase-section",
    start: "50% center",
    end: "+=2000", // Adjust scroll duration
    scrub: 1,
    pin: true,
    anticipatePin: 1,
    // markers: true
  }
});

// Animate pin-lines upward over entire scroll (start immediately)
lt.to(".pin-lines", {
  y: -1000,
  opacity: 1,
  ease: "none",
  duration: 1,
}, 0); // Start at 0 seconds (parallel with phones)

// Animate phones with scroll (start immediately, overlap with pin-lines)
lt.to(".trend-phone-1", { opacity: 1, y: 0, duration: 1 }, 0)
  .to(".trend-phone-1", { opacity: 0, duration: 0.5 })
  .to(".trend-phone-2", { opacity: 1, y: 0, duration: 1 })
  .to(".trend-phone-2", { opacity: 0, duration: 0.5 })
  lt.to(".trend-phone-3", { opacity: 1, y: 0, duration: 1 });

  // rodmap section Animation 
  const items = document.querySelectorAll('.timeline-item');
  const fillLine = document.querySelector('.tl-line-fill');
  const timelineContainer = document.querySelector('.timeline-items');

  gsap.to(fillLine, {
    height: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: timelineContainer,
      start: "top center",
      end: "bottom center",
      scrub: true, // makes the animation follow scroll
    }
  });

  // Optional: Add active state for each item
  items.forEach((item) => {
  ScrollTrigger.create({
    trigger: item,
    start: "top center",
    end: "bottom center",
    onEnter: () => {
      item.classList.add('active');
    },
    onLeaveBack: () => {
      item.classList.remove('active');
    }
  });
});

  gsap.set(video, {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector(".banner-heading");
  const words = el.textContent.trim().split(" ");
  el.textContent = ""; // Clear original text

  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.className = "word";
    span.textContent = word;

    // Add space after each word (except the last one)
    el.appendChild(span);
    if (index < words.length - 1) {
      el.appendChild(document.createTextNode("\u00A0")); // non-breaking space
    }
  });
});


// Initialize Slick Sliders
$(document).ready(function () {
  // Client Slider
  // Client Slider
  $(".social-slider").slick({
    dots: false,
    infinite: true,
    speed: 3000,
    autoplay: true,
    autoplaySpeed: 0,
    centerMode: true,
    cssEase: "linear",
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
      { breakpoint: 375, settings: { slidesToShow: 1 } },
    ],
  });
 


  // Demo Iframe Handling
  $(".demo-slider img").on("click", function () {
    const clickedDataId = $(this).data("id");
    $(".demo-slider img").removeClass("showBorder");
    $(this).addClass("showBorder");
    $(".demo-iframe").hide();
    $("#" + clickedDataId + "_iframe").show();
  });
});
// hide scroll to top btn on first 
$(document).ready(function () {
  const $arrowTop = $("#arrowTop");
  const $home = $("#home");

  $(window).on("scroll", function () {
    const homeInView = $home.offset().top <= $(window).scrollTop() + $(window).height() && 
                       $home.offset().top + $home.outerHeight() > $(window).scrollTop();
    $arrowTop.toggle(!homeInView);
  }).trigger("scroll"); // Trigger scroll to set the initial state
});