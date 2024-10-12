"use strict";

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

            if (href === "#") {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })
            }
            if (href !== "#" && href.startsWith("#")) {
                const sectionEl = document.querySelector(href);
                if (sectionEl) {
                    const topOffset = headerHeight;
                    const elementPosition = sectionEl.getBoundingClientRect().top + window.scrollY;
                    const offsetPosition = elementPosition - topOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        }
        if (link.classList.contains("main-nav-link")) {
            headerEl.classList.toggle("nav-open");
        }
    });
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
    threshold: 0
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
