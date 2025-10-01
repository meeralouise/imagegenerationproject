document.addEventListener("DOMContentLoaded", () => {
    const printBtn = document.getElementById("print-btn");
    const printContent = document.getElementById("print-content");
  
    // Hide print content container by default
    if (printContent) {
      printContent.style.display = "none";
    }
  
    if (printBtn) {
      printBtn.addEventListener("click", () => {
        console.log("Print button clicked!");
  
        // Clear old content and show container
        printContent.innerHTML = "";
        printContent.style.display = "block";
  
        // Load submissions only when printing
        fetch("/api/submissions")
          .then((res) => res.json())
          .then((submissions) => {
            submissions.forEach((sub) => {
              const page = document.createElement("div");
              page.classList.add("submission");
  
              let html = `<h2>${sub.description}</h2>`; // just use text block
  
              if (sub.images && sub.images.length > 0) {
                html += `<div class="image-pair">`;
                sub.images.forEach((imgName) => {
                  html += `<img src="/images/${imgName}" />`;
                });
                html += `</div>`;
              }
  
              page.innerHTML = html;
              printContent.appendChild(page);
            });
  
            // Once content is ready, render the book
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
                Bindery.RunningHeader({
                  render: (page) => page.number,
                }),
              ],
            });
          })
          .catch((err) => console.error("Error loading submissions:", err));
      });
    }
  });
  