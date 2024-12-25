import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

// Signup controller to register a new user
export const signup = async (req, res) => {
  try {
    // Extracting user details from the request body
    const { fullname, username, password, confirmpassword, gender } = req.body;

    // Check if password and confirm password match
    if (password !== confirmpassword) {
      return res.status(400).json({ error: "password does not match" });
    }

    // Check if the username already exists in the database
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "user already exists" });
    }

    // Hash the password for secure storage
    const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    // Generate profile picture URLs based on gender
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // Create a new user object with hashed password and profile picture
    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic, // Conditional profile picture assignment
    });

    if (newUser) {

      //generate twt token 
       generateTokenAndSetCookie(newUser._id, res); 
      // Save the new user to the database
      await newUser.save();

      // Respond with the new user details (excluding password)
      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });

    }
  } catch (error) {
    // Handle any errors during the signup process
    console.log("error in signup controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

// Login controller placeholder for future implementation
export const login = async (req, res) => {
  try {
    const { username, password } = req.body; 

    const user = await User.findOne({ username }); 
    const isPasswordCorrect = await bcrypt.compare(password, user?.password ||''); 
    
    
    
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "invalid credential" }); 
    }

    generateTokenAndSetCookie(user._id, res); 

    res.status(200).json({
      _id:user._id,
      fullname:user.fullname,
      username:user.username,
      profilePic:user.profilePic,  
    })
  } catch (error) {
    // Handle any errors during the login process
    console.log("error in login controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};



// Logout controller placeholder for future implementation
export const logout = async  (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 }); 
    res.status(200).json({message:"logged out succesfully"})
  } catch (error) {
    // Handle any errors during the logout process
    console.log("error in logout controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
