const mongoose = require('mongoose');
const blogArchiveSchema = new mongoose.Schema({
  blog: {
    type: String,
    ref: 'Blog'
  },
  doingTime: {
    type: Boolean,
    default: false
  },
  doingPosts: {
    type: Boolean,
    default: false
  },
  lastTimeHourCompleted: {
    type: Date
  },
  lastTimeDayCompleted: {
    type: Date
  },
  lastTimeMonthCompleted: {
    type: Date
  },
  lastTimeYearCompleted: {
    type: Date
  },
  lastPostHourCompleted: {
    type: Date
  },
  lastPostDayCompleted: {
    type: Date
  },
  lastPostMonthCompleted: {
    type: Date
  },
  lastPostYearCompleted: {
    type: Date
  },
  timeAvgTime: {
    type: Number
  },
  postsAvgTime: {
    type: Number
  },
  lastError: {
    type: Date
  },
  error: {
    type: String
  }
}, {
  collection: 'blog_archive'
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
blogArchiveSchema.index(indexes);

if (!blogArchiveSchema.options.toObject) {
  blogArchiveSchema.options.toObject = {};
}

blogArchiveSchema.options.toObject.transform = function (doc, ret, options) {
  if (options.hide) {
    options.hide.split(' ').forEach((prop) => {
      delete ret[prop];
    });
  }
};

module.exports = mongoose.model('BlogArchive', blogArchiveSchema);
