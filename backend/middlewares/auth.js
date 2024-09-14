const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  //get token
  const token = req.headers['x-auth-token'];

  //check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  //verify token
  try {
    const decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
