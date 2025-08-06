import express from 'express';
import { login, logout, register, verifyToken } from '../controllers/user.controller.js';

const router = express.Router();

router.route('/').post(register);
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/validate-token').get(verifyToken, (req, res) => {
    res.json({
        message: "You have access!",
        user: {
            fullName: req.user.fullName,
            email: req.user.email,
            id: req.user._id,
        },
    });
});




export default router;
