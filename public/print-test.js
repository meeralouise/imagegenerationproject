document.addEventListener("DOMContentLoaded", () => {
    const printContent = document.getElementById("print-content");
    const libraryList = document.getElementById("library-list");
    const backBtn = document.getElementById("back-btn");
    const pageHeading = document.querySelector("h1");
  
    if (!printContent) return;
  
    // Clear old content
    printContent.innerHTML = "";
  
    // Hardcoded test submissions
    const testSubmissions = [
      { description: "Test page 1", images: ["story.jpg"] },
      { description: "Test page 2", images: ["Faun bear inspired by Narnia, Girbius.jpeg"] },
    ];
  
    // Append submissions
    testSubmissions.forEach(sub => {
      const page = document.createElement("div");
      page.classList.add("submission");
  
      let html = `<h2>${sub.description}</h2>`;
      html += `<div class="image-pair">`;
      sub.images.forEach(img => {
        html += `<img src="/images/${encodeURIComponent(img)}" />`;
      });
      html += `</div>`;
  
      page.innerHTML = html;
      printContent.appendChild(page);
    });
  
    // Wait for images to load
    const imgs = printContent.querySelectorAll("img");
    Promise.all(Array.from(imgs).map(img => {
      return new Promise(resolve => {
        if (img.complete) resolve();
        else img.onload = img.onerror = () => resolve();
      });
    })).then(() => {
      console.log("All test images loaded, rendering Bindery");
  
      // 1️⃣ Hide all non-book elements
      const hideElements = [pageHeading, libraryList, backBtn];
      hideElements.forEach(el => el && (el.style.display = "none"));
  
      // 2️⃣ Render Bindery
      Bindery.makeBook({
        content: "#print-content",
        pageSetup: {
          size: { width: "6in", height: "9in" },
          margin: {
            top: "0.75in",
            inner: "0.75in",
            outer: "0.75in",
            bottom: "0.75in",
          },
        },
        rules: [
          Bindery.PageBreak({ selector: ".submission", position: "before" }),
          Bindery.RunningHeader({ render: page => page.number }),
        ],
      });
  
      // 3️⃣ Restore hidden elements after a short delay
      setTimeout(() => {
        hideElements.forEach(el => el && (el.style.display = "block"));
      }, 1000);
    });
  });
  