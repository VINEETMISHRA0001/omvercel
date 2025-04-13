import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const {auth_token} = req.cookies;

    if (!auth_token) {
        return res.status(401).json({ 
            status: 'error',
            message: 'No token provided' 
        });
    }

    try {
        const decoded = jwt.verify(auth_token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ 
            status: 'error',
            message: 'Invalid or expired token'
        });
    }
};