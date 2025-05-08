const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    folderId: { type: mongoose.Schema.Types.ObjectId, ref:'Folder'},
    name:{ type: String, required: true},
    content:{ type: String, default:''},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }
});

module.exports = mongoose.model('Note', NoteSchema)