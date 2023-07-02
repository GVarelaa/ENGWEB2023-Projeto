const fs = require("fs");
const path = require("path");
const readline = require("readline");

async function concatenateJSONFiles(folderPath, outputFile) {
  // List all files in the provided folder
  const fileNames = fs.readdirSync(folderPath);
  const excludeFiles = [
    "jtre_acordaos.json",
    "jcon_acordaos.json",
    "jtrp_acordaos.json",
    "jsta_acordaos.json",
    "jtcn_acordaos.json",
    "jtcampc(a|t)_acordaos.json",
    "jtrc_acordaos.json",
  ];
  const filteredFiles = fileNames.filter(
    (fileName) => !excludeFiles.includes(fileName)
  );

  let jsonData = [];

  // Process each file sequentially
  for (const fileName of filteredFiles) {
    console.log(fileName);
    // Check if the file has a JSON extension
    if (fileName.endsWith(".json")) {
      const filePath = path.join(folderPath, fileName);

      // Read the content of the file
      const fileContent = fs.readFileSync(filePath, "utf-8");

      try {
        // Parse the JSON content of the file
        const jsonContent = JSON.parse(fileContent);

        // Concatenate the arrays of JSON objects
        jsonData = jsonData.concat(jsonContent);
      } catch (error) {
        console.error(`Error parsing JSON file: ${filePath}. Error: ${error}`);
      }
    }
  }

  // Write the concatenated JSON data to the output file
  const jsonOutput = JSON.stringify(jsonData, null, 2);
  fs.writeFileSync(outputFile, jsonOutput, "utf-8");
  console.log(`JSON files concatenated into: ${outputFile}`);
}

// Example usage:
const folderPath = "./Acordaos";
const outputFile = "acordaos.json";

concatenateJSONFiles(folderPath, outputFile);
