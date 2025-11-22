/* ============================================================
   Glossy Touch — FINAL SCRIPT.JS (2025)
   Full Website Functionality (Contact + Service + Menu)
============================================================ */

/* ============================================================
   1. MOBILE MENU SYSTEM
============================================================ */
const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

if (menuBtn && navbar) {
    menuBtn.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });
}

/* Close menu when clicking outside */
window.addEventListener("click", (e) => {
    if (navbar && menuBtn) {
        if (!navbar.contains(e.target) && e.target !== menuBtn) {
            navbar.classList.remove("active");
        }
    }
});

/* ============================================================
   2. SMOOTH SCROLL TO SECTIONS
============================================================ */
function scrollToSection(id) {
    const target = document.getElementById(id);
    if (!target) return;

    window.scrollTo({
        top: target.offsetTop - 60,
        behavior: "smooth",
    });
}

/* ============================================================
   3. SERVICE PAGE SYSTEM
============================================================ */

let activeService = null;

/* ---------- OPEN SERVICE PAGE ---------- */
function openService(serviceId) {
    closeService();

    const section = document.getElementById(`service-${serviceId}`);
    if (!section) return;

    section.classList.add("active");
    activeService = section;

    window.scrollTo({
        top: section.offsetTop - 40,
        behavior: "smooth",
    });

    // Auto-play main video
    const mainVideo = section.querySelector(".service-video");
    if (mainVideo) {
        mainVideo.pause();
        mainVideo.currentTime = 0;

        setTimeout(() => {
            mainVideo.play().catch(() => {});
        }, 300);
    }
}

/* ---------- CLOSE SERVICE PAGE ---------- */
function closeService() {
    if (!activeService) return;

    const videos = activeService.querySelectorAll("video");

    videos.forEach((v) => {
        v.pause();
        v.currentTime = 0;
    });

    activeService.classList.remove("active");
    activeService = null;
}

/* ---------- SWITCH MAIN VIDEO ---------- */
function switchVideo(serviceId, videoFile) {
    const mainVideo = document.getElementById(`main-video-${serviceId}`);
    if (!mainVideo) return;

    mainVideo.pause();
    mainVideo.src = videoFile;
    mainVideo.load();

    setTimeout(() => {
        mainVideo.play().catch(() => {});
    }, 200);
}

/* ============================================================
   4. VIDEO RESPONSIVE FIX
============================================================ */
document.querySelectorAll(".service-video").forEach((video) => {
    video.style.width = "100%";
    video.style.height = "auto";
});

/* ============================================================
   5. CONTACT SECTION — TAB SYSTEM + ANIMATION
============================================================ */

const contactContainer = document.querySelector(".contact-container");
const contactTab = document.querySelector("#contactTab");
const orderTab = document.querySelector("#orderTab");

const contactForm = document.querySelector("#contactForm");
const orderForm = document.querySelector("#orderForm");

const contactBox = document.querySelector("#contactBox");

// FIRST LOAD animation
setTimeout(() => {
    if (contactBox) contactBox.classList.add("active");
}, 300);

/* ----- Tab Switching System ----- */
if (contactTab && orderTab && contactForm && orderForm) {
    contactTab.addEventListener("click", () => {
        contactTab.classList.add("active");
        orderTab.classList.remove("active");

        contactForm.classList.add("active");
        orderForm.classList.remove("active");

        contactContainer?.classList.remove("active");

        // Re-trigger animation
        contactBox.classList.remove("active");
        setTimeout(() => contactBox.classList.add("active"), 20);
    });

    orderTab.addEventListener("click", () => {
        orderTab.classList.add("active");
        contactTab.classList.remove("active");

        orderForm.classList.add("active");
        contactForm.classList.remove("active");

        contactContainer?.classList.add("active");

        // Re-trigger animation
        contactBox.classList.remove("active");
        setTimeout(() => contactBox.classList.add("active"), 20);
    });
}
