const fs = require("fs");
const path = require("path");

// Path to your public folder and images folder
const PUBLIC_DIR = path.join(__dirname, "public");
const IMAGES_DIR = path.join(PUBLIC_DIR, "images");

// Collect all filenames in images folder
const imageFiles = fs.readdirSync(IMAGES_DIR);

// Recursively scan HTML/JS files for image src references
function scanFiles(dir) {
  let missing = [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (let entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      missing.push(...scanFiles(fullPath));
    } else if (entry.isFile() && /\.(html|js)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, "utf8");

      // Regex to match src="/images/..."
      const regex = /src=["']\/images\/([^"']+)["']/g;
      let match;

      while ((match = regex.exec(content)) !== null) {
        const requestedFile = match[1];
        if (!imageFiles.includes(requestedFile)) {
          missing.push({ file: requestedFile, foundIn: fullPath });
        }
      }
    }
  }

  return missing;
}

const missingImages = scanFiles(PUBLIC_DIR);

if (missingImages.length === 0) {
  console.log("All image paths exist! ✅");
} else {
  console.log("Missing images (would cause 404s):");
  missingImages.forEach((m) => {
    console.log(`- ${m.file} (referenced in ${m.foundIn})`);
  });
}
