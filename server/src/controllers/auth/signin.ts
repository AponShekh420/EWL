import createError from 'http-errors';
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs"
import UserModel from "../../models/UserModel";
import tokenGenerator from '../../helpers/tokenGenerator';

const signin = async (req: Request, res: Response, next: NextFunction) => {
  const {email, password} = req.body;
  const userInfo = await UserModel.findOne({email}) ;
  console.log(userInfo)
  if(userInfo) {
    const passCheck = await bcrypt.compare(password, userInfo?.password);
    if(passCheck) {
      const {_id, userName, firstName, lastName, email, gender, isOrthodoxJew, maritalStatus, keepsMitzvos, chafifaDuration, chickenSoupInDairySink, avatar, role, password} = userInfo;
      const modifiedUser = {
          id: _id,
          userName,
          firstName,
          lastName,
          email,
          gender,
          isOrthodoxJew,
          maritalStatus,
          keepsMitzvos,
          chafifaDuration,
          chickenSoupInDairySink,
          avatar,
          role
      }
      const token = tokenGenerator(res, modifiedUser);

      
      res.status(200).json({
        userInfo: modifiedUser,
        token: token,
        message: "Logged in successfully!"
      })

    } else {
      next(createError(403, "Invalid email or password."));
    }
  } else {
    next(createError(403, "Invalid email or password."));
  }
  res.status(200).json({
    message: "The user has loggined successfully!",
    // data: authCheck
  })
}

export default signin;