const express = require('express')
const multer = require('multer')
const cors = require('cors')
const upload = multer({dest: 'upload/'})
const app = express()

app.get('/', (req, res, next) => {
  res.send('hello nodejs')
})
app.options('/upload', cors())
app.post('/upload', cors() , upload.single('file'), (req, res, next) => {
  console.log(req.file)
  res.send(req.file.filename)
})
app.get('/preview/:key', cors(), (req, res, next) => {
  res.sendFile(`upload/${req.params.key}`, {
    root:__dirname,
    headers: {
      'Content-Type': 'image/jped'
    }
  }, error => {
    console.log(error)
  })
})
var port = process.env.PORT || 3000

app.listen(port)