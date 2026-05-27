"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminAuthCheck = async (req, res, next) => {
    const { role } = req?.user;
    if (role == "admin") {
        next();
    }
    else {
        res.json({
            errors: {
                login: {
                    msg: "Authentication Problem"
                }
            }
        });
    }
};
module.exports = adminAuthCheck;
