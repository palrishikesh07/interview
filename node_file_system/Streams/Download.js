const express = require("express");
const fs = require('fs');
const path = require("path");
const app = express();


app.get("/download/:filename",(req,res)=>{
    const filename = req.params.filename;
    const filepath = path.join(__dirname,'',filename);

    // Check if file exists
    if(!fs.existsSync(filepath)){
        return res.status(404).json({error:"File not found"})
    }

     // Set headers for download

     res.setHeader('Content-Disposition',`attachment;filename=${filename}`);
     res.setHeader('Content-Type','application/octet-stream')

     // Stream file
     const stream  = fs.createReadStream(filepath);
     stream.pipe(res);
})




app.listen(3000, () => {
    console.log("Server is running at port 3000")
})