const multer = require('multer') // helps with downloading files in http requests

const MIME_TYPES = { // dictionnary of image types (to use below  )
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

const storage = multer.diskStorage({ // store image on disk with multer
    // where to store
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    // what type of file
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_') // remove all spaces, replace with _
        const extension = MIME_TYPES[file.mimetype]
        callback(null, name + Date.now() + '.' + extension)
    }
})

module.exports = multer({ storage }).single('image')