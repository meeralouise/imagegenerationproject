// public/script.js

// ---------- Helper functions ----------

// Load images from the server
async function loadImages() {
  const res = await fetch("/image-list");
  const images = await res.json();
  return images;
}

// Pick two random images and display them
async function generatePair() {
  const imagePairDiv = document.getElementById("image-pair");
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

  // Save current pair so it can be submitted
  imagePairDiv.dataset.currentPair = JSON.stringify([images[idx1], images[idx2]]);
}

// Save a submission
async function submitEntry() {
  const imagePairDiv = document.getElementById("image-pair");
  const userText = document.getElementById("user-text");
  const text = userText.value.trim();
  const images = JSON.parse(imagePairDiv.dataset.currentPair || "[]");
  const date = new Date().toISOString();

  if (!text || images.length !== 2) {
    alert("Please generate a pair and write something before submitting.");
    return;
  }

  await fetch("/archive", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, images, date })
  });

  userText.value = "";
  loadLibrary();
}

// Load submissions from the archive
async function loadLibrary() {
  const libraryList = document.getElementById("library-list");
  if (!libraryList) return; // only run if the list exists

  const res = await fetch("/archive");
  const entries = await res.json();

  libraryList.innerHTML = "";
  entries.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.date}: ${entry.text} (${entry.images.join(", ")})`;
    libraryList.appendChild(li);
  });
}

// ---------- Page-specific setup ----------

// Index page setup
if (document.getElementById("generate-btn")) {
  const generateBtn = document.getElementById("generate-btn");
  const submitBtn = document.getElementById("submit-btn");
  const libraryBtn = document.getElementById("library-btn");

  generateBtn.addEventListener("click", generatePair);
  submitBtn.addEventListener("click", submitEntry);
  if (libraryBtn) {
    libraryBtn.addEventListener("click", () => {
      window.location.href = "library.html";
    });
  }

  loadLibrary(); // show recent submissions preview
}

// Library page setup
if (document.body.contains(document.getElementById("library-list"))) {
  loadLibrary();
}
