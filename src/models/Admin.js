var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var adminSchema = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    name: {
        type: String
    },
    role: {
        type: String
    },
    created: {
        type: Date
    }
}, {
    collection: 'admins'
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */


module.exports = mongoose.model('Admin', adminSchema);
