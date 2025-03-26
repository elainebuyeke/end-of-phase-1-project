document.addEventListener("DOMContentLoaded", () => {
    fetchCareers();
});

const careerList = document.getElementById("career-list");
const careerInfo = document.getElementById("career-info");
const emailForm = document.getElementById("email-form");
let careerFields = document.querySelector(".career-fields");

function fetchCareers() {
    fetch("http://localhost:3000/careers")
        .then(response => response.json())
        .then(careers => {
            careers.forEach(career => {
                let span = document.createElement("span");
                span.textContent = career.name;
                span.style.cursor = "pointer";
                span.addEventListener("click", () => {
                    displayDetails(career);
                });
                if (careerFields) {
                    careerFields.appendChild(span);
                }
            });
        })
        .catch(err => console.error("Error fetching careers:", err));
}

function displayDetails(career) {
    document.querySelector("#careers-name").textContent = career.name;
    document.querySelector("#careers-image").src = career.image;
    document.querySelector("#careers-image").alt = career.name;
    document.querySelector("#career-description").textContent = career.description;
}

emailForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;

    try {
        const response = await fetch("http://localhost:3000/subscriptions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });

        if (response.ok) {
            alert("Subscribed successfully!");
            emailForm.reset();
        } else {
            alert("Failed to subscribe.");
        }
    } catch (error) {
        console.error("Subscription error:", error);
        alert("An error occurred while subscribing.");
    }
});
