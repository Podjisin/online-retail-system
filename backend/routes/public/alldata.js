/**
 * @fileoverview Provides endpoint to retrieve comprehensive data for all users from various tables in the database.
 * @module routes/private/allData
 * @requires express
 * @requires ../../db
 */

const express = require("express");
const db = require("../../db");
const router = express.Router();

/**
 * Route to get all data for all users.
 * @name GET/api/allData
 * @function
 * @memberof module:routes/private/allData
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
router.get("/", (req, res) => {
  const sql = `
    SELECT * FROM categories;
    SELECT * FROM customers;
    SELECT * FROM orders;
    SELECT * FROM order_items;
    SELECT * FROM payments;
    SELECT * FROM products;
    SELECT * FROM promotions;
    SELECT * FROM shipping;
    SELECT * FROM tasks;
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: "Error retrieving all data from database" });
    } else {
      const data = {
        categories: result[0],
        customers: result[1],
        orders: result[2],
        orderItems: result[3],
        payments: result[4],
        products: result[5],
        promotions: result[6],
        shipping: result[7],
        tasks: result[8],
      };

      res.status(200).json(data);
    }
  });
});

module.exports = router;
