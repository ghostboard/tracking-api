const mongoose = require('mongoose');
const postAuthorSchema = new mongoose.Schema({
  blog: {
    type: String,
    ref: 'Blog',
    index: true
  },
  post: {
    type: String,
    ref: 'Post',
    index: true
  },
  author: {
    type: String,
    ref: 'Author',
    index: true
  },
  published: {
    type: Date
  },
  updated: {
    type: Date
  }
}, {
  collection: 'post_authors'
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

postAuthorSchema.index({ blog: 1, post: 1, author: 1 });

if (!postAuthorSchema.options.toObject) {
  postAuthorSchema.options.toObject = {};
}

postAuthorSchema.options.toObject.transform = function (doc, ret, options) {
  if (options.hide) {
    options.hide.split(' ').forEach((prop) => {
      delete ret[prop];
    });
  }
};

module.exports = mongoose.model('PostAuthor', postAuthorSchema);
