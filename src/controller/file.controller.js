const httpStatus = require("http-status");
const logger = require("../config/winston");
const { fileService } = require("../services");
const catchAsync = require("../utils/catchAsync");


const getFiles = catchAsync(async (req,res) => {
    const files = await fileService.getFiles()
    res.send(files)
})

const uploadFiles = catchAsync(async (req,res) => {
    const file = await fileService.uploadFile(req)
    
    res.send(file)
})


module.exports = {
    uploadFiles,getFiles
}