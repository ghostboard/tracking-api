const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: 'User',
    index: true
  },
  url: {
    type: String,
    index: true
  },
  domain: {
    type: String
  },
  apiUrl: {
    type: String
  },
  version: {
    type: String
  },
  trackingId: {
    type: String,
    index: true
  },
  hasContentAPI: {
    type: Boolean,
    default: false
  },
  contentAPIKey: {
    type: String
  },
  adminAPIKey: {
    type: String
  },
  apiKeyValid: {
    type: Boolean
  },
  adminApiKeyValid: {
    type: Boolean
  },
  active: {
    type: Boolean,
    default: false
  },
  favicon: {
    type: String
  },
  firstVisit: {
    type: Date,
    index: true
  },
  monthlyViews: {
    type: Number
  },
  prevMonthViews: {
    type: Number
  },
  last3MonthsViews: {
    type: Number
  },
  last12MonthsViews: {
    type: Number,
    default: 0
  },
  subscriptionId: {
    type: String
  },
  subscriptionItemId: {
    type: String
  },
  setupIntentId: {
    type: String
  },
  paymentMethodId: {
    type: String
  },
  plan: {
    type: String,
    ref: 'Plan',
    index: true
  },
  nextRenew: {
    type: Date,
    index: true
  },
  renewCancelled: {
    type: Boolean,
    default: false,
    index: true
  },
  removedAt: {
    type: Date,
    index: true
  },
  hidden: {
    type: Boolean,
    index: true
  },
  cancelledAt: {
    type: Date,
    index: true
  },
  sendMonthReportEmail: {
    type: Boolean,
    default: false
  },
  sendYearReportEmail: {
    type: Boolean,
    default: false
  },
  sentNoSetupEmail: {
    type: Boolean,
    default: true
  },
  sentAfterTrialEmail: {
    type: Boolean,
    default: true
  },
  darkMode: {
    type: Boolean,
    default: false
  },
  timezone: {
    type: String
  },
  enableClient: {
    type: Boolean,
    default: true,
    index: false
  },
  lastClientRequest: {
    type: Date
  },
  lastVisit: {
    type: Date,
    index: true
  },
  lastSeen: {
    type: Date
  },
  multiblog: {
    type: Boolean,
    default: false
  },
  hasNewsletter: {
    type: Boolean,
    default: false,
    index: true
  },
  mgRegion: {
    type: String,
    default: 'US',
    index: true
  },
  mgDomain: {
    type: String,
    index: true
  },
  mgToken: {
    type: String,
    index: true
  },
  mgTokenValid: {
    type: Boolean,
    index: true
  },
  mgTrackingClick: {
    type: Boolean
  },
  mgTrackingOpen: {
    type: Boolean
  },
  mgTrackingUnsubscribe: {
    type: Boolean
  },
  trackVersion: {
    type: Number,
    index: true
  },
  filterOwnIP: {
    type: Boolean
  },
  filterTeamIP: {
    type: Boolean
  },
  mustClean: {
    type: Boolean,
    default: false,
    index: true
  },
  cleaned: {
    type: Date
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    index: true
  },
  useTLS: {
    type: Boolean,
    default: false
  }
}, {
  collection: 'blogs'
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

if (!blogSchema.options.toObject) {
  blogSchema.options.toObject = {};
}

blogSchema.options.toObject.transform = function (doc, ret, options) {
  if (options.hide) {
    options.hide.split(' ').forEach((prop) => {
      delete ret[prop];
    });
  }
};

module.exports = mongoose.model('Blog', blogSchema);
