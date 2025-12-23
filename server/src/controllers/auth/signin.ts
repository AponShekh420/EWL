import createError from 'http-errors';
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs"
import UserModel from "../../models/UserModel";
import tokenGenerator from '../../helpers/tokenGenerator';

const signin = async (req: Request, res: Response, next: NextFunction) => {
  const {email, password} = req.body;
  const userInfo = await UserModel.findOne({$or: [{email: email.toLowerCase()}, {userName: email.toLowerCase()}]}); ;
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
        msg: "Logged in successfully!",
        success: true
      })

    } else {
      res.status(401).json({errors: {failure: {msg: "Invalid email or password."}}})
    }
  } else {
    res.status(401).json({errors: {failure: {msg: "Invalid email or password."}}})
  }
}

export default signin;