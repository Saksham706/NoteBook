const Folder = require('../models/Folder');
const Note = require('../models/Note')

exports.createFolder = async(req, res) =>{
    try {
        const folder = await Folder.create({ 
            name: req.body.name, 
            userId: req.user.id 
        });
        res.status(201).json(folder);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getFolders = async(req, res) => {
    try{
        const folders = await Folder.find({ userId: req.user.id});
        res.json(folders);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

exports.deleteFolder = async (req, res) => {
    try {
        await Note.deleteMany({ folderId: req.params.id, userId: req.user.id });

        const folder = await Folder.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

        if (!folder) {
            return res.status(404).json({ message: 'Folder not found or unauthorized' });
        }

        res.json({ message: 'Folder and associated notes deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};