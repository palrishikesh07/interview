const express = require("express");
const fs = require('fs');
const app = express();
const path = require("path");

const { Transform } = require("stream");
const zlib = require("zlib");

app.use(express.json());
// Copy large file efficiently

function copyFile(source, destination) {
    const readStream = fs.createReadStream(source);
    const writeStream = fs.createWriteStream(destination);

    readStream.pipe(writeStream);

    writeStream.on('error', (err) => {
        console.log('Error copying file: ', err);
    })

    writeStream.on('finish', () => {
        console.log("File copied successfully");
    })
}


app.post('/api/copy-file', (req, res) => {
    const { source, destination } = req.body;
    copyFile(source, destination);
    res.json({ message: "File copying " });
})


// Create transform stream to uppercase text
const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase())
        callback();
    }
})


app.get('/uppercase-file', (req, res) => {
    const filepath = path.join(__dirname, '', 'input.txt');
    fs.createReadStream(filepath)
        .pipe(upperCaseTransform) // Transform to uppercase
        .pipe(res); // Send to client

})


// Compressing Files with Streams

// Decompress file
app.get('/decompress/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, '', filename);
  
  fs.createReadStream(filepath)
    .pipe(zlib.createGunzip())
    .pipe(res);
});


app.get("/gzip/:filename", (req, res) => {

    // Prevent path traversal
    const fileName = path.basename(req.params.filename);

    const filePath = path.join(__dirname, "", fileName);

    // Check file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({
            error: "File not found"
        });
    }

    // Response headers
    res.setHeader(
        "Content-Type",
        "application/gzip"
    );

    res.setHeader(
        "Content-Disposition",
        `attachment; filename="${fileName}.gz"`
    );

    // Create streams
    const readStream = fs.createReadStream(filePath);

    const gzip = zlib.createGzip();

    // Pipe streams
    readStream
        .pipe(gzip)
        .pipe(res);

    // Error handling
    readStream.on("error", (err) => {
        console.log(err);

        res.status(500).json({
            error: "File stream error"
        });
    });
});







app.listen(3000, () => {
    console.log("Server is running at port 3000")
})