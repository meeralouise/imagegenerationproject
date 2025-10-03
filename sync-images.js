const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://trialpost_e7kn_user:X5aT9l1Kr6g4bggE305Q5v2adGwWf3gh@dpg-d3bjb924d50c73brsr7g-a.oregon-postgres.render.com/trialpost_e7kn",
  ssl: { rejectUnauthorized: false }
});

async function syncImages() {
  const imagesPath = path.join(__dirname, "public", "images");
  const filesOnDisk = fs.readdirSync(imagesPath);

  try {
    const result = await pool.query("SELECT id, images FROM submissions");
    let updates = 0;

    for (const row of result.rows) {
      const updatedImages = row.images.map(img => {
        if (!filesOnDisk.includes(img)) {
          // 👇 Example: you renamed IMG_20250911_0015.jpg → namechange.jpg
          if (img === "IMG_20250911_0015.jpg" && filesOnDisk.includes("namechange.jpg")) {
            console.log(`Updating ${img} → namechange.jpg in submission ${row.id}`);
            updates++;
            return "namechange.jpg";
          }
        }
        return img; // leave unchanged if it still exists
      });

      // If changes were made, update DB
      if (JSON.stringify(updatedImages) !== JSON.stringify(row.images)) {
        await pool.query("UPDATE submissions SET images = $1 WHERE id = $2", [updatedImages, row.id]);
      }
    }

    console.log(`✅ Sync complete (${updates} filenames updated).`);
    process.exit();
  } catch (err) {
    console.error("Sync error:", err);
    process.exit(1);
  }
}

syncImages();
