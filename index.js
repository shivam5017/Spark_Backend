const express = require("express");
const connection = require("./config/db")
const app = express();
const cors = require("cors");
const PostRouter =require("./Routes/post.routes")
const path= require("path");
require("dotenv").config();
const bodyParser = require('body-parser');

app.use(cors())

app.use(express.json());
app.use(bodyParser.json());


app.use("/post",PostRouter)
app.use('/uploads',express.static('uploads'));
app.get("*", (req, res) => {
    res.status(404).json("not found")
})

const port = process.env.PORT || 8001
app.listen(port, async () => {
    try {
        await connection;
        console.log("connected to mongoDb");
    } catch (error) {
        console.log(error);
    }
    console.log(`server is running at port: ${port}`);
})