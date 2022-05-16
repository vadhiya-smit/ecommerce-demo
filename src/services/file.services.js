const { Files } = require("../models")
const sharp = require("sharp")
const path = require("path")
const fs = require("fs")

const getFiles = async () => {
    const files = await Files.find()
    return files
}

const uploadFile = async (req) => {
    
    if (req.files) {
        req.files.map(async item => {
            const { filename: image } = item;
            await sharp(item.path)
                //.resize(200, 200)
                .jpeg({ quality: 50 })
                .toFile(
                    path.resolve(item.destination, "thumbs", "thumb_" + image)
                )
        })
        const data = req.files.map(item => {
            const { filename: image } = item;

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
        const response = await Files.create(await data)
        return response
    } else {
        const { filename: image } = req.file;
        await sharp(req.file.path)
        //.resize(200, 200)
        .jpeg({ quality: 50 })
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
        const response = await Files.create(await data)
        return response
    }

    //console.log(await data)
    return response
}

module.exports = {
    getFiles,
    uploadFile
}