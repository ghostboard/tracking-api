const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    blog: {
      type: String,
      ref: "Blog"
    },
    param: {
      type: String
    },
    key: {
      type: String
    },
    ts: {
      type: Date
    },
    views: {
      type: Number  
    },
    referers: {
      type: String
    },
    urls: {
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
    collection: "utm_monthly_archive"
  }
);

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
schema.index({ blog: 1, param: 1, key: 1, ts: 1 });

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

module.exports = mongoose.model("UtmMonthlyArchive", schema);
