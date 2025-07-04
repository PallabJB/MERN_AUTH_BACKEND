import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt  from "jsonwebtoken";
import {User} from "../models/userModel.js"; 

// export const isAuthenticated = catchAsyncError(async (req, res, next) => {
//     const {token} = req.cookies;
//     if(!token){
//         return next(new ErrorHandler('Please login to access this resource', 401));
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

//     req.user = await User.findById(decoded.id);
    
//     next();
// })

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler('Please login to access this resource', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ErrorHandler('Invalid or expired token, please login again', 401));
  }
});
