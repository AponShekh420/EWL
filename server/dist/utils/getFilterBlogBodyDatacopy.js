"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilterBlogBodyData = void 0;
const getFilterBlogBodyData = (req) => {
    const { metaTitle, metaDescription, title, } = req.body;
    return {
        ...req.body,
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || title,
    };
};
exports.getFilterBlogBodyData = getFilterBlogBodyData;
