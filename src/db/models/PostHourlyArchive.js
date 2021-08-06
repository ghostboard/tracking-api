const mongoose = require("mongoose");
const postHourlyArchive = new mongoose.Schema(
  {
    blog: {
      type: String,
      ref: "Blog"
    },
    post: {
      type: String,
      ref: "Post"
    },
    ts: {
      type: Date
    },
    isPage: {
      type: Boolean
    },
    url: {
      type: String
    },
    avgViewTime: {
      type: Number
    },
    viewsFromSearch: {
      type: Number
    },
    viewsFromSocial: {
      type: Number
    },
    viewsFromPaid: {
      type: Number
    },
    viewsFromEmail: {
      type: Number
    },
    viewsFromOthers: {
      type: Number
    },
    viewsFromInternal: {
      type: Number
    },
    totalViews: {
      type: Number
    },
    queries: {
      type: String
    },
    referers: {
      type: String
    },
    countries: {
      type: String
    },
    archived: {
      type: Date
    }
  },
  {
    collection: "post_hourly_archive"
  }
);

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

postHourlyArchive.index({ blog: 1, post: 1, ts: 1, isPage: 1 });

if (!postHourlyArchive.options.toObject) {
  postHourlyArchive.options.toObject = {};
}
postHourlyArchive.options.toObject.transform = function (doc, ret, options) {
  if (options.hide) {
    options.hide.split(" ").forEach(prop => {
      delete ret[prop];
    });
  }
};

module.exports = mongoose.model("postHourlyArchive", postHourlyArchive);
