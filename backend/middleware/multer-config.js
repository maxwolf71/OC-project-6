// helps with downloading files in http requests
const multer = require('multer')

// dictionnary of image types (to use below  )
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}
// store image on disk with multer
const storage = multer.diskStorage({
    // where to store
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    // what type of file
    filename: (req, file, callback) => {
        // remove all spaces, replace with _
        const name = file.originalname.split(' ').join('_')
        const extension = MIME_TYPES[file.mimetype]
        callback(null, name + Date.now() + '.' + extension)
    }
})


module.exports = multer({ storage }).single('image')