const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  time: String, 
  type: String, 
  notes: String, 
  subscription: {
    endpoint: String,
    keys: {
      p256dh: String,
      auth: String
    }
  }
});

module.exports = mongoose.model('Form', FormSchema);
