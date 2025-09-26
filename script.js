const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files (HTML, CSS, JS, images) from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Route for root URL to serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// In-memory archive to store submissions
let archive = [];

// Endpoint to get the list of images from public/images
app.get("/image-list", (req, res) => {
  const imagesPath = path.join(__dirname, "public", "images");
  fs.readdir(imagesPath, (err, files) => {
    if (err) return res.status(500).json({ error: "Could not list images" });
    const imageFiles = files.filter(f => /\.(jpg|jpeg|png|gif)$/i.test(f));
    res.json(imageFiles);
  });
});

// Endpoint to save a submission to the archive
app.post("/archive", (req, res) => {
  const { text, images, date } = req.body;
  if (!text || !images || images.length !== 2) {
    return res.status(400).json({ error: "Invalid submission" });
  }
  archive.push({ text, images, date });
  res.json({ success: true });
});

// Endpoint to retrieve the archive
app.get("/archive", (req, res) => {
  res.json(archive);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
