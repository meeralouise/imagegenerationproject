const express = require("express");
const path = require("path");
const fs = require("fs");
const { Pool } = require("pg");  // ✅ add this to use PostgreSQL

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ✅ Connect to PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Render will provide this
  ssl: { rejectUnauthorized: false } // required for Render's Postgres
});

// --------- Your routes below -------------

// Return list of images in public/images
app.get("/image-list", (req, res) => {
  const imagesPath = path.join(__dirname, "public", "images");
  fs.readdir(imagesPath, (err, files) => {
    if (err) return res.status(500).json({ error: "Could not list images" });
    const imageFiles = files.filter(f => /\.(jpg|jpeg|png|gif)$/i.test(f));
    res.json(imageFiles);
  });
});

// Save user submission to database
app.post("/archive", async (req, res) => {
  const { text, images, date } = req.body;
  if (!text || !images || images.length !== 2)
    return res.status(400).json({ error: "Invalid submission" });

  try {
    await pool.query(
      "INSERT INTO submissions (text, images, date) VALUES ($1, $2, $3)",
      [text, images, date]
    );
    res.json({ success: true });
  } catch (err) {
    console.error("DB insert error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Get all archive entries from database
app.get("/archive", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM submissions ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("DB query error:", err);
    res.status(500).json([]);
  }
});

// Serve index.html on root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
