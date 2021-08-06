const mongoose = require('mongoose');
const resetTokenSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: 'User',
    index: true
  },
  type: {
    type: String,
    index: true
  },
  email: {
    type: String
  },
  prevEmail: {
    type: String
  },
  prevSalt: {
    type: String
  },
  prevPwd: {
    type: String
  },
  useragent: {
    type: String
  },
  ip: {
    type: String
  },
  completed: {
    type: Date
  },
  created: {
    type: Date
  }
}, {
    collection: 'reset_tokens'
  });

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

if (!resetTokenSchema.options.toObject) {
  resetTokenSchema.options.toObject = {};
}

resetTokenSchema.options.toObject.transform = function(doc, ret, options) {
  if (options.hide) {
    options.hide.split(' ').forEach((prop) => {
      delete ret[prop];
    });
  }
};

module.exports = mongoose.model('ResetToken', resetTokenSchema);
