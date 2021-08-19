const mongoose = require('mongoose');
const planSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true
  },
  desc: {
    type: String
  },
  views: {
    type: Number
  },
  monthly: {
    type: Boolean,
    default: true
  },
  annually: {
    type: Boolean,
    default: true
  },
  total: {
    type: Number
  },
  active: {
    type: Boolean,
    default: false,
    index: true
  },
  tier: {
    type: String,
    index: true
  },
  version: {
    type: String,
    index: true
  },
  label: {
    type: String
  },
  order: {
    type: Number,
    index: true
  },
  overlayClass: {
    type: String
  },
  onlyEarlyAdopter: {
    type: Boolean,
    default: false,
    index: true
  },
  created: {
    type: Date
  }
}, {
  collection: 'plans'
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

if (!planSchema.options.toObject) {
  planSchema.options.toObject = {};
}
planSchema.options.toObject.transform = function(doc, ret, options) {
  if (options.hide) {
    options.hide.split(' ').forEach((prop) => {
      delete ret[prop];
    });
  }
};

module.exports = mongoose.model('Plan', planSchema);
