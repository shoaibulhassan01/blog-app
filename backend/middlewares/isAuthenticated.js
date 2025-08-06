import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';  // Import your User model

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.token;  // Token should be in cookies

     // Log the token for debugging

    if (!token) {
      return res.status(401).json({ message: 'Token is not provided' });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    console.log('Decoded Token:', decoded);  // Log the decoded token

    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Find the user by decoded.userId (from the token)
    const user = await User.findById(decoded.userId).select('-password');  // Exclude password

    console.log('User:', user);  // Log the user to check if it’s fetched correctly

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;  // Set the user object in req.user
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Error in isAuthenticated middleware:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
