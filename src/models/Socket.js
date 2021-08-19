const mongoose = require('mongoose');
const socketSchema = new mongoose.Schema({
  userId: {
    type: String,
    index: true
  },
  blogId: {
    type: String,
    index: true
  },
  socketId: {
    type: String,
    index: true
  },
  space: {
    type: String,
    index: true
  },
  created: {
    type: Date,
    index: true
  }
}, {
  collection: 'sockets'
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

if (!socketSchema.options.toObject) {
  socketSchema.options.toObject = {};
}

socketSchema.options.toObject.transform = function (doc, ret, options) {
  if (options.hide) {
    options.hide.split(' ').forEach((prop) => {
      delete ret[prop];
    });
  }
};

module.exports = mongoose.model('Socket', socketSchema);
