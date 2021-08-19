const mongoose    = require('mongoose');
const trackingIdSchema  = new mongoose.Schema({
    trackerId: {
        type: String,
        index: true
    },
    isLead: {
        type: Boolean,
        default: false
    },
    isUser: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        index: true
    }
}, {
    collection: 'tracking_ids'
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

if (!trackingIdSchema.options.toObject) {
    trackingIdSchema.options.toObject = {};
}

trackingIdSchema.options.toObject.transform = function(doc, ret, options) {
    if (options.hide) {
        options.hide.split(' ').forEach((prop) => {
            delete ret[prop];
        });
    }
};

module.exports = mongoose.model('TrackerId', trackingIdSchema);
