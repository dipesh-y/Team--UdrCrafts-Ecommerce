import jwt from 'jsonwebtoken';

const auth = async(req, res, next) => {
    try {
        console.log("Auth middleware called");
        console.log("Cookies:", req.cookies);
        console.log("Headers:", req.headers);
        
        // Get token from cookies or Authorization header
        const token = req.cookies?.accessToken || 
                     (req.headers?.authorization && req.headers.authorization.split(" ")[1]);

        console.log("Token found:", !!token);

        if(!token) {
            return res.status(401).json({
                message: "Authentication token required",
                error: true,
                success: false
            })
        }

        // Verify token
        const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
        console.log("Decoded token:", decode);

        if(!decode) {
            return res.status(401).json({
                message: "Invalid token",
                error: true,
                success: false
            })
        }

        // Try different possible user ID fields
        req.userId = decode.id || decode.userId || decode._id || decode.user;
        
        console.log("User ID set to:", req.userId);
        
        if(!req.userId) {
            return res.status(401).json({
                message: "User ID not found in token",
                error: true,
                success: false
            })
        }

        next();

    } catch (error) {
        console.error("Auth error:", error.message);
        if(error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: "Invalid token",
                error: true,
                success: false
            })
        }
        if(error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Token expired",
                error: true,
                success: false
            })
        }
        return res.status(500).json({
            message: "Authentication failed",
            error: true,
            success: false
        })
    }
}

export default auth;