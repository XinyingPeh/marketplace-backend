const express = require("express");
const router = express.Router();
const authMiddleware = require("../controllers/middlewares/auth_middleware");
const paymentController = require("../controllers/payment_controller");

// router endpoints
router.post('/checkout', authMiddleware, paymentController.checkout);


// router.post("/create/:cartID", authMiddleware, paymentController.createPayment);
module.exports = router;
