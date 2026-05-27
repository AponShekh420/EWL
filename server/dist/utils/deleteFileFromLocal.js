"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFileFromLocal = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const deleteFileFromLocal = (imageArray, dirPath) => {
    const files = Array.isArray(imageArray) ? imageArray : [imageArray];
    files.forEach((filename) => {
        try {
            const filePath = path_1.default.join(process.cwd(), "public/images", dirPath, filename);
            if (fs_1.default.existsSync(filePath)) {
                fs_1.default.unlinkSync(filePath);
                console.log(`Deleted file: ${filePath}`);
            }
            else {
                console.warn(`File not found: ${filePath}`);
            }
        }
        catch (err) {
            console.error("Error deleting file:", err.message);
        }
    });
};
exports.deleteFileFromLocal = deleteFileFromLocal;
