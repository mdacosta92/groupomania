const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  let token = req.header('Authorization');

  if (!token || !token.startsWith('Bearer '))
    return res.status(401).send('Accès refusé');
  token = token.replace('Bearer ', '');
  try {
    const verified = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.error(err);
    res.status(400).send('Invalid Token');
  }

}
