const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "public")));

// Quick check route
app.get("/check", (req, res) => {
  const indexPath = path.join(__dirname, "public", "index.html");
  fs.access(indexPath, fs.constants.F_OK, (err) => {
    if (err) {
      res.send("❌ index.html NOT found at: " + indexPath);
    } else {
      res.send("✅ index.html exists at: " + indexPath);
    }
  });
});

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Image list endpoint
app.get("/image-list", (req, res) => {
  const imagesPath = path.join(__dirname, "public", "images");
  fs.readdir(imagesPath, (err, files) => {
    if (err) return res.status(500).json({ error: "Could not list images" });
    const imageFiles = files.filter(f => /\.(jpg|jpeg|png|gif)$/i.test(f));
    res.json(imageFiles);
  });
});

// Archive endpoints
let archive = [];

app.post("/archive", (req, res) => {
  const { text, images, date } = req.body;
  if (!text || !images || images.length !== 2) {
    return res.status(400).json({ error: "Invalid submission" });
  }
  archive.push({ text, images, date });
  res.json({ success: true });
});

app.get("/archive", (req, res) => {
  res.json(archive);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
