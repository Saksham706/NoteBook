const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const userController = require("../controllers/userController");

// Route 1: Create user
router.post(
  "/createuser",
  [
    body("name").trim().isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),
    body("email").trim().isEmail().withMessage("Enter a valid email"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
  ],
  userController.createUser
);

// Route 2: Login user
router.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Enter a valid email"),
    body("password").trim().notEmpty().withMessage("Password cannot be blank")
  ],
  userController.loginUser
);

// Route 3: Get user details
router.post("/getuser", fetchuser, userController.getUser);

module.exports = router;
