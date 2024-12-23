const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const webPush = require('web-push');

const app = express();
const port = 3000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'templates')));

// MongoDB connection
const mongoURI = 'mongodb+srv://abhinayk9393:Abhinay%237@cluster0.7hs27.mongodb.net/formDB?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Schema definition
const formSchema = new mongoose.Schema({
  time: String,
  type: String,
  notes: String,
  subscription: {
    endpoint: String,
    keys: {
      p256dh: String,
      auth: String,
    },
  },
});

const Form = mongoose.model('Form', formSchema);

// VAPID keys setup
const vapidKeys = {
  publicKey: 'BG9S6nJaNcpdZ2H2ViKCn_yf5xG27A5skDkJ8yg3h38KUWO6JK5MFXxdSuLyrf9rb-x-msv3BIm11t9na2iTAos',
  privateKey: 'OJwX7Mp7VOskC0qz4-xK2etbkPf5sOuFUCesxLXF0S0',
};

webPush.setVapidDetails(
  'mailto:example@yourdomain.org',  // The email is used for VAPID key registration
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// Route to serve the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'product.html'));
});
// Route to save form data and subscription
app.post('/submit', async (req, res) => {
  const { time, type, notes, subscription } = req.body;

  if (!subscription || !subscription.endpoint) {
    return res.status(400).send('Invalid subscription object.');
  }

  try {
    const formData = new Form({ time, type, notes, subscription });
    await formData.save();
    res.status(201).send('Form data and subscription saved successfully!');
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).send('Error saving form data.');
  }
});


// Route to get form data (for testing or front-end integration)
app.get('/reminders', async (req, res) => {
  try {
    const reminders = await Form.find();
    res.status(200).json(reminders);
  } catch (error) {
    console.error('Error fetching reminders:', error);
    res.status(500).send('Error fetching reminders.');
  }
});

// Route to handle subscription data (web push)
app.post('/subscribe', async (req, res) => {
  const { subscription } = req.body;
  if (!subscription || !subscription.endpoint) {
    return res.status(400).send('Invalid subscription object.');
  }

  try {
    const existingSubscription = await Form.findOne({ 'subscription.endpoint': subscription.endpoint });

    if (!existingSubscription) {
      const formData = new Form({ subscription });
      await formData.save();
      res.status(201).send('Subscription saved successfully!');
    } else {
      res.status(200).send('Already subscribed');
    }
  } catch (error) {
    console.error('Error saving subscription:', error);
    res.status(500).send('Error saving subscription.');
  }
});

// Periodic check for reminders
setInterval(async () => {
  const currentTime = new Date().toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  console.log(`Checking for reminders at time: ${currentTime}`);

  try {
    const reminders = await Form.find({ time: currentTime });
    if (reminders.length === 0) {
      console.log('No reminders found for this time.');
      return;
    }

    reminders.forEach((reminder) => {
      const notificationPayload = {
        notification: {
          title: `Reminder for ${reminder.type}`,
          body: `It's time for ${reminder.type}. Notes: ${reminder.notes}`,
          icon: 'icon.png',
        },
      };

      // Send push notification for each reminder
      webPush.sendNotification(reminder.subscription, JSON.stringify(notificationPayload))
        .then(() => console.log(`Notification sent for ${reminder.type}`))
        .catch((err) => console.error('Error sending notification:', err));
    });
  } catch (error) {
    console.error('Error checking reminders:', error);
  }
}, 60000); // Check every minute

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
