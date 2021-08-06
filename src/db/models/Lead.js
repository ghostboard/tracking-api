const mongoose = require('mongoose');
const leadSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  campaign: {
    type: String
  },
  plan: {
    type: String,
    ref: 'Plan',
    index: true
  },
  name: {
    type: String
  },
  useragent: {
    type: String
  },
  ip: {
    type: String
  },
  timezone: {
    type: String
  },
  referrer: {
    type: String
  },
  available: {
    type: Boolean,
    default: true
  },
  trackerId: {
    type: String
  },
  created: {
    type: Date
  }
}, {
    collection: 'leads'
  });

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

if (!leadSchema.options.toObject) {
  leadSchema.options.toObject = {};
}

leadSchema.options.toObject.transform = function(doc, ret, options) {
  if (options.hide) {
    options.hide.split(' ').forEach((prop) => {
      delete ret[prop];
    });
  }
};

module.exports = mongoose.model('Lead', leadSchema);
