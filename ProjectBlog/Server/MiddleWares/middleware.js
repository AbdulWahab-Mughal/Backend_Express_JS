const jwt = require("jsonwebtoken");

const Middleware = {
  AUTH_MIDDLEWARE: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      // console.log("token: " , token);
      const IsTokenMatch = jwt.verify(token, "token");
      //   console.log("IsTokenMatch: " , IsTokenMatch);
      if (IsTokenMatch) {
        next();
      }
    } catch (error) {
      return res.json({
        status: "false",
        message: "Go And Login First!",
      });
    }
  },
};

module.exports = Middleware;
