const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    byUser: {
      type: String,
      ref: "User"
    },
    byManager: {
      type: String,
      ref: "Manager"
    },
    email: {
      type: String
    },
    emailSent: {
      type: String
    },
    password: {
      type: String
    },
    salt: {
      type: String
    },
    active: {
      type: Boolean,
      default: false
    },
    lastSeen: {
      type: Date
    },
    created: {
      type: Date
    },
    deleted: {
      type: Date
    }
  },
  {
    collection: "managers"
  }
);

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
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

module.exports = mongoose.model("Manager", schema);
