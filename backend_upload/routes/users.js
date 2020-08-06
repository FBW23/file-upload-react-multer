const express = require('express');
const jwt = require('jsonwebtoken');
const upload = require('../middleware/upload');
const router = express.Router();

const db = {
  users: [
    {_id: "12345", email: "user1@dci.com", password: "pw1" },
    {_id: "67890", email: "user2@dci.com", password: "pw2" }
  ]
}

const JWT_SECRET = "holySecret123"


// authenticate user
router.post('/login', (req, res, next) => {

  let { email, password } = req.body
  let users = db.users

  let userFound = users.find(user => user.email == email && user.password == password)

  if(!userFound) {
    return next("User with that credentials not found")
  }
  
  let token = jwt.sign({ _id: userFound._id, email: userFound.email }, JWT_SECRET)
  console.log("Token: ", token)

  // store in cookie and send
  res
    .cookie("token", token, { maxAge: 1000*60*15 })
    .send({ user: {...userFound, password: undefined}}) // send user and omit password field
})

// AUTH MIDDLEWARE => SECURITY AGENT
const auth = (req, res, next) => {
  next()
}

router.get('/me', (req, res, next) => {
  // TODO: serve data of the user
})

router.get('/me/image', (req, res, next) => {
  // TODO: serve avatar image of the user
})

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});


/**
 * FRONTEND FILE UPLOAD * 
 * <input type="file" name="user_image" /> => this field_name we have to use 1:1 when applying the multer middleware
 * so in this case: upload.single("user_image")
 */

 // upload.single("field_name_from_frontend")
router.post('/upload', upload.single("user_image"), (req, res, next) => {

  // req.body // => normal JSON data
  // req.file // => meta info of uploaded file will be stored here
  res.send(req.file)
})

module.exports = router;
