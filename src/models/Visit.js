const mongoose = require("mongoose");
const visitSchema = new mongoose.Schema(
  {
    blog: {
      type: String,
      ref: "Blog"
    },
    post: {
      type: String,
      ref: "Post"
    },
    url: {
      type: String
    },
    slug: {
      type: String
    },
    useragent: {
      type: String
    },
    browser: {
      type: String
    },
    os: {
      type: String
    },
    mobile: {
      type: Boolean
    },
    tablet: {
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
    refererName: {
      type: String
    },
    hasRefererIcon: {
      type: Boolean,
      default: false
    },
    refererType: {
      type: String,
      enum: [
        "direct",
        "email",
        "search",
        "social",
        "paid",
        "internal",
        "unknown"
      ]
    },
    filterSource: {
      type: Boolean,
      default: false
    },
    UTMSource: {
      type: String
    },
    UTMMedium: {
      type: String
    },
    UTMCampaign: {
      type: String
    },
    UTMTerm: {
      type: String
    },
    UTMContent: {
      type: String
    },
    searchQuery: {
      type: String
    },
    time: {
      type: Number
    },
    ip: {
      type: String
    },
    country: {
      type: String
    },
    lang: {
      type: String
    },
    created: {
      type: Date
    },
    postCheck: {
      type: Date
    }
  },
  {
    collection: "visits"
  }
);

// const indexes = {
//   blog: 1, post: 1, url: 1, slug: 1, browser: 1, os: 1,
//   mobile: 1, tablet: 1, desktop: 1,
//   referer: 1, refererDomain: 1, refererName: 1, hasRefererIcon: 1, refererType: 1,
//   filterSource: 1, UTMSource: 1, UTMMedium: 1, UTMCampaign: 1, UTMTerm: 1, UTMContent: 1,
//   searchQuery: 1, time: 1, country: 1, lang: 1,
//   created: -1
// };
// visitSchema.index(indexes);

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

if (!visitSchema.options.toObject) {
  visitSchema.options.toObject = {};
}
visitSchema.options.toObject.transform = function (doc, ret, options) {
  if (options.hide) {
    options.hide.split(" ").forEach(prop => {
      delete ret[prop];
    });
  }
};

module.exports = mongoose.model("Visit", visitSchema);
