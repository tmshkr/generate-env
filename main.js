const fs = require("fs");
const path = require("path");

const { INPUT_ENV, INPUT_FILENAME, INPUT_SECRET_KEYS, GITHUB_WORKSPACE } =
  process.env;

try {
  var filepath = path.join(GITHUB_WORKSPACE, INPUT_FILENAME);
  if (fs.existsSync(filepath)) {
    console.log(`${INPUT_FILENAME} already exists. Appending...`);
    fs.appendFileSync(filepath, "\n" + INPUT_ENV);
    console.log(`Updated ${filepath}`);
  } else {
    console.log(`Creating ${INPUT_FILENAME}`);
    fs.writeFileSync(filepath, INPUT_ENV);
    console.log(`Created ${filepath}`);
  }

  maskSecrets(filepath);
} catch (error) {
  console.error(`There was an error creating ${filepath}`);
  throw error;
}

function maskSecrets(filepath) {
  const secrets = new Set(INPUT_SECRET_KEYS.split(","));
  const file = fs.readFileSync(filepath, "utf-8");
  file.split("\n").forEach((line) => {
    const [key, value] = line.split("=");
    if (secrets.has(key)) {
      console.log(`::add-mask::${value}`);
    }
  });
}
