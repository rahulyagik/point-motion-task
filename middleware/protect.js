const fs = require("fs");
const jwt = require("jsonwebtoken");

const users = JSON.parse(fs.readFileSync(`${__dirname}/../data/users.json`));

const protectMiddleWare = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        res.status(400).json({
          result: false,
          error: "Please provide a JWT token",
        })
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      function (err, decoded) {
        if (err) {
          console.log(err, "err");
        }
        return decoded;
      }
    );

    if (!decoded) {
      return next(
        res.status(400).json({
          result: false,
          error: "JWT Verification Failed",
        })
      );
    }

    let currentUser = users.find((u) => {
      return u.id === decoded.id;
    });

    req.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};
module.exports = protectMiddleWare;
