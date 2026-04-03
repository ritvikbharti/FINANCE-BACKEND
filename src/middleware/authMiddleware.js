import jwt from "jsonwebtoken";

import User from "../models/User.js";

import { sendResponse } from "../utils/response.js";

export const protect = async (req,res,next)=> {
    try{
        const token = req.headers.authorization?.split(" ")[1];

        if(!token){
            return sendResponse(res,401,false,"Token missing");
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        if(!user){
            return sendResponse(res,401,false,"User not found");
        }

        if(!user.isActive){
         return sendResponse(res, 403, false, "User is inactive");

        }
         req.user = user;
    next();
    }
    catch(err){
            return sendResponse(res, 401, false, "Invalid token");

    }

};