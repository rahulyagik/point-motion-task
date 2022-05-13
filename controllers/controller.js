const fs = require("fs");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

const users = JSON.parse(fs.readFileSync(`${__dirname}/../data/users.json`));

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  res.status(statusCode).json({
    result: true,
    jwt: token,
    message: "Signin success",
  });
};

exports.signup = async (req, res, next) => {
  const newUser = {
    fname: req.body.fname,
    lname: req.body.lname,
    username: req.body.username,
    password: md5(req.body.password),
  };

  const newId = users[users.length - 1]?.id + 1 || 1;
  const freshUser = Object.assign({ id: newId }, newUser);

  users.push(freshUser);

  fs.writeFile(
    `${__dirname}/../data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(201).json({
        result: "true",
        message: "SignUp success. Please proceed to Signin",
      });
    }
  );
};

exports.signin = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      result: false,
      error: "Please provide username and password!",
    });
  }

  const user = await users.find((u) => {
    return u.username === username;
  });

  if (!user || user.password !== md5(password)) {
    return res.status(401).json({
      result: false,
      error: "Incorrect username or password",
    });
  }

  createSendToken(user, 200, res);
};

exports.getMe = async (req, res, next) => {
  currentUser = req.user;

  res.status(200).json({
    result: true,
    data: {
      fname: currentUser.fname,
      lname: currentUser.lname,
      password: currentUser.password,
    },
  });
};
