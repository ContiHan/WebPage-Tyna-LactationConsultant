"use strict";

// dynamic year in copyright
const copyrightYearEl = document.querySelector(".copyright-year");
copyrightYearEl.textContent = new Date().getFullYear().toString();

// mobile navigation
const headerEl = document.querySelector(".header");
const buttonMobileNavigationEl = document.querySelector(".btn-mobile-nav");
buttonMobileNavigationEl.addEventListener("click", function () {
    headerEl.classList.toggle("nav-open");
})

// smooth scrolling
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const href = link.getAttribute("href");

        if (href === "#") {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        }

        if (href !== "#" && href.startsWith("#")) {
            const sectionEl = document.querySelector(href);
            sectionEl.scrollIntoView({behavior: "smooth"});
        }

        if (link.classList.contains("main-nav-link")) {
            headerEl.classList.toggle("nav-open");
        }
    })
})

// sticky navigation
const sectionHeroEl = document.querySelector(".section-hero");

const observer = new IntersectionObserver(function (entries) {
        const entry = entries[0];
        const isHeroSectionVisible = entry.isIntersecting;

        if (isHeroSectionVisible) {
            document.querySelector(".header").classList.remove("sticky");
        }
        else{
            document.querySelector(".header").classList.add("sticky");
        }
    },
    {
        root: null,
        threshold: 0
    });
observer.observe(sectionHeroEl);