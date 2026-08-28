const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
if (navToggle && siteNav) {
  const navGroups = Array.from(siteNav.querySelectorAll(".nav-group"));

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
    if (event.target.closest("a") && window.innerWidth <= 1250) {
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

const contactForm = document.querySelector("[data-contact-form]");

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector("button[type=submit]");
    const status = contactForm.querySelector(".form-status");
    if (submitButton) submitButton.disabled = true;
    if (status) status.textContent = "Sending your message...";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" }
      });

      if (!response.ok) throw new Error("Form submission failed");
      contactForm.reset();
      if (status) status.textContent = "Thanks. Your message has been sent.";
    } catch (error) {
      if (status) status.textContent = "We could not send your message. Please email founder@tylsfoundation.org instead.";
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}
