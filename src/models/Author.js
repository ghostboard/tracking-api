const mongoose = require('mongoose');
const authorSchema = new mongoose.Schema({
  id: {
    type: String,
    index: true
  },
  blog: {
    type: String,
    ref: 'Blog',
    index: true
  },
  name: {
    type: String
  },
  slug: {
    type: String
  },
  profileImage: {
    type: String
  },
  updated: {
    type: Date
  },
  totalPosts: {
    type: Number
  },
  totalViews: {
    type: Number
  },
  searchViews: {
    type: Number
  },
  socialViews: {
    type: Number
  },
  avgViewsPost: {
    type: Number
  },
  avgWordsPost: {
    type: Number
  },
  avgReadingTime: {
    type: Number
  },
  cacheUpdated: {
    type: Date,
    index: true
  }
}, {
    collection: 'authors'
  });

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

if (!authorSchema.options.toObject) {
  authorSchema.options.toObject = {};
}

authorSchema.options.toObject.transform = function(doc, ret, options) {
  if (options.hide) {
    options.hide.split(' ').forEach((prop) => {
      delete ret[prop];
    });
  }
};

module.exports = mongoose.model('Author', authorSchema);
