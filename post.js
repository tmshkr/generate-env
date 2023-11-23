const path = require("path");
const { execSync } = require("child_process");

const { INPUT_DELETE, INPUT_FILENAME, GITHUB_WORKSPACE } = process.env;

if (INPUT_DELETE === "true") {
  try {
    const filepath = path.join(GITHUB_WORKSPACE, INPUT_FILENAME);
    console.log("Deleting file...");
    execSync(`shred -u ${filepath}`, { stdio: "inherit" });
    console.log(`Deleted ${filepath}`);
  } catch (error) {
    console.error("There was an error deleting the file.");
    throw error;
  }
} else {
  console.log("Nothing to do here.");
}
