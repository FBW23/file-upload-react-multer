const express = require('express');
const upload = require('../middleware/upload');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});


/**
 * FRONTEND
 * 
 * <input type="file" name="user_image" /> => this field_name we have to use 1:1 when applying the multer middleware
 * => the file info will be made available in the req.file object
 */

router.post('/upload', upload.single("user_image"), (req, res, next) => {

  // req.body // => normal JSON data
  // req.file // => meta info of uploaded file will be stored here
  res.send(req.file)
})

module.exports = router;
