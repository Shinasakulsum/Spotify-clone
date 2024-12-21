import jwt from 'jsonwebtoken';

// If want to import 
// import protect from '../middleware/authMiddleware.js';

// router.get('/profile', protect, (req, res) => {
//   res.json({ message: 'Protected user profile data', user: req.user });
// });

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default protect;
