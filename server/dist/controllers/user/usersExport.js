"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wp_users_json_1 = __importDefault(require("../../olddata/wp_users.json"));
const wp_usermeta_json_1 = __importDefault(require("../../olddata/wp_usermeta.json"));
const UserModel_1 = __importDefault(require("../../models/UserModel"));
// Helper to parse PHP serialized strings and convert Yes/No to boolean
const parseMetaValue = (value) => {
    if (!value)
        return null;
    // Extract value from PHP serialized format: a:1:{i:0;s:3:"Yes";}
    const match = value.match(/s:\d+:"(.+?)"/);
    if (match) {
        const extracted = match[1];
        if (extracted.toLowerCase() === "yes")
            return true;
        if (extracted.toLowerCase() === "no")
            return false;
        return extracted;
    }
    return value;
};
const parseMarriedMetaValue = (value) => {
    if (!value)
        return null;
    // Extract value from PHP serialized format: a:1:{i:0;s:3:"Yes";}
    const match = value.match(/s:\d+:"(.+?)"/);
    if (match) {
        const extracted = match[1];
        if (extracted.toLowerCase() === "yes")
            return "yes";
        if (extracted.toLowerCase() === "no")
            return "no";
        return extracted;
    }
    return value;
};
const usersExport = async (req, res) => {
    const metaArray = wp_usermeta_json_1.default;
    const usersArray = wp_users_json_1.default;
    console.log(metaArray);
    console.log(usersArray);
    const result = usersArray[2].data.map((user) => {
        const userMeta = metaArray[2].data.filter((m) => m?.user_id === user?.ID);
        const metaObj = {};
        userMeta.forEach((m) => {
            metaObj[m.meta_key] = m?.meta_value;
        });
        return {
            userId: user?.ID,
            email: user?.user_email,
            userName: user?.user_login,
            password: user.user_pass,
            firstName: metaObj?.first_name || `anonymous`,
            lastName: metaObj?.last_name || `${Date.now()}`,
            bio: metaObj?.description,
            gender: metaObj?.user_gender ? (metaObj?.user_gender).toLocaleLowerCase() : "female",
            status: metaObj?.account_status == "approved" ? "active" : "pending",
            isOrthodoxJew: parseMetaValue(metaObj?.question_1) || false,
            maritalStatus: (metaObj.question_7 || parseMarriedMetaValue(metaObj?.question_3)) || "The old register user didn't select anything.",
            keepsMitzvos: parseMetaValue(metaObj?.question_4) || false,
            chafifaDuration: metaObj?.question_5 || "The old register user didn't write anything.",
            chickenSoupInDairySink: metaObj?.question_6 || "The old register user didn't write anything.",
            // meta: metaObj
        };
    });
    // res.status(200).json(result)
    const insertUser = await UserModel_1.default.insertMany(result);
    if (insertUser) {
        res.status(200).json({
            success: true,
            message: "Users have inserted successfully",
            usersAmount: insertUser.length,
        });
    }
    else {
        res.status(500).json({
            success: false,
            errors: {
                msg: "There was an server side error"
            }
        });
    }
    res.status(200).json(result);
};
exports.default = usersExport;
