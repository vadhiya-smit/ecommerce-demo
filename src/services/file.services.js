const { Files } = require("../models")
const sharp = require("sharp")
const path = require("path")
const fs = require("fs")
const pick = require("../utils/pick")

const getFiles = async () => {
    const files = await Files.find()
    return files
}

const uploadFile = async (req) => {
  
    if (req.files) {

        const data = req.files.map(item => {
            const { filename: image } = item;
            
            sharp(item.path)
               .jpeg({ quality: 30 })
               .toFile(
                   path.resolve(item.destination, "thumbs", "thumb_" + image)
               )
            return {
                file : {
                    filename: image,
                    path: item.path,

                },
                thumbnail : {
                    filename: "thumb_" + image,
                    path: "uploads/thumbs/" + "thumb_" + image
                }
            }
        })
        const response = await Files.create(data)
        return response
    } else {
        const { filename: image } = req.file;
        await sharp(req.file.path)
        .jpeg({ quality: 30 })
        .toFile(
            path.resolve(req.file.destination, "thumbs", "thumb_" + image)
        )
        const data = {
            file : {
                filename: image,
                path: req.file.path,
            },
            thumbnail : {
                filename: "thumb_" + image,
                path: "uploads/thumbs/" + "thumb_" + image
            }
        }
        const response = await Files.create(data)
        return response
    }
}

module.exports = {
    getFiles,
    uploadFile
}