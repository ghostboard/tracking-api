const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
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
  url: {
    type: String
  },
  urlLength: {
    type: Number
  },
  invalidSlug: {
    type: Boolean,
    default: false
  },
  page: {
    type: Boolean,
    default: false
  },
  muteSEO: {
    type: Boolean,
    default: false
  },
  featImage: {
    type: String
  },
  metaTitleLength: {
    type: Number
  },
  metaDescLength: {
    type: Number
  },
  wordsCount: {
    type: Number
  },
  firstVisit: {
    type: Date
  },
  publishedDays: { // From the first visit
    type: Number
  },
  views: {
    type: Number
  },
  avgDailyViews: {
    type: Number
  },
  avgViewTime: {
    type: Number
  },
  published: {
    type: Date
  },
  flagCronUpdated: {
    type: Date
  },
  synced: {
    type: Date
  },
  updated: {
    type: Date
  },
  created: {
    type: Date
  }
}, {
  collection: 'posts'
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

// const indexes = {
//   id: 1, blog: 1, url: 1, urlLength: 1,
//   invalidSlug: 1, page: 1, muteSEO: 1,
//   featImage: 1, metaTitleLength: 1, metaDescLength: 1,
//   views: 1, avgDailyViews: 1, avgViewTime: 1,
//   published: 1, flagCronUpdated: 1, updated: 1
// };

// postSchema.index(indexes);

if (!postSchema.options.toObject) {
  postSchema.options.toObject = {};
}

postSchema.options.toObject.transform = function (doc, ret, options) {
  if (options.hide) {
    options.hide.split(' ').forEach((prop) => {
      delete ret[prop];
    });
  }
};

module.exports = mongoose.model('Post', postSchema);
