import jwt from 'jsonwebtoken'; 

const generateTokenAndSetCookie = (userId, res) => {
  //creating token

  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: '15d'
  }); 

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //ms format 
    httpOnly: true,  //prevent  xss attack 
    sameSite: "strict" , //csrf attack prevention 
    secure:process.env.NODE_ENV !== "development"
    
  }); 
}


export default generateTokenAndSetCookie; 