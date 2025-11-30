import { NextFunction, Request, Response } from "express";

const adminAuthCheck = async (req: any, res: Response, next: NextFunction) => {
    const {role} = req?.user;
    if(role == "admin") {
      next();
    } else {
      res.json({
        errors: {
            login: {
                msg: "Authentication Problem"
            }
        }
      })
    }
}


module.exports = adminAuthCheck;