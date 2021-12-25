const mongoose    = require('mongoose');
const logSchema  = new mongoose.Schema({
  code: {
    type: String
  },
  title: {
    type: String
  },
  location: {
    type: String
  },
  data: {
    type: String
  },
  isError: {
    type: Boolean
  },
  created: {
    type: Date,
  }
}, {
  collection: 'logs'
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

if (!logSchema.options.toObject) {
  logSchema.options.toObject = {};
}

logSchema.options.toObject.transform = function(doc, ret, options) {
  if (options.hide) {
    options.hide.split(' ').forEach((prop) => {
      delete ret[prop];
    });
  }
};

module.exports = mongoose.model('Log', logSchema);
