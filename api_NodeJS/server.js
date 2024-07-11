const express = require('express');
const cors = require("cors");
const fileupload = require("express-fileupload");
const fs = require('node:fs/promises');

const app = express();
const PORT = 7289;

app.use(cors());
app.use(fileupload());

app.get("/", (req, res)=> {
    res.send("Node server is running!");
});

app.post("/api/files/savepart", async (req, res)=> {
    
    const fileData = req.files.fileData;
    console.log("-----------------------------------------");
    console.log("name: " + fileData.name);
    console.log("part length: " + fileData.data.length);

    console.log("fileId: " + req.body.fileId);
    console.log("totalSize: " + req.body.totalSize);
    console.log("totalParts: " + req.body.totalParts);
    console.log("partNo: " + req.body.partNo);
    console.log("-----------------------------------------");    

    const filePath = "files/"+fileData.name;

    if(req.body.partNo == "1") { //Create the file and write the first part
        await fs.writeFile(filePath, fileData.data);
    }
    else {//Append to the file
        await fs.appendFile(filePath, fileData.data);
    }
    //fs.writeFile("",fileData.data,)

    res.send("Part saved.").status(200);
});

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));