const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;
// Enable CORS for all routes
app.use(cors());
// Serve static files from the 'cdn/images' directory
app.use("/images", express.static(path.join(__dirname, "cdn", "images")));

// Start the server
app.listen(PORT, () => {
  console.log(`CDN server is running on http://localhost:${PORT}`);
});
