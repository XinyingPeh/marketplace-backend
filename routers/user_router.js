const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const authMiddleware = require("../controllers/middlewares/auth_middleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.put("/update", authMiddleware, userController.updateUserDetails);
router.get("/history", authMiddleware, userController.viewPurchaseHistory);

module.exports = router;
