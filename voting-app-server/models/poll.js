const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  creater: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  options: [{
    name: {
      type: String,
      required: true,
      unique: true
    },
    votes: {
      type: Number,
      default: 0
    }
  }]
});

const Poll = mongoose.model("Poll", userSchema);

module.exports = Poll;
