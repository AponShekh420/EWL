import createError  from 'http-errors';
import { NextFunction, Request, Response } from "express";

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const logout = res.clearCookie("session");
    if(logout) {
        res.status(200).json({
            message: "logged out successfully"
        });
    } else {
        next(createError());
    }
} catch(err) {
    console.log(err);
}
}

export default logout;