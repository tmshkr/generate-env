const fs = require("fs");
const path = require("path");

const { INPUT_ENV, INPUT_FILENAME, GITHUB_WORKSPACE } = process.env;

try {
  const filepath = path.join(GITHUB_WORKSPACE, INPUT_FILENAME);
  fs.appendFileSync(filepath, INPUT_ENV);
  console.log(`${filepath} created successfully.`);
} catch (error) {
  console.error(`There was an error creating ${filepath}`);
  throw error;
}
