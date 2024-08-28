const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null, filename)
    },
})

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true)
    } else {
        callback(null, false)
        return callback(new Error("Ensure the image format to .png or .jpg or .jpeg"))
    }
}

const multerConfig = multer({
    storage, fileFilter
})

module.exports = multerConfig