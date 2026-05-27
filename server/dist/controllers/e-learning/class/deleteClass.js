"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClass = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const deleteFileFromLocal_1 = require("../../../utils/deleteFileFromLocal");
const ClassModel_1 = __importDefault(require("../../../models/ClassModel"));
const UserModel_1 = __importDefault(require("../../../models/UserModel"));
const deleteClass = async (req, res, next) => {
    try {
        const id = req.params?.id;
        if (!id)
            return next((0, http_errors_1.default)(400, "Class ID is required"));
        const deletedClass = await ClassModel_1.default.findByIdAndDelete(id);
        if (!deletedClass) {
            return next((0, http_errors_1.default)(404, `Class with id ${id} not found`));
        }
        else {
            await UserModel_1.default.updateOne({ classes: { $in: [id] } }, // find category that HAS this product
            { $pull: { classes: id } } // remove from OLD category
            );
        }
        (0, deleteFileFromLocal_1.deleteFileFromLocal)([
            deletedClass?.audiosOne,
            deletedClass?.audiosTwo,
            deletedClass?.videosOne,
            deletedClass?.videosTwo,
            deletedClass.thumbnail,
            deletedClass?.attachment,
        ].filter((file) => Boolean(file)), "classes");
        return res.status(200).json({
            success: true,
            status: 201,
            data: deletedClass,
            message: `Class with id ${id} deleted successfully`,
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.deleteClass = deleteClass;
