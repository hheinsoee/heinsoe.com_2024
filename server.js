const express = require("express");
const next = require("next");
const path = require("path");
const cors = require("cors");
const isDev = process.env.NODE_ENV !== "production";
require("dotenv").config({ path: isDev ? ".env" : `.env.production` });

const port = process.env.PORT || 3000;
const app = next({ dev: isDev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Enable CORS for all routes
  server.use(cors());

  server.use(
    "/images",
    express.static(path.join(process.env.NEXT_PUBLIC_IMAGE_DIR))
  );

  // Handle all other routes with Next.js
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
