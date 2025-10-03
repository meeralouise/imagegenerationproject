

const libraryList = document.getElementById("library-list");
const backBtn = document.getElementById("back-btn");


backBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});


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
      //img.width = 150;
      imgContainer.appendChild(img);
    });
    li.appendChild(imgContainer);

    libraryList.appendChild(li);
  });
}

// Load library on page load
displayLibrary();

