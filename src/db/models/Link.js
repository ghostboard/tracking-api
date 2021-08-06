const mongoose = require("mongoose");
const linkSchema = new mongoose.Schema(
  {
    blog: {
      type: String,
      ref: "Blog",
      index: true
    },
    origin: {
      type: String
    },
    target: {
      type: String,
      index: 'text'
    },
    isInternal: {
      type: Boolean
    },
    reason: {
      type: String
    },
    checkedAt: {
      type: Date
    }
  },
  {
    collection: "links"
  }
);

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

const indexes = {
  blog: 1, isInternal: 1,
  reason: 1, checkedAt: 1
};
linkSchema.index(indexes);

if (!linkSchema.options.toObject) {
  linkSchema.options.toObject = {};
}
linkSchema.options.toObject.transform = function (doc, ret, options) {
  if (options.hide) {
    options.hide.split(" ").forEach(prop => {
      delete ret[prop];
    });
  }
};

module.exports = mongoose.model("Link", linkSchema);
