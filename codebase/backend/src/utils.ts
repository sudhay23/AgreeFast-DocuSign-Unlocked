import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Correctly resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const writeToFile = (Guid: string, data: string) => {
  const buffer = Buffer.from(data, "base64");
  const fileName = `${Guid}.pdf`;
  const staticDir = path.join(__dirname, "..", "static"); // Path to the 'static' directory
  const filePath = path.join(staticDir, fileName);

  // Ensure the 'static' directory exists
  try {
    fs.mkdirSync(staticDir, { recursive: true }); // Create 'static' if it doesn't exist
  } catch (err) {
    console.error("Error creating directory:", err);
    return;
  }

  // Write the file
  fs.writeFile(filePath, buffer, (err) => {
    if (err) {
      console.error("Error saving file:", err);
    } else {
      console.log(`File: ${fileName} has been saved at ${filePath}`);
    }
  });
};
