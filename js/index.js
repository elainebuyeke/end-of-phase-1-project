document.addEventListener("DOMContentLoaded", () => {
    fetchCareers();
});

const careerList = document.getElementById("career-list");
const careerInfo = document.getElementById("career-info");
const emailForm = document.getElementById("details-form");
let careerFields = document.querySelector(".career-fields");

function fetchCareers() {
    fetch("https://end-of-phase-1-server.vercel.app/careers")
        .then(response => response.json())
        .then(careers => {
            careers.forEach(career => {
                let span = document.createElement("span");
                span.textContent = career.field;
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
    document.querySelector("#careers-name").textContent = career.field;
    document.querySelector("#careers-image").src = career.image;
    document.querySelector("#careers-image").alt = career.field;
    document.querySelector("#career-description").textContent = career.description;
}

emailForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;

    try {
        const response = await fetch("https://end-of-phase-1-server.vercel.app/careers", {
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

document.querySelector("#change-form").addEventListener("submit", (event) => {
    event.preventDefault();
    
    const newDescription = document.querySelector("#new-description").value;
    const careerId = document.querySelector("#careers-name").dataset.id; 

    if (!careerId) {
        alert("Select a career first!");
        return;
    }

    fetch(`https://end-of-phase-1-server.vercel.app/careers${careerId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: newDescription })
    })
    .then(response => response.json())
    .then(updatedCareer => {
        displayDetails(updatedCareer);
        alert("Career updated successfully!");
    })
    .catch(err => console.error("Failed to update career:", err));
});

