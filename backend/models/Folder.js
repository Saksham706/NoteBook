const mongoose = require('mongoose');

const FolderSchema = new mongoose.Schema({
    name:{ type: String, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }
});

module.exports  = mongoose.model('Folder', FolderSchema)
