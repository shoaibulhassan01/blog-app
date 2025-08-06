import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

export const register = async (req, res) =>{
    try {
        const {fullName, email, password, role}  = req.body;

        if(!fullName || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All Fields are Required"
            })
        }

        const user = await User.findOne({email})

        if(user){
            return res.status(400).json({
                success: false,
                message: "Email Already Exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
    fullName,
    email,
    password: hashedPassword,
    role
});

return res.status(201).json({
    success: true,
    message: "User Created Successfully",
    user: { fullName: newUser.fullName, email: newUser.email },
});



    } catch (error) {
        console.log("Error in registration", error)
    }
}

export const login = async (req, res) =>{
  try {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"All Fields are Required"
        });
    }

    const user = await User.findOne({ email });

    if(!user){
        return res.status(400).json({
            success:false,
            message:"User not Found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            success:false,
            message:"Invalid Credentials"
        })
    }

   const token = await jwt.sign({userId: user._id}, process.env.SECRET_KEY,{
    expiresIn: "1d"
   })

    return res.status(200).cookie( "token", token,{
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
    }).json({
        success: true,
        message:"User LoggedIn Sucessfully",
        user: { fullName: user.fullName, email: user.email },
    })

  } catch (error) {
    console.log(error)
  }

}

export const logout = async (_, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge: "0"}).json({
            success:true,
            message:"User Logout Successfully"
        })
    } catch (error) {
        console.log(error)
    }
}

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies?.token; // Get the token from cookies

        if (!token) {
            return res.status(403).json({ message: "No token provided" });
        }

        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid or expired token" });
            }

            const user = await User.findById(decoded.userId).select("fullName email"); // Get user's name and email
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            req.user = user; // Attach user data to req.user
            next();
        });
    } catch (error) {
        console.log("Error in verifyToken middleware:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
