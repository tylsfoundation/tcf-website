const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
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
