const express = require("express");

const controller = require("../controllers/controller");
const schema = require("./../schema");
const validMiddleWare = require("./../middleware/validations");
const protectMiddleWare = require("./../middleware/protect");

const router = express.Router();

router.post("/signup", validMiddleWare(schema.user), controller.signup);
router.post("/signin", controller.signin);

router.get("/user/me", protectMiddleWare, controller.getMe);

module.exports = router;
