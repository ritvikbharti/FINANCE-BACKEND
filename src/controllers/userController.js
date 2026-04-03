import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendResponse } from "../utils/response.js";


const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET, {expiresIn: "7d"});

};

export const registerUser = async (req,res)=>{
    const {name,email,password,role} = req.body;

    if(!name || !email || !password){
        return sendResponse(res,400,false,"All fields required");
    }


    const exists = await User.findOne({email});

    if(exists){
        return sendResponse(res,400,false,"user already registered");
    }

    const hashPassword = await bcrypt.hash(password,10);

    const user = await User.create({
        name,
        email,
        password:hashPassword,
        role: role || "viewer"
    });
    return sendResponse(res, 201, true, "User registered", {
    token: createToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
}

export const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return sendResponse(res,400,false,"Email and password required");
    }

    const user  = await User.findOne({email});

    if(!user){
        return sendResponse(res,404,false,"User not found");
    }

    if(!user.isActive){
            return sendResponse(res, 403, false, "User is inactive");

    }
      const isMatch = await bcrypt.compare(password, user.password);
 if (!isMatch) {
    return sendResponse(res, 401, false, "Invalid credentials");
  }
  return sendResponse(res, 200, true, "Login success", {
    token: createToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });

}

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  return sendResponse(res, 200, true, "Users fetched", users);
};

export const updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  const user = await User.findById(id);

  if (!user) {
    return sendResponse(res, 404, false, "User not found");
  }

  user.isActive = isActive;
  await user.save();

  return sendResponse(res, 200, true, "User status updated", user);
};

export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!["viewer", "analyst", "admin"].includes(role)) {
    return sendResponse(res, 400, false, "Invalid role");
  }

  const user = await User.findById(id);

  if (!user) {
    return sendResponse(res, 404, false, "User not found");
  }

  user.role = role;
  await user.save();

  return sendResponse(res, 200, true, "User role updated", user);
};