const mongoose = require('mongoose');
const changelogSchema = new mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  link: {
    type: String
  },
  created: {
    type: Date
  },
  released: {
    type: Date,
    index: true
  }
}, {
    collection: 'changelog'
  });

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

if (!changelogSchema.options.toObject) {
  changelogSchema.options.toObject = {};
}

changelogSchema.options.toObject.transform = function(doc, ret, options) {
  if (options.hide) {
    options.hide.split(' ').forEach((prop) => {
      delete ret[prop];
    });
  }
};

module.exports = mongoose.model('Changelog', changelogSchema);
