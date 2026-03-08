"use strict";

// Prevent browser from jumping to hash on reload/navigation
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// dynamic year in copyright
const copyrightYearEl = document.querySelector(".copyright-year");
copyrightYearEl.textContent = new Date().getFullYear().toString();

// mobile navigation
const headerEl = document.querySelector(".header");
const buttonMobileNavigationEl = document.querySelector(".btn-mobile-nav");
buttonMobileNavigationEl.addEventListener("click", function () {
    headerEl.classList.toggle("nav-open");
});

// smooth scrolling
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
        const href = link.getAttribute("href");

        if (href.startsWith("#") || href === "#") {
            e.preventDefault();

            // Clear hash from URL if it exists
            if (window.location.hash) {
                window.history.replaceState(null, null, window.location.pathname);
            }

            if (href === "#") {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })
            }
            if (href !== "#" && href.startsWith("#")) {
                const sectionEl = document.querySelector(href);
                if (sectionEl) {
                    scrollToSection(sectionEl);
                }
            }
        }
        if (link.classList.contains("main-nav-link")) {
            headerEl.classList.toggle("nav-open");
        }
    });
});

function scrollToSection(sectionEl, behavior = "smooth") {
    // To get the correct offset, we must measure the header as it will be during scroll (sticky)
    // We add the sticky class temporarily to measure its height
    const isSticky = headerEl.classList.contains("sticky");
    if (!isSticky) headerEl.classList.add("sticky");
    const topOffset = headerEl.getBoundingClientRect().height;
    if (!isSticky) headerEl.classList.remove("sticky");

    // Use pageYOffset for a more stable absolute coordinate calculation
    const elementPosition = sectionEl.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - topOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: behavior
    });
}

// Handle initial hash on page load (e.g. returning from calculator)
// Use 'load' instead of 'DOMContentLoaded' to wait for all images and final layout
window.addEventListener("load", function() {
    if (window.location.hash) {
        const id = window.location.hash;
        const sectionEl = document.querySelector(id);
        
        if (sectionEl) {
            // Tiny delay to ensure browser finished its internal layout processes
            setTimeout(() => {
                scrollToSection(sectionEl, "auto");
                // Clean the URL AFTER we are in position
                window.history.replaceState(null, null, window.location.pathname);
            }, 50);
        }
    }
});

// sticky navigation
const headerHeight = headerEl.getBoundingClientRect().height;
const spacer = document.createElement("div");
spacer.style.height = `${headerHeight}px`;
spacer.style.display = "none";
headerEl.after(spacer);

const sectionHeroEl = document.querySelector(".section-hero");
const observer = new IntersectionObserver(function (entries) {
    const entry = entries[0];
    const isHeroSectionVisible = entry.isIntersecting;

    if (isHeroSectionVisible) {
        headerEl.classList.remove("sticky");
        spacer.style.display = "none";
    } else {
        headerEl.classList.add("sticky");
        spacer.style.display = "block";
    }
}, {
    root: null,
    threshold: 0,
    rootMargin: "-50px"
});

observer.observe(sectionHeroEl);

// handle form after sent message
document.addEventListener("DOMContentLoaded", function () {
    const status = getQueryParam("status");
    const message = getQueryParam("message");

    if (status && message) {
        showModal(decodeURIComponent(message), status);
    }

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
});

function showModal(message, status) {
    const modalMessageEl = document.querySelector(".modal-message");
    const modalEl = document.querySelector(".response-modal");

    modalMessageEl.innerText = message;
    modalEl.style.display = "block";

    setTimeout(function () {
        closeModal();
        window.history.replaceState({}, document.title, "/");
    }, 5000);

    if (status === "success") {
        resetForm();
    }
}

function closeModal() {
    const modal = document.querySelector(".response-modal");
    modal.style.display = "none";
}

function resetForm() {
    const form = document.querySelector(".cta-form");
    form.reset();
}

// swiper for testimonials section
new Swiper('.testimonial-card-wrapper', {
    loop: true,
    spaceBetween: 50,
    autoHeight: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        545: {
            slidesPerView: 2
        },
        945: {
            slidesPerView: 3
        }
    }
});
