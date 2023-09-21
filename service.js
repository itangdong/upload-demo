const express = require("express");
const multer = require("multer");
const expressStatic = require("express-static");
const fs = require("fs");

const server = express();
const upload = multer({ dest: __dirname + '/uploads/' })

server.post('/upload', upload.single('file'), function (req, res, next) {
  console.log("file", req.file);
  // file  {
  //   fieldname: 'file',
  //   originalname: 'hi-girl.jpeg',
  //   encoding: '7bit',
  //   mimetype: 'image/jpeg',
  //   destination: '/Users/xxxx/Desktop/test/upload/uploads/',
  //   filename: '5ad6d7fa0fd8ce9e31d068dcf65664dc',
  //   path: '/Users/xxxx/Desktop/test/upload/uploads/5ad6d7fa0fd8ce9e31d068dcf65664dc',
  //   size: 485416
  // }
  fs.rename(req.file.path, req.file.destination + req.file.originalname, () => {
    res.send({ status: 200 });
  })
})

// static
server.use(expressStatic(__dirname + '/www'));
// launch
server.listen(5556, () => {
  console.log("请使用浏览器访问 http://localhost:5556/");
});
