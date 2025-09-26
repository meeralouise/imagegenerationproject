const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json()); // parse JSON


app.use(express.static(__dirname));
app.use("/images", express.static(path.join(__dirname, "images")));

const ARCHIVE_FILE = path.join(__dirname, "archive.json");


app.get("/image-list", (req, res) => {
  const imagesDir = path.join(__dirname, "images");
  fs.readdir(imagesDir, (err, files) => {
    if (err) return res.status(500).json({ error: "Unable to read images" });
    const images = files.filter(f => /\.(png|jpe?g|gif|webp)$/i.test(f));
    res.json(images);
  });
});


app.get("/archive", (req, res) => {
  if (!fs.existsSync(ARCHIVE_FILE)) return res.json([]);
  const data = fs.readFileSync(ARCHIVE_FILE, "utf8");
  res.json(JSON.parse(data || "[]"));
});


app.post("/archive", (req, res) => {
  const newEntry = req.body;
  let archive = [];
  if (fs.existsSync(ARCHIVE_FILE)) {
    archive = JSON.parse(fs.readFileSync(ARCHIVE_FILE, "utf8"));
  }
  archive.push(newEntry);
  fs.writeFileSync(ARCHIVE_FILE, JSON.stringify(archive, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
