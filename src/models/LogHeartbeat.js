const mongoose = require('mongoose');
const logHeartbeatSchema = new mongoose.Schema({
  visit: {
    type: String,
    ref: 'Visit',
    index: true
  },
  url: {
    type: String
  },
  triggerBy: {
    type: String
  },
  useragent: {
    type: String
  },
  time: {
    type: Number
  },
  ip: {
    type: String
  },
  created: {
    type: Date,
    index: true
  }
}, {
    collection: 'log_heartbeats'
  });

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

if (!logHeartbeatSchema.options.toObject) {
  logHeartbeatSchema.options.toObject = {};
}
logHeartbeatSchema.options.toObject.transform = function(doc, ret, options) {
  if (options.hide) {
    options.hide.split(' ').forEach((prop) => {
      delete ret[prop];
    });
  }
};

module.exports = mongoose.model('LogHeartbeat', logHeartbeatSchema);
