const PORT=8080
const express = require("express")
const cors = require("cors")
const app= express()

app.use(express.json())
app.use(cors())
const path = require('path');

module.exports = {
    resolve: {
        fallback: {
            "buffer": require.resolve("buffer/")
        }
    }
};