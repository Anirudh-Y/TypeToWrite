const express = require("express");
const COLORS = require("handwritten.js/src/constants");
const app = express();
const bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))
const Router = express.Router();

app.use(Router);

const handwritten = require('handwritten.js')
const fs = require('fs')


Router.post("/", async (req, res) => {
    let rawtext = req.body.text_area;
    let filename = req.body.file_name;
    handwritten(rawtext,{inkColor : "blue"}).then((converted) => {
        converted.pipe(fs.createWriteStream(`${filename}.pdf`))
    })

    res.send("converted")

})



app.listen(3000 || process.env.PORT, (err) => {
    if (!err)
        console.log("Server running at 3000")
    else
        console.log(err);
})