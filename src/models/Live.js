const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    blog: {
      type: String,
      ref: "Blog"
    },
    visit: {
      type: String,
      ref: "Visit",
      index: true
    },
    url: {
      type: String
    },
    slug: {
      type: String
    },
    mobile: {
      type: Boolean
    },
    desktop: {
      type: Boolean
    },
    referer: {
      type: String
    },
    refererDomain: {
      type: String
    },
    hasRefererIcon: {
      type: Boolean,
      default: false
    },
    country: {
      type: String
    },
    created: {
      type: Date,
      index: true
    },
    exit: {
      type: Date
    }
  },
  {
    collection: "live"
  }
);

schema.index({ blog: 1, country: 1, exit: 1 });
schema.index({ blog: 1, mobile: 1, desktop: 1, exit: 1 });
schema.index({ blog: 1, url: 1, slug: 1, exit: 1 });
schema.index({ blog: 1, referer: 1, refererDomain: 1, hasRefererIcon: 1, exit: 1 });
/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

if (!schema.options.toObject) {
  schema.options.toObject = {};
}
schema.options.toObject.transform = function (doc, ret, options) {
  if (options.hide) {
    options.hide.split(" ").forEach(prop => {
      delete ret[prop];
    });
  }
};

module.exports = mongoose.model("Live", schema);
