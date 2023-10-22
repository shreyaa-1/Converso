const express = require("express");
const userController = require("../controllers/userController");
const { verifyUser } = require("../middleware/auth");
const { verifyotp } = require("../middleware/auth");
const { sendotp } = require("../middleware/auth");
const userRouter = express.Router();
userRouter.get("/getuser/:id/:userid", verifyUser, userController.getUser);
userRouter.get("/searchuser/:id", verifyUser, userController.searchUser);
userRouter.post("/login", userController.login);
userRouter.post("/sendotp",sendotp);
userRouter.post("/register",verifyotp,userController.register);

module.exports = userRouter;
