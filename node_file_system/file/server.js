const express = require("express");
const multer = require("multer");
const path = require('path');
const fs = require("fs");

const app = express();

// Create upload directory if doesn't exist

if (!fs.existsSync("./uploads")) {
    fs.mkdir("./uploads",()=>{});
}

//Configure storage

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("files",file)
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        //Generate unique filename: timestamp-filename
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
})

// File filter

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg","image/jpg", "image/jpeg", "image/png", "image/gif"];

    console.log(file?.mimetype)
    if (allowedTypes.includes(file?.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error('Only images are allowed'), false)
    }
}

// Create multer instance

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024// 5MB
    }
})

// Single File upload

app.post("/api/upload/single", upload.single('photo'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    return res.json({
        message: 'File uploaded successfully',
        file: {
            filename: req.file.filename,
            originalname: req.file.originalname,
            size: req.file.size,
            path: req.file.path
        }
    })
})


app.post("/api/upload/multiple", upload.array('photos', 5), (req, res) => {
    console.log(req);
    if (!req.files) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const fileDetails= req.files.map(file=>({
        filename:file.filename,
        originalname:file.originalname,
        size:file.size
    }))

    res.json({
        message:`${req.files.length} files uploaded successfully`,
        files:fileDetails
    })
})

// Serve uploded files
app.use('/uploads',express.static("uploads"));

// Error handler for multer

app.use((err,req,res,next)=>{
    if(err instanceof multer.MulterError){
        if(err.code === 'LIMIT_FILE_SIZE'){
            return res.status(400).json({error:'File too large'})
        }
        if(err.code === "LIMIT_FILE_COUNT"){
            return res.status(400).json({error:"Too many files"})
        }
    }
    res.status(500).json({error:err.message});
})


app.listen(3000,()=>{
    console.log("Server is running at 3000")
})
