const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String
  },
  salt: {
    type: String
  },
  name: {
    type: String
  },
  lang: {
    type: String,
    enum: ['es', 'en'],
    default: 'en',
    required: true
  },
  referrer: {
    type: String,
    ref: 'User'
  },
  country: {
    type: String
  },
  timezone: {
    type: String
  },
  isEU: {
    type: Boolean,
    default: false
  },
  vatPercent: {
    type: Number
  },
  validTaxId: {
    type: Boolean
  },
  lastVatIdChecked: {
    type: String
  },
  lastVatIdAt: {
    type: Date
  },
  billingTaxId: {
    type: String
  },
  billingName: {
    type: String
  },
  billingAddress1: {
    type: String
  },
  billingAddress2: {
    type: String
  },
  billingCountry: {
    type: String
  },
  stripeId: {
    type: String
  },
  trackerId: {
    type: String
  },
  emailSubscribed: {
    type: Boolean,
    default: true
  },
  trialDays: {
    type: Number
  },
  trialEndsAt: {
    type: Date
  },
  earlyAdopter: {
    type: Boolean
  },
  enableClient: {
    type: Boolean,
    default: true,
    index: false
  },
  active: {
    type: Boolean,
    default: true
  },
  mustClean: {
    type: Boolean,
    default: false,
    index: true
  },
  firstVisit: {
    type: Date
  },
  last3MonthsAvgViews: {
    type: Number
  },
  sentAfterTrialEmail: {
    type: Boolean,
    default: false
  },
  cleaned: {
    type: Date
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
    ref: 'Plan'
  },
  nextRenew: {
    type: Date
  },
  renewCancelled: {
    type: Boolean,
    default: false
  },
  cancelledAt: {
    type: Date
  },
  lastPayOk: {
    type: Boolean
  },
  created: {
    type: Date
  },
  updated: {
    type: Date
  },
  lastSeen: {
    type: Date
  }
}, {
    collection: 'users'
  });

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
const indexes = {
  email: 1, subscriptionId: 1,
  plan: 1, nextRenew: 1, renewCancelled: 1,
  firstVisit: 1, sentAfterTrialEmail:1, cancelledAt: 1
};
userSchema.index(indexes);

if (!userSchema.options.toObject) {
  userSchema.options.toObject = {};
}

userSchema.options.toObject.transform = function(doc, ret, options) {
  if (options.hide) {
    options.hide.split(' ').forEach((prop) => {
      delete ret[prop];
    });
  }
};

module.exports = mongoose.model('User', userSchema);
