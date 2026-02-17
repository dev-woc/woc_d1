// ===== Register GSAP Plugins =====
gsap.registerPlugin(ScrollTrigger);

// ===== Custom Cursor =====
const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");
const hoverElements = document.querySelectorAll("[data-hover]");

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.2;
  cursorY += (mouseY - cursorY) * 0.2;
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;

  cursor.style.left = cursorX + "px";
  cursor.style.top = cursorY + "px";
  follower.style.left = followerX + "px";
  follower.style.top = followerY + "px";

  requestAnimationFrame(animateCursor);
}
animateCursor();

hoverElements.forEach((el) => {
  el.addEventListener("mouseenter", () => follower.classList.add("is-hover"));
  el.addEventListener("mouseleave", () => follower.classList.remove("is-hover"));
});

// ===== Mobile Menu Toggle =====
const mobileToggle = document.querySelector(".mobile-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

mobileToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("is-open");
});

document.querySelectorAll(".mobile-menu-link, .mobile-menu .btn").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("is-open");
  });
});

// ===== Hero Text Reveal =====
gsap.set(".hero-word", { yPercent: 110 });
gsap.set(".hero-sub", { opacity: 0, y: 30 });

gsap.to(".hero-word", {
  yPercent: 0,
  duration: 1,
  ease: "power3.out",
  stagger: 0.15,
  delay: 0.3,
});

gsap.to(".hero-sub", {
  opacity: 1,
  y: 0,
  duration: 0.8,
  ease: "power2.out",
  delay: 0.9,
});

// ===== Marquee Animation =====
const marqueeTrack = document.querySelector(".marquee-track");

gsap.to(marqueeTrack, {
  xPercent: -50,
  duration: 20,
  ease: "none",
  repeat: -1,
});

// ===== Fade-Up on Scroll =====
const fadeUpElements = document.querySelectorAll(
  ".section-header, .service-card, .about-content, .about-spline, .cta-headline, .cta-sub, .cta .btn, .footer-top"
);

fadeUpElements.forEach((el) => {
  gsap.from(el, {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none none",
    },
  });
});

// ===== Service Cards Stagger =====
gsap.from(".service-card", {
  y: 40,
  opacity: 0,
  duration: 0.6,
  stagger: 0.12,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".services-grid",
    start: "top 80%",
    toggleActions: "play none none none",
  },
});

// ===== CTA Text Reveal =====
gsap.from(".cta-line", {
  yPercent: 100,
  opacity: 0,
  duration: 0.8,
  stagger: 0.15,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".cta",
    start: "top 75%",
    toggleActions: "play none none none",
  },
});

// ===== Spline Container Subtle Entrance =====
document.querySelectorAll(".spline-container").forEach((container) => {
  gsap.from(container, {
    scale: 0.95,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: container,
      start: "top 85%",
      toggleActions: "play none none none",
    },
  });
});

// ===== Spline 3D — Hero Scene =====
(async function loadSplineHero() {
  const canvas = document.getElementById("canvas-hero");
  if (!canvas) return;

  const { Application } = await import(
    "https://esm.sh/@splinetool/runtime"
  );

  const spline = new Application(canvas);
  await spline.load(
    "https://prod.spline.design/2vf8jYPmLX73eEtB/scene.splinecode"
  );

  // Reveal canvas, hide loader
  canvas.classList.add("is-loaded");
  const loader = canvas.closest(".spline-container").querySelector(".spline-loader");
  if (loader) loader.classList.add("is-hidden");
})();

// ===== Spline 3D — About Scene (lazy-loaded on scroll) =====
(function loadSplineAbout() {
  const container = document.getElementById("spline-about");
  if (!container) return;

  const observer = new IntersectionObserver(
    async ([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();

      const canvas = document.getElementById("canvas-about");
      const { Application } = await import(
        "https://esm.sh/@splinetool/runtime"
      );

      const spline = new Application(canvas);
      await spline.load(
        "https://prod.spline.design/gvvgcSIUCaAAqIzQ/scene.splinecode"
      );

      canvas.classList.add("is-loaded");
      const loader = container.querySelector(".spline-loader");
      if (loader) loader.classList.add("is-hidden");
    },
    { rootMargin: "200px" }
  );

  observer.observe(container);
})();

// ===== Navbar Hide/Show on Scroll =====
let lastScrollY = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    gsap.to(navbar, { yPercent: -100, duration: 0.3, ease: "power2.out" });
  } else {
    gsap.to(navbar, { yPercent: 0, duration: 0.3, ease: "power2.out" });
  }
  lastScrollY = currentScrollY;
});
