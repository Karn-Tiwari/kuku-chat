import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; //cookie parser
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "Unauthorized - User not found" });
    }
    req.user = user; //req.user me user ki sari details aa jayengi
    next(); //next() is used to call the next middleware in the stack
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ message: "You are not authorized to access this route" });
  }
};
