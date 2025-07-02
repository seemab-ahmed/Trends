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
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Select elements
    const bannerInner = document.querySelector('.banner-inner');
    const bannerVid = document.querySelector('.banner-vid');
    const video = document.querySelector('.banner-vid video');
    
    // Set initial styles for video container
    gsap.set(bannerVid, {
        width: '60%',
        height: 'auto'
    });
    
    // Create the animation timeline
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.banner',
            start: '10% top',
            end: '+=2000', // Adjust this value based on how long you want the scroll to take
            scrub: 1, // Makes the animation smooth with scroll
            pin: true, // Pins the banner section while scrolling
            anticipatePin: 1,
            // markers: true // Helpful for debugging, remove in production
        }
    });
    
    // Animation sequence
    tl.to(bannerInner, {
        y: '-17vh', // Moves the inner content upwards
        ease: 'none'
    })
    .to(bannerVid, {
        width: '100vw',
        height: '102vh',
        y: -400, // Moves the inner content upwards
        borderRadius: 0,
        borderWidth: 0,
        marginTop: 0,
        ease: 'none',
        duration: 1
    }, 0)
    .to(bannerVid, {
        duration: 0.5 // Pins at full width for a short duration
    })
    .to(bannerVid, {
        width: '60%',
        height: 'auto',
        borderRadius: '36px',
        borderWidth: '10px',
        marginTop: '60px',
        y: 0,
        ease: 'none',
        duration: 1
    });
    
    // Make sure video fills its container during animation
    gsap.set(video, {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    });
});