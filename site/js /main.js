```javascript
// ===============================
// TCF Main JS (Portable)
// ===============================

// Wait until DOM is ready
document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // Volunteer Form Handling
    // ===============================

    const form = document.getElementById("volunteerForm");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const data = Object.fromEntries(new FormData(form));

            const status = document.getElementById("formStatus");

            try {
                const res = await fetch("https://YOUR-ENDPOINT.com/volunteer", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                if (res.ok) {
                    status.innerText = "Thank you for volunteering!";
                    form.reset();
                } else {
                    status.innerText = "Submission failed. Please try again.";
                }

            } catch (err) {
                status.innerText = "Network error. Please try again.";
            }
        });
    }


    // ===============================
    // OPTIONAL: Load Shared Partials
    // (only works if you choose to use /partials/)
    // ===============================

    const loadPartial = async (id, file) => {
        const el = document.getElementById(id);
        if (!el) return;

        try {
            const res = await fetch(file);
            const html = await res.text();
            el.innerHTML = html;
        } catch (err) {
            console.warn(`Failed to load ${file}`);
        }
    };

    // Uncomment these if you create partials later:
    // loadPartial("nav-placeholder", "/partials/nav.html");
    // loadPartial("footer-placeholder", "/partials/footer.html");


    // ===============================
    // Smooth Scroll (nice UX)
    // ===============================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (!target) return;

            e.preventDefault();
            target.scrollIntoView({
                behavior: "smooth"
            });
        });
    });

});
```
