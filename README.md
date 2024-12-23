# LIVA - A Virtual Companion and Care Manager System for Elderly Well-being

**LIVA** is an advanced platform designed to leverage cutting-edge virtual assistance and caregiving technology to enhance elderly well-being. The system features an interactive avatar that engages users in meaningful conversations, providing emotional support, companionship, and essential reminders.

## Features

- **Avatar Interaction**: The system integrates a virtual avatar that interacts with users, offering personalized notifications and responses.
- **Meal Reminders**: Set customized reminders to ensure the user never misses a meal.
- **Medicine Reminders**: Alerts to remind users when it’s time to take their medicine.
- **Task Management**: Allows users to track and manage various daily tasks efficiently.
- **Notification System**: Sends timely notifications and reminders for upcoming tasks, meals, and medicine intake.

## Installation

### Prerequisites

Before setting up the project, ensure you have the following installed:

- **Python**: Required for backend development using Flask.
- **Node.js**: Required for MongoDB integration and related operations.
- **MongoDB**: For database management (you can use MongoDB Atlas or set up MongoDB locally).

### Steps to Install

1. **Clone the repository**:
   First, clone the project repository to your local machine:
   ```bash
   git clone https://github.com/your-username/LIVA-PROJECT-FINAL.git

2.**Set up the Python environment**:
 Create a virtual environment:
 ```bash
 python -m venv venv

Activate the virtual environment:
On macOS/Linux:
source venv/bin/activate
On Windows:
.\venv\Scripts\activate
Install required Python packages: After activating the virtual environment, install the necessary dependencies by running the following commands:
pip install flask flask-cors google-generativeai requests
Freeze the installed dependencies: Generate a requirements.txt file for future use:
pip freeze > requirements.txt
Set the Flask app environment variable:
On macOS/Linux:
export FLASK_APP=app.py
On Windows:
set FLASK_APP=app.py
Run the Flask application: Start the Flask application to begin the avatar interaction and caregiving system:
python app.py
For MongoDB database: If you are using a Node.js application for the database, make sure you have MongoDB set up, and install Node.js dependencies:
npm install
Then, run the Node.js server:

node app.js
Additional Required Packages for Node.js:
Install required Node.js packages (if using Node.js for database or MongoDB operations):
npm install mongodb express
