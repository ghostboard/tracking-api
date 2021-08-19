const mongoose = require('mongoose');
const publicDashboardSchema = new mongoose.Schema({
  blog: {
    type: String,
    ref: 'Blog',
    index: true
  },
  title: {
    type: String
  },
  showInsights: {
    type: Boolean,
    default: false
  },
  showLive: {
    type: Boolean,
    default: false
  },
  showMonth: {
    type: Boolean,
    default: false
  },
  showYear: {
    type: Boolean,
    default: false
  },
  showExplore: {
    type: Boolean,
    default: false
  },
  showLinks: {
    type: Boolean,
    default: false
  },
  showSources: {
    type: Boolean,
    default: false
  },
  showSEO: {
    type: Boolean,
    default: false
  },
  showAuthors: {
    type: Boolean,
    default: false
  },
  showPosts: {
    type: Boolean,
    default: false
  },
  showTags: {
    type: Boolean,
    default: false
  },
  showReaders: {
    type: Boolean,
    default: false
  },
  password: {
    type: String
  },
  salt: {
    type: String
  },
  visible: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  created: {
    type: Date
  },
  deleted: {
    type: Date
  }
}, {
  collection: 'public_dashboards'
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

if (!publicDashboardSchema.options.toObject) {
  publicDashboardSchema.options.toObject = {};
}

publicDashboardSchema.options.toObject.transform = function (doc, ret, options) {
  if (options.hide) {
    options.hide.split(' ').forEach((prop) => {
      delete ret[prop];
    });
  }
};

module.exports = mongoose.model('PublicDashboard', publicDashboardSchema);
