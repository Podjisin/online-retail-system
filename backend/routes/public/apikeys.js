/**
 * @fileoverview Provides functionality to generate and store API key in the database.
 * @module routes/apikey
 * @requires express
 * @requires ../../db
 * @requires uuid
 */

const express = require("express");
const db = require("../../db");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const path = require("path");

/**
 * Route to generate and store API key.
 * @name POST/apikey
 * @function
 * @memberof module:routes/apikey
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.description - The description for the API key (optional).
 * @param {Object} res - The response object.
 */
router.post("/", async (req, res) => {
  try {
    const apiKey = uuidv4();
    const description = req.body.description || "No description provided";

    const sql = "INSERT INTO api_keys (api_key, description) VALUES (?, ?)";
    db.query(sql, [apiKey, description]);

    res.status(200).json({ apiKey, description });
  } catch (err) {
    res.status(500).json({ error: "Error generating API key" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const sql = "SELECT * FROM api_keys";
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .json({ error: "Error retrieving all data from database" });
      } else {
        res.status(200).json(result);
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error generating API key" });
  }
});

module.exports = router;
