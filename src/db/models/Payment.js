const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: 'User',
    index: true
  },
  blog: {
    type: String,
    ref: 'Blog',
    index: true
  },
  plan: {
    type: String,
    ref: 'Plan',
    index: true
  },
  chargeId: {
    type: String,
    unique: true,
    index: true
  },
  amount: {
    type: Number
  },
  planAmount: {
    type: Number
  },
  paid: {
    type: Boolean,
    default: false,
    index: true
  },
  status: { // succeeded
    type: String
  },
  invoiceNumber: {
    type: Number
  },
  chargeDate: {
    type: Date,
    index: true
  },
  invoiceDate: {
    type: Date
  },
  confirmed: {
    type: Boolean,
    default: false,
    index: true
  },
  country: {
    type: String
  },
  vatPercent: {
    type: Number
  },
  vatAmount: {
    type: Number
  },
  isEur: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date
  }
}, {
  collection: 'payments'
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

if (!paymentSchema.options.toObject) {
  paymentSchema.options.toObject = {};
}

paymentSchema.options.toObject.transform = function (doc, ret, options) {
  if (options.hide) {
    options.hide.split(' ').forEach((prop) => {
      delete ret[prop];
    });
  }
};

module.exports = mongoose.model('Payment', paymentSchema);
