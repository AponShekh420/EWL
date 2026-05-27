"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const CategoryModel_1 = require("../../../models/CategoryModel");
const ProductModel_1 = __importDefault(require("../../../models/ProductModel"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const deleteFileFromLocal_1 = require("../../../utils/deleteFileFromLocal");
const deleteProduct = async (req, res, next) => {
    try {
        const id = req.params?.id;
        if (!id)
            return next((0, http_errors_1.default)(400, "Product ID is required"));
        const deletedProduct = await ProductModel_1.default.findByIdAndDelete(id);
        if (!deletedProduct) {
            return next((0, http_errors_1.default)(404, `Product with id ${id} not found`));
        }
        if (deletedProduct.attachment) {
            (0, deleteFileFromLocal_1.deleteFileFromLocal)([
                ...deletedProduct.images,
                deletedProduct.thumbnail,
                deletedProduct.attachment,
            ], "products");
        }
        else {
            (0, deleteFileFromLocal_1.deleteFileFromLocal)([...deletedProduct.images, deletedProduct.thumbnail], "products");
        }
        await CategoryModel_1.CategoryModel.findOneAndUpdate({ _id: deletedProduct.category }, { $pull: { products: deletedProduct._id } }, { new: true });
        return res.status(200).json({
            success: true,
            status: 201,
            data: deletedProduct,
            message: `Product with id ${id} deleted successfully`,
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.deleteProduct = deleteProduct;
