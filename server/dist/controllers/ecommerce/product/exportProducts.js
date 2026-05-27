"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportProducts = void 0;
const wp_products_json_1 = __importDefault(require("../../../olddata/wp_products.json"));
const wp_productmeta_json_1 = __importDefault(require("../../../olddata/wp_productmeta.json"));
const UserModel_1 = __importDefault(require("../../../models/UserModel"));
const ProductModel_1 = __importDefault(require("../../../models/ProductModel"));
// import UserModel from "../../../models/UserModel";
const exportProducts = async (req, res) => {
    const productArray = wp_products_json_1.default;
    const productMetaArray = wp_productmeta_json_1.default;
    const result = [];
    for (const product of productArray[2].data) {
        const meta = productMetaArray[2].data.filter((m) => m.post_id === product.ID);
        const metaObj = {};
        meta.forEach((m) => {
            metaObj[m.meta_key] = m.meta_value;
        });
        const user = await UserModel_1.default.findOne({ userId: product?.post_author });
        const productData = {
            creator: user?._id,
            category: "product",
            tags: ["product"],
            status: product?.post_status,
            sold: Number(metaObj?.total_sales),
            shortDescription: product?.post_excerpt || "not found from old product",
            description: product?.post_content,
            thumbnail: "placeholder.jpg",
            images: ["placeholder.jpg"],
            sku: "82937839274",
            isbn: "2432-234-234-234",
            regularPrice: Number(metaObj?._regular_price) || 0,
            salePrice: Number(metaObj?._price) || 0,
            stock: Number(metaObj?._stock),
            stockStatus: metaObj?._stock_status == "outofstock" ? "out-of-stock" : metaObj?._stock_status == "instock" ? "in-stock" : metaObj?._stock_status,
            isVisibleProductPage: true,
            trackStockQuantity: false,
            limitOneItemPerOrder: false,
            weight: metaObj?._weight,
            declaredValue: Number(metaObj?._price) || 0,
            dimensionLength: metaObj?._length,
            dimensionWidth: metaObj?._width,
            dimensionHeight: metaObj?._height,
            taxStatus: metaObj?._tax_status,
            // shippingClass: "none",
            enelope: false,
            metaTitle: product.post_title,
            metaSlug: product.post_name || (product.post_title).split(" ").join("-").toLowerCase(),
            metaDescription: product?.post_excerpt || product?.post_content || "",
            title: product.post_title,
            slug: product.post_name || (product.post_title).split(" ").join("-").toLowerCase(),
            // product: product,
            // meta: metaObj
        };
        result.push(productData);
        const productRef = await ProductModel_1.default.create(productData);
        await productRef.save();
    }
    res.status(200).json({
        success: true,
        data: result.length,
        message: "Courses added successfully"
    });
};
exports.exportProducts = exportProducts;
