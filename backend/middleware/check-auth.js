const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "test_page_now");
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (err) {
    res.status(401).json({ message: err });
  }
};
