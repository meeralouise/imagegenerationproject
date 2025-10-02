document.addEventListener("DOMContentLoaded", async () => {
  const printContent = document.getElementById("print-content");
  if (!printContent) return;

  printContent.innerHTML = "";

  try {
    // Fetch submissions
    const res = await fetch("/api/submissions");
    const submissions = await res.json();

    if (!submissions || submissions.length === 0) {
      console.error("No submissions found!");
      return;
    }

    // Append submissions as pages
    submissions.forEach(sub => {
      const page = document.createElement("div");
      page.classList.add("submission");

      let html = `<h2>${sub.description}</h2>`;
      if (sub.images && sub.images.length > 0) {
        html += `<div class="image-pair">`;
        sub.images.forEach(imgName => {
          html += `<img src="/images/${encodeURIComponent(imgName)}" />`;
        });
        html += `</div>`;
      }

      page.innerHTML = html;
      printContent.appendChild(page);
    });

    // Wait for all images to load
    const imgs = printContent.querySelectorAll("img");
    await Promise.all(Array.from(imgs).map(img => {
      return new Promise(resolve => {
        if (img.complete) resolve();
        else img.onload = img.onerror = () => resolve();
      });
    }));

    // Render Bindery book
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

  } catch (err) {
    console.error("Error loading submissions:", err);
  }


  

});
