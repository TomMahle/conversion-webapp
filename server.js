// https://levelup.gitconnected.com/how-to-setup-environment-using-react-webpack-express-babel-d5f1b572b678
const path = require("path");
const express = require("express");
const app = express();

app.use(express.static("public")); 
app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname + "/public/index.html"));
});
app.listen(3000);