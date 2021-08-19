const mongoose = require('mongoose');
const feedbackSchema = new mongoose.Schema({
    email: {
        type: String
    },
    message: {
        type: String
    },
    page: {
        type: String
    },
    useragent: {
        type: String
    },
    ip: {
        type: String
    },
    user: {
        type: String,
        ref: 'User',
        index: true
    },
    created: {
        type: Date
    }
}, {
        collection: 'feedback'
    });

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

if (!feedbackSchema.options.toObject) {
    feedbackSchema.options.toObject = {};
}

feedbackSchema.options.toObject.transform = function(doc, ret, options) {
    if (options.hide) {
        options.hide.split(' ').forEach((prop) => {
            delete ret[prop];
        });
    }
};

module.exports = mongoose.model('Feedback', feedbackSchema);
