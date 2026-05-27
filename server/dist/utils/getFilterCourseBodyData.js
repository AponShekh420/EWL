"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilterCourseBodyData = void 0;
const getFilterCourseBodyData = (req) => {
    const { metaTitle, metaDescription, durationType, durationNumber, title, headline, bio, price, offline, installmentMonths, students, module, } = req.body;
    return {
        ...req.body,
        price: Number(price),
        students: Number(students) || 0,
        module: Number(module) || 0,
        installmentMonths: Number(installmentMonths) || 0,
        duration: Number(durationNumber) ? `${durationNumber} ${durationType}` : "",
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || (headline || bio),
        offline: offline === "true" ? true : false,
    };
};
exports.getFilterCourseBodyData = getFilterCourseBodyData;
