const fs = require("fs");
const path = require("path");

const files = ["public/print-book.js", "public/print-test.js", "public/print.js"];

files.forEach((filePath) => {
  const fullPath = path.resolve(filePath);
  let content = fs.readFileSync(fullPath, "utf-8");

  // Replace occurrences of "${...}" inside quotes with proper backticks
  content = content.replace(
    /(["'])\/images\/\$\{(.*?)\}\1/g,
    (_, quote, expr) => `\`/images/\${${expr}}\``
  );

  fs.writeFileSync(fullPath, content, "utf-8");
  console.log(`Fixed template literals in ${filePath}`);
});
