import createError from 'http-errors';
import { NextFunction, Request, Response } from 'express';
import jwt, {JwtPayload} from "jsonwebtoken"
import UserModel from "../../models/UserModel";

const authCheck = async (req: any, res: Response, next: NextFunction) => {
    const {session} = req.cookies;
    
    if(session) {
        try {
            const verifyedToken = jwt.verify(session, process.env.TOKEN_SECRET || "sdfjskldjfkljdflkj")

            if(verifyedToken) {
                const checkValidation = await UserModel.findOne({email: (verifyedToken as JwtPayload).email}, '-password');
                if(checkValidation) {
                    req.user = checkValidation;
                    next();
                } else {
                    next(createError(403, "Authentication Problem"))
                }
            } else {
                next(createError(403, "Authentication Problem"))
            }
        } catch(err) {
            console.log(err)
        }
    } else {
        next(createError(403, "Authentication Problem"))
    }
}

export default authCheck;