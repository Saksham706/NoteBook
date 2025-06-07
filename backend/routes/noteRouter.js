const express = require('express');
const router  = express.Router();
const noteController = require('../controllers/noteController');
const fetchuser = require('../middleware/fetchuser'); 

router.get("/", (req, res) => {
  res.send("Note route is working");
});

router.post('/create', fetchuser, noteController.createNote);
router.get('/folder/:folderId', fetchuser, noteController.getNotesbyfolder);
router.put('/:id', fetchuser, noteController.updateNote);
router.delete('/:id', fetchuser, noteController.deleteNote); 

module.exports = router;
