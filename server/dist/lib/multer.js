"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUploader = void 0;
const fs_1 = __importDefault(require("fs"));
const http_errors_1 = __importDefault(require("http-errors"));
const multer_1 = __importStar(require("multer"));
const path_1 = __importDefault(require("path"));
const multerUploader = (folder, acceptedFileTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"], // defaults
maxFileSize) => {
    const uploadDir = path_1.default.join(process.cwd(), "public/images", folder);
    // Ensure upload folder exists
    if (!fs_1.default.existsSync(uploadDir)) {
        fs_1.default.mkdirSync(uploadDir, { recursive: true });
    }
    const storage = (0, multer_1.diskStorage)({
        destination: (_, __, cb) => cb(null, uploadDir),
        filename: (_, file, cb) => {
            const ext = path_1.default.extname(file.originalname);
            const baseName = path_1.default
                .basename(file.originalname, ext)
                .replace(/\s+/g, "_");
            cb(null, `${baseName}_${Date.now()}${ext}`);
        },
    });
    const fileFilter = (req, file, cb) => {
        if (acceptedFileTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            const supported = acceptedFileTypes
                .map((type) => type.replace("image/", ""))
                .join(", ");
            cb((0, http_errors_1.default)(400, `Only ${supported} format(s) supported`));
        }
    };
    return (0, multer_1.default)({
        storage,
        fileFilter,
        limits: maxFileSize ? { fileSize: maxFileSize } : undefined, // limit only if provided
    });
};
exports.multerUploader = multerUploader;
