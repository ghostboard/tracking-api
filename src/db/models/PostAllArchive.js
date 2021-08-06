const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    blog: {
      type: String,
      ref: "Blog"
    },
    post: {
      type: String,
      ref: "Post"
    },
    isPage: {
      type: Boolean
    },
    url: {
      type: String
    },
    avgDailyViews: {
      type: Number
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
    collection: "post_all_archive"
  }
);

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

schema.index({ blog: 1, post: 1, isPage: 1 });

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

module.exports = mongoose.model("postAllArchive", schema);
