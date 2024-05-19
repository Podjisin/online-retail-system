const express = require("express");
const cors = require("cors");
const handler = require("serve-handler");
const http = require("http");

const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const logger = require("./middleware/expressLogger");
const authenticateApiKey = require("./middleware/authenticateApiKey");

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(
  cors({
    credentials: false,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(logger);

// Loop through the route folders and load the route files dynamically
const routeFolders = ["private", "public"];

/**
 * Dynamically loads and mounts route files from the "private" and "public" folders.
 * For each route file, it checks if the folder is "private" and applies the `authenticateApiKey` middleware if so.
 * This allows the application to easily add new routes without having to manually configure them.
 */
try {
  routeFolders.forEach((folder) => {
    const routePath = path.join(__dirname, `routes/${folder}`);
    fs.readdirSync(routePath).forEach((file) => {
      const routeFilePath = path.join(routePath, file);
      const route = require(routeFilePath);
      const fileName = path.parse(file).name;

      if (folder === "private") {
        app.use(`/${folder}/${fileName}`, authenticateApiKey, route);
      } else {
        app.use(`/${folder}/${fileName}`, route);
      }
    });
  });
} catch (error) {
  console.error(error);
}

const PORT = process.env.PORT || 8000;
const FILE_SERVER_PORT = process.env.FILE_SERVER_PORT || 8080;
const FILE_SERVER_ADD = process.env.FILE_SERVER_ADDRESS || "localhost";

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

const imageServer = http.createServer((request, response) => {
  return handler(request, response, {
    public: path.join(__dirname, "store/assets/items"),
  });
});

imageServer.listen(FILE_SERVER_PORT, () => {
  console.log(
    `Image server is running on http://${FILE_SERVER_ADD}:${FILE_SERVER_PORT}`
  );
});
