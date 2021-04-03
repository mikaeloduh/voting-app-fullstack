const mongoose = require('mongoose');

const { logger } = require('../core/logger');

const pollSchema = new mongoose.Schema({
  creator: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  topic: {
    type: String,
    required: true,
    unique: true
  },
  options: [{
      option: {
        type: String,
        required: true
      },
      votes: {
        type: Number,
        default: 0
      }
    }]
});

pollSchema.pre('save', () => {
  logger.log('info', 'about to save poll....', { label: 'pollSchema' });
});

pollSchema.post('save', () => {
  logger.log('info', 'Poll saved!', { label: 'pollSchema' });
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
