const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const { INPUT_DELETE, INPUT_FILENAME, GITHUB_WORKSPACE } = process.env;

if (INPUT_DELETE == "false") {
  console.log("Skipping deletion...");
} else {
  try {
    const filepath = path.join(GITHUB_WORKSPACE, INPUT_FILENAME);
    if (fs.existsSync(filepath)) {
      console.log("Deleting file...");
      execSync(`shred -uv ${filepath}`, { stdio: "inherit" });
      console.log(`Deleted ${filepath}`);
    } else {
      console.log(`File does not exist: ${filepath}`);
    }
  } catch (error) {
    console.error("There was an error deleting the file.");
    throw error;
  }
}
