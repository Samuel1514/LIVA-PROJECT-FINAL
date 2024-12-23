let reminderCount = 3;

function showFeature(feature) {
    const featureTitle = document.getElementById('featureTitle');
    const featureDescription = document.getElementById('featureDescription');
    const avatarContainer = document.getElementById('avatarContainer');
    const video = document.getElementById('introVideo');
    
    if (avatarContainer) avatarContainer.remove();

    if (feature === 'avatarInteraction') {
        featureTitle.innerText = 'Chat with Liva';
        featureDescription.innerHTML = `
    <p>Liva, your caring digital companion, is here to listen, help, and keep you company just like family. 
    Imagine having a friendly conversation with someone who knows and cares about you.</p>
    <div class="avatar-container" id="avatarContainer">
        <div class="avatar-display">
            <img src="https://t3.ftcdn.net/jpg/06/17/13/26/360_F_617132669_YptvM7fIuczaUbYYpMe3VTLimwZwzlWf.jpg" alt="Avatar Loading">
        </div>
        <p>What would you like to share or ask today? Just type below, and I'll be here to chat!</p>
        <div class="typing-bar">
            <input type="text" placeholder="Type your message here..." id="userMessage">
            <button onclick="sendMessage()">Send</button>
        </div>
    </div>
`;

        document.getElementById('avatarContainer').style.display = 'block';
    } else if (feature === 'reminder') {
        featureTitle.innerText = 'Reminder';
        featureDescription.innerHTML = `
            <p>Stay on track with meals and medicines!</p>
            <div id="reminderContainer">
                ${generateReminders()}
            </div>
            <button onclick="addReminder()">Add Another Reminder</button>
            <button onclick="saveReminders()">Save Changes</button>
        `;
    } else if (feature === 'medicalAssistance') {
        featureTitle.innerText = 'Symptom Checker & Medicine Recommendation';
        featureDescription.innerHTML = `
            <p>Describe your symptoms, and I’ll recommend potential conditions and suitable medicines.</p>
            <div id="symptomChecker">
                <label for="symptomsInput">Enter Symptoms:</label><br>
                <textarea id="symptomsInput" placeholder="e.g., headache, fever, cough"></textarea><br>
                <button onclick="checkSymptoms()">Check Symptoms</button>
            </div>
            <div id="symptomResult" style="margin-top: 20px; display: none;">
                <h3>Possible Conditions:</h3>
                <ul id="conditionsList"></ul>
                <h3>Recommended Medicines:</h3>
                <ul id="medicineList"></ul>
            </div>
        `;
    } else if (feature === 'exerciseSuggestion') {
        featureTitle.innerText = 'Exercise Suggestion';
        featureDescription.innerHTML = `
            <p>Welcome! Choose your fitness level to see the exercises tailored to you.</p>
            <label for="fitnessLevel">Select Level:</label>
            <select id="fitnessLevel" onchange="showExercises()">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="pro">Pro</option>
            </select>
            <div id="exerciseGrid" style="display: none; margin-top: 20px;"></div>
        `;
    } else {
        featureTitle.innerText = 'Feature Coming Soon';
        featureDescription.innerHTML = `<p>This feature is under development. Please check back later!</p>`;
    }
}

function generateReminders() {
    let reminders = '';
    for (let i = 1; i <= reminderCount; i++) {
        reminders += `
            <div class="meal" id="reminder${i}">
                <h3>Reminder ${i}</h3>
                <label>Time: <input type="time"></label><br>
                <label>Type: 
                    <select>
                        <option>Meal</option>
                        <option>Medicine</option>
                    </select>
                </label><br>
                <label>Additional Notes:</label><br>
                <textarea placeholder="e.g., light breakfast or medicine instructions"></textarea>
            </div>
        `;
    }
    return reminders;
}

function addReminder() {
    reminderCount++;
    const reminderContainer = document.getElementById('reminderContainer');
    const newReminder = document.createElement('div');
    newReminder.className = 'meal';
    newReminder.id = `reminder${reminderCount}`;
    newReminder.innerHTML = `
        <h3>Reminder ${reminderCount}</h3>
        <label>Time: <input type="time"></label><br>
        <label>Type: 
            <select>
                <option>Meal</option>
                <option>Medicine</option>
            </select>
        </label><br>
        <label>Additional Notes:</label><br>
        <textarea placeholder="e.g., evening snack or take with water"></textarea>
    `;
    reminderContainer.appendChild(newReminder);
}

function saveReminders() {
    alert("Reminders saved successfully!");
}

function sendMessage() {
    const userMessage = document.getElementById('userMessage').value;
    alert(`You: ${userMessage}\nLiva: Thanks for sharing!`);
}

function checkSymptoms() {
    const symptoms = document.getElementById('symptomsInput').value.toLowerCase();
    const conditionsList = document.getElementById('conditionsList');
    const medicineList = document.getElementById('medicineList');
    const symptomResult = document.getElementById('symptomResult');

    const conditions = {
        migraine: {
            symptoms: ['headache', 'nausea', 'sensitivity to light'],
            medicines: ['Paracetamol', 'Ibuprofen']
        },
        flu: {
            symptoms: ['fever', 'cough', 'body ache', 'fatigue'],
            medicines: ['Antihistamines', 'Paracetamol']
        },
        diabetes: {
            symptoms: ['frequent urination', 'excessive thirst', 'blurred vision'],
            medicines: ['Metformin', 'Insulin']
        },
        hypertension: {
            symptoms: ['high blood pressure', 'dizziness', 'chest pain'],
            medicines: ['Amlodipine', 'Losartan']
        },
        anemia: {
            symptoms: ['fatigue', 'pale skin', 'shortness of breath'],
            medicines: ['Iron Supplements', 'Folic Acid']
        }
    };

    conditionsList.innerHTML = '';
    medicineList.innerHTML = '';
    symptomResult.style.display = 'block';

    let foundConditions = [];
    for (const [condition, data] of Object.entries(conditions)) {
        if (data.symptoms.some(symptom => symptoms.includes(symptom))) {
            foundConditions.push(condition);
            conditionsList.innerHTML += `<li>${condition.charAt(0).toUpperCase() + condition.slice(1)}</li>`;
            data.medicines.forEach(medicine => {
                medicineList.innerHTML += `<li>${medicine}</li>`;
            });
        }
    }

    if (foundConditions.length === 0) {
        conditionsList.innerHTML = `<li>No matching conditions found. Please consult a doctor.</li>`;
    }
}

function showExercises() {
    const fitnessLevel = document.getElementById('fitnessLevel').value;
    const exerciseGrid = document.getElementById('exerciseGrid');
    const exercises = {
        beginner: [
            'Push-ups', 'Squats', 'Plank', 'Jumping Jacks', 'Lunges', 'Sit-ups'
        ],
        intermediate: [
            'Burpees', 'Pull-ups', 'Mountain Climbers', 'Bicycle Crunches', 'Deadlifts', 'Dips'
        ],
        pro: [
            'Handstand Push-ups', 'One-arm Push-ups', 'Pistol Squats', 'Muscle-ups', 'Front Lever', 'Planche'
        ]
    };

    exerciseGrid.innerHTML = exercises[fitnessLevel]
        .map(exercise => `<div class="exercise-item" onclick="showExerciseDetails('${exercise}')">${exercise}</div>`)
        .join('');
    exerciseGrid.style.display = 'grid';
    exerciseGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    exerciseGrid.style.gap = '10px';
}

function showExerciseDetails(exercise) {
    const exerciseDetails = {
        'Push-ups': '1. Get into a plank position. 2. Lower your body. 3. Push up back to start.',
        'Squats': '1. Stand straight. 2. Lower your hips. 3. Return to standing.',
        'Plank': '1. Get into a push-up position. 2. Keep back straight. 3. Hold position.',
        'Jumping Jacks': '1. Jump spreading legs. 2. Raise arms. 3. Return to start.',
        'Lunges': '1. Step forward. 2. Lower hips. 3. Push back up.',
        'Sit-ups': '1. Lie on your back. 2. Lift upper body. 3. Return slowly.',
        'Burpees': '1. Start in standing. 2. Drop into a squat. 3. Jump back to plank, return, jump up.',
        'Pull-ups': '1. Grab bar. 2. Pull up. 3. Lower back.',
        'Mountain Climbers': '1. Get into plank. 2. Bring knee to chest. 3. Alternate legs.',
        'Bicycle Crunches': '1. Lie back. 2. Lift knees. 3. Touch opposite elbow to knee.',
        'Deadlifts': '1. Grab bar. 2. Lift by straightening hips. 3. Return.',
        'Dips': '1. Support yourself. 2. Lower body. 3. Push back up.',
        'Handstand Push-ups': '1. Kick up against wall. 2. Lower and press up.',
        'One-arm Push-ups': '1. Feet wide. 2. Hand under shoulder. 3. Lower, push up.',
        'Pistol Squats': '1. Extend leg. 2. Squat down. 3. Return.',
        'Muscle-ups': '1. Pull-up. 2. Transition to dip. 3. Push-up.',
        'Front Lever': '1. Grip bar. 2. Hold body straight. 3. Lift legs up.',
        'Planche': '1. Lean forward. 2. Support weight on hands. 3. Extend body.'
    };

    const details = exerciseDetails[exercise] || 'No details available for this exercise.';
    alert(`Exercise Details for ${exercise}:\n\n${details}`);
}





function showExercises() {
    const fitnessLevel = document.getElementById('fitnessLevel').value;
    const exerciseGrid = document.getElementById('exerciseGrid');
    const exercises = {
        beginner: [
            { name: 'Push-ups', img: 'https://blog.nasm.org/hs-fs/hubfs/pushup-with-band.jpg?width=1000&name=pushup-with-band.jpg' },
            { name: 'Squats', img: 'https://images.ctfassets.net/hjcv6wdwxsdz/KT4PpNyA0f5BM0u9o6oPH/8bf552d8c327f777e7d9cb28904e7615/squats-claudia-hold.png' },
            { name: 'Plank', img: 'https://wellnessed.com/wp-content/uploads/2022/12/plank-exercise.jpg' },
            { name: 'Jumping Jacks', img: 'https://thumbs.dreamstime.com/b/woman-doing-jumping-jacks-exercise-flat-vector-woman-doing-jumping-jacks-exercise-flat-vector-illustration-isolated-white-223249502.jpg' },
            { name: 'Lunges', img: 'https://www.verywellfit.com/thmb/Jp7w6dQ-t07BNVWOMOP7YafFdQc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Lunges_unannotated1-399b9230f4154a30ad89034ba260fc1b.jpg' },
            { name: 'Sit-ups', img: 'https://media.istockphoto.com/id/848741194/vector/woman-who-was-fat-doing-sit-up-on-mat.jpg?s=612x612&w=0&k=20&c=mDXYaHqWQqHdTVwS_xjiY0Z6wsFTrImFCnTEJxdyXyI=' }
        ],
        intermediate: [
            { name: 'Burpees', img: 'https://rachellawfitness.com/wp-content/uploads/2020/02/burpee-2.jpg' },
            { name: 'Pull-ups', img: 'https://hips.hearstapps.com/hmg-prod/images/u05-bottomhalfwaytop-ism-mh310118-1558552383.jpg' },
            { name: 'Mountain Climbers', img: 'https://rejuvage.com/wp-content/uploads/2019/07/iStock-957699448.jpg' },
            { name: 'Bicycle Crunches', img: 'https://media.istockphoto.com/id/957699402/vector/woman-doing-abdominal-workout-with-bicycle-crunch-for-exercise-guide.jpg?s=612x612&w=0&k=20&c=lY-2nGOHjMbrxBuoS3Jxvi2FEgkkmOc9IwVGunk6zvs=' },
            { name: 'Deadlifts', img: 'https://optimalhealth.fit/df_media/W1siZiIsIjIwMjQvMDIvMjgvMDIvMzgvMDYvZGNjOTYzZmItZTFhMS00NTA4LTk5NDktYjY4MDQ2YTRlYzllL2RlYWRsaWZ0LWZvcm0tMzAweDIzNC5qcGciXSxbInAiLCJ0aHVtYiIsIjE1MDB4Nzg0XHUwMDNlIl1d/deadlift-form-300x234.jpg?sha=72073db444c66ff2' },
            { name: 'Dips', img: 'https://www.wikihow.com/images/thumb/e/e4/Do-Dips-Step-2.jpeg/v4-460px-Do-Dips-Step-2.jpeg' }
        ],
        pro: [
            { name: 'Handstand Push-ups', img: 'https://hips.hearstapps.com/hmg-prod/images/mh-stickmen-5-64cba2814d1be.png' },
            { name: 'One-arm Push-ups', img: 'https://athleanx.com/wp-content/uploads/2015/06/BLOG-IMAGES_0009_1-ARM-PUSH-UP.jpg' },
            { name: 'Pistol Squats', img: 'https://www.spotebi.com/wp-content/uploads/2015/05/pistol-squat-exercise-illustration.jpg' },
            { name: 'Muscle-ups', img: 'https://i0.wp.com/workoutlabs.com/wp-content/uploads/watermarked/Muscle_Up.png?w=1360' },
            { name: 'Front Lever', img: 'https://cdn.climbing.com/wp-content/uploads/2022/10/SI202002260710_news-scaled.jpg' },
            { name: 'Planche', img: 'https://cdn.shopify.com/s/files/1/0568/6280/2107/files/Straddle_planche_480x480.jpg?v=1693406244' }
        ]
    };

    exerciseGrid.innerHTML = exercises[fitnessLevel]
        .map(exercise => `
            <div class="exercise-item" onclick="showExerciseDetails('${exercise.name}')">
                <img src="${exercise.img}" alt="${exercise.name}" style="width: 100%; height: auto;"/>
                <p>${exercise.name}</p>
            </div>
        `)
        .join('');
    
    exerciseGrid.style.display = 'grid';
    exerciseGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    exerciseGrid.style.gap = '10px';
}

function showExerciseDetails(exercise) {
    const exerciseDetails = {
        'Push-ups': '1. Get into a plank position. 2. Lower your body. 3. Push up back to start.',
        'Squats': '1. Stand straight. 2. Lower your hips. 3. Return to standing.',
        'Plank': '1. Get into a push-up position. 2. Keep back straight. 3. Hold position.',
        'Jumping Jacks': '1. Jump spreading legs. 2. Raise arms. 3. Return to start.',
        'Lunges': '1. Step forward. 2. Lower hips. 3. Push back up.',
        'Sit-ups': '1. Lie on your back. 2. Lift upper body. 3. Return slowly.',
        'Burpees': '1. Start in standing. 2. Drop into a squat. 3. Jump back to plank, return, jump up.',
        'Pull-ups': '1. Grab bar. 2. Pull up. 3. Lower back.',
        'Mountain Climbers': '1. Get into plank. 2. Bring knee to chest. 3. Alternate legs.',
        'Bicycle Crunches': '1. Lie back. 2. Lift knees. 3. Touch opposite elbow to knee.',
        'Deadlifts': '1. Grab bar. 2. Lift by straightening hips. 3. Return.',
        'Dips': '1. Support yourself. 2. Lower body. 3. Push back up.',
        'Handstand Push-ups': '1. Kick up against wall. 2. Lower and press up.',
        'One-arm Push-ups': '1. Feet wide. 2. Hand under shoulder. 3. Lower, push up.',
        'Pistol Squats': '1. Extend leg. 2. Squat down. 3. Return.',
        'Muscle-ups': '1. Pull-up. 2. Transition to dip. 3. Push-up.',
        'Front Lever': '1. Grip bar. 2. Hold body straight. 3. Lift legs up.',
        'Planche': '1. Lean forward. 2. Support weight on hands. 3. Extend body.'
    };

    const details = exerciseDetails[exercise] || 'No details available for this exercise.';
    alert(`Exercise Details for ${exercise}:\n\n${details}`);
}