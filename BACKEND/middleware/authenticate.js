const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, 'your_secret_key');

    // Add the student ID to the request object
    req.studentId = decodedToken.studentId;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;
