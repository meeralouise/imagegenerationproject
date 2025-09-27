// public/script.js

const imagePairDiv = document.getElementById("image-pair");
const generateBtn = document.getElementById("generate-btn");
const submitBtn = document.getElementById("submit-btn");
const userText = document.getElementById("user-text");

// Load images from server
async function loadImages() {
  const res = await fetch("/image-list");
  return await res.json();
}

// Generate two random images
async function generatePair() {
  const images = await loadImages();
  if (images.length < 2) return;

  let idx1 = Math.floor(Math.random() * images.length);
  let idx2;
  do {
    idx2 = Math.floor(Math.random() * images.length);
  } while (idx1 === idx2);

  const img1 = `<img src="images/${images[idx1]}" width="200">`;
  const img2 = `<img src="images/${images[idx2]}" width="200">`;

  imagePairDiv.innerHTML = img1 + img2;

  imagePairDiv.dataset.currentPair = JSON.stringify([images[idx1], images[idx2]]);
}

// Submit entry
async function submitEntry() {
  const text = userText.value.trim();
  const images = JSON.parse(imagePairDiv.dataset.currentPair || "[]");
  const date = new Date().toISOString();

  if (!text || images.length !== 2) {
    alert("Generate a pair and write something first!");
    return;
  }

  await fetch("/archive", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, images, date })
  });

  userText.value = "";
  alert("Saved! Click 'Library' to view all submissions.");
}

// Event listeners
generateBtn.addEventListener("click", generatePair);
submitBtn.addEventListener("click", submitEntry);
