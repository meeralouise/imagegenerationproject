// public/script.js

// Get references to DOM elements
const imagePairDiv = document.getElementById("image-pair");
const generateBtn = document.getElementById("generate-btn");
const submitBtn = document.getElementById("submit-btn");
const userText = document.getElementById("user-text");
const libraryList = document.getElementById("library-list");

// Load images from the server
async function loadImages() {
  try {
    const res = await fetch("/image-list");
    const images = await res.json();
    console.log("Fetched images:", images);
    return images;
  } catch (err) {
    console.error("Error fetching images:", err);
    return [];
  }
}

// Pick two random images and display them
async function generatePair() {
  const images = await loadImages();
  if (images.length < 2) {
    alert("Not enough images to generate a pair.");
    return;
  }

  // Pick two random distinct images
  let idx1 = Math.floor(Math.random() * images.length);
  let idx2;
  do {
    idx2 = Math.floor(Math.random() * images.length);
  } while (idx1 === idx2);

  const img1 = `<img src="/images/${images[idx1]}" width="200">`;
  const img2 = `<img src="/images/${images[idx2]}" width="200">`;

  imagePairDiv.innerHTML = img1 + img2;

  // Store current pair in DOM for submission
  imagePairDiv.dataset.currentPair = JSON.stringify([images[idx1], images[idx2]]);
}

// Save a submission
async function submitEntry() {
  const text = userText.value.trim();
  const images = JSON.parse(imagePairDiv.dataset.currentPair || "[]");
  const date = new Date().toISOString();

  if (!text || images.length !== 2) {
    alert("Please generate a pair and write something before submitting.");
    return;
  }

  try {
    await fetch("/archive", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, images, date })
    });

    userText.value = "";
    if (libraryList) loadLibrary(); // only refresh if on library page
    alert("Saved to shared library!");
  } catch (err) {
    console.error("Error submitting entry:", err);
  }
}

// Load submissions from the archive
async function loadLibrary() {
  try {
    const res = await fetch("/archive");
    const entries = await res.json();

    libraryList.innerHTML = "";
    entries.forEach(entry => {
      const li = document.createElement("li");
      li.textContent = `${entry.date}: ${entry.text} (${entry.images.join(", ")})`;
      libraryList.appendChild(li);
    });
  } catch (err) {
    console.error("Error loading library:", err);
  }
}

// Event listeners (only if elements exist on this page)
if (generateBtn) generateBtn.addEventListener("click", generatePair);
if (submitBtn) submitBtn.addEventListener("click", submitEntry);
if (libraryList) loadLibrary();
