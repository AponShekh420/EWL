import users from "../../olddata/wp_users.json";
import meta from "../../olddata/wp_usermeta.json";
import { NextFunction, Request, Response } from "express";
import UserModel from "../../models/UserModel";

// Helper to parse PHP serialized strings and convert Yes/No to boolean
const parseMetaValue = (value: string): any => {
    if (!value) return null;

    // Extract value from PHP serialized format: a:1:{i:0;s:3:"Yes";}
    const match = value.match(/s:\d+:"(.+?)"/);
    if (match) {
        const extracted = match[1];
        if (extracted.toLowerCase() === "yes") return true;
        if (extracted.toLowerCase() === "no") return false;
        return extracted;
    }

    return value;
};

const parseMarriedMetaValue = (value: string): any => {
    if (!value) return null;

    // Extract value from PHP serialized format: a:1:{i:0;s:3:"Yes";}
    const match = value.match(/s:\d+:"(.+?)"/);
    if (match) {
        const extracted = match[1];
        if (extracted.toLowerCase() === "yes") return "yes";
        if (extracted.toLowerCase() === "no") return "no";
        return extracted;
    }

    return value;
};

const usersExport = async (req: Request, res: Response) => {
    const metaArray = meta as any[];
    const usersArray = users as any[];
    console.log(metaArray)
    console.log(usersArray)
    const result = usersArray[2].data.map((user: any) => {
        const userMeta = metaArray[2].data.filter((m: any) => m?.user_id === user?.ID);

        const metaObj: Record<string, string> = {};

        userMeta.forEach((m: any) => {
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
            status: metaObj?.account_status == "approved" ? "active": "pending",
            isOrthodoxJew: parseMetaValue(metaObj?.question_1) || false,
            maritalStatus: (metaObj.question_7 || parseMarriedMetaValue(metaObj?.question_3)) || "The old register user didn't select anything.",
            keepsMitzvos: parseMetaValue(metaObj?.question_4) || false,
            chafifaDuration: metaObj?.question_5 || "The old register user didn't write anything.",
            chickenSoupInDairySink: metaObj?.question_6 || "The old register user didn't write anything.",
            // meta: metaObj
        };
    });
    // res.status(200).json(result)
    const insertUser = await UserModel.insertMany(result);
    if(insertUser) {
        res.status(200).json({
            success: true,
            message: "Users have inserted successfully",
            usersAmount: insertUser.length,
        })
    } else {
        res.status(500).json({
            success: false,
            errors: {
                msg: "There was an server side error"
            }
        })
    }
    res.status(200).json(result)
};

export default usersExport;