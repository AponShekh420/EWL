// @ts-ignore
import jwt from "jsonwebtoken";
import userType from '../types/userType';
import { Response } from 'express';

const tokenGenerator = (res: Response, userInfo: userType) => {
  // console.log("check the object", userInfo)
  const token = jwt.sign(userInfo, process.env.TOKEN_SECRET || "sdfjskldjfkljdflkj", {
    expiresIn: '30d',
  });

  res.cookie('session', token, {
      // signed: true,
      httpOnly: true,
      secure: process.env.SECURE_COOKIE === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  })

  return token;
}


export default tokenGenerator;