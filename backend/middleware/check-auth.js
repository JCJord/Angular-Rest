const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "!$@%&SS¥sz2b→ñÇ▀╞┴bi@Üìó▄Nu7,B!▬♂mX▌");
    next();
  } catch (err) {
    res.stats(401).json({ message: "fail authentication" });
  }
};
