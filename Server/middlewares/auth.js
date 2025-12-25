import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    // Get token from cookie OR Authorization header
    const token =
      req.cookies?.accessToken ||
      (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ") &&
        req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Authentication token required",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY_ACCESS_TOKEN
    );

    // Normalize user id
    const userId =
      decoded?.id ||
      decoded?.userId ||
      decoded?._id ||
      decoded?.user;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Invalid token payload",
      });
    }

    req.userId = userId;
    req.user = decoded; // optional: attach full payload

    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Token expired",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Invalid token",
      });
    }

    return res.status(500).json({
      success: false,
      error: true,
      message: "Authentication failed",
    });
  }
};

export default auth;
