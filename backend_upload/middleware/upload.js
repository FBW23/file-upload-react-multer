const multer = require("multer")

/// configuring multer for setting custom filenames
const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, done) => {
    console.log(file)
    done(null, req.user._id)
  }
})

const upload = multer({ storage })

module.exports = upload