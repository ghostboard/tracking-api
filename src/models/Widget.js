const mongoose    = require('mongoose');
const widgetSchema  = new mongoose.Schema({
  blog: {
    type: String,
    ref: 'Blog',
    index: true
  },
  type: {
    type: String,
    index: true
  },
  active: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date
  },
  lastRequest: {
    type: Date
  },
  disabled: {
    type: Date
  }
}, {
  collection: 'widgets'
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

if (!widgetSchema.options.toObject) {
  widgetSchema.options.toObject = {};
}

widgetSchema.options.toObject.transform = function(doc, ret, options) {
  if (options.hide) {
    options.hide.split(' ').forEach((prop) => {
      delete ret[prop];
    });
  }
};

module.exports = mongoose.model('Widget', widgetSchema);
