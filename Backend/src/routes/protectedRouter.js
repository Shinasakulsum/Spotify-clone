import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

const protectedRouter = express.Router();

protectedRouter.get('/profile', protect, (req, res) => {
    res.json({
        message: 'This is a protected route',
        user: req.user
    });
});

export default protectedRouter;
