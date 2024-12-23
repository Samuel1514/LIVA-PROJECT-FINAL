// JavaScript Code for Admin Page Features

function showAdminFeature(feature) {
    const titleElement = document.getElementById("adminFeatureTitle");
    const descriptionElement = document.getElementById("adminFeatureDescription");

    // Reset the content
    descriptionElement.innerHTML = "";

    switch (feature) {
        case "dashboard":
            titleElement.textContent = "Dashboard";
            descriptionElement.innerHTML = `
                <p>Overview of the user's activities for today.</p>
                <ul>
                    <li><strong>Avatar Interactions:</strong> 12 interactions</li>
                    <li><strong>Exercises Completed:</strong> 3 out of 5 exercises</li>
                    <li><strong>Medical Assistance:</strong> 2 reminders responded</li>
                    <li><strong>Meals Taken:</strong> 3 meals logged</li>
                    <li><strong>Notifications Sent:</strong> 1 notification</li>
                </ul>
            `;
            break;

        case "mealMedicine":
            titleElement.textContent = "Meal & Medicine Management";
            descriptionElement.innerHTML = `
                <p>Set reminders for meals and medicine schedules.</p>
                <label for="mealTime">Meal Time:</label>
                <input type="time" id="mealTime" /><br>
                <label for="medicineName">Medicine Name:</label>
                <input type="text" id="medicineName" placeholder="Enter medicine name" /><br>
                <label for="medicineTime">Medicine Time:</label>
                <input type="time" id="medicineTime" /><br>
                <button onclick="saveMealMedicineSettings()">Save Changes</button>
            `;
            break;

        case "communicationHub":
            titleElement.textContent = "Communication Hub";
            descriptionElement.innerHTML = `
                <p>Send messages or alerts to users.</p>
                <label for="messageText">Message:</label><br>
                <textarea id="messageText" rows="4" placeholder="Type your message..."></textarea><br>
                <button onclick="sendMessage()">Send Message</button>
            `;
            break;

        case "healthInsights":
            titleElement.textContent = "Health Insights";
            descriptionElement.innerHTML = `
                <p>Monitor and analyze user health data.</p>
                <label for="userHealthReport">Upload Health Report:</label>
                <input type="file" id="userHealthReport" /><br>
                <button onclick="analyzeHealthData()">Analyze</button>
            `;
            break;

        case "notifications":
            titleElement.textContent = "Notifications";
            descriptionElement.innerHTML = `
                <p>Manage notifications for users.</p>
                <label for="notificationText">Notification:</label><br>
                <textarea id="notificationText" rows="3" placeholder="Enter notification content..."></textarea><br>
                <button onclick="sendNotification()">Send Notification</button>
            `;
            break;

        case "emergencyActions":
            titleElement.textContent = "Emergency Actions";
            descriptionElement.innerHTML = `
                <p>Define emergency protocols and actions.</p>
                <label for="emergencyContact">Emergency Contact:</label>
                <input type="text" id="emergencyContact" placeholder="Enter contact details" /><br>
                <label for="emergencyPlan">Action Plan:</label><br>
                <textarea id="emergencyPlan" rows="4" placeholder="Describe emergency actions..."></textarea><br>
                <button onclick="saveEmergencyPlan()">Save Plan</button>
            `;
            break;

        case "communitySupport":
            titleElement.textContent = "Community Support";
            descriptionElement.innerHTML = `
                <p>Facilitate support within the community.</p>
                <label for="supportMessage">Support Message:</label><br>
                <textarea id="supportMessage" rows="3" placeholder="Type message for community..."></textarea><br>
                <button onclick="sendCommunitySupportMessage()">Send</button>
            `;
            break;

        case "feedback":
            titleElement.textContent = "Feedback & Suggestions";
            descriptionElement.innerHTML = `
                <p>Collect feedback and suggestions.</p>
                <label for="feedbackText">Feedback:</label><br>
                <textarea id="feedbackText" rows="4" placeholder="Type feedback or suggestions..."></textarea><br>
                <button onclick="saveFeedback()">Submit Feedback</button>
            `;
            break;

        case "profileManagement":
            titleElement.textContent = "User Profile Management";
            descriptionElement.innerHTML = `
                <p>View and manage user profiles.</p>
                <label for="userSearch">Search User:</label>
                <input type="text" id="userSearch" placeholder="Enter username or ID" /><br>
                <button onclick="searchUser()">Search</button>
            `;
            break;

        default:
            titleElement.textContent = "Welcome Admin";
            descriptionElement.innerHTML = `<p>Select a feature from the left to explore its details and manage your elderly parent's activities.</p>`;
            break;
    }
}

// Placeholder functions for button actions
function saveMealMedicineSettings() {
    alert("Meal and medicine settings saved successfully.");
}

function sendMessage() {
    alert("Message sent successfully.");
}

function analyzeHealthData() {
    alert("Health data analyzed.");
}

function sendNotification() {
    alert("Notification sent successfully.");
}

function saveEmergencyPlan() {
    alert("Emergency plan saved successfully.");
}

function sendCommunitySupportMessage() {
    alert("Community support message sent.");
}

function saveFeedback() {
    alert("Feedback submitted successfully.");
}

function searchUser() {
    alert("User profile found.");
}