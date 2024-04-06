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
const fs = require("fs");

const assetsStore = path.join(__dirname, "store/assets");

console.log(assetsStore);
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
    console.log("New Item Received: ", req.body);
    const product_id = req.body.product_id || Date.now().toString();
    const product_name =
      req.body.product_name || "item-" + Date.now().toString();

    const image = req.body.image;

    const saveImage = async (image) => {
      const imageName = uuidv4() + path.extname(product_id);
      const imagePath = path.join(assetsStore, imageName);
      fs.writeFile(imagePath, image.buffer);
      return imageName;
    };

    const description = req.body.description || "No description provided";
    const price = req.body.price || 0;
    const stock_quantity = req.body.stock_quantity || 0;
    const stock_threshold = req.body.stock_threshold || 0;
    const category_id = req.body.category || "No category provided";

    const sql =
      "INSERT INTO products (product_id, product_name, image, description, price, stock_quantity, stock_threshold, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    try {
      db.query(sql, [
        product_id,
        product_name,
        image, // call image function to get image value
        description,
        price,
        stock_quantity,
        stock_threshold,
        category_id,
      ]);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error inserting product to database" });
    }

    res.status(200).json({
      product_id,
      product_name,
      image: image, // return image from function
      description,
      price,
      stock_quantity,
      stock_threshold,
      category_id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error inserting product to database" });
    db.close();
  }
});

router.get("/", async (req, res) => {
  try {
    const sql = "SELECT * FROM products";
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
  } catch (err) {
    res.status(500).json({ error: "Error retrieving all data from database" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const sql = "SELECT * FROM products WHERE product_id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Error retrieving data from database" });
      } else if (result.length === 0) {
        res.status(404).json({ error: "Product not found" });
      } else {
        res.status(200).json(result[0]);
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Error retrieving data from database" });
  }
});

router.put("/:id", async (req, res) => {
  console.log("Updating Item: ", req.body);
  try {
    const id = req.params.id;
    const product_name = req.body.product_name;
    const image = req.body.image;
    const description = req.body.description;
    const price = req.body.price;
    const stock_quantity = req.body.stock_quantity;
    const stock_threshold = req.body.stock_threshold;
    const category_id = req.body.category_id;
    const updatedTimestamp = Date.now();

    const sql =
      "UPDATE products SET product_name =?, image =?, description =?, price =?, stock_quantity =?, stock_threshold =?, category_id =?, updated =? WHERE product_id =?";

    db.query(
      sql,
      [
        product_name,
        image,
        description,
        price,
        stock_quantity,
        stock_threshold,
        category_id,
        updatedTimestamp,
        id,
      ],
      (err, result) => {
        if (err) {
          res.status(500).json({ error: "Error updating product in database" });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Error updating product in database" });
  }
});

module.exports = router;
