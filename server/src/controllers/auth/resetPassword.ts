import { Request, Response } from "express";
import tokenGenerator from "../../helpers/tokenGenerator";
import UserModel from "../../models/UserModel";

const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const resetPassword = async (req: Request, res: Response) => {
  const {password: newPassword} = req.body

  try {
    const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex")

    const user = await UserModel.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    })


    if (!user || user == null) {
      res.status(400).json({
        errors: {
          fail: {
            msg: "Token is invalid or has expired"
          }
        }
      })
    } else {
      const hashPassword = bcrypt.hashSync(newPassword, 10);
      user.password = hashPassword
      user.passwordResetToken = undefined
      user.passwordResetExpires = undefined
      await user.save()

      const {_id, userName, firstName, lastName, email, gender, isOrthodoxJew, maritalStatus, keepsMitzvos, chafifaDuration, chickenSoupInDairySink, avatar, role} = user;
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
    }
  } catch (err) {
    console.log((err as Error).message);
  }
}


export default resetPassword;