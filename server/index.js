const express = require("express");
const bodyParser = require("body-parser"); // to parse the json data
const cors = require("cors");
const multer = require("multer"); // mutler is module used for handling form data
const UserInfoCtrl = require("./controllers/UserInfo-ctrl"); // mongoose query to deal the data

const db = require("./db"); // database connection
const userInfoRouter = require("./router/userInfo-router");
const apiPort = 3001;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/src/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

app.post("/api/upload", upload.single("image"), UserInfoCtrl.UploadImage);

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("food ordering system!");
});

app.use("/api", userInfoRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
