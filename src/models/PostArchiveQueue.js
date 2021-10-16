const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  blog: {
    type: String,
    ref: 'Blog'
  },
  post: {
    type: String,
    ref: 'Post'
  },
  doing: {
    type: Boolean,
    default: false
  },
  priority: {
    type: Number
  },
  ts: {
    type: Date
  },
  hour: {
    type: Boolean,
    default: false
  },
  day: {
    type: Boolean,
    default: false
  },
  dayByHours: {
    type: Boolean,
    default: false
  },
  month: {
    type: Boolean,
    default: false
  },
  year: {
    type: Boolean,
    default: false
  },
  time: {
    type: Number
  },
  error: {
    type: String
  },
  created: {
    type: Date
  },
  completed: {
    type: Date
  }
}, {
  collection: 'post_archive_queue'
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

schema.index({ blog: 1, doing: 1, completed: 1, priority: 1, ts: 1 });

if (!schema.options.toObject) {
  schema.options.toObject = {};
}

schema.options.toObject.transform = function (doc, ret, options) {
  if (options.hide) {
    options.hide.split(' ').forEach((prop) => {
      delete ret[prop];
    });
  }
};

module.exports = mongoose.model('PostArchiveQueue', schema);
