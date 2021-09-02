const mongoose = require("mongoose");
const newsletterDailyArchive = new mongoose.Schema(
  {
    blog: {
      type: String,
      ref: "Blog"
    },
    ts: {
      type: Date,
      index: true
    },
    sent: {
      type: Number,
      default: 0
    },
    delivered: {
      type: Number,
      default: 0
    },
    failed: {
      type: Number,
      default: 0
    },
    opened: {
      type: Number,
      default: 0
    },
    spam: {
      type: Number,
      default: 0
    },
    clicked: {
      type: Number,
      default: 0
    },
    unsubscribed: {
      type: Number,
      default: 0
    },
    archived: {
      type: Date
    }
  },
  {
    collection: "newsletter_daily_archive"
  }
);

newsletterDailyArchive.index({ blog: 1, ts: -1 });

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

module.exports = mongoose.model("NewsletterDailyArchive", newsletterDailyArchive);
