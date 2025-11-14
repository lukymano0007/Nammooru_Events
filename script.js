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

/* Close menu when clicking outside (mobile only) */
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
    closeService(); // Close previous

    const section = document.getElementById(`service-${serviceId}`);
    if (!section) return;

    section.classList.add("active");
    activeService = section;

    // Scroll into view
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

    // Pause and reset every video
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
   4. VIDEO RESPONSIVE FIX — Prevent overflow stretching
============================================================ */
document.querySelectorAll(".service-video").forEach(video => {
    video.style.width = "100%";
    video.style.height = "auto";
});

/* ============================================================
   5. CONTACT FORM VALIDATION (Optional Enhancement)
============================================================ */
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        const name = contactForm.querySelector("[name='name']").value.trim();
        const email = contactForm.querySelector("[name='email']").value.trim();
        const phone = contactForm.querySelector("[name='phone']").value.trim();
        const message = contactForm.querySelector("[name='message']").value.trim();

        if (!name || !email || !phone || !message) {
            alert("Please fill out all fields.");
            e.preventDefault();
        }
    });
}
