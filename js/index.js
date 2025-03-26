document.addEventListener("DOMContentLoaded", () => {
    const careerList = document.getElementById("career-list");
    const careerInfo = document.getElementById("career-info");
    const searchInput = document.getElementById("search");
    const filterSelect = document.getElementById("filter");
    const emailForm = document.getElementById("email-form");
    const toggleMode = document.getElementById("toggle-mode");

    let careers = [];

    // Fetch careers from db.json
    async function fetchCareers() {
        const response = await fetch("http://localhost:3000/careers");
        careers = await response.json();
        displayCareers(careers);
    }

    // Display careers
    function displayCareers(careerArray) {
        careerList.innerHTML = "";
        careerArray.forEach(career => {
            const li = document.createElement("li");
            li.textContent = career.name;
            li.addEventListener("click", () => showCareerInfo(career));
            careerList.appendChild(li);
        });
    }

    // Show career info
    function showCareerInfo(career) {
        careerInfo.innerHTML = `<h2>${career.name}</h2><p>${career.description}</p>`;
    }

    // Search Careers (Event 1)
    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredCareers = careers.filter(career => 
            career.name.toLowerCase().includes(searchTerm)
        );
        displayCareers(filteredCareers);
    });

    // Filter Careers by Field (Event 2)
    filterSelect.addEventListener("change", () => {
        const selectedField = filterSelect.value;
        if (selectedField === "all") {
            displayCareers(careers);
        } else {
            const filteredCareers = careers.filter(career => 
                career.field === selectedField
            );
            displayCareers(filteredCareers);
        }
    });

    // Handle email form submission (Event 3)
    emailForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;

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
    });

    // Toggle Dark Mode (Event 4)
    toggleMode.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    // Fetch careers on page load
    fetchCareers();
});
