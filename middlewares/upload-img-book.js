const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const local = path.join(__dirname, '../public/img-books')
      cb(null, local)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) =>{
      cb(null, true);
  }
})

module.exports = upload