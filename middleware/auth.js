const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');

function auth(requiredRoleName) {
  return async function(req, res, next) {
    const token = req.header('x-auth-token');

    // Check for token
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Add user from payload
      req.user = decoded;

      // Find user's role
      const user = await User.findByPk(req.user.id, { include: Role });
      if (!user || !user.Role) {
          return res.status(403).json({ msg: 'Invalid user role' });
      }

      // Check role
      if (requiredRoleName && user.Role.name !== requiredRoleName) {
        return res.status(403).json({ msg: 'Forbidden: Insufficient permissions' });
      }

      next();
    } catch (e) {
      res.status(400).json({ msg: 'Token is not valid' });
    }
  }
}

module.exports = auth;
