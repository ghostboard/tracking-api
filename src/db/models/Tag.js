const mongoose = require('mongoose');
const tagSchema = new mongoose.Schema({
  id: {
    type: String
  },
  blog: {
    type: String,
    ref: 'Blog'
  },
  title: {
    type: String
  },
  slug: {
    type: String
  },
  timesUsed: {
    type: Number
  },
  totalViews: {
    type: Number
  },
  avgViewTime: {
    type: Number
  },
  createdBy: {
    type: String
  },
  created: {
    type: Date
  },
  updated: {
    type: Date
  },
  statsUpdated: {
    type: Date
  },
  muteReport: {
    type: Boolean,
    default: false
  }
}, {
  collection: 'tags'
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

const indexes = {
  id: 1, blog: 1,
  timesUsed: 1, totalViews: 1, avgViewTime: 1,
  updated: 1, statsUpdated: 1, muteReport: 1
};
tagSchema.index(indexes);

if (!tagSchema.options.toObject) {
  tagSchema.options.toObject = {};
}

tagSchema.options.toObject.transform = function (doc, ret, options) {
  if (options.hide) {
    options.hide.split(' ').forEach((prop) => {
      delete ret[prop];
    });
  }
};

module.exports = mongoose.model('Tag', tagSchema);
