const express = require("express");
const db = require("../../db");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const { saveImageFS } = require("../../utils/helpers");

const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file
const FILE_SERVER_PORT = process.env.FILE_SERVER_PORT || 8080;
const FILE_SERVER_ADD = process.env.FILE_SERVER_ADDRESS || "localhost";

const assetsStore = path.join(__dirname, "../../store/assets/items");
const default_base64Image =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

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
    const image = req.body.image || default_base64Image;
    if (!image) {
      console.log("No image provided");
      return res.status(400).json({ error: "No image provided" });
    }

    // Save the image and await its result
    const imageLoc = await saveImageFS(image, product_id);

    const description = req.body.description || "No description provided";
    const price = req.body.price || 0;
    const stock_quantity = req.body.stock_quantity || 0;
    const stock_threshold = req.body.stock_threshold || 0;
    const category_id = req.body.category_id || "No category provided";

    console.log("Image Location: ", imageLoc);

    const sql =
      "INSERT INTO `products`(`product_id`, `product_name`, `image`, `description`, `price`, `stock_quantity`, `stock_threshold`, `category_id`) VALUES (?,?,?,?,?,?,?,?)";

    // Execute the query
    db.query(
      sql,
      [
        product_id,
        product_name,
        imageLoc,
        description,
        price,
        stock_quantity,
        stock_threshold,
        category_id,
      ],
      (err, result) => {
        if (err) {
          console.log("Inventory Post | ERROR: ", err);
          return res
            .status(500)
            .json({ error: "Error inserting product to database" });
        }

        res.status(200).json({
          product_id,
          product_name,
          description,
          price,
          stock_quantity,
          stock_threshold,
          category_id,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error inserting product to database" });
  }
});

router.get("/", async (req, res) => {
  try {
    const sql = "SELECT * FROM products";

    db.query(sql, async (err, result) => {
      if (err) {
        console.log("INventory Get | ERROR: ", err);
        return res
          .status(500)
          .json({ error: "Error retrieving all data from database" });
      }

      try {
        const promises = result.map(async (item) => {
          try {
            item.image = `http://${FILE_SERVER_ADD}:${FILE_SERVER_PORT}/${item.image}`;
          } catch (err) {
            console.log(err);
          }
        });

        // Wait for all conversions to complete
        await Promise.all(promises);

        // Send the response with updated result
        res.status(200).json(result);
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error converting images to base64" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error retrieving all data from database" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const sql = "SELECT * FROM products WHERE product_id = ?";
    db.query(sql, [id], async (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Error retrieving data from database" });
      } else if (result.length === 0) {
        res.status(404).json({ error: "Product not found" });
      } else {
        try {
          const promises = result.map(async (item) => {
            try {
              item.image = `http://${FILE_SERVER_ADD}:${FILE_SERVER_PORT}/${item.image}`;
            } catch (err) {
              console.log(err);
            }
          });
          // Wait for all conversions to complete
          await Promise.all(promises);
          // Send the response with updated result
          res.status(200).json(result);
        } catch (err) {
          console.log(err);
          res.status(500).json({ error: "Error converting images to base64" });
        }
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Error retrieving data from database" });
  }
});

router.get("/search/:searchTerm", async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;
    const sql = "SELECT * FROM products WHERE product_name LIKE ?";
    db.query(sql, ["%" + searchTerm + "%"], async (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Error retrieving data from database" });
      } else if (result.length === 0) {
        res.status(404).json({ error: "Product not found" });
      } else {
        try {
          const promises = result.map(async (item) => {
            try {
              item.image = `http://${FILE_SERVER_ADD}:${FILE_SERVER_PORT}/${item.image}`;
            } catch (err) {
              console.log(err);
            }
          });
          // Wait for all conversions to complete
          await Promise.all(promises);
          // Send the response with updated result
          res.status(200).json(result);
        } catch (error) {
          console.log(error);
          res
            .status(500)
            .json({ error: "Error retrieving data from database" });
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error retrieving data from database" });
  }
});

router.put("/:id", async (req, res) => {
  console.log("Updating Item: ", req.body);
  try {
    const product_id = req.params.id;
    const product_name = req.body.product_name;
    const image = req.body.image;
    const description = req.body.description;
    const price = req.body.price;
    const stock_quantity = req.body.stock_quantity;
    const stock_threshold = req.body.stock_threshold;
    const category_id = req.body.category_id;
    const updatedTimestamp = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    // Save the image and await its result
    const imageLoc = await saveImageFS(image, product_id);

    const sql =
      "UPDATE products SET product_name =?, image =?, description =?, price =?, stock_quantity =?, stock_threshold =?, category_id =?, updated =? WHERE product_id =?";

    db.query(
      sql,
      [
        product_name,
        imageLoc,
        description,
        price,
        stock_quantity,
        stock_threshold,
        category_id,
        updatedTimestamp,
        product_id,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: "Error updating product in database" });
        } else {
          res.status(200).json({ message: "Product updated successfully" });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error updating product in database" });
  }
});

module.exports = router;
