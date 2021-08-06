const mongoose = require('mongoose');
const postTagSchema = new mongoose.Schema({
  blog: {
    type: String,
    ref: 'Blog'
  },
  post: {
    type: String,
    ref: 'Post'
  },
  tag: {
    type: String,
    ref: 'Tag'
  },
  updated: {
    type: Date
  }
}, {
  collection: 'post_tags'
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
postTagSchema.index({ blog: 1, post: 1, tag: 1 });

if (!postTagSchema.options.toObject) {
  postTagSchema.options.toObject = {};
}

postTagSchema.options.toObject.transform = function (doc, ret, options) {
  if (options.hide) {
    options.hide.split(' ').forEach((prop) => {
      delete ret[prop];
    });
  }
};

module.exports = mongoose.model('PostTag', postTagSchema);
