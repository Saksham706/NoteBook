const express = require('express');
const router = express.Router();
const folderController = require('../controllers/folderController');
const fetchuser = require('../middleware/fetchuser')

router.post('/create',fetchuser, folderController.createFolder);
router.get('/fetch', fetchuser,folderController.getFolders);
router.delete('/delete/:id', fetchuser, folderController.deleteFolder);

module.exports = router;