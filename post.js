const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const { INPUT_DELETE, INPUT_FILENAME, GITHUB_WORKSPACE } = process.env;

run();

async function run() {
  if (INPUT_DELETE === "false") {
    console.log("Skipping deletion...");
  } else {
    const waitFile = path.join(GITHUB_WORKSPACE, ".wait");
    if (fs.existsSync(waitFile)) {
      console.log("Waiting for .wait file to be deleted...");
      while (fs.existsSync(waitFile)) {
        console.log("Waiting...");
        await sleep(10);
      }
    }
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
}

async function sleep(seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}
