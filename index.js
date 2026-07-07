const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("HELLO FROM RENDER");
});

app.get("/test", (req, res) => {
    res.send("TEST OK");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("SERVER STARTED");
});