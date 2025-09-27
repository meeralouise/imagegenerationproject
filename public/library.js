// public/library.js

// Back button navigates to index.html
const backBtn = document.getElementById("back-btn");
if (backBtn) {
  backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

// Library page auto-loads submissions with images
async function displayLibrary() {
  const res = await fetch("/archive");
  const entries = await res.json();

  const libraryList = document.getElementById("library-list");
  libraryList.innerHTML = "";

  entries.forEach(entry => {
    const li = document.createElement("li");

    // Display text and timestamp
    const textPara = document.createElement("p");
    textPara.textContent = entry.text;
    li.appendChild(textPara);

    const dateSmall = document.createElement("small");
    dateSmall.textContent = new Date(entry.date).toLocaleString();
    li.appendChild(dateSmall);

    // Display images
    const imgContainer = document.createElement("div");
    entry.images.forEach(imgName => {
      const img = document.createElement("img");
      img.src = `images/${imgName}`;
      img.width = 150; // adjust size as needed
      imgContainer.appendChild(img);
    });
    li.appendChild(imgContainer);

    libraryList.appendChild(li);
  });
}

// Load the library when the page opens
displayLibrary();
