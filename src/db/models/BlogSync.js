const mongoose = require('mongoose');
const blogSyncSchema = new mongoose.Schema({
  blog: {
    type: String,
    ref: 'Blog'
  },
  fetchingAPIData: {
    type: Boolean,
    default: false
  },
  fetchingLinks: {
    type: Boolean,
    default: false
  },
  fetchingMailgun: {
    type: Boolean,
    default: false
  },
  lastAPIFetch: {
    type: Date
  },
  lastAPICompleted: {
    type: Date
  },
  lastCompleted: {
    type: Date
  },
  lastMailgunStarted: {
    type: Date
  },
  lastMailgunCompleted: {
    type: Date
  },
  authorsStarted: {
    type: Date
  },
  authorsCompleted: {
    type: Date
  },
  tagsStarted: {
    type: Date
  },
  tagsCompleted: {
    type: Date
  },
  pagesStarted: {
    type: Date
  },
  pagesCompleted: {
    type: Date
  },
  postsStarted: {
    type: Date
  },
  postsCompleted: {
    type: Date
  },
  postsAvgTime: {
    type: Number
  },
  linksStarted: {
    type: Date
  },
  linksCompleted: {
    type: Date
  },
  linksAvgTime: { // minutes
    type: Number
  },
  lastError: {
    type: Date
  },
  error: {
    type: String
  }
}, {
  collection: 'blog_sync'
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

const indexes = {
  blog: 1, fetchingAPIData: 1,
  fetchingLinks: 1, fetchingMailgun: 1,
  lastMailgunStarted: 1,
  lastAPIFetch: 1, lastAPICompleted: 1,
  authorsStarted: 1, authorsCompleted: 1,
  tagsStarted: 1, tagsCompleted: 1,
  pagesStarted: 1, pagesCompleted: 1,
  postsStarted: 1, postsCompleted: 1,
  linksStarted: 1, linksCompleted: 1,
  lastError: 1
};
blogSyncSchema.index(indexes);

if (!blogSyncSchema.options.toObject) {
  blogSyncSchema.options.toObject = {};
}

blogSyncSchema.options.toObject.transform = function (doc, ret, options) {
  if (options.hide) {
    options.hide.split(' ').forEach((prop) => {
      delete ret[prop];
    });
  }
};

module.exports = mongoose.model('BlogSync', blogSyncSchema);
