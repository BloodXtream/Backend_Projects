const imageKit = require('../utils/imagekit')
const { v4: uuidv4 } = require("uuid");

async function uploadFile(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "NO file uploaded" })
        }

        const uniqueFileName = `${uuidv4()}`
        //upload to imagekit
        const uploadedFile = await imageKit.upload({
            file: req.file.buffer,
            fileName: uniqueFileName,
            folder: "blog_api_uploads"
        })

        res.status(200).json({
            message: "File uploaded successfully",
            url: uploadedFile.url
        })
    }
    catch (err) {
        return res.status(500).json({
            message: `Error while uploading file: ${err}`
        })
    }
}

module.exports = {
    uploadFile
}