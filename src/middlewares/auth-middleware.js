const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI"

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Token Access Denied' });
  
    try {
      const verified = jwt.verify(token.split(' ')[1], SECRET_KEY); // Assuming 'Bearer <token>' format
      req.user = verified.id;  // Storing the user ID in req.user
      next();
    } catch (err) {
      res.status(400).json({ message: 'Invalid Token' });
    }
  };

module.exports = authMiddleware;