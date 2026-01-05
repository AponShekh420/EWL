import fs from "fs";
import path from "path";

export const deleteFileFromLocal = (
  imageArray: string | string[],
  dirPath: string
) => {
  const files = Array.isArray(imageArray) ? imageArray : [imageArray];

  files.forEach((filename) => {
    try {
      const filePath = path.join(
        process.cwd(),
        "public/images",
        dirPath,
        filename
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted file: ${filePath}`);
      } else {
        console.warn(`File not found: ${filePath}`);
      }
    } catch (err: any) {
      console.error("Error deleting file:", err.message);
    }
  });
};
