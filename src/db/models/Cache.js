const mongoose = require('mongoose');
const cacheSchema = new mongoose.Schema({
  blog: {
    type: String,
    ref: 'Blog',
    index: true
  },
  report: {
    type: String,
    index: true
  },
  key: {
    type: String,
    index: true
  },
  value: {
    type: String
  },
  doing: {
    type: Boolean,
    default: false,
    index: true
  },
  periodic: {
    type: Boolean,
    default: true,
    index: true
  },
  ondemand: {
    type: Boolean,
    default: false,
    index: true
  },
  now: {
    type: Boolean,
    default: false,
    index: true
  },
  updated: {
    type: Date
  },
  start: {
    type: Date
  },
  nextUpdate: {
    type: Date,
    index: true
  },
  avgTime: {
    type: Number
  }
}, {
  collection: 'cache'
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

if (!cacheSchema.options.toObject) {
  cacheSchema.options.toObject = {};
}

cacheSchema.options.toObject.transform = function (doc, ret, options) {
  if (options.hide) {
    options.hide.split(' ').forEach((prop) => {
      delete ret[prop];
    });
  }
};

module.exports = mongoose.model('Cache', cacheSchema);
