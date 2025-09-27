// server.js
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Archive file for persistence
const archiveFile = path.join(__dirname, "archive.json");

// Load archive from file if it exists
let archive = [];
if (fs.existsSync(archiveFile)) {
  try {
    archive = JSON.parse(fs.readFileSync(archiveFile));
  } catch (err) {
    console.error("Error reading archive.json:", err);
    archive = [];
  }
}

// Get list of images
app.get("/image-list", (req, res) => {
  const imagesPath = path.join(__dirname, "public", "images");
  fs.readdir(imagesPath, (err, files) => {
    if (err) return res.status(500).json({ error: "Could not list images" });
    const imageFiles = files.filter(f => /\.(jpg|jpeg|png|gif)$/i.test(f));
    res.json(imageFiles);
  });
});

// Save a submission
app.post("/archive", (req, res) => {
  const { text, images, date } = req.body;
  if (!text || !images || images.length !== 2) {
    return res.status(400).json({ error: "Invalid submission" });
  }

  const entry = { text, images, date };
  archive.push(entry);

  // Persist to file
  fs.writeFileSync(archiveFile, JSON.stringify(archive, null, 2));

  res.json({ success: true });
});

// Return archive
app.get("/archive", (req, res) => {
  res.json(archive);
});

// Serve index.html at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Serve library.html
app.get("/library", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "library.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
