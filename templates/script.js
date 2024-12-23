// Function to handle choosing a plan
function choosePlan(planName, planPrice) {
    // Store plan details in local storage
    localStorage.setItem('selectedPlan', JSON.stringify({ name: planName, price: planPrice }));
    
    // Redirect to the purchase details page
    window.location.href = 'purchase-details.html';
}


// script.js

document.addEventListener("DOMContentLoaded", function () {
    const loginToggle = document.getElementById("login-toggle");
    const loginDropdown = document.getElementById("login-dropdown");

    // Toggle dropdown visibility on login link click
    loginToggle.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default link behavior

        // Toggle the dropdown menu's visibility
        if (loginDropdown.style.display === "none" || loginDropdown.style.display === "") {
            loginDropdown.style.display = "block";
        } else {
            loginDropdown.style.display = "none";
        }
    });
});




// Toggle Dropdown Function
function toggleDropdown() {
    const dropdown = document.getElementById("login-dropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// Hide dropdown if clicked outside
document.addEventListener("click", function (event) {
    const dropdown = document.getElementById("login-dropdown");
    const toggle = document.getElementById("login-toggle");
    if (!toggle.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.style.display = "none";
    }
});

document.getElementById('contact').addEventListener('mouseover', () => {
    document.getElementById('contact-dropdown').style.display = 'block';
});

document.getElementById('contact').addEventListener('mouseout', () => {
    document.getElementById('contact-dropdown').style.display = 'none';
});


document.addEventListener("DOMContentLoaded", () => {
    const languageSelector = document.getElementById("language-selector");
    const elementsToTranslate = {
        welcome: document.querySelector(".hero-content h1"),
        tagline: document.querySelector(".hero-content p"),
        cta: document.querySelector(".cta-button"),
        features: document.querySelector(".products h2"),
        avatar: document.querySelector(".product-item:nth-child(1) h3"),
        mealReminder: document.querySelector(".product-item:nth-child(2) h3"),
        medicalReminder: document.querySelector(".product-item:nth-child(3) h3"),
        medicalAssistance: document.querySelector(".product-item:nth-child(4) h3"),
        exercise: document.querySelector(".product-item:nth-child(5) h3"),
        healthTips: document.querySelector(".product-item:nth-child(6) h3"),
        sleepTracker: document.querySelector(".product-item:nth-child(7) h3"),
        moodTracker: document.querySelector(".product-item:nth-child(8) h3"),
    };

    function updateLanguage(language) {
        const translation = translations[language];
        if (!translation) return;

        for (const [key, element] of Object.entries(elementsToTranslate)) {
            if (element) {
                element.textContent = translation[key];
            }
        }
    }

 // Language switcher functionality
const languageSelector = document.getElementById("language-selector");

languageSelector.addEventListener("change", (event) => {
    const selectedLanguage = event.target.value;
    const contentToTranslate = document.querySelectorAll("[id]");
    
    contentToTranslate.forEach((element) => {
        const translationKey = element.id;
        if (translations[selectedLanguage][translationKey]) {
            element.textContent = translations[selectedLanguage][translationKey];
        }
    });
});