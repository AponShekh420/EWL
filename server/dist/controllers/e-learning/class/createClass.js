"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClass = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const UserModel_1 = __importDefault(require("../../../models/UserModel"));
const getFilterClassBodyData_1 = require("../../../utils/getFilterClassBodyData");
const ClassModel_1 = __importDefault(require("../../../models/ClassModel"));
const createClass = async (req, res, next) => {
    try {
        const { audiosOne, audiosTwo, videosOne, videosTwo, thumbnail, attachment } = req.files;
        const body = (0, getFilterClassBodyData_1.getFilterClassBodyData)(req);
        // Remove special characters and make the slug
        const sanitizedTitle = body.metaTitle
            ? body.metaTitle
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, "")
            : body.title
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, "");
        let slug = sanitizedTitle.split(" ").join("-");
        // Check for duplicates
        const duplicateCommunityCount = await ClassModel_1.default.countDocuments({
            slug: { $regex: `^${slug}(-[0-9]*)?$`, $options: "i" },
        });
        if (duplicateCommunityCount > 0) {
            slug = `${slug}-${duplicateCommunityCount}`;
        }
        const createdClass = await ClassModel_1.default.create({
            ...body,
            slug,
            thumbnail: thumbnail[0].filename,
            attachment: attachment ? attachment[0]?.filename : "",
            audiosOne: audiosOne ? audiosOne.map((file) => file.filename) : [],
            audiosTwo: audiosTwo ? audiosTwo.map((file) => file.filename) : [],
            videosOne: videosOne ? videosOne.map((file) => file.filename) : [],
            videosTwo: videosTwo ? videosTwo.map((file) => file.filename) : [],
        });
        if (!createdClass) {
            return next((0, http_errors_1.default)(400, "Failed to create class"));
        }
        await UserModel_1.default.findOneAndUpdate({ _id: createdClass?.speaker }, { $push: { classes: createdClass?._id } }, { new: true } // Optional: returns the updated document
        );
        return res.status(201).json({
            success: true,
            status: 201,
            data: createdClass,
            message: "Class created successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.createClass = createClass;
