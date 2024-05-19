const path = require("path");
const fs = require("fs");
const axios = require("axios");
const bcrypt = require("bcrypt");

const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file

const assetsStore = path.join(__dirname, "../store/assets/items");
const default_png = assetsStore + "/default.png";

const formatTimestamp = (timestamp) => {
  // Parse the timestamp string into a Date object
  const date = new Date(timestamp);

  // Options for formatting the date and time
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  // Format the date and time using the options
  const formattedDate = date.toLocaleString("en-US", options);

  return formattedDate;
};

/**
 * Saves the given base64 encoded image or image URL to the file system.
 * If the image is base64 encoded, it converts the data to a Buffer, generates a filename with a version number,
 * writes the file to disk in the assets folder, and returns the filename.
 * If the image is a URL, it downloads the image, converts it to a Buffer, generates a filename with a version number and extension,
 * writes the file to disk in the assets folder, and returns the filename.
 * Handles errors saving the file and returns the default image filename if no image is provided.
 *
 * @param {string} image - The base64 encoded image or image URL to be saved.
 * @param {string} product_id - The ID of the product the image is associated with.
 * @returns {string} The filename of the saved image.
 */

const saveImageFS = async (image, product_id) => {
  try {
    // if image is undefined, null, or empty. use the default.png
    if (!image) {
      console.log("No image provided");
      return default_png;
    }

    let buffer;
    let filename;
    if (image.startsWith("data:image")) {
      // If image is a base64-encoded image
      const version = Date.now();
      buffer = Buffer.from(
        image.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      filename = `${product_id}_version_${version}.png`;
    } else {
      // If image is a URL
      const response = await axios.get(image, {
        responseType: "arraybuffer",
      });
      buffer = Buffer.from(response.data, "binary");
      const ext = path.extname(image);
      const version = Date.now();
      filename = `${product_id}_version_${version}${ext}`;
    }

    const filepath = path.join(assetsStore, filename);
    fs.writeFileSync(filepath, buffer);
    console.log("File saved:", filepath);
    deleteOldVersions(product_id, filename);
    return filename;
  } catch (error) {
    console.error(error);
    return;
  }
};

/**
 * Deletes older versions of the image file for the given product_id.
 * Keeps only the latest version and deletes the rest.
 * @param {string} product_id - The ID of the product associated with the image files.
 * @param {string} currentFilename - The filename of the current image file.
 */
const deleteOldVersions = (product_id, currentFilename) => {
  try {
    const files = fs.readdirSync(assetsStore);
    const regex = new RegExp(`^${product_id}_version_\\d+\\.png$`);

    const oldFiles = files.filter(
      (file) => regex.test(file) && file !== currentFilename
    );

    oldFiles.forEach((file) => {
      const filePath = path.join(assetsStore, file);
      fs.unlinkSync(filePath);
      console.log("Old version deleted: ", filePath);
    });
  } catch (error) {
    console.log("Error deleting old versions: ", error);
  }
};

/**
 * Converts an image file to a base64-encoded string.
 * @param {string} image - The path to the image file.
 * @returns {Promise<string>} A Promise that resolves to the base64-encoded image data.
 */
const imageToBase64 = (image) => {
  return new Promise((resolve, reject) => {
    fs.readFile(image, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.toString("base64"));
      }
    });
  });
};

/**
 * Generates a unique username from a first and last name.
 *
 * The generated username is composed of the first character of the first name,
 * the first character of the last name, and a random 6-digit number.
 *
 * @param {string} firstname - The first name to use in the username.
 * @param {string} lastname - The last name to use in the username.
 * @returns {string} The generated username.
 */
const generateUsername = (firstname, lastname) => {
  firstname = firstname.toLowerCase();
  lastname = lastname.toLowerCase();
  const random = Math.floor(Math.random() * 1000000);
  return firstname[0] + lastname[0] + random;
};

/**
 * Generates a random 6-digit password.
 * @returns {number} A random 6-digit password.
 */
const generatePassword = () => {
  const random = Math.floor(Math.random() * 1000000);
  return random;
};

/**
 * Hashes a password using bcrypt.
 * @param {string} password - The password to be hashed.
 * @returns {Promise<string>} A Promise that resolves to the hashed password.
 */
const hashPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

/**
 * Compares a raw password with a hashed password.
 * @param {string} raw - The raw, unhashed password.
 * @param {string} hash - The hashed password to compare against.
 * @returns {Promise<boolean>} A Promise that resolves to true if the raw password matches the hashed password, false otherwise.
 */
const comparePassword = async (raw, hash) => {
  const isMatch = await bcrypt.compare(raw, hash);
  return isMatch;
};

module.exports = {
  saveImageFS,
  deleteOldVersions,
  imageToBase64,
  generateUsername,
  generatePassword,
  hashPassword,
  comparePassword,
};
