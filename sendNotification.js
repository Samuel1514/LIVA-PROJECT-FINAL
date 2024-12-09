const webPush = require('web-push');
const mongoose = require('mongoose');
const Form = require('./models/Form'); // Ensure path is correct

const publicKey = 'BG9S6nJaNcpdZ2H2ViKCn_yf5xG27A5skDkJ8yg3h38KUWO6JK5MFXxdSuLyrf9rb-x-msv3BIm11t9na2iTAos';
const privateKey = 'OJwX7Mp7VOskC0qz4-xK2etbkPf5sOuFUCesxLXF0S0';

webPush.setVapidDetails('mailto:rajsamuel700600@gmail.com', publicKey, privateKey);

mongoose.connect('mongodb+srv://abhinayk9393:Abhinay%237@cluster0.7hs27.mongodb.net/formDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected!');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

async function sendReminders() {
  const now = new Date();
  const formattedTime = now.toTimeString().split(' ')[0].substring(0, 5); // HH:MM

  console.log(`Checking for reminders at time: ${formattedTime}`);  // Debug log

  const reminders = await Form.find({ time: formattedTime });
  console.log(`Found ${reminders.length} reminder(s).`);  // Debug log

  reminders.forEach((reminder) => {
    const payload = JSON.stringify({
      title: 'Reminder',
      body: `${reminder.type}: ${reminder.notes}`,
    });

    console.log('Sending notification with payload:', payload);  // Debug log

    webPush.sendNotification(reminder.subscription, payload)
      .then(() => console.log('Notification sent successfully!'))
      .catch((error) => console.error('Notification failed:', error));
  });
}

setInterval(sendReminders, 60000);  // Run every minute
console.log('Notification service started. Checking reminders every minute...');
