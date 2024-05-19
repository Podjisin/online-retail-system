const express = require("express");
const db = require("../../db");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const {
  hashPassword,
  comparePassword,
  generateUsername,
  generatePassword,
} = require("../../utils/helpers");
const dotenv = require("dotenv");
dotenv.config();

router.post("/register", async (req, res) => {
  try {
    const customer_id = Date.now();
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const phone_number = req.body.phone_number;
    const address = req.body.address;

    const credentials_id = Date.now();
    const username =
      req.body.username || generateUsername(first_name, last_name);
    const hashedPassword = await hashPassword(
      req.body.password || generatePassword
    );

    const customerSql = `INSERT INTO customers (customer_id, first_name, last_name, email, phone_number, address) VALUES (?,?,?,?,?,?) `;
    const credentialsSql = `INSERT INTO customer_credentials (credentials_id, user_id, username, password) VALUES (?,?,?,?)`;

    if (
      !first_name ||
      !last_name ||
      !email ||
      !phone_number ||
      !address ||
      !username ||
      !hashedPassword
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const [customerResult] = await db
      .promise()
      .query(customerSql, [
        customer_id,
        first_name,
        last_name,
        email,
        phone_number,
        address,
      ]);

    const [credentialsResult] = await db
      .promise()
      .query(credentialsSql, [
        credentials_id,
        customer_id,
        username,
        hashedPassword,
      ]);

    if (!customerResult || !credentialsResult) {
      return res.status(500).json({
        error: "Error inserting customer to database",
      });
    }
    res.status(201).json({
      message: "Customer created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error inserting product to database" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const sql = `SELECT * FROM credentials WHERE username =?`;
    const [result] = await db.promise().query(sql, [username]);
    if (!result[0]) {
      return res.status(401).json({
        error: "Invalid username or password",
      });
    }
    const validPassword = await comparePassword(password, result[0].password);
    if (!validPassword) {
      return res.status(401).json({
        error: "Invalid username or password",
      });
    }
    const customerSql = `SELECT * FROM customers WHERE customer_id =?`;
    const [customerResult] = await db
      .promise()
      .query(customerSql, [result[0].customer_id]);
    if (!customerResult) {
      return res.status(500).json({
        error: "Error retrieving customer from database",
      });
    }
    res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error logging in" });
  }
});

router.get("/", async (req, res) => {
  try {
    const sql = "SELECT * FROM customers";
    const [result] = await db.promise().query(sql);
    if (!result) {
      return res.status(500).json({
        error: "Error retrieving all data from database",
      });
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error retrieving all data from database" });
  }
});

router.get("/details/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        error: "Customer ID is required",
      });
    }
    const id = req.params.id;
    const retrieveCustomerSql = `SELECT * FROM customers WHERE customer_id =?`;
    const retrieveAccountDetailsSql = `SELECT credentials_id, username FROM customer_credentials WHERE user_id =?`;
    const retrieveCustomerOrdersSql = `SELECT * FROM orders WHERE customer_id =?`;

    const [customerResult] = await db
      .promise()
      .query(retrieveCustomerSql, [id]);

    const [accountDetailsResult] = await db
      .promise()
      .query(retrieveAccountDetailsSql, [id]);

    const [customerOrderDetailsResult] = await db
      .promise()
      .query(retrieveCustomerOrdersSql, [id]);
    if (!customerResult) {
      return res.status(500).json({
        error: "Error retrieving customer from database",
      });
    }

    const data = {
      details: {
        customer_id: customerResult[0].customer_id,
        first_name: customerResult[0].first_name,
        last_name: customerResult[0].last_name,
        email: customerResult[0].email,
        phone_number: customerResult[0].phone_number,
        address: customerResult[0].address,
        created: customerResult[0].created,
        updated: customerResult[0].updated,
        account_details: {
          credentials_id: accountDetailsResult[0].credentials_id,
          username: accountDetailsResult[0].username,
        },
        order_details: customerOrderDetailsResult,
      },
    };
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Error retrieving customer from database",
    });
  }
});

module.exports = router;
