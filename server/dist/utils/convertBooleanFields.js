"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertBooleanFields = void 0;
const convertBooleanFields = (fields) => (req, res, next) => {
    fields.forEach((field) => {
        if (req.body[field] !== undefined) {
            req.body[field] = req.body[field] === "true";
        }
    });
    next();
};
exports.convertBooleanFields = convertBooleanFields;
