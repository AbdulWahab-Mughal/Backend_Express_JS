const jwt = require("jsonwebtoken");

const middlewares = {
  AUTH_MIDDLEWARE: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      // console.log(token);
      let isTokenMatch = jwt.verify(token, "token");
      // console.log("isTokenMatch:",Boolean(isTokenMatch._doc));
      if (isTokenMatch._doc) {
        next();
      }
    } catch (error) {
      res.json({
        message: "Go And Login First!",
      });
    }
  },
};

module.exports = middlewares;
