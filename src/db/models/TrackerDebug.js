const mongoose = require('mongoose');
const trackerDebugSchema = new mongoose.Schema({
  blog: {
    type: String,
    ref: 'Blog',
    index: true
  },
  location: {
    type: String
  },
  document: {
    type: String
  },
  navigator: {
    type: String
  },
  error: {
    type: String
  },
  isError: {
    type: Boolean,
    index: true
  },
  url: {
    type: String
  },
  useragent: {
    type: String
  },
  created: {
    type: Date
  }
}, {
    collection: 'tracker_debug'
  });

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

if (!trackerDebugSchema.options.toObject) {
  trackerDebugSchema.options.toObject = {};
}

trackerDebugSchema.options.toObject.transform = function(doc, ret, options) {
  if (options.hide) {
    options.hide.split(' ').forEach((prop) => {
      delete ret[prop];
    });
  }
};

module.exports = mongoose.model('TrackerDebug', trackerDebugSchema);
