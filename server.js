const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON requests
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// In-memory archive
let archive = [];

// Return list of images in public/images
app.get("/image-list", (req, res) => {
  const imagesPath = path.join(__dirname, "public", "images");
  fs.readdir(imagesPath, (err, files) => {
    if (err) return res.status(500).json({ error: "Could not list images" });
    const imageFiles = files.filter(f => /\.(jpg|jpeg|png|gif)$/i.test(f));
    res.json(imageFiles);
  });
});

// Save user submission
app.post("/archive", (req, res) => {
  const { text, images, date } = req.body;
  if (!text || !images || images.length !== 2)
    return res.status(400).json({ error: "Invalid submission" });
  archive.push({ text, images, date });
  res.json({ success: true });
});

// Get all archive entries
app.get("/archive", (req, res) => {
  res.json(archive);
});

// Serve index.html on root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
