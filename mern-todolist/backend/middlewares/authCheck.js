const jwt = require("jsonwebtoken");

const secret = process.env.jwtSecret;

const authCheck = async (req, res, next) => {
  try {
    const headerAuth = req.headers.authorization;
    if (!headerAuth)
      return res
        .status(403)
        .json({ success: false, msg: "Please login first!" });
    // getting token from header
    const token = req.headers.authorization.split(" ")[1];

    // this is if the user is not logined by oauth
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      // decoding token data
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {
      // if there is oauth
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    // letting user for route
    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      msg: "Please login first!",
      code: "Invalid-token",
      err: error.message,
    });
  }
};

module.exports = authCheck;
