let imageList = [];
let currentPair = [];

// Fetch list of images
fetch("/image-list")
  .then(res => res.json())
  .then(data => {
    imageList = data;
  });

const generateBtn = document.getElementById("generate-btn");
const submitBtn = document.getElementById("submit-btn");
const imagePairDiv = document.getElementById("image-pair");
const userText = document.getElementById("user-text");
const libraryList = document.getElementById("library-list");

// Generate random pair
if (generateBtn) {
  generateBtn.addEventListener("click", () => {
    if (imageList.length < 2) return alert("Not enough images!");
    const shuffled = [...imageList].sort(() => 0.5 - Math.random());
    currentPair = shuffled.slice(0, 2);

    imagePairDiv.innerHTML = "";
    currentPair.forEach(img => {
      const el = document.createElement("img");
      el.src = "images/" + img;
      imagePairDiv.appendChild(el);
    });
  });
}

// Submit writing
if (submitBtn) {
  submitBtn.addEventListener("click", () => {
    const text = userText.value.trim();
    if (!text || currentPair.length !== 2) {
      alert("Generate images and write something first!");
      return;
    }

    fetch("/archive", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        images: currentPair,
        date: new Date().toISOString()
      })
    }).then(() => {
      userText.value = "";
      alert("Saved to shared library!");
    });
  });
}

// Load library
if (libraryList) {
  fetch("/archive")
    .then(res => res.json())
    .then(entries => {
      entries.forEach(entry => {
        const li = document.createElement("li");
        li.innerHTML = `<p>${entry.text}</p>
                        <small>${new Date(entry.date).toLocaleString()}</small>
                        <br>
                        <img src="images/${entry.images[0]}" width="100">
                        <img src="images/${entry.images[1]}" width="100">`;
        libraryList.appendChild(li);
      });
    });
}
