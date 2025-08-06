export const isAdmin = async (req, res, next) => {
    try {
      const user = req.user;  // Access the user object set by isAuthenticated
  
      if (user && user.role === 'admin') {
        next();  // Proceed if the user is an admin
      } else {
        return res.status(403).json({ message: 'Only Admin can add category' });
      }
    } catch (error) {
      console.error('Error in isAdmin middleware:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  