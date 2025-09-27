const express = require("express");
const path = require("path");
const fs = require("fs");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Connect to Postgres
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://trialpost_e7kn_user:X5aT9l1Kr6g4bggE305Q5v2adGwWf3gh@dpg-d3bjb924d50c73brsr7g-a.oregon-postgres.render.com/trialpost_e7kn",
  ssl: { rejectUnauthorized: false } // needed for Render
});

// Create table if it doesn’t exist
pool.query(`
  CREATE TABLE IF NOT EXISTS submissions (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    images TEXT[] NOT NULL,
    date TIMESTAMP NOT NULL
  )
`).catch(err => console.error("Table creation error:", err));

// --- Routes ---

// Return list of images
app.get("/image-list", (req, res) => {
  const imagesPath = path.join(__dirname, "public", "images");
  fs.readdir(imagesPath, (err, files) => {
    if (err) return res.status(500).json({ error: "Could not list images" });
    const imageFiles = files.filter(f => /\.(jpg|jpeg|png|gif)$/i.test(f));
    res.json(imageFiles);
  });
});

// Save submission
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

// Get all submissions
app.get("/archive", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM submissions ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("DB query error:", err);
    res.status(500).json([]);
  }
});

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
