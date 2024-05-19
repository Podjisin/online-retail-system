const fs = require("fs");
const path = require("path");
const logName = `${new Date().toISOString().slice(0, 10)}.log`;
const logFolder = path.join(__dirname, "../logs");
const logFile = path.join(logFolder, logName);
const db = require("../db");
/**
 * @name createFile
 * @description Creates a new log file if it doesn't already exist.
 */

const createFile = () => {
  if (!fs.existsSync(logFolder)) {
    fs.mkdirSync(logFolder, { recursive: true });
  }

  if (!fs.existsSync(logFile)) {
    fs.writeFileSync(logFile, "", "utf8");
  }
};

const dateNow = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

const getApiKeyType = async (apiKey) => {
  const sql = `SELECT type FROM api_keys WHERE api_key = ?`;
  const params = [apiKey];
  try {
    db.query(sql, params, (err, result) => {
      if (err || result.length === 0) {
        console.error(err);
        return "invalid";
      } else {
        console.log(result[0].type);
        return result[0].type;
      }
    });
  } catch (error) {
    console.error(error);
  }
};

// const getApiKeyType = async (apiKey) => {
//   const sql = `SELECT type FROM api_keys WHERE api_key = ?`;
//   const params = [apiKey];
//   try {
//     const [rows] = await db.query(sql, params);
//     if (rows.length > 0) {
//       return rows[0].type;
//     } else {
//       return "invalid";
//     }
//   } catch (error) {
//     console.error(error);
//     return "invalid";
//   }
// };

/**
 * @name logRequest
 * @description Middleware function for logging incoming requests.
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 * @param {*} next - The next middleware function.
 */

const logRequest = async (req, res, next) => {
  createFile();

  // console.log(req);
  const apiKey = req.headers["x-api-key"];
  const apiKeyType = await getApiKeyType(apiKey);
  // Log request details to the log file

  // const logMessage = `[${dateNow()}] - API Key: ${apiKey} - Type: ${apiKeyType} - URL: ${
  //   req.originalUrl
  // } - Method: ${req.method}`;

  const logMessage = `[${dateNow()}] - API Key: ${apiKey} - URL: ${
    req.originalUrl
  } - Method: ${req.method}`;

  res.on("finish", () => {
    const statusCode = res.statusCode;
    const granted =
      statusCode >= 200 && statusCode < 300 ? "Granted" : "Denied";
    const logWithStatus = `${logMessage} - Status: ${statusCode} - Access: ${granted}\n`;
    fs.appendFile(logFile, logWithStatus, (err) => {
      if (err) {
        console.error("Error writing to log file:", err);
      }
    });
  });
  next();
};

module.exports = logRequest;
