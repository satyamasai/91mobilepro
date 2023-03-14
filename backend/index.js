const express = require("express");
const app = express();

const cors = require("cors");
const { connection } = require("./Config/db");
const { userController } = require("./Routes/user.routes");
const multer = require("multer");
const fs = require('fs')
const path = require('path');

app.use(express.json());
app.use(cors());


// upload middleware----------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });


// const upload = multer({ dest: './uploads' });
// ------------------------------
app.get("/", (req, res) => {
  res.send("Welcome to 91mobile app");
});

app.use("/user", userController);


// Serve static files from the 'public' directory
app.use(express.static("./uploads"));

// Route to serve PDF files
app.get('/pdf/:filename', (req, res) => {
   
    const { filename } = req.params;
    const filePath = path.join(filename);
    res.sendFile(filePath, { root: "./uploads" });
   
    // response.setHeader(filePath, filePath)
    // res.send({filePath})
  });
  

app.post("/upload", upload.single("file"), (req, res) => {
 
  console.log(req.body);
  console.log(req.file);

  res.send({ msg: "success" });
});

// ------user dashboard---------
app.get("/dashboard",(req,res)=>{
  
    const folderPath = './uploads';
    const files = fs.readdirSync(folderPath);
      res.json(files);
      res.send({"Data":files})

})


// ------------delete file----------------
app.delete("/delete/:filename", async (req, res) => {
    let {filename} = req.params
    console.log(filename,"filename");
    try{

        fs.unlinkSync(`./uploads/${filename}`)
        res.send({ "msg": "File has been deleted" })
    }
    catch(err){
res.send({"msg":"something went wrong"})
    }
    

})




// ---------------------------------------

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Database connected...");
    console.log("LISTENING ON PORT 8080...");
  } catch (err) {
    console.log("!! Database connection failed...");
    console.log(err);
  }
});
