const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
if (navToggle && siteNav) {
  const navGroups = Array.from(siteNav.querySelectorAll(".nav-group"));

  const volunteerSource = new URLSearchParams(window.location.search).get("source");
  if (window.location.pathname.endsWith("/volunteer.html") && volunteerSource === "education") {
    siteNav.querySelectorAll(".nav-group").forEach((group) => group.classList.remove("is-current"));
    siteNav.querySelectorAll("[aria-current='page']").forEach((link) => link.removeAttribute("aria-current"));

    const educationGroup = navGroups.find((group) => group.querySelector("summary")?.textContent.trim() === "Education");
    const educationVolunteerLink = educationGroup?.querySelector("a[href='./volunteer.html?source=education']");
    if (educationGroup && educationVolunteerLink) {
      educationGroup.classList.add("is-current");
      educationVolunteerLink.setAttribute("aria-current", "page");
    }
  }

  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navGroups.forEach((group) => {
    group.addEventListener("toggle", () => {
      if (group.open) {
        navGroups.forEach((otherGroup) => {
          if (otherGroup !== group) otherGroup.open = false;
        });
      }
    });
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target.closest("a") && window.innerWidth <= 1120) {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("click", (event) => {
    if (!siteNav.contains(event.target) && !navToggle.contains(event.target)) {
      navGroups.forEach((group) => { group.open = false; });
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navGroups.forEach((group) => { group.open = false; });
      navToggle.focus();
    }
  });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const prototypeForm = document.querySelector("[data-prototype-form]");

if (prototypeForm) {
  prototypeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = prototypeForm.querySelector(".form-status");
    if (status) {
      status.textContent = "Prototype only: this will later send volunteer details by email or to a secure intake system.";
    }
  });
}
