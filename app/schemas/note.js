const mongoose = require('mongoose');

let noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
);

noteSchema.index({ 'title': 'text', 'body': 'text' })

module.exports = mongoose.model('Note', noteSchema);