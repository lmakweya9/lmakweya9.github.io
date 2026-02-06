// =========================
// DYNAMIC TYPING EFFECT
// =========================
const typedTextSpan = document.querySelector("#typed-text");
const textArray = ["Aspiring AI/ML Engineer", "Machine Learning Practitioner", "Data Scientist", "Problem Solver"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!typedTextSpan.classList.contains("typing")) typedTextSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        typedTextSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!typedTextSpan.classList.contains("erasing")) typedTextSpan.classList.add("erasing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        typedTextSpan.classList.remove("erasing");
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        setTimeout(type, typingDelay + 1100);
    }
}

// =========================
// DARK/LIGHT MODE TOGGLE
// =========================
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Detect system preference
const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

// Load saved theme or fallback to system
const savedTheme = localStorage.getItem("theme");
if (savedTheme) body.className = savedTheme;
else body.className = prefersDark ? "dark-mode" : "light-mode";

// Update toggle icon
function updateIcon() {
    if (body.classList.contains("dark-mode")) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    else themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}
updateIcon();

themeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark-mode")) {
        body.classList.replace("dark-mode", "light-mode");
        localStorage.setItem("theme", "light-mode");
    } else {
        body.classList.replace("light-mode", "dark-mode");
        localStorage.setItem("theme", "dark-mode");
    }
    updateIcon();
});

// =========================
// FADE-IN SECTIONS ON SCROLL
// =========================
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("visible");
        });
    },
    { threshold: 0.1 }
);
sections.forEach(section => observer.observe(section));

// =========================
// SMOOTH SCROLL NAVIGATION
// =========================
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// =========================
// STICKY NAVIGATION
// =========================
const header = document.querySelector("header");
const navOffset = header.offsetTop;
function stickyNav() {
    if (window.pageYOffset > navOffset) header.classList.add("sticky");
    else header.classList.remove("sticky");
}
window.addEventListener("scroll", stickyNav);

// =========================
// INITIALIZE TYPING EFFECT
// =========================
document.addEventListener("DOMContentLoaded", function() {
    if (typedTextSpan) setTimeout(type, newTextDelay + 250);
});
