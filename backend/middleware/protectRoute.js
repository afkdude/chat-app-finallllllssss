
import jwt from "jsonwebtoken";             
import User from "../models/user.model.js";

// Middleware to protect routes by verifying JWT tokens
const protectRoute = async (req, res, next) => {
  try {
    // 1. Retrieve the token from cookies
    // Ensure that the 'cookie-parser' middleware is used in server.js to handle cookies
    const token = req.cookies.jwt; 

    // 2. Check if token exists, else return an unauthorized response
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - No token provided" });
    }

    // 3. Verify the token using the secret key stored in environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 4. If token verification fails, return unauthorized error
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid token provided" });
    }

    // 5. Fetch the user details from the database using the decoded userId (from the token payload)
    // Exclude the password field when retrieving user data
    const user = await User.findById(decoded.userId).select("-password");

    // 6. If the user is not found, return unauthorized error
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // 7. Attach the user object to the request object for use in the next middleware or route handler
    req.user = user;

    // 8. Proceed to the next  route handler
    next();

  } catch (error) {
   
    console.log("Error in protect route: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}


export default protectRoute;
