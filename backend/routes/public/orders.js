const express = require("express");
const db = require("../../db");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const { saveImageFS } = require("../../utils/helpers");

const dotenv = require("dotenv");
dotenv.config();

module.exports = router;
