const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
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

pollSchema.pre("save", () => {
  console.log("about to save poll....");
})

pollSchema.post("save", () => {
  console.log("Poll saved!");
})

const Poll = mongoose.model("Poll", pollSchema);

module.exports = Poll;
