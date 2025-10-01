// public/library.js

const libraryList = document.getElementById("library-list");
const backBtn = document.getElementById("back-btn");

// Back button
backBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

// Load submissions
async function displayLibrary() {
  const res = await fetch("/archive");
  const entries = await res.json();

  libraryList.innerHTML = "";

  entries.forEach(entry => {
    const li = document.createElement("li");

    const textPara = document.createElement("p");
    textPara.textContent = entry.text;
    li.appendChild(textPara);

    const dateSmall = document.createElement("small");
    dateSmall.textContent = new Date(entry.date).toLocaleString();
    li.appendChild(dateSmall);

    const imgContainer = document.createElement("div");
    entry.images.forEach(imgName => {
      const img = document.createElement("img");
      img.src = `images/${imgName}`;
      img.width = 150;
      imgContainer.appendChild(img);
    });
    li.appendChild(imgContainer);

    libraryList.appendChild(li);
  });
}

// Load library on page load
displayLibrary();


fetch('/api/submissions')
  .then(res => res.json())
  .then(submissions => {
    const printContent = document.getElementById("print-content");

    submissions.forEach(sub => {
      const page = document.createElement("div");
      page.classList.add("submission");

      let html = `<h2>${sub.title}</h2>`;
      if (sub.image_url) {
        html += `<img src="${sub.image_url}" />`;
      }
      if (sub.description) {
        html += `<p>${sub.description}</p>`;
      }
      page.innerHTML = html;

      printContent.appendChild(page);
    });

    // ✅ Now that content is ready, enable the print button
    document.getElementById("print-btn").disabled = false;
  });
