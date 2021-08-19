const mongoose = require('mongoose');
const blogFilterSchema = new mongoose.Schema({
  blog: {
    type: String,
    ref: 'Blog'
  },
  user: {
    type: String,
    ref: 'User'
  },
  ip: {
    type: String
  },
  visible: {
    type: Boolean,
    default: true
  },
  ownIP: {
    type: Boolean
  },
  teamIP: {
    type: Boolean
  },
  created: {
    type: Date
  },
  deleted: {
    type: Date
  }
}, {
  collection: 'blog_filters'
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

const indexes = {
  blog: 1, ip: 1, visible: 1
};
blogFilterSchema.index(indexes);

if (!blogFilterSchema.options.toObject) {
  blogFilterSchema.options.toObject = {};
}

blogFilterSchema.options.toObject.transform = function (doc, ret, options) {
  if (options.hide) {
    options.hide.split(' ').forEach((prop) => {
      delete ret[prop];
    });
  }
};

module.exports = mongoose.model('BlogFilter', blogFilterSchema);
