const mongoose = require("mongoose");
const clickSchema = new mongoose.Schema(
  {
    blog: {
      type: String,
      ref: "Blog"
    },
    visit: {
      type: String,
      ref: "Visit"
    },
    origin: {
      type: String
    },
    target: {
      type: String
    },
    title: {
      type: String
    },
    text: {
      type: String
    },
    image: {
      type: String
    },
    created: {
      type: Date
    }
  },
  {
    collection: "clicks"
  }
);

clickSchema.index({ blog: 1, created: -1, origin: 1, target: 1 });
clickSchema.index({ blog: 1, created: -1, title: 1, text: 1, image:1 });

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

if (!clickSchema.options.toObject) {
  clickSchema.options.toObject = {};
}
clickSchema.options.toObject.transform = function (doc, ret, options) {
  if (options.hide) {
    options.hide.split(" ").forEach(prop => {
      delete ret[prop];
    });
  }
};

module.exports = mongoose.model("Click", clickSchema);
