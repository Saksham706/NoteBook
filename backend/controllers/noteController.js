const Note = require('../models/Note');

exports.createNote = async (req, res) => {
    try {
      const note = await Note.create({
        ...req.body,
        userId: req.user.id
      });
      res.status(201).json(note);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

exports.getNotesbyfolder = async(req,res)=>{
    try{ 
        const notes = await Note.find({ folderId: req.params.folderId, userId: req.user.id});
        res.json(notes);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

exports.updateNote = async (req, res) => {
    try {
      const note = await Note.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id }, 
        req.body,                                    
        { new: true }                                
      );
  
      if (!note) {
        return res.status(404).json({ message: 'Note not found or unauthorized' });
      }
  
      res.json(note);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

  exports.deleteNote = async (req, res) => {
    try {
      const note = await Note.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.id,
      });
  
      if (!note) {
        return res.status(404).json({ message: 'Note not found or unauthorized' });
      }
  
      res.json({ message: 'Note deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  