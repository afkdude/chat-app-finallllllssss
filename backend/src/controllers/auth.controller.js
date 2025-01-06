//all the functionality of signup login and logout will be here

import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"


export const signupHandler = async (req, res) => {

  const { fullName, email, password } = req.body;
  try {


    //basic validation 
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Plz fill all the fields" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }


    //already exits condition 
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });

    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    })

    if (newUser) {
      //generate JWT token
      generateToken(newUser._id, res);

      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });


    } else {
      res.status(400).json({ message: "Invalid user data" });
    }


  } catch (error) {
    console.log("Error in signup controller ", error.message);
    res.status(500).json({ message: "Internal Server Error" });

  }
}

export const loginHandler = async (req, res) => {

  const { email, password } = req.body;
  try {

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    //comparing hashed pass and typed password 
    const isPassCorrect = await bcrypt.compare(password, user.password);


    if (!isPassCorrect) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    //generating token upon password validation 
    generateToken(user._id, res);


    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller ", error.message);
    res.status(500).json({ message: "Internal Server Error" });

  }

}


export const logoutHandler = (req, res) => {
  try {
    res.cookie('jwt', '', {
      maxAge: 0
    });

    res.status(200).json({ message: "Logged out Successfuly" });

  } catch (error) {
    console.log("Error in logout controller ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export const updateProfileHandler = async (req, res) => {
  try {
    const { profilePic } = req.body

    const userId = req.user._id;


    if (!profilePic) {
      return res.status(404).json({ message: "ProfilePic not Provided" });
    }


    //image uploaded on cloudinary 
    const uploadResponse = await cloudinary.uploader.upload(profilePic); 

    //updating the user 
    const updatedUser = await User.findByIdAndUpdate(userId, {
      profilePic: uploadResponse.secure_url
    }, { new: true });
    
    res.status(200).json(updatedUser); 
  } catch (error) {
    console.log("Error in Update  controller ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const checkAuth = (req, res) => { 
  try {
    res.status(200).json(req.user); 
  } catch (error) {
    console.log("Error in checkAuth controller ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}