const express = require('express');
const router = express.Router();

exports.send = (req, res) => {
    return res.send("bienvenue dans ce api")
}