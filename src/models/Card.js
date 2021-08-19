const mongoose = require('mongoose');
const cardSchema = new mongoose.Schema({
    user: {
        type: String,
        ref: 'User',
        index: true
    },
    brand: {
        type: String
    },
    last4: {
        type: Number
    },
    expMonth: {
        type: Number
    },
    expYear: {
        type: Number
    },
    created: {
        type: Date
    }
}, {
        collection: 'cards'
    });

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

if (!cardSchema.options.toObject) {
    cardSchema.options.toObject = {};
}
cardSchema.options.toObject.transform = function(doc, ret, options) {
    if (options.hide) {
        options.hide.split(' ').forEach((prop) => {
            delete ret[prop];
        });
    }
};

module.exports = mongoose.model('Card', cardSchema);
