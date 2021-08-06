const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    blog: {
      type: String,
      ref: "Blog"
    },
    name: {
      type: String
    },
    domain: {
      type: String
    },
    ts: {
      type: Date
    },
    views: {
      type: Number  
    },
    urls: {
      type: String
    },
    countries: {
      type: String
    },
    queries: {
      type: String
    },
    archived: {
      type: Date
    }
  },
  {
    collection: "ref_daily_archive"
  }
);

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
schema.index({ blog: 1, ts: 1, name: 1 });
schema.index({ blog: 1, ts: 1, domain: 1 });

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

module.exports = mongoose.model("RefDailyArchive", schema);
