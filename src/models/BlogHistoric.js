const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  blogId: {
    type: String
  },
  userId: {
    type: String
  },
  email: {
    type: String
  },
  url: {
    type: String
  },
  signupAt: {
    type: Date
  },
  firstVisit: {
    type: Date
  },
  lastClientRequest: {
    type: Date
  },
  plan: {
    type: String,
    ref: 'Plan'
  },
  last3MonthsViews: {
    type: Number
  },
  subscriptionId: {
    type: String
  },
  created: {
    type: Date
  }
}, {
  collection: 'blog_historic'
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

const indexes = {
  blogId: 1, userId: 1
};
schema.index(indexes);

if (!schema.options.toObject) {
  schema.options.toObject = {};
}

schema.options.toObject.transform = function (doc, ret, options) {
  if (options.hide) {
    options.hide.split(' ').forEach((prop) => {
      delete ret[prop];
    });
  }
};

module.exports = mongoose.model('BlogHistoric', schema);
