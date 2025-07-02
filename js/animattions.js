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

document.addEventListener('DOMContentLoaded', function() {
  // Debug checks
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger not loaded!');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Element selection
  const banner = document.querySelector('.banner');
  const bannerVid = document.querySelector('.banner-vid');
  const bannerInner = document.querySelector('.banner-inner');

  if (!banner || !bannerVid || !bannerInner) {
    console.error('Missing required elements');
    return;
  }

  // Set initial styles (important!)
  gsap.set(bannerVid, {
    width: "60%",
    height: "50vh",
    borderRadius: "36px"
  });

  gsap.set(bannerInner, {
    y: 0
  });

  // Create separate ScrollTriggers for better control
  // Video animation
  gsap.to(bannerVid, {
    width: "100vw",
    height: "100vh",
    borderRadius: 0,
    ease: "power3.out",
    scrollTrigger: {
      trigger: banner,
      start: "40% top",
      end: "+=90%",
      scrub: 1,
      pin: true,
      markers: true,
      onEnterBack: () => {
        // Reset when scrolling back up
        gsap.set(bannerVid, {
          width: "60%",
          height: "50vh",
          borderRadius: "36px"
        });
      }
    }
  });

  // Inner content animation (starts later)
  gsap.to(bannerInner, {
    y: "-30vh",
    ease: "power2.out",
    scrollTrigger: {
      trigger: banner,
      start: "50% top", // Starts later than video
      end: "+=100%",
      scrub: 1,
      markers: true,
      onEnterBack: () => {
        // Reset when scrolling back up
        gsap.set(bannerInner, { y: 0 });
      }
    }
  });
});