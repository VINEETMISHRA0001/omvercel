import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const {auth_token} = req.cookies;

    console.log(auth_token)
    if (!auth_token) return res.status(401).json({ message: 'No token provided' });
    try {
        const decoded = jwt.verify(auth_token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
   
    next();
 };