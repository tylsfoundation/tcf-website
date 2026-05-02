```javascript
// ===============================
// TCF Partners + Pantries Loader
// ===============================

// 🔧 REPLACE THIS WITH YOUR SHEET ID
const SHEET_ID = "YOUR_GOOGLE_SHEET_ID";

// Build URLs (using opensheet)
const PARTNERS_URL = `https://opensheet.elk.sh/${SHEET_ID}/Partners`;
const PANTRIES_URL = `https://opensheet.elk.sh/${SHEET_ID}/Pantries`;


// ===============================
// Load Partners
// ===============================
async function loadPartners() {
    const container = document.getElementById("partnersList");
    if (!container) return;

    try {
        const res = await fetch(PARTNERS_URL);
        const data = await res.json();

        container.innerHTML = "";

        data.forEach(p => {
            const div = document.createElement("div");
            div.className = "p-6 bg-slate-800/60 rounded-2xl border border-slate-700 card-hover";

            div.innerHTML = `
                <h3 class="text-white font-bold text-lg mb-2">${p.Name || "Unnamed Partner"}</h3>
                ${
                    p.Website
                        ? `<a href="${p.Website}" target="_blank" class="text-yellow-400 text-sm hover:underline">
                            Visit Website
                           </a>`
                        : ""
                }
            `;

            container.appendChild(div);
        });

        if (data.length === 0) {
            container.innerHTML = `<p class="text-slate-400">No partners listed yet.</p>`;
        }

    } catch (err) {
        console.error("Partners load error:", err);
        container.innerHTML = `<p class="text-red-400">Unable to load partners.</p>`;
    }
}


// ===============================
// Load Pantries
// ===============================
async function loadPantries() {
    const container = document.getElementById("pantryList");
    if (!container) return;

    try {
        const res = await fetch(PANTRIES_URL);
        const data = await res.json();

        container.innerHTML = "";

        data.forEach(p => {
            const div = document.createElement("div");
            div.className = "p-6 bg-slate-800/60 rounded-2xl border border-slate-700 card-hover";

            div.innerHTML = `
                <h3 class="text-white font-bold text-lg mb-1">${p.Name || "Unnamed Pantry"}</h3>
                <p class="text-slate-400 text-sm">${p.City || ""}</p>
                ${
                    p.Notes
                        ? `<p class="text-slate-500 text-xs mt-2">${p.Notes}</p>`
                        : ""
                }
            `;

            container.appendChild(div);
        });

        if (data.length === 0) {
            container.innerHTML = `<p class="text-slate-400">No pantry data available yet.</p>`;
        }

    } catch (err) {
        console.error("Pantries load error:", err);
        container.innerHTML = `<p class="text-red-400">Unable to load pantry data.</p>`;
    }
}


// ===============================
// Init
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    loadPartners();
    loadPantries();
});
```
