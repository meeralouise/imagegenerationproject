const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public")); // serve HTML, JS, CSS, images

// Return list of images
app.get("/image-list", (req, res) => {
  const imagesDir = path.join(__dirname, "public/images");
  const images = fs.readdirSync(imagesDir);
  res.json(images);
});

// Archive submissions
const archiveFile = path.join(__dirname, "archive.json");
app.post("/archive", (req, res) => {
  let entries = [];
  if (fs.existsSync(archiveFile)) {
    entries = JSON.parse(fs.readFileSync(archiveFile));
  }
  entries.push(req.body);
  fs.writeFileSync(archiveFile, JSON.stringify(entries, null, 2));
  res.sendStatus(200);
});

// Return archive
app.get("/archive", (req, res) => {
  if (!fs.existsSync(archiveFile)) return res.json([]);
  const entries = JSON.parse(fs.readFileSync(archiveFile));
  res.json(entries);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
