document.addEventListener("DOMContentLoaded", async () => {
  const printContent = document.getElementById("print-content");
  if (!printContent) return;

  printContent.innerHTML = "";

  
  const cover = document.createElement("div");
  cover.classList.add("cover");  
  cover.innerHTML = `
    <h1>Freaky Adult Storytelling Workshop</h1>
    <p>you guys</p>
  `;
  printContent.appendChild(cover); 

  try {

    const res = await fetch("/api/submissions");
    const submissions = await res.json();

    if (!submissions || submissions.length === 0) {
      console.error("No submissions found!");
      return;
    }

   
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

   
    const imgs = printContent.querySelectorAll("img");
    await Promise.all(Array.from(imgs).map(img => {
      return new Promise(resolve => {
        if (img.complete) resolve();
        else img.onload = img.onerror = () => resolve();
      });
    }));


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
        Bindery.PageBreak({ selector: ".submission, .cover", position: "before" }),
        Bindery.RunningHeader({ render: page => page.number }),
      ],
    });

  } catch (err) {
    console.error("Error loading submissions:", err);
  }
});
